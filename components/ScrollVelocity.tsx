import React, { useRef, useLayoutEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, useAnimationFrame } from 'framer-motion';
import './ScrollVelocity.css';

interface VelocityTextProps {
  children: React.ReactNode;
  baseVelocity: number;
  className?: string;
  numCopies?: number;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
}

interface ScrollVelocityProps {
  texts: React.ReactNode[];
  velocity?: number;
  className?: string;
  numCopies?: number;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
}

function useElementWidth<T extends HTMLElement>(ref: React.RefObject<T | null>): number {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    setWidth(element.offsetWidth);

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const measuredWidth = (entry.target as HTMLElement).offsetWidth;
        if (measuredWidth > 0) {
          setWidth(measuredWidth);
        }
      }
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return width;
}

export const ScrollVelocity: React.FC<ScrollVelocityProps> = ({
  texts = [],
  velocity = 100,
  className = '',
  numCopies = 12,
  parallaxClassName = 'parallax',
  scrollerClassName = 'scroller',
  parallaxStyle,
  scrollerStyle
}) => {
  function VelocityText({
    children,
    baseVelocity = velocity,
    className = '',
    numCopies,
    parallaxClassName,
    scrollerClassName,
    parallaxStyle,
    scrollerStyle
  }: VelocityTextProps) {
    const baseX = useMotionValue(0);

    const copyRef = useRef<HTMLSpanElement>(null);
    const copyWidth = useElementWidth(copyRef);

    function wrap(min: number, max: number, v: number): number {
      const range = max - min;
      const mod = (((v - min) % range) + range) % range;
      return mod + min;
    }

    const x = useTransform(baseX, v => {
      if (copyWidth === 0) return '0px';
      return `${wrap(-copyWidth, 0, v)}px`;
    });

    // Compute delta dynamically to be 100% safe across Framer Motion versions
    const lastTimeRef = useRef<number | null>(null);
    useAnimationFrame((time) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
        return;
      }
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      // Limit delta to prevent huge jumps when switching tabs
      const cappedDelta = Math.min(delta, 100);
      
      const moveBy = baseVelocity * (cappedDelta / 1000);
      baseX.set(baseX.get() + moveBy);
    });

    const spans = [];
    for (let i = 0; i < (numCopies ?? 12); i++) {
      spans.push(
        <span className={className} key={i} ref={i === 0 ? copyRef : null}>
          {children}&nbsp;
        </span>
      );
    }

    return (
      <div className={parallaxClassName} style={parallaxStyle}>
        <motion.div className={scrollerClassName} style={{ x, ...scrollerStyle }}>
          {spans}
        </motion.div>
      </div>
    );
  }

  return (
    <section>
      {texts.map((text, index) => (
        <VelocityText
          key={index}
          className={className}
          baseVelocity={index % 2 !== 0 ? -velocity : velocity}
          numCopies={numCopies}
          parallaxClassName={parallaxClassName}
          scrollerClassName={scrollerClassName}
          parallaxStyle={parallaxStyle}
          scrollerStyle={scrollerStyle}
        >
          {text}
        </VelocityText>
      ))}
    </section>
  );
};

export default ScrollVelocity;
