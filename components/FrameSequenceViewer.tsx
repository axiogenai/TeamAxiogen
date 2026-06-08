'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useScroll } from '../hooks/useScroll';
import { useFramePreloader } from '../hooks/useFramePreloader';

interface FrameSequenceViewerProps {
  totalFrames: number;
  frameFolder: string;
  width?: number;
  height?: number;
}

export const FrameSequenceViewer: React.FC<FrameSequenceViewerProps> = ({
  totalFrames,
  frameFolder,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollProgress } = useScroll();
  
  // Calculate current frame based on scroll progress (1-indexed)
  const currentFrameIndex = Math.max(
    1,
    Math.min(totalFrames, Math.ceil((scrollProgress / 100) * totalFrames))
  );

  const { loadedFrames, isLoading, progress } = useFramePreloader(
    totalFrames,
    frameFolder,
    currentFrameIndex,
    20 // preload 20 frames ahead
  );

  // Resize canvas handler
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && containerRef.current) {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        
        // Handle High DPI displays
        const dpr = window.devicePixelRatio || 1;
        const rect = container.getBoundingClientRect();
        
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.scale(dpr, dpr);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Draw frame once when index or loaded images change
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = loadedFrames.get(currentFrameIndex);
    
    if (img) {
      const rect = containerRef.current.getBoundingClientRect();
      
      // Clear canvas
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Object fit cover logic
      const imgRatio = img.width / img.height;
      const canvasRatio = rect.width / rect.height;
      let drawWidth, drawHeight, offsetX, offsetY;

      if (canvasRatio > imgRatio) {
        drawWidth = rect.width;
        drawHeight = rect.width / imgRatio;
        offsetX = 0;
        offsetY = (rect.height - drawHeight) / 2;
      } else {
        drawWidth = rect.height * imgRatio;
        drawHeight = rect.height;
        offsetX = (rect.width - drawWidth) / 2;
        offsetY = 0;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }
  }, [currentFrameIndex, loadedFrames]);

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full -z-10 bg-black">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-50 bg-black">
          <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
            <div 
              className="h-full bg-white transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="font-outfit text-sm opacity-80">Loading Experience... {Math.round(progress)}%</p>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
        style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s ease-in' }}
      />
    </div>
  );
};
