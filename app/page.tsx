'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { DynamicVignette } from '../components/DynamicVignette';
import { Navbar } from '../components/Navbar';
import { PortfolioContent } from '../components/PortfolioContent';
import { useProjectCount, useSectionVisibility, getTotalStates, useNavSection } from '../hooks/useScroll';
import { SplashScreen } from '../components/SplashScreen';
import { ScrollProgressBar } from '../components/ScrollProgressBar';
import { motion, AnimatePresence } from 'framer-motion';

const LightPillar = dynamic(() => import('../components/LightPillar'), {
  ssr: false,
});

const Galaxy = dynamic(() => import('../components/Galaxy'), {
  ssr: false,
});

// Fixed wrapper component that dynamically updates opacity and unmounts the WebGL canvas when invisible
const LightPillarBackground = () => {
  const { showHero } = useSectionVisibility();
  const [isMobile, setIsMobile] = useState(false);
  const [isLightTheme, setIsLightTheme] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const checkTheme = () => {
      const isLight = document.documentElement.classList.contains('theme-light');
      setIsLightTheme(isLight);
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => {
      window.removeEventListener('resize', checkMobile);
      observer.disconnect();
    };
  }, []);

  const topColor = isLightTheme ? "#FBBF24" : "#5227FF";
  const bottomColor = isLightTheme ? "#B45309" : "#FF9FFC";

  return (
    <AnimatePresence>
      {showHero && (
        <motion.div 
          className="fixed inset-0 pointer-events-none overflow-hidden light-pillar-wrapper"
          style={{ zIndex: -8 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.90 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <LightPillar 
            topColor={topColor}
            bottomColor={bottomColor}
            intensity={1.0}
            rotationSpeed={isLightTheme ? 0.2 : 0.3}
            glowAmount={isMobile ? 0.003 : 0.002}
            pillarWidth={isMobile ? 2.8 : 3.0}
            pillarHeight={isMobile ? 0.40 : 0.40}
            noiseIntensity={0.5}
            pillarRotation={isMobile ? 12 : 25}
            interactive={false}
            mixBlendMode={isLightTheme ? "normal" : "screen"}
            quality="high"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Galaxy starfield wrapper that only mounts and renders on the Hero section
const GalaxyBackground = () => {
  const { showHero } = useSectionVisibility();

  return (
    <AnimatePresence>
      {showHero && (
        <motion.div 
          className="fixed inset-0 pointer-events-none overflow-hidden select-none"
          style={{ zIndex: -9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Galaxy 
            density={1.2}
            starSpeed={0.4}
            rotationSpeed={0.06}
            glowIntensity={0.35}
            twinkleIntensity={0.4}
            hueShift={140}
            saturation={0.1}
            transparent={true}
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
  const [activeBg, setActiveBg] = useState('');
  const { showHero } = useSectionVisibility();
  const activeSection = useNavSection();

  useEffect(() => {
    setMounted(true);

    // Fetch active background from settings
    fetch('/api/settings')
      .then((r) => r.json())
      .then((d) => {
        if (d.activeBg) setActiveBg(d.activeBg);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (showHero) {
      document.documentElement.classList.add('on-hero');
      document.documentElement.classList.remove('off-hero');
    } else {
      document.documentElement.classList.add('off-hero');
      document.documentElement.classList.remove('on-hero');
    }
  }, [showHero, mounted]);

  const totalStates = getTotalStates();
  const dynamicMinHeight = `${(totalStates - 1) * 100}vh`;

  // Build the bg image CSS value — use dynamic if set, else fall back to the CSS var default
  const bgImageStyle = activeBg ? `url("${activeBg}")` : undefined;

  if (!mounted) return null;

  return (
    <>
      <main 
        className="relative"
        style={{ minHeight: dynamicMinHeight }}
      >
        <div className="animate-page-fade-in">
          <Navbar ready={!showSplash} />
          
          {/* Scroll-Linked Fixed Background Shader */}
          <LightPillarBackground />
          
          {/* Cosmic Galaxy Starfield Background - Hero Page Only */}
          <GalaxyBackground />
          
          {/* Fixed UI Overlays */}
          <ScrollProgressBar />
          
          {/* Floating Layout Contents */}
          <PortfolioContent totalFrames={TOTAL_FRAMES} />
          <DynamicVignette totalFrames={TOTAL_FRAMES} />

          {/* Premium Simple Background */}
          <div 
            className="fixed inset-0 w-full h-full select-none pointer-events-none overflow-hidden"
            style={{ 
              zIndex: -5,
            }}
          >
            {/* Background image layer — fades in off-hero via CSS */}
            <div 
              className="portfolio-bg-image-layer"
              style={bgImageStyle ? { backgroundImage: bgImageStyle } : undefined}
            />
          </div>
        </div>
      </main>

      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
    </>
  );
}
