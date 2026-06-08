'use client';

import { ReactLenis } from 'lenis/react';

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
};
