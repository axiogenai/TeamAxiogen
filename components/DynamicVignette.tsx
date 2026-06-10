'use client';

import { useVignetteOpacity } from '../hooks/useScroll';

/**
 * DynamicVignette — only re-renders at frame 235 and 265 boundaries.
 *
 * Previously re-rendered on every scroll pixel via useScroll().
 * Now uses useVignetteOpacity() which returns a stable number.
 */
export const DynamicVignette = ({ totalFrames: _totalFrames }: { totalFrames: number }) => {
  const opacity = useVignetteOpacity();

  return (
    <div
      className="fixed inset-0 pointer-events-none z-30"
      style={{
        opacity,
        background:
          'radial-gradient(circle, rgba(0,0,0,0) 30%, rgba(0,0,0,1) 100%)',
        transition: 'opacity 1s ease-in-out',
        willChange: 'opacity',
      }}
    />
  );
};
