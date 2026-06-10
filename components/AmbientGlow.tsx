'use client';

/**
 * AmbientGlow — decorative floating glow blobs.
 *
 * Uses pure CSS @keyframes animations instead of Framer Motion.
 * CSS animations run on the compositor thread (GPU), completely
 * bypassing the main JS thread — zero CPU cost during animation.
 * Blur values reduced from 120-150px to 80-100px for GPU savings.
 */
export const AmbientGlow = () => {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none -z-5"
      style={{ contain: 'strict' }}
    >
      {/* Glow 1 */}
      <div
        className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-indigo-500/10 blur-[80px]"
        style={{
          animation: 'ambientGlow1 25s ease-in-out infinite',
          willChange: 'transform',
        }}
      />
      {/* Glow 2 */}
      <div
        className="absolute bottom-1/4 right-1/4 w-[45vw] h-[45vw] rounded-full bg-purple-500/10 blur-[100px]"
        style={{
          animation: 'ambientGlow2 30s ease-in-out infinite',
          willChange: 'transform',
        }}
      />
      {/* Glow 3 */}
      <div
        className="absolute top-1/2 left-2/3 w-[35vw] h-[35vw] rounded-full bg-pink-500/5 blur-[70px]"
        style={{
          animation: 'ambientGlow3 20s ease-in-out infinite',
          willChange: 'transform',
        }}
      />
    </div>
  );
};
