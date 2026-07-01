'use client';

import React from 'react';
import { useScroll } from '../hooks/useScroll';

export const ScrollProgressBar: React.FC = () => {
  const { scrollProgress } = useScroll();

  return (
    <div className="hidden md:block fixed right-4 top-1/2 -translate-y-1/2 z-50 pointer-events-none">
      {/* Track */}
      <div className="relative w-[2px] h-24 bg-white/[0.06] rounded-full overflow-hidden">
        {/* Fill — grows from bottom */}
        <div
          className="absolute bottom-0 left-0 w-full rounded-full transition-all duration-150 ease-out"
          style={{
            height: `${scrollProgress}%`,
            backgroundColor: 'var(--theme-accent-solid)',
            boxShadow: '0 0 6px var(--theme-accent)',
          }}
        />
      </div>
    </div>
  );
};
