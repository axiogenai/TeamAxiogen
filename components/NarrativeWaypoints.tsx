'use client';

import { motion } from 'framer-motion';
import { useScroll } from '../hooks/useScroll';

interface Waypoint {
  startFrame: number;
  endFrame: number;
  title: string;
  subtitle: string;
}

const waypoints: Waypoint[] = [
  { startFrame: 10, endFrame: 100, title: "Welcome to my Universe", subtitle: "Scroll to explore" },
  { startFrame: 150, endFrame: 230, title: "I build digital experiences", subtitle: "Where code meets art" },
  { startFrame: 280, endFrame: 380, title: "Traversing the Portal", subtitle: "To new dimensions" },
  { startFrame: 420, endFrame: 490, title: "Global Reach", subtitle: "Expanding horizons" },
  { startFrame: 540, endFrame: 754, title: "Let's work together", subtitle: "Contact me below" },
];

export const NarrativeWaypoints = ({ totalFrames }: { totalFrames: number }) => {
  const { scrollProgress } = useScroll();
  const currentFrame = Math.max(
    1,
    Math.min(totalFrames, Math.ceil((scrollProgress / 100) * totalFrames))
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-40 flex items-center justify-center">
      {waypoints.map((wp, idx) => {
        const isActive = currentFrame >= wp.startFrame && currentFrame <= wp.endFrame;
        return (
          <motion.div
            key={idx}
            className="absolute text-center mix-blend-difference text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isActive ? 1 : 0, 
              y: isActive ? 0 : (currentFrame > wp.endFrame ? -20 : 20),
              scale: isActive ? 1 : 0.95 
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4">{wp.title}</h2>
            <p className="text-xl md:text-3xl opacity-70 font-light tracking-wide uppercase">{wp.subtitle}</p>
          </motion.div>
        );
      })}
    </div>
  );
};
