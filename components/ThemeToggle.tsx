'use client';

import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { playHoverSound } from './SoundManager';

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'space' | 'midnight'>('space');

  const toggleTheme = () => {
    const nextTheme = theme === 'space' ? 'midnight' : 'space';
    setTheme(nextTheme);
    playHoverSound();

    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
      if (nextTheme === 'midnight') {
        root.classList.add('theme-midnight');
      } else {
        root.classList.remove('theme-midnight');
      }
      localStorage.setItem('axiogen_theme', nextTheme);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('axiogen_theme') as 'space' | 'midnight' | null;
      if (savedTheme) {
        setTheme(savedTheme);
        const root = window.document.documentElement;
        if (savedTheme === 'midnight') {
          root.classList.add('theme-midnight');
        } else {
          root.classList.remove('theme-midnight');
        }
      }
    }
  }, []);

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 left-6 z-[999] p-3 bg-black/60 border border-white/10 hover:border-white/30 rounded-full text-white/60 hover:text-white transition-all shadow-lg backdrop-blur-md cursor-pointer hover:scale-105"
      aria-label="Toggle Theme Variant"
    >
      {theme === 'space' ? (
        <Moon className="w-5 h-5 text-purple-400" />
      ) : (
        <Sun className="w-5 h-5 text-blue-400" />
      )}
    </button>
  );
};
