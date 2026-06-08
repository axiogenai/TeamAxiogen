import { useState, useEffect, useRef } from 'react';

interface PreloaderResult {
  loadedFrames: Map<number, HTMLImageElement>;
  isLoading: boolean;
  progress: number;
}

export function useFramePreloader(
  totalFrames: number,
  frameFolder: string,
  currentFrameIndex: number,
  lookaheadCount: number = 20
): PreloaderResult {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadedFrames, setLoadedFrames] = useState<Map<number, HTMLImageElement>>(new Map());
  const loadedFramesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const preloadedSetRef = useRef<Set<number>>(new Set());

  const getActualFrameNumber = (index: number): number => {
    if (index <= 250) return index;
    return index + 252; // Skip portal frames 251 to 502
  };

  // Initial preload (first 10 frames) to get something on screen fast
  useEffect(() => {
    let mounted = true;
    const initialLoadCount = Math.min(10, totalFrames);
    let loadedCount = 0;

    const loadFrame = (index: number) => {
      if (preloadedSetRef.current.has(index)) return;

      const img = new Image();
      // Resolve using skipped portal index
      const actualIndex = getActualFrameNumber(index);
      const paddedIndex = String(actualIndex).padStart(3, '0');
      img.src = `${frameFolder}/ezgif-frame-${paddedIndex}.jpg`;

      img.onload = () => {
        if (!mounted) return;
        loadedFramesRef.current.set(index, img);
        preloadedSetRef.current.add(index);
        loadedCount++;
        
        setProgress((loadedCount / initialLoadCount) * 100);
        setLoadedFrames(new Map(loadedFramesRef.current));

        if (loadedCount >= initialLoadCount) {
          setIsLoading(false);
        }
      };
      
      img.onerror = () => {
        if (!mounted) return;
        console.warn(`Failed to load frame ${index} (actual: ${actualIndex})`);
        loadedCount++;
        if (loadedCount >= initialLoadCount) {
          setIsLoading(false);
        }
      };
    };

    for (let i = 1; i <= initialLoadCount; i++) {
      loadFrame(i);
    }

    return () => {
      mounted = false;
    };
  }, [totalFrames, frameFolder]);

  // Lookahead preloader based on current frame
  useEffect(() => {
    if (isLoading) return;

    const startIdx = Math.max(1, currentFrameIndex - 5);
    const endIdx = Math.min(totalFrames, currentFrameIndex + lookaheadCount);

    for (let i = startIdx; i <= endIdx; i++) {
      if (!preloadedSetRef.current.has(i)) {
        const img = new Image();
        const actualIndex = getActualFrameNumber(i);
        const paddedIndex = String(actualIndex).padStart(3, '0');
        img.src = `${frameFolder}/ezgif-frame-${paddedIndex}.jpg`;
        
        preloadedSetRef.current.add(i); // Mark as requested immediately
        
        img.onload = () => {
          loadedFramesRef.current.set(i, img);
          setLoadedFrames(new Map(loadedFramesRef.current));
        };
      }
    }
  }, [currentFrameIndex, totalFrames, frameFolder, lookaheadCount, isLoading]);

  return {
    loadedFrames,
    isLoading,
    progress
  };
}
