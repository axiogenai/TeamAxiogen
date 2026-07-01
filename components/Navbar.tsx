'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { 
  useNavSection, 
  getStableHeight, 
  getProjectPagesCount, 
  getMaxScrollMultiplier, 
  getSectionFrames 
} from '../hooks/useScroll';
import { ThemeToggle } from './ThemeToggle';

export const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const lenis = useLenis();
  const activeSection = useNavSection();
  const totalFrames = 502;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToFrame = (frame: number) => {
    if (!lenis) return;
    const maxScroll = getMaxScrollMultiplier() * getStableHeight();
    const targetY = (frame / totalFrames) * maxScroll;
    lenis.scrollTo(targetY, { 
      duration: 1.2,
      easing: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    });
  };

  const frames = getSectionFrames();
  const P = getProjectPagesCount();
  
  const navItems = [
    { id: 'about', label: 'About', frame: frames[1] ?? 125 },
    { id: 'work', label: 'Work', frame: frames[2] ?? 209 },
    { id: 'services', label: 'Services', frame: frames[2 + P] ?? 377 },
    { id: 'contact', label: 'Contact', frame: frames[3 + P] ?? 461 },
  ];

  if (!mounted) return null;

  return (
    <>
      {/* Brand Logo — Top Left */}
      <div className="hidden md:flex fixed top-6 left-4 md:left-8 z-50 pointer-events-auto select-none items-center gap-2.5">
        <button 
          onClick={() => scrollToFrame(frames[0] ?? 42)}
          style={{ 
            backgroundImage: 'linear-gradient(to right, #ffffff, var(--theme-accent-solid))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          className="text-sm font-black tracking-[-0.02em] uppercase hover:opacity-85 transition-opacity cursor-pointer"
        >
          AXIOGEN
        </button>
      </div>
 
      {/* Floating Capsule Nav — Center */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-max px-4 pointer-events-none">
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="flex items-center space-x-0.5 bg-white/[0.05] backdrop-blur-2xl border border-white/[0.06] rounded-2xl p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] pointer-events-auto"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToFrame(item.frame)}
                className={`relative px-2.5 md:px-4 py-1.5 md:py-2 text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest cursor-pointer select-none transition-all duration-300 ${
                  isActive 
                    ? 'font-extrabold scale-105' 
                    : 'text-white/40 hover:text-white/70 font-medium'
                }`}
              >
                <span
                  className="relative z-10 mr-[-0.1em]"
                  style={isActive ? { 
                    color: 'var(--theme-accent-solid)', 
                    filter: 'drop-shadow(0 0 6px var(--theme-accent))' 
                  } : {}}
                >
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                    style={{ 
                      backgroundColor: 'var(--theme-accent-solid)',
                      boxShadow: '0 0 8px var(--theme-accent), 0 0 16px var(--theme-accent)',
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>
      </div>

      {/* Right Side — Theme Toggle + CTA */}
      <div className="fixed top-6 right-4 md:right-8 z-50 pointer-events-auto flex items-center gap-3">
        <ThemeToggle />
        <button 
          onClick={() => scrollToFrame(frames[3 + P] ?? 461)}
          style={{ backgroundColor: 'var(--theme-accent-solid)' }}
          className="hidden md:block px-5 py-2.5 text-white rounded-xl text-xs font-semibold uppercase tracking-widest hover:brightness-110 transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
        >
          Let&apos;s Talk
        </button>
      </div>
    </>
  );
};
