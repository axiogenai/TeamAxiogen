'use client';

import React from 'react';
import { useScroll } from '../hooks/useScroll';

interface ScrollProgressProps {
  totalFrames?: number;
}

export const ScrollProgress: React.FC<ScrollProgressProps> = () => {
  const { scrollProgress } = useScroll();
  

  return (
    <div className="fixed top-6 right-6 z-50 font-outfit text-white mix-blend-difference flex items-center gap-4">

      <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
        <div 
          className="h-full bg-white"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </div>
  );
};
