'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { 
  useNavSection, 
  getStableHeight, 
  getProjectPagesCount, 
  getMaxScrollMultiplier, 
  getSectionFrames 
} from '../hooks/useScroll';
import { ThemeToggle } from './ThemeToggle';
import { MagneticButton } from './MagneticButton';
import { Menu, X } from 'lucide-react';

const TOTAL_FRAMES = 502;

export const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lenis = useLenis();
  const activeSection = useNavSection();

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
    const targetY = (frame / TOTAL_FRAMES) * maxScroll;
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
      {/* Brand Logo - Top Left */}
      <div className="hidden md:flex fixed top-6 left-4 md:left-8 z-50 pointer-events-auto select-none items-center gap-2.5">
        <button 
          onClick={() => scrollToFrame(frames[0] ?? 42)}
          className="text-sm font-black tracking-tighter text-white uppercase bg-gradient-to-r from-purple-200 via-indigo-400 to-slate-500 bg-clip-text text-transparent hover:opacity-85 transition-opacity cursor-pointer"
        >
          AXIOGEN
        </button>
      </div>

      {/* Floating Capsule Menu - Center (Desktop) */}
      <div className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-max px-4 pointer-events-none">
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="flex items-center space-x-1 bg-black/85 backdrop-blur-xl border border-white/10 rounded-full p-1.5 shadow-[0_10px_40px_rgba(0,0,0,0.6)] pointer-events-auto"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToFrame(item.frame)}
                className={`relative px-2.5 md:px-4 py-1.5 md:py-2 text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest cursor-pointer select-none transition-all duration-300 ${
                  isActive 
                    ? 'text-white font-extrabold' 
                    : 'text-white/50 hover:text-white/80 font-medium'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navPill"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 mr-[-0.1em]">{item.label}</span>
              </button>
            );
          })}
        </motion.div>
      </div>

      <div className="fixed top-6 right-4 md:right-8 z-50 pointer-events-auto flex items-center gap-3">
        <MagneticButton as="div" strength={0.35} radius={80}>
          <button 
            onClick={() => scrollToFrame(frames[3 + P] ?? 461)}
            className="hidden md:block px-5 py-2.5 bg-white/10 border border-white/20 rounded-full text-xs font-semibold uppercase tracking-widest text-white hover:bg-white hover:text-black hover:border-white transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
          >
            Let&apos;s Talk
          </button>
        </MagneticButton>
      </div>
    </>
  );
};
