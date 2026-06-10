'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { useLenis } from 'lenis/react';

interface FrameSequenceViewerProps {
  totalFrames: number;
  frameFolder: string;
}

/**
 * High-performance canvas-based image sequence viewer.
 *
 * ZERO-LATENCY drawing — uses Lenis's own scroll callback, which fires
 * synchronously inside Lenis's rAF loop. No separate scroll listener,
 * no rAF wrapping, no 1-frame delay. This is the Apple approach.
 */
export const FrameSequenceViewer: React.FC<FrameSequenceViewerProps> = () => {
  const canvas1Ref = useRef<HTMLCanvasElement>(null);
  const canvas2Ref = useRef<HTMLCanvasElement>(null);
  const images1Ref = useRef<HTMLImageElement[]>([]);
  const images2Ref = useRef<HTMLImageElement[]>([]);
  const isVideo1ActiveRef = useRef(true);
  const lastFrame1Ref = useRef(-1);
  const lastFrame2Ref = useRef(-1);

  const FRAMES_PER_VIDEO = 300;

  // Draw frame to canvas with object-cover scaling
  const drawFrame = useCallback(
    (img: HTMLImageElement, canvas: HTMLCanvasElement) => {
      const ctx = canvas.getContext('2d');
      if (!ctx || !img.naturalWidth || !img.naturalHeight) return;

      const vw = img.naturalWidth;
      const vh = img.naturalHeight;
      const cw = canvas.width;
      const ch = canvas.height;

      const scale = Math.max(cw / vw, ch / vh);
      const sw = vw * scale;
      const sh = vh * scale;
      const sx = (cw - sw) / 2;
      const sy = (ch - sh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, sx, sy, sw, sh);
    },
    []
  );

  // Staggered image preloading
  useEffect(() => {
    let active = true;
    images1Ref.current = new Array(FRAMES_PER_VIDEO);
    images2Ref.current = new Array(FRAMES_PER_VIDEO);

    const firstImg = new Image();
    firstImg.src = `/frames/background1/frame_000.webp`;
    firstImg.onload = () => {
      if (!active) return;
      const canvas = canvas1Ref.current;
      if (canvas && lastFrame1Ref.current === -1) {
        drawFrame(firstImg, canvas);
      }
    };
    images1Ref.current[0] = firstImg;

    const BATCH = 12;
    const DELAY = 20;

    async function loadSequence(
      images: HTMLImageElement[],
      folder: string,
      startAt: number
    ) {
      for (let i = startAt; i < FRAMES_PER_VIDEO; i += BATCH) {
        if (!active) return;
        const end = Math.min(i + BATCH, FRAMES_PER_VIDEO);
        for (let j = i; j < end; j++) {
          const img = new Image();
          img.src = `/frames/${folder}/frame_${String(j).padStart(3, '0')}.webp`;
          images[j] = img;
        }
        await new Promise((r) => setTimeout(r, DELAY));
      }
    }

    loadSequence(images1Ref.current, 'background1', 1).then(() => {
      if (active) loadSequence(images2Ref.current, 'background2', 0);
    });

    return () => { active = false; };
  }, [drawFrame]);

  // Handle canvas sizing
  useEffect(() => {
    let lastWidth = 0;
    let lastHeight = 0;

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Only resize the canvas backing store if width changes, or height changes significantly.
      // This stops canvas clearing/black-flickering on mobile when the address bar hides/shows.
      const widthChanged = w !== lastWidth;
      const heightChangedSignificant = Math.abs(h - lastHeight) > 150;

      if (!widthChanged && !heightChangedSignificant) {
        return;
      }

      lastWidth = w;
      lastHeight = h;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      [canvas1Ref, canvas2Ref].forEach((ref) => {
        const c = ref.current;
        if (!c) return;
        c.width = w * dpr;
        c.height = h * dpr;
      });

      if (isVideo1ActiveRef.current) {
        const frame = Math.max(lastFrame1Ref.current, 0);
        const img = images1Ref.current[frame];
        const canvas = canvas1Ref.current;
        if (img && canvas && img.complete) drawFrame(img, canvas);
      } else {
        const frame = Math.max(lastFrame2Ref.current, 0);
        const img = images2Ref.current[frame];
        const canvas = canvas2Ref.current;
        if (img && canvas && img.complete) drawFrame(img, canvas);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);

  // ZERO-LATENCY drawing via Lenis's own scroll callback.
  // This fires synchronously within Lenis's rAF — same frame, no delay.
  useLenis((lenis) => {
    const scrollProgress = (lenis.progress ?? 0) * 100;

    const canvas1 = canvas1Ref.current;
    const canvas2 = canvas2Ref.current;
    if (!canvas1 || !canvas2) return;

    const FRAME_COUNT = FRAMES_PER_VIDEO;

    if (scrollProgress <= 50) {
      const relProgress = scrollProgress / 50;
      const frame = Math.min(Math.floor(relProgress * FRAME_COUNT), FRAME_COUNT - 1);

      if (!isVideo1ActiveRef.current) {
        isVideo1ActiveRef.current = true;
        canvas1.style.opacity = '1';
        canvas1.style.visibility = 'visible';
        canvas2.style.opacity = '0';
        canvas2.style.visibility = 'hidden';
      }

      if (frame !== lastFrame1Ref.current) {
        lastFrame1Ref.current = frame;
        const img = images1Ref.current[frame];
        if (img && img.complete) drawFrame(img, canvas1);
      }
    } else {
      const relProgress = (scrollProgress - 50) / 50;
      const frame = Math.min(Math.floor(relProgress * FRAME_COUNT), FRAME_COUNT - 1);

      if (isVideo1ActiveRef.current) {
        isVideo1ActiveRef.current = false;
        canvas2.style.opacity = '1';
        canvas2.style.visibility = 'visible';
        canvas1.style.opacity = '0';
        canvas1.style.visibility = 'hidden';
      }

      if (frame !== lastFrame2Ref.current) {
        lastFrame2Ref.current = frame;
        const img = images2Ref.current[frame];
        if (img && img.complete) drawFrame(img, canvas2);
      }
    }
  });

  return (
    <div className="fixed inset-0 w-full h-full z-0 bg-black select-none pointer-events-none">
      <canvas
        ref={canvas1Ref}
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{
          opacity: 1,
          visibility: 'visible',
          transition: 'opacity 0.3s ease-out',
          willChange: 'opacity',
          contain: 'strict',
          backgroundImage: "url('/frames/background1/frame_000.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <canvas
        ref={canvas2Ref}
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{
          opacity: 0,
          visibility: 'hidden',
          transition: 'opacity 0.3s ease-out',
          willChange: 'opacity',
          contain: 'strict',
          backgroundImage: "url('/frames/background2/frame_000.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </div>
  );
};
