'use client';

import React, { memo } from 'react';
import './LogoLoop.css';

interface LogoItem {
  name?: string;
  node?: React.ReactNode;
}

interface LogoLoopProps {
  logos: LogoItem[];
}

export const LogoLoop = memo(({ logos }: LogoLoopProps) => {
  return (
    <div className="logoloop-css-container select-none pointer-events-auto">
      <div className="logoloop-css-track">
        {/* Render two copies of the list for seamless looping */}
        <div className="logoloop-css-list">
          {logos.map((item, idx) => (
            <div key={`copy1-${idx}`} className="logoloop-css-item">
              {item.node}
            </div>
          ))}
        </div>
        <div className="logoloop-css-list">
          {logos.map((item, idx) => (
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
