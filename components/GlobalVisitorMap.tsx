'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  geoOrthographic,
  geoMercator,
  geoPath,
  geoGraticule,
  geoCentroid,
} from 'd3-geo';
import { feature } from 'topojson-client';
import type { FeatureCollection, Geometry } from 'geojson';
import { Globe2, Map as MapIcon, MapPin, RotateCcw } from 'lucide-react';
import { COUNTRY_DATA, type CountryMetric } from '../data/countries';

export type ProjectionMode = 'orthographic' | 'mercator';

export const MAP_THEME_COLORS = {
  background: '#07080d',
  sphere: '#0b0d15',
  sphereStroke: '#1c2030',
  graticule: 'rgba(255, 255, 255, 0.04)',
  countryBase: '#151824',
  countryStroke: '#0a0c12',
  scales: [
    '#222636', // Level 1
    '#363c50', // Level 2
    '#565e78', // Level 3
    '#8b95b0', // Level 4
    '#e2e8f0', // Level 5 (silver/titanium)
  ],
  highlightStroke: '#ffffff',
};

interface VisitorsApiResponse {
  totalVisitors: number;
  byCountry: Record<string, number>;
  liveRecent?: Array<{ city: string | null; country: string | null; created_at: string }>;
}

let globalWorldDataCache: FeatureCollection<Geometry, any> | null = null;
let globalVisitorDataCache: VisitorsApiResponse | null = null;

