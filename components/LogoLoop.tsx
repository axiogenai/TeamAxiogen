'use client';

import React, { memo, useState, useEffect } from 'react';
import './LogoLoop.css';

interface LogoItem {
  name?: string;
  node?: React.ReactNode;
}

interface LogoLoopProps {
  logos: LogoItem[];
}

export const LogoLoop = memo(({ logos }: LogoLoopProps) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Delay setting animation state to ensure DOM elements are fully painted
    const timer = setTimeout(() => setActive(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const extendedLogos = [...logos, ...logos, ...logos];

  return (
    <div className="logoloop-css-container select-none pointer-events-auto">
      <div className={`logoloop-css-track ${active ? 'is-animating' : ''}`}>
        {/* Render two copies of the list for seamless looping */}
        <div className="logoloop-css-list">
          {extendedLogos.map((item, idx) => (
            <div key={`copy1-${idx}`} className="logoloop-css-item">
              {item.node}
            </div>
          ))}
        </div>
        <div className="logoloop-css-list">
          {extendedLogos.map((item, idx) => (
            <div key={`copy2-${idx}`} className="logoloop-css-item">
              {item.node}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

LogoLoop.displayName = 'LogoLoop';

export default LogoLoop;
