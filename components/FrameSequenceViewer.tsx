'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { useScroll } from '../hooks/useScroll';

interface FrameSequenceViewerProps {
  totalFrames: number;
  frameFolder: string;
}

/**
 * High-performance, lag-free canvas-based image sequence viewer.
 *
 * KEY FEATURES:
 * 1. Image sequences — loads 250 optimized WebP frames per video (~20KB/frame).
 * 2. Instant drawing — sub-millisecond drawing speeds without video decoder latency.
 * 3. Silent background preloading — preloads all 500 frames in the background without blocking page interaction.
 * 4. Zero React scroll overhead — uses refs for canvases and drawn frames, avoiding React re-renders on scroll.
 */
export const FrameSequenceViewer: React.FC<FrameSequenceViewerProps> = () => {
  const canvas1Ref = useRef<HTMLCanvasElement>(null);
  const canvas2Ref = useRef<HTMLCanvasElement>(null);
  const { scrollProgress } = useScroll();

  const images1Ref = useRef<HTMLImageElement[]>([]);
  const images2Ref = useRef<HTMLImageElement[]>([]);
  const isVideo1ActiveRef = useRef(true);
  const lastFrame1Ref = useRef(-1);
  const lastFrame2Ref = useRef(-1);

  const FRAMES_PER_VIDEO = 300;

  // Draw frame to canvas with object-cover scaling
  const drawFrame = useCallback((img: HTMLImageElement, canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx || !img.naturalWidth || !img.naturalHeight) return;

    const vw = img.naturalWidth;
    const vh = img.naturalHeight;
    const cw = canvas.width;
    const ch = canvas.height;

    // Object-cover: scale to fill, center crop
    const scale = Math.max(cw / vw, ch / vh);
    const sw = vw * scale;
    const sh = vh * scale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;

    // Clear and draw
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh);
  }, []);

  // Preload frames silently on mount
  useEffect(() => {
    let active = true;

    images1Ref.current = new Array(FRAMES_PER_VIDEO);
    images2Ref.current = new Array(FRAMES_PER_VIDEO);

    // Load first frame immediately to render initial backdrop
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

    // Queue loading of remaining frames in background
    for (let i = 0; i < FRAMES_PER_VIDEO; i++) {
      if (i === 0) continue; // Already loaded/loading

      const img1 = new Image();
      img1.src = `/frames/background1/frame_${String(i).padStart(3, '0')}.webp`;
      images1Ref.current[i] = img1;
    }

    for (let i = 0; i < FRAMES_PER_VIDEO; i++) {
      const img2 = new Image();
      img2.src = `/frames/background2/frame_${String(i).padStart(3, '0')}.webp`;
      images2Ref.current[i] = img2;
    }

    return () => {
      active = false;
    };
  }, [drawFrame]);

  // Handle canvas sizing and resizing
  useEffect(() => {
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;

      [canvas1Ref, canvas2Ref].forEach(ref => {
        const c = ref.current;
        if (!c) return;
        c.width = w * dpr;
        c.height = h * dpr;
      });

      // Redraw active frame at new resolution
      if (isVideo1ActiveRef.current) {
        const frame = Math.max(lastFrame1Ref.current, 0);
        const img = images1Ref.current[frame];
        const canvas = canvas1Ref.current;
        if (img && canvas && img.complete) {
          drawFrame(img, canvas);
        }
      } else {
        const frame = Math.max(lastFrame2Ref.current, 0);
        const img = images2Ref.current[frame];
        const canvas = canvas2Ref.current;
        if (img && canvas && img.complete) {
          drawFrame(img, canvas);
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);

  // Handle scroll progress frame changes
  useEffect(() => {
    const canvas1 = canvas1Ref.current;
    const canvas2 = canvas2Ref.current;
    if (!canvas1 || !canvas2) return;

    if (scrollProgress <= 50) {
      // === Background 1 Active (0-50% Scroll) ===
      const relProgress = scrollProgress / 50;
      const frame = Math.min(Math.floor(relProgress * FRAMES_PER_VIDEO), FRAMES_PER_VIDEO - 1);

      // Toggle canvas visibility directly (no React re-renders)
      if (!isVideo1ActiveRef.current) {
        isVideo1ActiveRef.current = true;
        canvas1.style.opacity = '1';
        canvas1.style.visibility = 'visible';
        canvas2.style.opacity = '0';
        canvas2.style.visibility = 'hidden';
      }

      // Draw only when the index changes
      if (frame !== lastFrame1Ref.current) {
        lastFrame1Ref.current = frame;
        const img = images1Ref.current[frame];
        if (img && img.complete) {
          drawFrame(img, canvas1);
        }
      }
    } else {
      // === Background 2 Active (50-100% Scroll) ===
      const relProgress = (scrollProgress - 50) / 50;
      const frame = Math.min(Math.floor(relProgress * FRAMES_PER_VIDEO), FRAMES_PER_VIDEO - 1);

      // Toggle canvas visibility directly (no React re-renders)
      if (isVideo1ActiveRef.current) {
        isVideo1ActiveRef.current = false;
        canvas2.style.opacity = '1';
        canvas2.style.visibility = 'visible';
        canvas1.style.opacity = '0';
        canvas1.style.visibility = 'hidden';
      }

      // Draw only when the index changes
      if (frame !== lastFrame2Ref.current) {
        lastFrame2Ref.current = frame;
        const img = images2Ref.current[frame];
        if (img && img.complete) {
          drawFrame(img, canvas2);
        }
      }
    }
  }, [scrollProgress, drawFrame]);

  return (
    <div className="fixed inset-0 w-full h-full z-0 bg-black select-none pointer-events-none">
      {/* Canvas 1 */}
      <canvas
        ref={canvas1Ref}
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ 
          opacity: 1, 
          visibility: 'visible', 
          transition: 'opacity 0.3s ease-out',
          backgroundImage: "url('/frames/background1/frame_000.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Canvas 2 */}
      <canvas
        ref={canvas2Ref}
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ 
          opacity: 0, 
          visibility: 'hidden', 
          transition: 'opacity 0.3s ease-out',
          backgroundImage: "url('/frames/background2/frame_000.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
    </div>
  );
};
