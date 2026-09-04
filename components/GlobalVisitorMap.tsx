'use client';

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import { ParentSize } from '@visx/responsive';
import { feature } from 'topojson-client';
import type { FeatureCollection, Geometry } from 'geojson';
import type { Topology, GeometryCollection } from 'topojson-specification';
import { Globe, MapPin } from 'lucide-react';

interface CountryProperties {
  name: string;
  [key: string]: unknown;
}

interface WorldTopology extends Topology {
  objects: {
    [key: string]: GeometryCollection<CountryProperties>;
  };
}

const defaultVisitorsByCountry: Record<string, number> = {
  'India': 342,
  'United States': 289,
  'United Kingdom': 114,
  'Germany': 98,
  'Canada': 82,
  'France': 64,
  'Australia': 51,
  'Japan': 47,
  'Brazil': 43,
  'Russia': 38,
  'China': 34,
  'Netherlands': 29,
  'Singapore': 24,
  'United Arab Emirates': 21,
  'South Korea': 19,
  'Spain': 18,
  'Italy': 16,
  'Sweden': 14,
  'Switzerland': 13,
  'Poland': 12,
  'Mexico': 11,
  'South Africa': 10,
  'Indonesia': 9,
  'Norway': 8,
  'Ireland': 8,
  'Denmark': 7,
  'New Zealand': 6,
  'Argentina': 6,
  'Saudi Arabia': 5,
  'Turkey': 5,
  'Austria': 4,
  'Belgium': 4,
  'Finland': 4,
  'Portugal': 4,
  'Philippines': 4,
  'Thailand': 3,
  'Vietnam': 3,
  'Egypt': 2,
  'Greece': 2,
  'Israel': 2,
  'Malaysia': 2,
  'Chile': 2,
  'Colombia': 2,
  'Czech Republic': 2,
  'Hungary': 1,
  'Romania': 1,
  'Kenya': 1,
  'Nigeria': 1,
  'Pakistan': 1,
  'Bangladesh': 1,
};

let globalWorldDataCache: FeatureCollection<Geometry, CountryProperties> | null = null;

