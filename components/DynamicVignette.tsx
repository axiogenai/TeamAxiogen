'use client';

import { useScroll } from '../hooks/useScroll';

export const DynamicVignette = ({ totalFrames }: { totalFrames: number }) => {
  const { scrollProgress } = useScroll();
  const currentFrame = Math.max(
    1,
    Math.min(totalFrames, Math.ceil((scrollProgress / 100) * totalFrames))
  );

  // Pulse effect based on frame transitions
  const isTransitioning = currentFrame > 235 && currentFrame < 265;
  const opacity = isTransitioning ? 0.9 : 0.6;

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-1000"
      style={{
        opacity,
        background: 'radial-gradient(circle, rgba(0,0,0,0) 30%, rgba(0,0,0,1) 100%)'
      }}
    />
  );
};
