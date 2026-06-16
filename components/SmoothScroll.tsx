'use client';

import { ReactLenis } from 'lenis/react';

/**
 * SmoothScroll — optimized Lenis config for butter-smooth scrolling.
 *
 * lerp increased from 0.05 → 0.1 (fewer interpolation steps, faster settle)
 * duration decreased from 1.5 → 1.2 (snappier response)
 */
export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true, syncTouch: false }}>
      {children}
    </ReactLenis>
  );
};
