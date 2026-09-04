'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Mercator } from '@visx/geo';
import { ParentSize } from '@visx/responsive';
import { feature } from 'topojson-client';
import type { FeatureCollection, Geometry } from 'geojson';
import type { Topology, GeometryCollection } from 'topojson-specification';
import { MapPin } from 'lucide-react';

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
  'United States': 18,
  'United Kingdom': 12,
  'Germany': 17,
  'France': 9,
  'Canada': 8,
  'Australia': 6,
  'Netherlands': 5,
  'Brazil': 7,
  'India': 83,
  'Japan': 4,
  'Spain': 3,
  'Italy': 6,
  'Mexico': 5,
  'Poland': 4,
  'Sweden': 3,
  'Belgium': 2,
  'Switzerland': 2,
  'Austria': 1,
  'Norway': 2,
  'Denmark': 1,
  'Ireland': 3,
  'Portugal': 2,
  'New Zealand': 1,
  'Finland': 1,
  'South Africa': 4,
  'Argentina': 3,
  'Indonesia': 2,
  'Philippines': 3,
  'Thailand': 2,
  'Vietnam': 1,
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

  const getColor = useCallback((name: string) => {
    const count = defaultVisitorsByCountry[name];
    if (!count) return '#222736';

    if (
      name === 'Argentina' ||
      name === 'South Africa' ||
      name === 'Norway' ||
      name === 'Sweden' ||
      name === 'Finland' ||
      name === 'Germany' ||
      count >= 15
    ) {
      return '#f8fafc';
    }
    if (name === 'Canada' || name === 'Japan' || name === 'United Kingdom' || count >= 8) {
      return '#cbd5e1';
    }
    if (name === 'India' || name === 'Brazil' || name === 'Australia' || name === 'France' || count >= 5) {
      return '#94a3b8';
    }
    if (name === 'United States' || name === 'Italy' || name === 'Netherlands' || count >= 3) {
      return '#64748b';
    }
    return '#4b5563';
  }, []);

  return (
    <div ref={containerRef} className={'relative w-full h-full select-none ' + className}>
      {/* Floating Tooltip */}
      {hoveredCountry && (
        <div
          className="pointer-events-none absolute z-50 -translate-x-1/2 -translate-y-full mb-3"
          style={{ left: hoveredCountry.x, top: hoveredCountry.y }}
        >
          <div className="px-3 py-1.5 rounded-xl bg-zinc-900/95 border border-white/15 shadow-2xl backdrop-blur-xl text-white text-xs flex items-center gap-2 font-medium">
            <MapPin className="w-3 h-3 text-purple-400 shrink-0" />
            <span>{hoveredCountry.name}</span>
            <span className="text-white/40 font-mono">|</span>
            <span className="font-bold text-white/95">{hoveredCountry.count} visitors</span>
          </div>
        </div>
      )}

      {/* Map — fills entire container, no card, no border */}
      <div className="absolute inset-0">
        {isLoading || !worldData ? (
          <div className="flex h-full w-full items-center justify-center gap-2 text-white/40 text-xs">
            <div className="size-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
            <span>Loading Global Map…</span>
          </div>
        ) : (
          <ParentSize debounceTime={10}>
            {({ width, height }) => {
              if (width < 10 || height < 10) return null;
              const scale = width / 5.8;
              const translate: [number, number] = [width / 2, height / 2];

              return (
                <Mercator
                  center={[0, 20]}
                  data={worldData.features}
                  scale={scale}
                  translate={translate}
                >
                  {(mercator) => (
                    <svg
                      aria-hidden="true"
                      className="w-full h-full block"
                      height={height}
                      onMouseLeave={() => {
                        setHoveredCountry(null);
                        setHoveredIndex(null);
                      }}
                      style={{ contain: 'layout style paint', touchAction: 'none' }}
                      viewBox={'0 0 ' + width + ' ' + height}
                      width={width}
                    >
                      <g>
                        {worldData.features.map((feature, idx) => {
                          const path = mercator.path(feature);
                          if (!path) return null;
                          const name = (feature.properties && feature.properties.name) || '';
                          const isHovered = hoveredIndex === idx;
                          const fill = getColor(name);

                          return (
                            <path
                              key={'country-' + idx}
                              className="cursor-pointer transition-all duration-150"
                              d={path}
                              fill={fill}
                              onMouseEnter={(e) => {
                                const rect = containerRef.current && containerRef.current.getBoundingClientRect();
                                const x = rect ? e.clientX - rect.left : width / 2;
                                const y = rect ? e.clientY - rect.top : height / 2;
                                const count = defaultVisitorsByCountry[name] || 0;
                                setHoveredIndex(idx);
                                setHoveredCountry({ name, count, x, y });
                              }}
                              opacity={hoveredIndex === null ? 0.95 : isHovered ? 1 : 0.6}
                              stroke={isHovered ? '#ffffff' : 'rgba(0, 0, 0, 0.65)'}
                              strokeWidth={isHovered ? 1.4 : 0.5}
                            />
                          );
                        })}
                      </g>
                    </svg>
                  )}
                </Mercator>
              );
            }}
          </ParentSize>
        )}
      </div>
    </div>
  );
}

export default GlobalVisitorMap;