'use client';

import React, { useEffect, useState } from 'react';
import { NeonOrbs } from './ui/neon-orbs';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    // Auto-dismiss after 4.5 seconds to match neon orb entry animations
    const animOutTimer = setTimeout(() => {
      setIsAnimatingOut(true);
    }, 4500);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 5300); // 4.5s + 0.8s transition out

    return () => {
      clearTimeout(animOutTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className="dark fixed inset-0 w-full h-screen z-[9999] overflow-hidden select-none"
      style={{
        transition: 'opacity 0.8s ease, transform 0.8s ease',
        opacity: isAnimatingOut ? 0 : 1,
        transform: isAnimatingOut ? 'scale(1.02)' : 'scale(1)',
        pointerEvents: isAnimatingOut ? 'none' : 'auto',
      }}
    >
      <NeonOrbs />
    </div>
  );
};
