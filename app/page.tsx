'use client';

import { motion } from 'framer-motion';

import { FrameSequenceViewer } from '../components/FrameSequenceViewer';
import { DynamicBlur } from '../components/DynamicBlur';
import { DynamicVignette } from '../components/DynamicVignette';
import { Navbar } from '../components/Navbar';
import { PortfolioContent } from '../components/PortfolioContent';
import { AmbientGlow } from '../components/AmbientGlow';

export default function Home() {
  const TOTAL_FRAMES = 502; // Bypasses portal sequence (frames 251-502 skipped in loading)

  return (
    <main className="relative min-h-[1500vh]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
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
      </motion.div>
    </main>
  );
}
