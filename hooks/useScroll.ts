import { useState, useEffect } from 'react';

interface ScrollProgress {
  scrollProgress: number;
  scrollY: number;
}

export function useScroll(): ScrollProgress {
  const [scrollData, setScrollData] = useState<ScrollProgress>({ scrollProgress: 0, scrollY: 0 });

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          
          // Calculate progress (0 to 100)
          const maxScroll = documentHeight - windowHeight;
          const progress = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;
          
          setScrollData({
            scrollProgress: Math.min(Math.max(progress, 0), 100),
            scrollY,
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initialize
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollData;
}
