'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { DynamicVignette } from '../components/DynamicVignette';
import { Navbar } from '../components/Navbar';
import { PortfolioContent } from '../components/PortfolioContent';
import { useProjectCount, useSectionVisibility, getTotalStates } from '../hooks/useScroll';
import { SplashScreen } from '../components/SplashScreen';
import { ScrollProgressBar } from '../components/ScrollProgressBar';
import { motion, AnimatePresence } from 'framer-motion';

const LightPillar = dynamic(() => import('../components/LightPillar'), {
  ssr: false,
});

// Fixed wrapper component that dynamically updates opacity and unmounts the WebGL canvas when invisible
const LightPillarBackground = () => {
  const { showHero } = useSectionVisibility();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <AnimatePresence>
      {showHero && (
        <motion.div 
          className="fixed inset-0 pointer-events-none overflow-hidden"
          style={{ zIndex: -9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.90 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <LightPillar 
            topColor="#5227FF"
            bottomColor="#FF9FFC"
            intensity={1}
            rotationSpeed={0.3}
            glowAmount={isMobile ? 0.0025 : 0.002}
            pillarWidth={isMobile ? 2.8 : 3.0}
            pillarHeight={isMobile ? 0.40 : 0.40}
            noiseIntensity={0.5}
            pillarRotation={isMobile ? 12 : 25}
            interactive={false}
            mixBlendMode="screen"
            quality="high"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function Home() {
  const TOTAL_FRAMES = 502;
  const [mounted, setMounted] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const projectCount = useProjectCount();

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const totalStates = getTotalStates();
  const dynamicMinHeight = `${(totalStates - 1) * 100}vh`;

  if (!mounted) return null;

  return (
    <>
      <main 
        className="relative transition-colors duration-1000"
        style={{ minHeight: dynamicMinHeight }}
      >
        <div className="animate-page-fade-in">
          <Navbar />
          
          {/* Scroll-Linked Fixed Background Shader */}
          <LightPillarBackground />
          
          {/* Fixed UI Overlays */}
          <ScrollProgressBar />
          
          {/* Floating Layout Contents */}
          <PortfolioContent totalFrames={TOTAL_FRAMES} />
          <DynamicVignette totalFrames={TOTAL_FRAMES} />

          {/* Premium Simple Background */}
          <div 
            className="fixed inset-0 w-full h-full bg-[var(--background)] transition-colors duration-1000 select-none pointer-events-none overflow-hidden"
            style={{ zIndex: -10 }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--bg-gradient-from)] via-[var(--bg-gradient-via)] to-[var(--bg-gradient-to)] transition-colors duration-1000" />
          </div>
        </div>
      </main>
      
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
    </>
  );
}
