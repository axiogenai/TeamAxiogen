'use client';

import React from 'react';
import { useScroll } from '../hooks/useScroll';

interface DynamicBlurProps {
  totalFrames: number;
  thresholdFrame: number;
}

export const DynamicBlur: React.FC<DynamicBlurProps> = ({ totalFrames, thresholdFrame }) => {
  const { scrollProgress } = useScroll();
  
  const currentFrame = Math.max(
    1,
    Math.min(totalFrames, Math.ceil((scrollProgress / 100) * totalFrames))
  );

  // If we are past the threshold, remove the blur. Otherwise, 4px blur.
  const blurAmount = currentFrame > thresholdFrame ? 0 : 4;

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-10"
      style={{ 
        backdropFilter: `blur(${blurAmount}px)`, 
        WebkitBackdropFilter: `blur(${blurAmount}px)`,
        transition: 'backdrop-filter 0.5s ease, -webkit-backdrop-filter 0.5s ease' 
      }}
    />
  );
};
