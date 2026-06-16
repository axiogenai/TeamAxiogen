'use client';

import { useNavSection } from '../hooks/useScroll';

/**
 * AmbientGlow — decorative floating glow blobs.
 *
 * Uses pure CSS @keyframes animations instead of Framer Motion.
 * CSS animations run on the compositor thread (GPU), completely
 * bypassing the main JS thread — zero CPU cost during animation.
 * Blur values reduced from 120-150px to 80-100px for GPU savings.
 * 
 * Dynamically shifts colors based on the active scroll section.
 */
export const AmbientGlow = () => {
  const activeSection = useNavSection();

  const getColors = () => {
    switch (activeSection) {
      case 'about':
        return {
          glow1: 'bg-blue-600/10',
          glow2: 'bg-cyan-500/10',
          glow3: 'bg-teal-500/5',
        };
      case 'work':
        return {
          glow1: 'bg-emerald-600/10',
          glow2: 'bg-teal-500/10',
          glow3: 'bg-green-500/5',
        };
      case 'services':
        return {
          glow1: 'bg-amber-600/10',
          glow2: 'bg-orange-500/10',
          glow3: 'bg-yellow-500/5',
        };
      case 'contact':
        return {
          glow1: 'bg-pink-600/10',
          glow2: 'bg-rose-500/10',
          glow3: 'bg-red-500/5',
        };
      case 'hero':
      default:
        return {
          glow1: 'bg-indigo-600/10',
          glow2: 'bg-purple-500/10',
          glow3: 'bg-pink-500/5',
        };
    }
  };

  const colors = getColors();

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ contain: 'strict', zIndex: -5 }}
    >
      {/* Glow 1 */}
      <div
        className={`absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full ${colors.glow1} blur-[80px] transition-colors duration-[1500ms] ease-in-out`}
        style={{
          animation: 'ambientGlow1 25s ease-in-out infinite',
          willChange: 'transform',
        }}
      />
      {/* Glow 2 */}
      <div
        className={`absolute bottom-1/4 right-1/4 w-[45vw] h-[45vw] rounded-full ${colors.glow2} blur-[100px] transition-colors duration-[1500ms] ease-in-out`}
        style={{
          animation: 'ambientGlow2 30s ease-in-out infinite',
          willChange: 'transform',
        }}
      />
      {/* Glow 3 */}
      <div
        className={`absolute top-1/2 left-2/3 w-[35vw] h-[35vw] rounded-full ${colors.glow3} blur-[70px] transition-colors duration-[1500ms] ease-in-out`}
        style={{
          animation: 'ambientGlow3 20s ease-in-out infinite',
          willChange: 'transform',
        }}
      />
    </div>
  );
};

