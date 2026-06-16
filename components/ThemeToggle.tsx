'use client';

import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'space' | 'midnight'>('space');

  const toggleTheme = () => {
    const nextTheme = theme === 'space' ? 'midnight' : 'space';
    setTheme(nextTheme);

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
      className="p-2.5 bg-black/85 border border-white/10 hover:border-white/30 rounded-full text-white/60 hover:text-white transition-all shadow-lg backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95 flex items-center justify-center"
      aria-label="Toggle Theme Variant"
    >
      {theme === 'space' ? (
        <Moon className="w-4 h-4 text-purple-400" />
      ) : (
        <Sun className="w-4 h-4 text-blue-400" />
      )}
    </button>
  );
};
