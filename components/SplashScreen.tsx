'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  const brandName = 'AXIOGEN';
  const letters = brandName.split('');

  useEffect(() => {
    // Total sequence: letters stagger (~0.35s) + hold (0.8s) + exit (0.6s) ≈ 2.5s
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence
      onExitComplete={() => {
        onComplete();
      }}
    >
      {isVisible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] select-none overflow-hidden"
        >
          {/* AXIOGEN — letter-by-letter stagger */}
          <div className="flex items-center justify-center" aria-label={brandName}>
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.2 + i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-4xl md:text-6xl font-bold tracking-[-0.04em] text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Expanding horizontal line */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 80, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="h-[1px] mt-6 rounded-full"
            style={{ backgroundColor: 'var(--theme-accent-solid)' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
