'use client';

import { useEffect, useRef, useCallback } from 'react';

/**
 * Fable-tier Magnetic Cursor with glowing orb, magnetic snap, and comet trail.
 * Zero React re-renders — all DOM manipulation via refs + rAF.
 * Desktop only — hidden on touch devices.
 */
export const CustomCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const currentRef = useRef({ x: -100, y: -100 });
  const isHoveringRef = useRef(false);
  const magnetTargetRef = useRef<{ x: number; y: number; w: number; h: number } | null>(null);
  const trailRef = useRef<{ x: number; y: number; alpha: number }[]>([]);
  const rafRef = useRef(0);
  const isTouchRef = useRef(false);

  const TRAIL_LENGTH = 12;
  const LERP_NORMAL = 0.12;
  const LERP_MAGNETIC = 0.2;
  const MAGNETIC_RADIUS = 120;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      isTouchRef.current = true;
      return;
    }

    const canvas = canvasRef.current;
    const cursor = cursorRef.current;
    if (!canvas || !cursor) return;

    const ctx = canvas.getContext('2d')!;
    let dpr = window.devicePixelRatio || 1;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize trail
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      trailRef.current.push({ x: -100, y: -100, alpha: 0 });
    }

    function animate() {
      // If splash screen is loading, disable custom cursor rendering and mouse glow
      const isSplashActive = typeof document !== 'undefined' && document.querySelector('.splash-active-marker');
      if (isSplashActive) {
        ctx.clearRect(0, 0, canvas!.width / dpr, canvas!.height / dpr);
        if (cursor) cursor.style.opacity = '0';
        rafRef.current = requestAnimationFrame(animate);
        return;
      } else {
        if (cursor) cursor.style.opacity = '1';
      }

      const mouse = mouseRef.current;
      const current = currentRef.current;
      const hovering = isHoveringRef.current;
      const magnet = magnetTargetRef.current;

      // Magnetic pull — if hovering near an interactive element, lerp toward its center
      let targetX = mouse.x;
      let targetY = mouse.y;
      let lerp = LERP_NORMAL;

      if (magnet) {
        const centerX = magnet.x + magnet.w / 2;
        const centerY = magnet.y + magnet.h / 2;
        const dist = Math.hypot(mouse.x - centerX, mouse.y - centerY);
        if (dist < MAGNETIC_RADIUS) {
          const pull = 1 - dist / MAGNETIC_RADIUS;
          targetX = mouse.x + (centerX - mouse.x) * pull * 0.4;
          targetY = mouse.y + (centerY - mouse.y) * pull * 0.4;
          lerp = LERP_MAGNETIC;
        }
      }

      current.x += (targetX - current.x) * lerp;
      current.y += (targetY - current.y) * lerp;

      // Update trail
      const trail = trailRef.current;
      for (let i = trail.length - 1; i > 0; i--) {
        trail[i].x += (trail[i - 1].x - trail[i].x) * 0.35;
        trail[i].y += (trail[i - 1].y - trail[i].y) * 0.35;
        trail[i].alpha = (1 - i / trail.length) * 0.4;
      }
      trail[0].x = current.x;
      trail[0].y = current.y;
      trail[0].alpha = 0.35;

      // Draw trail on canvas — subtle, barely visible
      ctx.clearRect(0, 0, canvas!.width / dpr, canvas!.height / dpr);
      for (let i = trail.length - 1; i >= 1; i--) {
        const t = trail[i];
        const size = (1 - i / trail.length) * 3;
        ctx.beginPath();
        ctx.arc(t.x, t.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 130, 255, ${t.alpha * 0.25})`;
        ctx.fill();
      }

      // Draw subtle glow around cursor position
      const glowSize = hovering ? 20 : 12;
      const gradient = ctx.createRadialGradient(current.x, current.y, 0, current.x, current.y, glowSize);
      gradient.addColorStop(0, `rgba(168, 130, 255, ${hovering ? 0.12 : 0.05})`);
      gradient.addColorStop(0.5, `rgba(120, 80, 220, ${hovering ? 0.04 : 0.02})`);
      gradient.addColorStop(1, 'rgba(120, 80, 220, 0)');
      ctx.beginPath();
      ctx.arc(current.x, current.y, glowSize, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Update cursor ring position via DOM
      const size = hovering ? 40 : 28;
      const half = size / 2;
      if (cursor) {
        cursor.style.transform = `translate3d(${current.x - half}px, ${current.y - half}px, 0)`;
        cursor.style.width = `${size}px`;
        cursor.style.height = `${size}px`;
        cursor.style.borderColor = hovering ? 'rgba(168, 130, 255, 0.6)' : 'rgba(255, 255, 255, 0.35)';
        cursor.style.backgroundColor = hovering ? 'rgba(168, 130, 255, 0.08)' : 'transparent';
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    function onMouseMove(e: MouseEvent) {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    }

    function onMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [role="button"], input, select, textarea, .cursor-pointer, .magnetic-btn');
      isHoveringRef.current = !!interactive;

      if (interactive) {
        const rect = interactive.getBoundingClientRect();
        magnetTargetRef.current = { x: rect.left, y: rect.top, w: rect.width, h: rect.height };
      } else {
        magnetTargetRef.current = null;
      }
    }

    function onMouseLeave() {
      mouseRef.current = { x: -100, y: -100 };
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <>
      {/* Trail canvas — sits behind cursor ring */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998] hidden md:block"
        style={{ willChange: 'transform' }}
      />
      {/* Cursor ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 rounded-full border-[1.5px] pointer-events-none z-[9999] hidden md:block"
        style={{
          willChange: 'transform',
          transition: 'width 0.25s cubic-bezier(0.16,1,0.3,1), height 0.25s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, background-color 0.3s',
          borderColor: 'rgba(255, 255, 255, 0.35)',
          mixBlendMode: 'difference',
        }}
      />
    </>
  );
};
