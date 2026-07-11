'use client';

import { useRef, useEffect, useCallback } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
  as?: 'button' | 'a' | 'div';
  [key: string]: any;
}

/**
 * Magnetic button wrapper — element follows cursor within magnetic radius.
 * Springs back on mouse leave. Desktop only.
 */
export const MagneticButton = ({
  children,
  className = '',
  strength = 0.3,
  radius = 100,
  as: Tag = 'button',
  ...props
}: MagneticButtonProps) => {
  const btnRef = useRef<HTMLElement>(null);
  const rafRef = useRef(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const isInsideRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined' || 'ontouchstart' in window) return;

    const el = btnRef.current;
    if (!el) return;

    let animating = false;

    function animate() {
      const lerp = isInsideRef.current ? 0.15 : 0.08;
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * lerp;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * lerp;

      el!.style.transform = `translate3d(${currentRef.current.x}px, ${currentRef.current.y}px, 0)`;

      if (
        Math.abs(targetRef.current.x - currentRef.current.x) > 0.1 ||
        Math.abs(targetRef.current.y - currentRef.current.y) > 0.1
      ) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        animating = false;
        if (!isInsideRef.current) {
          el!.style.transform = 'translate3d(0, 0, 0)';
        }
      }
    }

    function startAnimation() {
      if (!animating) {
        animating = true;
        rafRef.current = requestAnimationFrame(animate);
      }
    }

    function onMouseMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const dist = Math.hypot(distX, distY);

      if (dist < radius) {
        isInsideRef.current = true;
        targetRef.current.x = distX * strength;
        targetRef.current.y = distY * strength;
        startAnimation();
      }
    }

    function onMouseLeave() {
      isInsideRef.current = false;
      targetRef.current.x = 0;
      targetRef.current.y = 0;
      startAnimation();
    }

    el.addEventListener('mousemove', onMouseMove, { passive: true });
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [strength, radius]);

  return (
    // @ts-ignore — dynamic tag
    <Tag
      ref={btnRef as any}
      className={`magnetic-btn ${className}`}
      style={{ willChange: 'transform', display: 'inline-block' }}
      {...props}
    >
      {children}
    </Tag>
  );
};
