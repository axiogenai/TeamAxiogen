'use client';

import { useSyncExternalStore, useEffect, useState } from 'react';
import { DynamicVignette } from '../components/DynamicVignette';
import { Navbar } from '../components/Navbar';
import { PortfolioContent } from '../components/PortfolioContent';
import { AmbientGlow } from '../components/AmbientGlow';
import { getTotalStates, subscribe, getSnapshot } from '../hooks/useScroll';

export default function Home() {
  const TOTAL_FRAMES = 502;
  const [mounted, setMounted] = useState(false);

  // Subscribe to scroll updates to force re-render when total states changes dynamically
  useSyncExternalStore(subscribe, getSnapshot, () => ({ scrollProgress: 0, scrollY: 0 }));

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalStates = getTotalStates();
  const dynamicMinHeight = `${(totalStates - 1) * 100}vh`;

  return (
    <main 
      className="relative bg-black"
      style={{ minHeight: dynamicMinHeight }}
    >
      <div className="animate-page-fade-in">
        <Navbar />
        
        {/* Fixed UI Overlays */}
        <AmbientGlow />
        
        {/* Floating Layout Contents */}
        <PortfolioContent totalFrames={TOTAL_FRAMES} />
        <DynamicVignette totalFrames={TOTAL_FRAMES} />

        {/* Premium Simple Background */}
        <div className="fixed inset-0 w-full h-full -z-10 bg-[#07070c] select-none pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#020205] via-[#07070c] to-[#0d0714]" />
          <div 
            className="absolute inset-0 opacity-[0.02]" 
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.08)_0%,transparent_70%)]" />
        </div>
      </div>
    </main>
  );
}
