'use client';

import React from 'react';
import { useScroll } from '../hooks/useScroll';

export const ScrollProgressBar: React.FC = () => {
  const { scrollProgress } = useScroll();

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[9999] bg-white/5 pointer-events-none">
      <div 
        className="h-full bg-gradient-to-r from-neutral-200 to-white transition-all duration-75 ease-out shadow-[0_0_8px_rgba(255,255,255,0.4)]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};
