'use client';

import React from 'react';
import { useIsBlurred } from '../hooks/useScroll';

/**
 * DynamicBlur — subtle darkening overlay.
 *
 * REMOVED backdrop-filter: blur() entirely. backdrop-filter forces the GPU
 * to recomposite EVERY pixel on the screen on EVERY frame while visible.
 * This was the #1 GPU bottleneck. Replaced with a simple dark overlay.
 */
export const DynamicBlur: React.FC<{ totalFrames: number; thresholdFrame: number }> = () => {
  const isBlurred = useIsBlurred();

  return (
    <div
      className="fixed inset-0 pointer-events-none z-10"
      style={{
        opacity: isBlurred ? 1 : 0,
        visibility: isBlurred ? ('visible' as const) : ('hidden' as const),
        transition: 'opacity 0.7s ease-in-out, visibility 0.7s ease-in-out',
        willChange: 'opacity',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.18), rgba(0,0,0,0.08))',
      }}
    />
  );
};
