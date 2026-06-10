'use client';

import { FrameSequenceViewer } from '../components/FrameSequenceViewer';
import { DynamicBlur } from '../components/DynamicBlur';
import { DynamicVignette } from '../components/DynamicVignette';
import { Navbar } from '../components/Navbar';
import { PortfolioContent } from '../components/PortfolioContent';
import { AmbientGlow } from '../components/AmbientGlow';

export default function Home() {
  const TOTAL_FRAMES = 502;

  return (
    <main className="relative min-h-[1500vh]">
      {/* CSS animation replaces Framer Motion — one less JS animation library in the page tree */}
      <div className="animate-page-fade-in">
        <Navbar />
        
        {/* Fixed UI Overlays */}
        <AmbientGlow />
        
        {/* Storytelling overlays */}
        <PortfolioContent totalFrames={TOTAL_FRAMES} />
        <DynamicVignette totalFrames={TOTAL_FRAMES} />

        {/* The Frame Viewer Canvas Background */}
        <FrameSequenceViewer 
          totalFrames={TOTAL_FRAMES} 
          frameFolder="/frames" 
        />
        
        {/* Dynamic Blur Layer that fades out after blackhole frames */}
        <DynamicBlur totalFrames={TOTAL_FRAMES} thresholdFrame={250} />
      </div>
    </main>
  );
}
