'use client';

import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'space' | 'light'>('space');

  const toggleTheme = () => {
    const nextTheme = theme === 'space' ? 'light' : 'space';
    setTheme(nextTheme);

    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
      if (nextTheme === 'light') {
        root.classList.add('theme-light');
      } else {
        root.classList.remove('theme-light');
      }
      localStorage.setItem('axiogen_theme', nextTheme);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('axiogen_theme') as 'space' | 'light' | null;
      if (savedTheme) {
        setTheme(savedTheme);
        const root = window.document.documentElement;
        if (savedTheme === 'light') {
          root.classList.add('theme-light');
        } else {
          root.classList.remove('theme-light');
        }
      }
    }
  }, []);

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 bg-black/85 border border-white/10 hover:border-white/30 rounded-full text-white/60 hover:text-white transition-all shadow-lg backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95 flex items-center justify-center dark-light-toggle"
      aria-label="Toggle Theme Mode"
    >
      {theme === 'space' ? (
        <Sun className="w-4 h-4 text-amber-400" />
      ) : (
        <Moon className="w-4 h-4 text-purple-600" />
      )}
    </button>
  );
};
