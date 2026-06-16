'use client';

import React, { useEffect, useState } from 'react';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number; // duration in ms
  trigger: boolean;  // starts animation when goes from false -> true
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  suffix = '',
  prefix = '',
  duration = 1500,
  trigger
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) {
      setCount(0);
      return;
    }

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing out quad formula: f(t) = t * (2 - t)
      const easeProgress = progress * (2 - progress);
      const currentValue = Math.floor(startValue + easeProgress * (value - startValue));
      
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    const animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration, trigger]);

  return (
    <span className="font-outfit tabular-nums">
      {prefix}
      {count}
      {suffix}
    </span>
  );
};
