'use client';

import { useEffect, useState, useRef } from 'react';
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

const Nebula = dynamic(() => import('../components/ui/nebula'), {
  ssr: false,
});

// Fixed wrapper component that dynamically updates opacity and unmounts the WebGL canvas when invisible
const LightPillarBackground = () => {
  return null;
};

// Nebula wrapper that is mounted permanently to maintain the purple cosmic theme across all pages
const NebulaBackground = ({ height }: { height: string }) => {
  return (
    <div 
      className="fixed left-0 right-0 top-0 pointer-events-none overflow-hidden select-none"
      style={{ zIndex: -9, height: height, opacity: 0.85 }}
    >
      <Nebula />
    </div>
  );
};
const SeamlessVideoComponent = ({ src }: { src: string }) => {
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const activeRef = useRef<'A' | 'B'>('A');
  const swappingRef = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const vA = videoARef.current;
    const vB = videoBRef.current;
    if (!vA || !vB) return;

    // Identical source on both
    vA.src = src;
    vB.src = src;
    vA.load();
    vB.load();

    // A starts visible, B hidden and ready at frame 0
    vA.style.opacity = '1';
    vB.style.opacity = '0';
    vB.currentTime = 0.001;
    activeRef.current = 'A';
    swappingRef.current = false;

    const checkLoop = () => {
      const active = activeRef.current === 'A' ? vA : vB;
      const standby = activeRef.current === 'A' ? vB : vA;

      if (active.readyState >= 2 && active.duration && !swappingRef.current) {
        const remaining = active.duration - active.currentTime;

        // At 150ms before end: instant-swap with micro crossfade
        if (remaining <= 0.15) {
          swappingRef.current = true;

          // Ensure standby is at frame 0 and playing
          standby.currentTime = 0.001;
          standby.play().catch(() => {});

          // Instant swap — 150ms is imperceptible
          standby.style.opacity = '1';
          active.style.opacity = '0';

          // After swap settles, pause the old one and prep it as next standby
          setTimeout(() => {
            active.pause();
            active.currentTime = 0.001;
            activeRef.current = activeRef.current === 'A' ? 'B' : 'A';
            swappingRef.current = false;
          }, 200);
        }
      }

      rafRef.current = requestAnimationFrame(checkLoop);
    };

    const onReady = () => {
      vA.play().catch(() => {});
      rafRef.current = requestAnimationFrame(checkLoop);
    };

    vA.addEventListener('canplay', onReady, { once: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      vA.removeEventListener('canplay', onReady);
    };
  }, [src]);

  const videoStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0, left: 0, width: '100%', height: '100%',
    objectFit: 'cover',
    transition: 'opacity 0.15s linear',
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <video
        ref={videoARef}
        autoPlay muted playsInline preload="auto"
        className="select-none pointer-events-none"
        style={{ ...videoStyle, opacity: 1, zIndex: 1 }}
      />
      <video
        ref={videoBRef}
        muted playsInline preload="auto"
        className="select-none pointer-events-none"
        style={{ ...videoStyle, opacity: 0, zIndex: 2 }}
      />
    </div>
  );
};

export default function Home() {
  const TOTAL_FRAMES = 502;
  const [mounted, setMounted] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [activeBg, setActiveBg] = useState('');
  const { showHero } = useSectionVisibility();
  const activeSection = useNavSection();
  const [bgHeight, setBgHeight] = useState('100vh');

  useEffect(() => {
    setMounted(true);

    const updateHeight = () => {
      if (window.innerWidth < 768) {
        setBgHeight(`${window.screen.height}px`);
      } else {
        setBgHeight('100vh');
      }
    };
    updateHeight();

    // Fetch active background from settings
    fetch('/api/settings')
      .then((r) => r.json())
      .then((d) => {
        const cleanBg = d.activeBg && !d.activeBg.includes('nightmode.webp') ? d.activeBg : '';
        setActiveBg(cleanBg);
      })
      .catch(() => {});

    // Track visitor with maximum data collection (non-blocking, fire-and-forget)
    const deviceData = {
      screen_width: window.screen.width,
      screen_height: window.screen.height,
      language: navigator.language || '',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
      platform: (navigator as unknown as { userAgentData?: { platform?: string } }).userAgentData?.platform || navigator.platform || '',
      connection_type: (navigator as unknown as { connection?: { effectiveType?: string } }).connection?.effectiveType || '',
    };

    const sendTrack = (lat?: number, lon?: number, accuracy?: number, locationSource?: string) => {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: window.location.pathname,
          ...deviceData,
          ...(lat !== undefined && lon !== undefined ? { latitude: lat, longitude: lon } : {}),
          ...(accuracy !== undefined ? { gps_accuracy: accuracy } : {}),
          location_source: locationSource || 'ip',
        }),
      }).catch(() => {});
    };

    // Try Browser Geolocation API for maximum accuracy (forces fresh GPS read)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const acc = pos.coords.accuracy;
          // If accuracy is worse than 3000 meters (3km), classify as coarse (IP fallback by browser)
          const source = acc && acc > 3000 ? 'gps_coarse' : 'gps';
          sendTrack(pos.coords.latitude, pos.coords.longitude, acc, source);
        },
        (err) => {
          // err.code: 1=PERMISSION_DENIED, 2=POSITION_UNAVAILABLE, 3=TIMEOUT
          const source = err.code === 1 ? 'ip_denied' : err.code === 3 ? 'ip_timeout' : 'ip_unavailable';
          sendTrack(undefined, undefined, undefined, source);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
      );
    } else {
      sendTrack(undefined, undefined, undefined, 'ip_no_support');
    }
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
  const isVideoBg = activeBg ? /\.(mp4|webm|mov|ogg)(\?.*)?$/i.test(activeBg) : false;

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
          
          {/* Cosmic Nebula Background - Hero Page Only */}
          <NebulaBackground height={bgHeight} />
          
          {/* Fixed UI Overlays */}
          <ScrollProgressBar />
          
          {/* Floating Layout Contents */}
          <PortfolioContent totalFrames={TOTAL_FRAMES} />
          <DynamicVignette totalFrames={TOTAL_FRAMES} />

          {/* Premium Simple Background */}
          <div 
            className="fixed left-0 right-0 top-0 w-full select-none pointer-events-none overflow-hidden"
            style={{ 
              zIndex: -5,
              height: bgHeight
            }}
          >
            {isVideoBg ? (
              <div 
                className="portfolio-bg-image-layer w-full h-full relative"
                style={{ backgroundImage: 'none' }}
              >
                <SeamlessVideoComponent src={activeBg} />
              </div>
            ) : (
              <div 
                className="portfolio-bg-image-layer"
                style={bgImageStyle ? { backgroundImage: bgImageStyle } : undefined}
              />
            )}
          </div>
        </div>
      </main>

      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
    </>
  );
}
