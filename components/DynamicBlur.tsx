'use client';

import React, { useMemo } from 'react';
import { useScroll } from '../hooks/useScroll';

interface DynamicBlurProps {
  totalFrames: number;
  thresholdFrame: number;
}

/**
 * DynamicBlur — pre-rendered blur layer that fades out via opacity only.
 * 
 * IMPORTANT: We do NOT animate `backdrop-filter` because it forces the GPU
 * to recomposite every visible pixel on every frame change. Instead, we
 * apply a fixed backdrop-filter and only animate `opacity` + `visibility`,
 * which are compositor-only properties (zero layout/paint cost).
 */
export const DynamicBlur: React.FC<DynamicBlurProps> = ({ totalFrames, thresholdFrame }) => {
  const { scrollProgress } = useScroll();
  
  const currentFrame = Math.max(
    1,
    Math.min(totalFrames, Math.ceil((scrollProgress / 100) * totalFrames))
  );

  const isBlurred = currentFrame <= thresholdFrame;

  // Memoize the static style to avoid creating new objects on every render
  const blurStyle = useMemo(() => ({
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
  }), []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-10"
      style={{ 
        ...blurStyle,
        opacity: isBlurred ? 1 : 0,
        visibility: isBlurred ? 'visible' as const : 'hidden' as const,
        transition: 'opacity 0.7s ease-in-out, visibility 0.7s ease-in-out',
        willChange: 'opacity',
      }}
    />
  );
};
