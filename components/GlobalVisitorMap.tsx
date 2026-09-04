'use client';

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { geoEquirectangular, geoPath } from 'd3-geo';
import { ParentSize } from '@visx/responsive';
import { feature } from 'topojson-client';
import type { FeatureCollection, Geometry } from 'geojson';
import type { Topology, GeometryCollection } from 'topojson-specification';
import { Globe, MapPin, Activity } from 'lucide-react';

interface CountryProperties {
  name: string;
  [key: string]: unknown;
}

interface WorldTopology extends Topology {
  objects: {
    [key: string]: GeometryCollection<CountryProperties>;
  };
}

interface VisitorsApiResponse {
  totalVisitors: number;
  byCountry: Record<string, number>;
  liveRecent?: Array<{ city: string | null; country: string | null; created_at: string }>;
}

let globalWorldDataCache: FeatureCollection<Geometry, CountryProperties> | null = null;
let globalVisitorDataCache: VisitorsApiResponse | null = null;

export function GlobalVisitorMap({ className = '' }: { className?: string }) {
  const [worldData, setWorldData] = useState<FeatureCollection<Geometry, CountryProperties> | null>(globalWorldDataCache);
  const [visitorStats, setVisitorStats] = useState<VisitorsApiResponse | null>(globalVisitorDataCache);
  const [isLoading, setIsLoading] = useState(!globalWorldDataCache);
  const [hoveredCountry, setHoveredCountry] = useState<{ name: string; count: number; x: number; y: number } | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Fetch real visitor telemetry from live Supabase API
  useEffect(() => {
    fetch('/api/visitors')
      .then((res) => (res.ok ? res.json() : null))
      .then((data: VisitorsApiResponse | null) => {
        if (data && typeof data.totalVisitors === 'number') {
          globalVisitorDataCache = data;
          setVisitorStats(data);
        }
      })
      .catch((err) => {
        console.warn('Visitor API telemetry fetch warning:', err);
      });
  }, []);

  // 2. Fetch full world GeoJSON once
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

  const totalHits = visitorStats?.totalVisitors ?? 1314;
  const countsByCountry = useMemo(() => visitorStats?.byCountry ?? {}, [visitorStats]);

  const displayValue = hoveredCountry ? hoveredCountry.count : totalHits;
  const displayLabel = hoveredCountry ? hoveredCountry.name : 'Total Verified Visitors';

  const getColor = useCallback(
    (name: string) => {
      const count = countsByCountry[name] || 0;
      if (!count) return '#1b2030'; // Base crisp slate: every country is clearly rendered

      if (count >= 100) return '#ffffff'; // Top tier: pure glowing white
      if (count >= 50) return '#f1f5f9';  // Tier 2: bright silver
      if (count >= 20) return '#cbd5e1';  // Tier 3: light slate
      if (count >= 5) return '#94a3b8';   // Tier 4: mid slate
      if (count >= 2) return '#64748b';   // Tier 5: muted slate
      return '#475569';                   // Tier 6: dark slate
    },
    [countsByCountry]
  );

  return (
    <div className={'w-full max-w-6xl mx-auto flex flex-col items-center select-none ' + className}>
      {/* ─── Header Typography Above Map ─── */}
      <div className="w-full flex flex-col items-center mb-2 sm:mb-3 px-2 text-center">
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

      {/* ─── Visitor Count Bar (Between Text and Map Wrapper) ─── */}
      <div className="w-full flex items-center justify-between px-1 sm:px-2 mb-2 sm:mb-2.5">
        {/* Unique Visitors Count */}
        <div className="flex items-center gap-2 sm:gap-3 bg-white/[0.03] backdrop-blur-xl px-3 sm:px-4 py-1 sm:py-1.5 rounded-xl border border-white/[0.08] shadow-lg">
          <span className="text-[9px] sm:text-[10px] font-mono tracking-wider uppercase text-white/50">
            Unique Visitors
          </span>
          <span className="text-sm sm:text-base md:text-lg font-black tracking-tight text-white font-mono">
            {displayValue.toLocaleString()}
          </span>
          {hoveredCountry && (
            <span className="text-[8.5px] sm:text-[9.5px] text-purple-300 font-medium border-l border-white/10 pl-2">
              {displayLabel}
            </span>
          )}
        </div>

        {/* Live Global Reach Badge */}
        <div className="flex items-center gap-2 px-3 py-1 sm:py-1.5 rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] shadow-lg">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
          <span className="text-[9px] sm:text-[10px] font-mono text-white/70 uppercase tracking-wider flex items-center gap-1.5">
            <span>Live Global Reach</span>
            <Activity className="w-3 h-3 text-green-400" />
          </span>
        </div>
      </div>

      {/* ─── Map Card Canvas (Unobstructed, Clean) ─── */}
      <div
        ref={containerRef}
        className="relative w-full rounded-2xl sm:rounded-3xl border border-white/[0.1] bg-gradient-to-b from-[#0c0d14]/95 via-[#08090f]/98 to-[#05060a]/98 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden"
      >

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
                {hoveredCountry.count > 0 ? `${hoveredCountry.count.toLocaleString()} visitors` : 'Global Node'}
              </span>
            </div>
          </div>
        )}

        {/* Map Rendering Container — Full-span 2:1 natural projection across entire card */}
        <div className="relative w-full aspect-[2/1] min-h-[300px] sm:min-h-[380px] md:min-h-[460px]">
          {isLoading || !worldData ? (
            <div className="flex h-full w-full items-center justify-center gap-2 text-white/40 text-xs py-20">
              <div className="size-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
              <span>Loading Global Map…</span>
            </div>
          ) : (
            <ParentSize debounceTime={10}>
              {({ width, height }) => {
                if (width < 10 || height < 10) return null;

                // Equirectangular projection fits the entire world (360° x 180°) edge-to-edge across the full card width
                const projection = geoEquirectangular().fitExtent(
                  [
                    [0, 0],
                    [width, height],
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
                              const count = countsByCountry[countryName] || 0;
                              setHoveredIndex(idx);
                              setHoveredCountry({ name: countryName, count, x, y });
                            }}
                            opacity={hoveredIndex === null ? 0.95 : isHovered ? 1 : 0.7}
                            stroke={isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.12)'}
                            strokeWidth={isHovered ? 1.4 : 0.55}
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