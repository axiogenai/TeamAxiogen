'use client';

import React from 'react';
import { useNavSection } from '../hooks/useScroll';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

export const ScrollProgressBar: React.FC = () => {
  const activeSection = useNavSection();

  return (
    <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 pointer-events-none">
      <div className="flex flex-col items-center gap-3">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <div key={section.id} className="relative group flex items-center">
              {/* Dot */}
              <div
                className={`rounded-full transition-all duration-500 ${
                  isActive
                    ? 'w-2.5 h-2.5 bg-white shadow-[0_0_12px_rgba(168,85,247,0.6)]'
                    : 'w-1.5 h-1.5 bg-white/20'
                }`}
              />
              {/* Label tooltip on hover */}
              <span className="absolute right-6 text-[9px] uppercase tracking-widest font-bold text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                {section.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
