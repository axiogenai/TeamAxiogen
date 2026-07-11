'use client';

import { useRef, useEffect, useMemo } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  staggerDelay?: number;
  duration?: number;
  trigger?: boolean;
  tag?: 'h1' | 'h2' | 'h3' | 'span' | 'p';
  direction?: 'up' | 'down';
}

/**
 * Cinematic character-by-character text reveal.
 * Each letter flies in with stagger timing, slight rotation, and spring physics.
 */
export const TextReveal = ({
  text,
  className = '',
  staggerDelay = 0.03,
  duration = 0.6,
  trigger = true,
  tag: Tag = 'h2',
  direction = 'up',
}: TextRevealProps) => {
  const controls = useAnimation();
  const hasAnimated = useRef(false);

  const chars = useMemo(() => {
    return text.split('').map((char, i) => ({
      char: char === ' ' ? '\u00A0' : char,
      key: `${char}-${i}`,
    }));
  }, [text]);

  useEffect(() => {
    if (trigger && !hasAnimated.current) {
      hasAnimated.current = true;
      controls.start('visible');
    }
    if (!trigger) {
      hasAnimated.current = false;
      controls.start('hidden');
    }
  }, [trigger, controls]);

  const yOffset = direction === 'up' ? 40 : -40;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.05,
      },
    },
  };

  const charVariants = {
    hidden: {
      opacity: 0,
      y: yOffset,
      rotateX: direction === 'up' ? 45 : -45,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring' as const,
        damping: 20,
        stiffness: 200,
        duration,
      },
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      style={{ perspective: 600 }}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      aria-label={text}
    >
      {chars.map(({ char, key }) => (
        <motion.span
          key={key}
          variants={charVariants}
          className="inline-block"
          style={{ transformStyle: 'preserve-3d', willChange: 'transform, opacity, filter' }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};
