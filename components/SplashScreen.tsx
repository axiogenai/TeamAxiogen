'use client';

import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    // 1.8 seconds of visible logo
    const timer1 = setTimeout(() => {
      setIsAnimatingOut(true);
    }, 1800);

    // 0.8 seconds of slide-up transition, then trigger unmount callback
    const timer2 = setTimeout(() => {
      onComplete();
    }, 2600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030306] text-white select-none overflow-hidden"
      style={{
        transform: isAnimatingOut ? 'translateY(-100vh)' : 'translateY(0)',
        transition: 'transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)',
        willChange: 'transform',
      }}
    >
      <style>{`
        @keyframes loadingSlide {
          from { left: -100%; }
          to { left: 100%; }
        }
        .animate-loading-slide {
          animation: loadingSlide 1.5s ease-in-out forwards;
        }
      `}</style>

      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.12)_0%,transparent_60%)] animate-pulse" />

      {/* Logo container */}
      <div className="relative flex flex-col items-center gap-4 z-10">
        <div className="relative flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-300 to-indigo-200 drop-shadow-[0_0_30px_rgba(168,85,247,0.4)] uppercase">
            AXIOGEN
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-[9px] md:text-xs uppercase tracking-[0.4em] text-white/60 text-center">
          Engineering Digital Futures
        </p>
      </div>

      {/* Clean progress loading line at the bottom */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-white/10 overflow-hidden">
        <div 
          className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-loading-slide"
        />
      </div>
    </div>
  );
};