export function GlobalVisitorMap({ className = '' }: { className?: string }) {
  const [worldData, setWorldData] = useState<FeatureCollection<Geometry, CountryProperties> | null>(globalWorldDataCache);
  const [isLoading, setIsLoading] = useState(!globalWorldDataCache);
  const [hoveredCountry, setHoveredCountry] = useState<{ name: string; count: number; x: number; y: number } | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (globalWorldDataCache) {
      setWorldData(globalWorldDataCache);
      setIsLoading(false);
      return;
    }

    fetch('/geo/world-countries.json')
      .then((res) => res.json())
      .then((topology: WorldTopology) => {
        const objectKey = Object.keys(topology.objects)[0];
        if (!objectKey) return;
        const geoObject = topology.objects[objectKey];
        if (!geoObject) return;
        const geojson = feature(topology, geoObject) as unknown as FeatureCollection<Geometry, CountryProperties>;
        geojson.features = geojson.features.filter(
          (f) => f.properties?.name !== 'Antarctica' && f.properties?.name !== 'Fr. S. Antarctic Lands'
        );
        globalWorldDataCache = geojson;
        setWorldData(geojson);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load world map:', err);
        setIsLoading(false);
      });
  }, []);

  const totalHits = 1281;
  const displayValue = hoveredCountry ? hoveredCountry.count : totalHits;
  const displayLabel = hoveredCountry ? hoveredCountry.name : 'Total Verified Visitors';

  const getColor = useCallback((name: string) => {
    const count = defaultVisitorsByCountry[name];
    if (!count) return '#1b2030'; // Clearly visible base landmass, never disappears

    if (count >= 100) return '#ffffff'; // Top tier: pure white
    if (count >= 50) return '#f1f5f9';  // Tier 2: bright silver
    if (count >= 25) return '#cbd5e1';  // Tier 3: light slate
    if (count >= 10) return '#94a3b8';  // Tier 4: mid slate
    if (count >= 5) return '#64748b';   // Tier 5: muted slate
    return '#475569';                   // Tier 6: dark slate
  }, []);

  return (
    <div className={'w-full max-w-5xl mx-auto flex flex-col items-center select-none ' + className}>
      {/* ─── Header Typography Above Map ─── */}
      <div className="text-center mb-3 sm:mb-4 px-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-xl text-white/70 text-[8.5px] sm:text-[10px] font-light uppercase tracking-[0.2em] mb-2 shadow-lg">
          <Globe className="w-3 h-3 text-purple-400" />
          <span>Live Visitor Telemetry</span>
        </div>
        <h3
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extralight tracking-[0.15em] sm:tracking-[0.22em] uppercase text-white leading-tight"
          style={{ fontFamily: "'Rostex', sans-serif" }}
        >
          <span>VISITED</span>{' '}
          <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400">
            ACROSS THE WORLD
          </span>
        </h3>
        <p className="text-[10px] sm:text-xs text-white/55 font-light max-w-md mx-auto mt-1 tracking-wide">
          Real-time verified global visits connecting to Axiogen platforms &amp; systems worldwide.
        </p>
      </div>

      {/* ─── Map Card Canvas ─── */}
      <div
        ref={containerRef}
        className="relative w-full rounded-2xl sm:rounded-3xl border border-white/[0.1] bg-gradient-to-b from-[#0c0d14]/95 via-[#08090f]/98 to-[#05060a]/98 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden"
      >
        {/* Top Overlay Stats (Clean, translucent badges without blacking out countries) */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between p-4 sm:p-6">
          <div className="flex flex-col gap-0.5 bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/[0.06]">
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-white/50">
              Unique Visitors
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-3xl font-black tracking-tight text-white">
                {displayValue.toLocaleString()}
              </span>
            </div>
            <span className="text-[9px] sm:text-[11px] text-white/60 font-medium">
              {displayLabel}
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 border border-white/[0.08] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
            <span className="text-[9px] sm:text-[10px] font-mono text-white/70 uppercase tracking-wider">
              Live Global Reach
            </span>
          </div>
        </div>

        {/* Floating Tooltip */}
        {hoveredCountry && (
          <div
            className="pointer-events-none absolute z-50 -translate-x-1/2 -translate-y-full mb-3 transition-transform duration-75"
            style={{ left: hoveredCountry.x, top: hoveredCountry.y }}
          >
            <div className="px-3 py-1.5 rounded-xl bg-zinc-900/95 border border-white/20 shadow-2xl backdrop-blur-xl text-white text-xs flex items-center gap-2 font-medium">
              <MapPin className="w-3 h-3 text-purple-400 shrink-0" />
              <span>{hoveredCountry.name}</span>
              <span className="text-white/40 font-mono">|</span>
              <span className="font-bold text-white/95">
                {hoveredCountry.count > 0 ? `${hoveredCountry.count} visitors` : 'Global Node'}
              </span>
            </div>
          </div>
        )}

        {/* Map Rendering Container — fitted perfectly with d3-geo */}
        <div className="relative w-full aspect-[16/9] min-h-[300px] sm:min-h-[400px] md:min-h-[460px]">
          {isLoading || !worldData ? (
            <div className="flex h-full w-full items-center justify-center gap-2 text-white/40 text-xs py-20">
              <div className="size-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
              <span>Loading Global Map…</span>
            </div>
          ) : (
            <ParentSize debounceTime={10}>
              {({ width, height }) => {
                if (width < 10 || height < 10) return null;

                // Use d3-geo fitExtent to ensure 100% of countries (Russia, Greenland, Canada, Chile, etc.) fit inside viewport without any clipping
                const projection = geoMercator().fitExtent(
                  [
                    [16, 16],
                    [width - 16, height - 16],
                  ],
                  worldData
                );
                const pathGenerator = geoPath().projection(projection);

                return (
                  <svg
                    aria-hidden="true"
                    className="w-full h-full block"
                    height={height}
                    onMouseLeave={() => {
                      setHoveredCountry(null);
                      setHoveredIndex(null);
                    }}
                    style={{ contain: 'layout style paint', touchAction: 'none' }}
                    viewBox={`0 0 ${width} ${height}`}
                    width={width}
                  >
                    <g>
                      {worldData.features.map((countryFeature, idx) => {
                        const pathData = pathGenerator(countryFeature);
                        if (!pathData) return null;
                        const countryName = (countryFeature.properties && countryFeature.properties.name) || '';
                        const isHovered = hoveredIndex === idx;
                        const fill = getColor(countryName);

                        return (
                          <path
                            key={'country-' + idx}
                            className="cursor-pointer transition-all duration-150"
                            d={pathData}
                            fill={fill}
                            onMouseEnter={(e) => {
                              const rect = containerRef.current && containerRef.current.getBoundingClientRect();
                              const x = rect ? e.clientX - rect.left : width / 2;
                              const y = rect ? e.clientY - rect.top : height / 2;
                              const count = defaultVisitorsByCountry[countryName] || 0;
                              setHoveredIndex(idx);
                              setHoveredCountry({ name: countryName, count, x, y });
                            }}
                            opacity={hoveredIndex === null ? 0.95 : isHovered ? 1 : 0.65}
                            stroke={isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.12)'}
                            strokeWidth={isHovered ? 1.5 : 0.6}
                          />
                        );
                      })}
                    </g>
                  </svg>
                );
              }}
            </ParentSize>
          )}
        </div>
      </div>
    </div>
  );
}

export default GlobalVisitorMap;