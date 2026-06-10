'use client';

import { useEffect, useRef } from 'react';

/**
 * Custom cursor — zero React re-renders.
 *
 * Uses refs + requestAnimationFrame for smooth lerp-based spring following.
 * Framer Motion is completely removed from this component.
 */
export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);
  const mouseRef = useRef({ x: -100, y: -100 });
  const currentRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef(0);

  useEffect(() => {
    // Don't show custom cursor on touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    // Smooth spring-like animation via rAF lerp
    function animate() {
      const dx = mouseRef.current.x - currentRef.current.x;
      const dy = mouseRef.current.y - currentRef.current.y;

      // Lerp factor — 0.15 gives a smooth, responsive spring feel
      currentRef.current.x += dx * 0.15;
      currentRef.current.y += dy * 0.15;

      const hovering = isHoveringRef.current;
      const size = hovering ? 48 : 32;
      const half = size / 2;

      // Direct DOM writes — zero React involvement
      if (!cursor || !dot) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }
      cursor.style.transform = `translate3d(${currentRef.current.x - half}px, ${currentRef.current.y - half}px, 0)`;
      cursor.style.width = `${size}px`;
      cursor.style.height = `${size}px`;
      cursor.style.backgroundColor = hovering
        ? 'rgba(255,255,255,0.1)'
        : 'rgba(255,255,255,0)';
      dot.style.transform = hovering ? 'scale(0)' : 'scale(1)';

      rafRef.current = requestAnimationFrame(animate);
    }

    function onMouseMove(e: MouseEvent) {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    }

    function onMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      isHoveringRef.current = !!target.closest(
        'a, button, [role="button"], input, select, textarea, .cursor-pointer'
      );
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 rounded-full border border-white/50 pointer-events-none z-[9999] mix-blend-difference hidden md:flex items-center justify-center"
      style={{
        willChange: 'transform',
        transition: 'width 0.2s, height 0.2s, background-color 0.2s',
      }}
    >
      <div
        ref={dotRef}
        className="w-1 h-1 bg-white rounded-full"
        style={{ transition: 'transform 0.2s' }}
      />
    </div>
  );
};
