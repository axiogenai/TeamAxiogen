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
        <button 
          onClick={() => scrollToFrame(frames[3 + P] ?? 461)}
          className="hidden md:block px-5 py-2.5 bg-white/10 border border-white/20 rounded-full text-xs font-semibold uppercase tracking-widest text-white hover:bg-white hover:text-black hover:border-white transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
        >
          Let&apos;s Talk
        </button>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2.5 bg-black/85 backdrop-blur-xl border border-white/10 rounded-full text-white/80 hover:text-white transition-all cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-6 md:hidden"
          >
            {/* Mobile Logo */}
            <button 
              onClick={() => { scrollToFrame(frames[0] ?? 42); setMobileOpen(false); }}
              className="text-2xl font-black tracking-tighter uppercase bg-gradient-to-r from-purple-200 via-indigo-400 to-slate-500 bg-clip-text text-transparent mb-4"
            >
              AXIOGEN
            </button>

            {navItems.map((item, index) => {
              const isActive = activeSection === item.id;
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => { scrollToFrame(item.frame); setMobileOpen(false); }}
                  className={`text-2xl font-bold uppercase tracking-widest transition-all ${
                    isActive 
                      ? 'text-white scale-110' 
                      : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <div className="h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-1" />
                  )}
                </motion.button>
              );
            })}

            {/* Mobile CTA */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onClick={() => { scrollToFrame(frames[3 + P] ?? 461); setMobileOpen(false); }}
              className="mt-6 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-sm font-bold uppercase tracking-widest text-white shadow-[0_4px_20px_rgba(168,85,247,0.4)] hover:scale-105 transition-transform"
            >
              Let&apos;s Talk
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