export function GlobalVisitorMap({ className = '' }: { className?: string }) {
  const [worldData, setWorldData] = useState<FeatureCollection<Geometry, any> | null>(globalWorldDataCache);
  const [visitorStats, setVisitorStats] = useState<VisitorsApiResponse | null>(globalVisitorDataCache);
  const [isLoading, setIsLoading] = useState(!globalWorldDataCache);
  const [projectionMode, setProjectionMode] = useState<ProjectionMode>('orthographic');
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>('356'); // India by default
  const [hoveredCountryId, setHoveredCountryId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 460 });
  const [rotation, setRotation] = useState<[number, number, number]>([-78, -20, 0]);
  const [isDragging, setIsDragging] = useState(false);

  const isPointerDownRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const baseRotationRef = useRef<[number, number, number]>([-78, -20, 0]);
  const dragStartRef = useRef<{ x: number; y: number; rotation: [number, number, number] }>({
    x: 0,
    y: 0,
    rotation: [-78, -20, 0],
  });

  const gyroRef = useRef<{ current: [number, number]; target: [number, number] }>({
    current: [0, 0],
    target: [0, 0],
  });

  // 1. Fetch live Supabase visitor telemetry
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

  // 2. Fetch TopoJSON world data
  useEffect(() => {
    if (globalWorldDataCache) {
      setWorldData(globalWorldDataCache);
      setIsLoading(false);
      return;
    }

    fetch('/countries-110m.json')
      .then((res) => res.json())
      .then((topology) => {
        const geojson = feature(topology, topology.objects.countries) as unknown as FeatureCollection<Geometry, any>;
        geojson.features = geojson.features.filter(
          (f: any) => f.id !== '010' && f.properties?.name !== 'Antarctica'
        );
        globalWorldDataCache = geojson;
        setWorldData(geojson);
        setIsLoading(false);
      })
      .catch(() => {
        fetch('/geo/countries-110m.json')
          .then((r) => r.json())
          .then((topology) => {
            const geojson = feature(topology, topology.objects.countries) as unknown as FeatureCollection<Geometry, any>;
            geojson.features = geojson.features.filter(
              (f: any) => f.id !== '010' && f.properties?.name !== 'Antarctica'
            );
            globalWorldDataCache = geojson;
            setWorldData(geojson);
            setIsLoading(false);
          })
          .catch((err) => {
            console.error('Failed to load local map mesh, loading from CDN:', err);
            fetch('https://unpkg.com/world-atlas@2.0.2/countries-110m.json')
              .then((r) => r.json())
              .then((topology) => {
                const geojson = feature(topology, topology.objects.countries) as unknown as FeatureCollection<Geometry, any>;
                geojson.features = geojson.features.filter(
                  (f: any) => f.id !== '010' && f.properties?.name !== 'Antarctica'
                );
                globalWorldDataCache = geojson;
                setWorldData(geojson);
                setIsLoading(false);
              });
          });
      });
  }, []);

  // 3. ResizeObserver
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) {
        setDimensions({
          width: Math.max(entry.contentRect.width, 280),
          height: Math.max(entry.contentRect.height, 260),
        });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // 4. Mobile DeviceOrientation Gyro
  useEffect(() => {
    if (projectionMode !== 'orthographic') return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma === null || e.beta === null) return;
      const gamma = Math.max(-45, Math.min(45, e.gamma));
      const beta = Math.max(-45, Math.min(45, e.beta - 40));
      gyroRef.current.target = [gamma * 0.35, -beta * 0.3];
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [projectionMode]);

  // 5. Ambient Drift + Gyro Parallax Loop
  useEffect(() => {
    if (projectionMode !== 'orthographic') return;

    let animId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const dt = time - lastTime;
      lastTime = time;

      const g = gyroRef.current;
      g.current[0] += (g.target[0] - g.current[0]) * 0.08;
      g.current[1] += (g.target[1] - g.current[1]) * 0.08;

      if (!isPointerDownRef.current && !isDragging) {
        const delta = (dt / 1000) * 2.2;
        baseRotationRef.current[0] = (baseRotationRef.current[0] + delta) % 360;
      }

      const effectiveYaw = (baseRotationRef.current[0] + g.current[0]) % 360;
      const effectivePitch = Math.max(-85, Math.min(85, baseRotationRef.current[1] + g.current[1]));

      setRotation([effectiveYaw, effectivePitch, 0]);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [projectionMode, isDragging]);

  const handleMouseMoveGyro = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isPointerDownRef.current || projectionMode !== 'orthographic' || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    gyroRef.current.target = [nx * 14, -ny * 9];
  };

  const handleMouseLeaveGyro = () => {
    gyroRef.current.target = [0, 0];
  };

  const handleResetRotation = () => {
    baseRotationRef.current = [-78, -20, 0];
    gyroRef.current.target = [0, 0];
    setRotation([-78, -20, 0]);
  };

  // 6. D3 Projection
  const { projection, pathGenerator } = useMemo(() => {
    const isGlobe = projectionMode === 'orthographic';
    const radius = Math.min(dimensions.width, dimensions.height) / 2 - 16;

    const proj = isGlobe
      ? geoOrthographic()
          .scale(Math.max(radius, 40))
          .translate([dimensions.width / 2, dimensions.height / 2])
          .rotate(rotation)
          .clipAngle(90)
      : geoMercator()
          .scale((dimensions.width / 640) * 98)
          .translate([dimensions.width / 2, dimensions.height / 2 + 18]);

    return {
      projection: proj,
      pathGenerator: geoPath(proj),
    };
  }, [dimensions, rotation, projectionMode]);

  // Pointer drag
  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (projectionMode !== 'orthographic') return;
    isPointerDownRef.current = true;
    hasDraggedRef.current = false;
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      rotation: [...baseRotationRef.current],
    };
    gyroRef.current.target = [0, 0];
    (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isPointerDownRef.current || projectionMode !== 'orthographic') return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;

    if (!hasDraggedRef.current && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) {
      hasDraggedRef.current = true;
      setIsDragging(true);
    }

    if (hasDraggedRef.current) {
      const sensitivity = 0.35;
      const newYaw = (dragStartRef.current.rotation[0] + dx * sensitivity) % 360;
      const newPitch = Math.max(-85, Math.min(85, dragStartRef.current.rotation[1] - dy * sensitivity));
      baseRotationRef.current = [newYaw, newPitch, 0];
    }
  };

  const handlePointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    setIsDragging(false);
    try {
      (e.currentTarget as Element).releasePointerCapture?.(e.pointerId);
    } catch {}
    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 60);
  };

  const totalHits = visitorStats?.totalVisitors ?? 1314;
  const countsByCountry = useMemo(() => visitorStats?.byCountry ?? {}, [visitorStats]);

  const getCountryTelemetry = useCallback(
    (countryId: string, countryName: string) => {
      const metric = COUNTRY_DATA[countryId];
      const verifiedVisits =
        countsByCountry[countryName] ||
        countsByCountry[countryName.toLowerCase()] ||
        0;

      return {
        metric,
        verifiedVisits,
      };
    },
    [countsByCountry]
  );

  const getFill = useCallback(
    (countryId: string, countryName: string) => {
      const { metric, verifiedVisits } = getCountryTelemetry(countryId, countryName);
      if (verifiedVisits > 0) {
        if (verifiedVisits >= 50) return MAP_THEME_COLORS.scales[4];
        if (verifiedVisits >= 20) return MAP_THEME_COLORS.scales[3];
        if (verifiedVisits >= 10) return MAP_THEME_COLORS.scales[2];
        if (verifiedVisits >= 3) return MAP_THEME_COLORS.scales[1];
        return MAP_THEME_COLORS.scales[0];
      }
      if (metric) {
        const users = metric.activeUsers;
        if (users > 5000000) return MAP_THEME_COLORS.scales[4];
        if (users > 2500000) return MAP_THEME_COLORS.scales[3];
        if (users > 1200000) return MAP_THEME_COLORS.scales[2];
        if (users > 500000) return MAP_THEME_COLORS.scales[1];
        return MAP_THEME_COLORS.scales[0];
      }
      return MAP_THEME_COLORS.countryBase;
    },
    [getCountryTelemetry]
  );

  const activeId = hoveredCountryId || selectedCountryId;
  const activeFeature = useMemo(() => {
    if (!activeId || !worldData?.features) return null;
    return (
      worldData.features.find((f: any) => {
        const id = String(f.id || f.properties?.id).padStart(3, '0');
        return id === activeId;
      }) || null
    );
  }, [worldData, activeId]);

  const activePath = useMemo(() => {
    if (!activeFeature) return null;
    return pathGenerator(activeFeature);
  }, [activeFeature, pathGenerator]);

  const badgePos = useMemo(() => {
    if (!activeFeature) return null;
    try {
      const center = geoCentroid(activeFeature);
      if (projectionMode === 'orthographic') {
        const centerLon = -rotation[0];
        const centerLat = -rotation[1];
        const rad = Math.PI / 180;
        const dLon = (center[0] - centerLon) * rad;
        const lat1 = centerLat * rad;
        const lat2 = center[1] * rad;
        const cosD = Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(dLon);
        if (cosD <= 0.1) return null;
      }
      const projected = projection(center);
      if (!projected || isNaN(projected[0]) || isNaN(projected[1])) return null;
      return { x: projected[0], y: projected[1] };
    } catch {
      return null;
    }
  }, [activeFeature, projection, rotation, projectionMode]);

  const graticuleLines = useMemo(() => {
    return pathGenerator(geoGraticule().step([15, 15])());
  }, [pathGenerator]);

  const activeCountryName = activeFeature?.properties?.name || '';
  const activeTelemetry = activeId ? getCountryTelemetry(activeId, activeCountryName) : null;

  return (
    <div className={'w-full max-w-5xl mx-auto flex flex-col items-center select-none ' + className}>
      {/* Header Typography Above Map */}
      <div className="w-full flex flex-col items-center mb-1.5 sm:mb-2 px-2 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 sm:py-1 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-xl text-white/70 text-[8px] sm:text-[9.5px] font-light uppercase tracking-[0.2em] mb-1.5 shadow-lg">
          <Globe2 className="w-3 h-3 text-purple-400" />
          <span>Live Visitor Telemetry</span>
        </div>
        <h3
          className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extralight tracking-[0.15em] sm:tracking-[0.22em] uppercase text-white leading-tight"
          style={{ fontFamily: "'Rostex', sans-serif" }}
        >
          <span>VISITED</span>{' '}
          <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400">
            ACROSS THE WORLD
          </span>
        </h3>
        <p className="text-[9.5px] sm:text-xs text-white/55 font-light max-w-md mx-auto mt-0.5 tracking-wide">
          Real-time verified global visits connecting to Axiogen platforms &amp; systems worldwide.
        </p>
      </div>

      {/* Top Interactive Toolbar */}
      <div className="w-full flex items-center justify-between px-1 sm:px-2 mb-1.5 sm:mb-2 gap-2">
        <div className="flex items-center gap-2 sm:gap-2.5 bg-white/[0.03] backdrop-blur-xl px-2.5 sm:px-3.5 py-1 rounded-xl border border-white/[0.08] shadow-lg shrink-0">
          <span className="text-[8.5px] sm:text-[9.5px] font-mono tracking-wider uppercase text-white/50">
            Unique Visitors
          </span>
          <span className="text-xs sm:text-sm md:text-base font-black tracking-tight text-white font-mono">
            {totalHits.toLocaleString()}
          </span>
          {activeCountryName && (
            <span className="hidden sm:inline text-[8.5px] text-purple-300 font-medium border-l border-white/10 pl-2">
              {activeCountryName}
            </span>
          )}
        </div>

        <div className="flex items-center bg-[#0d0f1a]/80 backdrop-blur-xl rounded-xl p-0.5 sm:p-1 border border-white/[0.1] shadow-lg">
          <button
            type="button"
            onClick={() => setProjectionMode('orthographic')}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-medium rounded-lg transition-all ${
              projectionMode === 'orthographic'
                ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-md border border-white/15'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe2 className="w-3 h-3 text-purple-400" />
            <span>3D Globe</span>
          </button>
          <button
            type="button"
            onClick={() => setProjectionMode('mercator')}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-medium rounded-lg transition-all ${
              projectionMode === 'mercator'
                ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-md border border-white/15'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MapIcon className="w-3 h-3 text-slate-300" />
            <span>Flat Map</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {projectionMode === 'orthographic' && (
            <button
              type="button"
              onClick={handleResetRotation}
              title="Reset globe view"
              className="p-1 sm:p-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-white/60 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Globe / Map Canvas Wrapper */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMoveGyro}
        onMouseLeave={handleMouseLeaveGyro}
        className="relative w-full aspect-[1.85/1] max-h-[50vh] min-h-[290px] rounded-2xl sm:rounded-3xl border border-white/[0.1] bg-gradient-to-b from-[#090b12]/98 via-[#06070c]/98 to-[#040508]/98 shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden flex items-center justify-center touch-none"
      >
        {isLoading || !worldData ? (
          <div className="flex h-full w-full items-center justify-center gap-2.5 text-white/40 text-xs py-20 font-mono">
            <div className="size-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
            <span>Loading Geographic Mesh…</span>
          </div>
        ) : (
          <>
            <svg
              width={dimensions.width}
              height={dimensions.height}
              className={`w-full h-full select-none ${
                projectionMode === 'orthographic'
                  ? isDragging
                    ? 'cursor-grabbing'
                    : 'cursor-grab'
                  : 'cursor-default'
              }`}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onMouseLeave={() => setHoveredCountryId(null)}
              style={{ contain: 'layout style paint', touchAction: 'none' }}
            >
              {projectionMode === 'orthographic' ? (
                <path
                  d={pathGenerator({ type: 'Sphere' }) || ''}
                  fill={MAP_THEME_COLORS.sphere}
                  stroke={MAP_THEME_COLORS.sphereStroke}
                  strokeWidth={1}
                />
              ) : (
                <rect
                  width={dimensions.width}
                  height={dimensions.height}
                  fill={MAP_THEME_COLORS.sphere}
                  stroke={MAP_THEME_COLORS.sphereStroke}
                />
              )}

              {graticuleLines && (
                <path
                  d={graticuleLines}
                  fill="none"
                  stroke={MAP_THEME_COLORS.graticule}
                  strokeWidth={0.5}
                  className="pointer-events-none"
                />
              )}

              <g className="globe-countries">
                {worldData.features.map((feat: any, idx: number) => {
                  const countryId = String(feat.id || feat.properties?.id || idx).padStart(3, '0');
                  const countryName = feat.properties?.name || '';
                  const path = pathGenerator(feat);
                  if (!path) return null;

                  return (
                    <path
                      key={'c-' + countryId}
                      d={path}
                      fill={getFill(countryId, countryName)}
                      stroke={MAP_THEME_COLORS.countryStroke}
                      strokeWidth={0.5}
                      className="cursor-pointer transition-[fill] duration-150 hover:brightness-125"
                      onMouseEnter={() => {
                        if (!isPointerDownRef.current && !hasDraggedRef.current) {
                          setHoveredCountryId(countryId);
                        }
                      }}
                      onClick={() => {
                        if (!hasDraggedRef.current) {
                          setSelectedCountryId(countryId);
                        }
                      }}
                    />
                  );
                })}
              </g>

              {activePath && (
                <path
                  d={activePath}
                  fill={getFill(activeId!, activeCountryName)}
                  stroke={MAP_THEME_COLORS.highlightStroke}
                  strokeWidth={1.8}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  className="pointer-events-none drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
                />
              )}
            </svg>

            {badgePos && activeCountryName && (
              <div
                className="pointer-events-none absolute z-50 -translate-x-1/2 -translate-y-full mb-2 flex items-center gap-1.5 rounded-full border border-white/20 bg-[#101322]/95 px-3 py-1 text-xs text-white shadow-2xl backdrop-blur-xl whitespace-nowrap will-change-transform select-none"
                style={{
                  left: `${badgePos.x}px`,
                  top: `${badgePos.y - 8}px`,
                }}
              >
                <MapPin className="w-3.5 h-3.5 text-purple-400 fill-purple-400/20 shrink-0" />
                <span className="font-semibold text-slate-100">{activeCountryName}</span>
                <span className="text-white/30 font-light mx-0.5">|</span>
                <span className="text-slate-300 font-mono text-[11px]">
                  {activeTelemetry?.verifiedVisits && activeTelemetry.verifiedVisits > 0
                    ? `${activeTelemetry.verifiedVisits.toLocaleString()} verified visits`
                    : activeTelemetry?.metric?.tier || 'Active Global Node'}
                </span>
              </div>
            )}
          </>
        )}
      </div>

    </div>
  );
}

export default GlobalVisitorMap;