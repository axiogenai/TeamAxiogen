'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { useScroll } from '../hooks/useScroll';

export const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const lenis = useLenis();
  const { scrollProgress } = useScroll();
  const totalFrames = 502;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const currentFrame = Math.max(
    1,
    Math.min(totalFrames, Math.ceil((scrollProgress / 100) * totalFrames))
  );

  const scrollToFrame = (frame: number) => {
    if (!lenis) return;
    // Calculate maxScroll mathematically based on 1500vh page height
    const maxScroll = 14 * window.innerHeight;
    const targetY = (frame / totalFrames) * maxScroll;
    lenis.scrollTo(targetY, { duration: 1.5 });
  };

  // Determine active section based on frame depth
  const getActiveSection = () => {
    if (currentFrame <= 135) return 'hero';
    if (currentFrame > 135 && currentFrame <= 245) return 'about';
    if (currentFrame > 245 && currentFrame <= 355) return 'work';
    if (currentFrame > 355 && currentFrame <= 477) return 'services';
    return 'contact';
  };

  const activeSection = getActiveSection();

  const navItems = [
    { id: 'about', label: 'About', frame: 190 },
    { id: 'work', label: 'Work', frame: 300 },
    { id: 'services', label: 'Services', frame: 416 },
    { id: 'contact', label: 'Contact', frame: 490 },
  ];

  if (!mounted) return null;

  return (
    <>
      {/* Brand Logo - Top Left */}
      <div className="fixed top-6 left-4 md:left-8 z-50 pointer-events-auto select-none hidden sm:block">
        <button 
          onClick={() => scrollToFrame(0)}
          className="text-sm font-black tracking-tighter text-white uppercase bg-gradient-to-r from-purple-200 via-indigo-400 to-slate-500 bg-clip-text text-transparent hover:opacity-85 transition-opacity cursor-pointer"
        >
          AXIOGEN
        </button>
      </div>

      {/* Floating Capsule Menu - Center */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-max px-4 pointer-events-none">
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="flex items-center space-x-1 backdrop-blur-md bg-black/70 border border-white/10 rounded-full p-1.5 shadow-[0_10px_40px_rgba(0,0,0,0.6)] pointer-events-auto"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToFrame(item.frame)}
                className={`relative px-2.5 md:px-4 py-1.5 md:py-2 text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest cursor-pointer select-none transition-all duration-300 ${
                  isActive 
                    ? 'text-cyan-400 font-extrabold filter drop-shadow-[0_0_6px_rgba(34,211,238,0.6)] scale-105' 
                    : 'text-white/50 hover:text-white/80 font-medium'
                }`}
              >
                <span className="mr-[-0.1em]">{item.label}</span>
              </button>
            );
          })}
        </motion.div>
      </div>

      <div className="fixed top-6 right-4 md:right-8 z-50 pointer-events-auto hidden sm:block">
        <button 
          onClick={() => scrollToFrame(490)}
          className="px-5 py-2.5 bg-white/10 border border-white/20 rounded-full text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-md hover:bg-white hover:text-black hover:border-white transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
        >
          Let&apos;s Talk
        </button>
      </div>
    </>
  );
};
