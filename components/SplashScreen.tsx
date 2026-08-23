'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { NeuralNoise } from './ui/neural-noise';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Stage 1: Full black screen first, then mount logo drawings after 400ms
    const mountTimer = setTimeout(() => {
      setIsMounted(true);
    }, 400);

    // Show brand name and tagline after logo drawing starts filling (at 2.0s)
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 2000);

    // Trigger exit wipe at 5.7s
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 5700);

    // Complete splash sequence at 6.5s (5.7s + 0.8s slide transition)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 6500);

    return () => {
      clearTimeout(mountTimer);
      clearTimeout(textTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const brandName = 'TEAM AXIOGEN';

  // Traced path strings from logo.png
  const path0 = "M 287 61 L 291 55 L 295 58 L 304 76 L 308 80 L 323 107 L 325 108 L 328 116 L 331 118 L 335 127 L 344 139 L 348 149 L 351 152 L 366 180 L 369 182 L 369 184 L 393 222 L 403 242 L 406 244 L 408 250 L 413 256 L 420 270 L 426 278 L 427 282 L 431 286 L 431 288 L 455 326 L 456 331 L 460 335 L 467 349 L 485 376 L 493 392 L 497 396 L 500 404 L 505 409 L 513 426 L 515 427 L 524 444 L 527 447 L 526 449 L 494 450 L 408 450 L 406 446 L 403 444 L 399 436 L 399 433 L 396 431 L 388 416 L 378 403 L 375 396 L 372 394 L 357 367 L 346 352 L 345 348 L 332 330 L 318 316 L 309 310 L 297 305 L 298 303 L 308 301 L 310 299 L 332 299 L 334 301 L 346 304 L 365 316 L 380 329 L 382 328 L 363 302 L 346 285 L 344 281 L 317 259 L 305 232 L 302 232 L 297 243 L 292 248 L 292 252 L 282 270 L 279 273 L 276 280 L 272 282 L 262 269 L 241 249 L 215 236 L 194 231 L 194 228 L 200 216 L 203 214 L 207 204 L 209 203 L 213 193 L 223 178 L 231 161 L 234 159 L 234 156 L 243 138 L 252 125 L 268 94 L 272 89 L 274 83 L 287 62 Z";
  const path1 = "M 156 286 L 164 278 L 183 268 L 193 266 L 208 266 L 218 268 L 229 273 L 241 283 L 248 292 L 253 302 L 255 310 L 255 334 L 253 343 L 246 357 L 243 360 L 233 382 L 230 385 L 223 401 L 217 409 L 215 415 L 213 416 L 209 426 L 207 427 L 194 452 L 67 455 L 65 453 L 66 450 L 68 449 L 84 415 L 87 413 L 91 403 L 94 400 L 103 381 L 105 380 L 109 369 L 111 368 L 115 358 L 117 357 L 118 353 L 125 343 L 128 334 L 131 331 L 133 324 L 136 321 L 145 302 L 151 294 L 151 292 L 156 287 Z";

  return (
    <div
      className="fixed inset-0 w-full h-screen z-[9999] overflow-hidden select-none flex flex-col items-center justify-center bg-black"
      style={{
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? 'scale(0.96)' : 'scale(1)',
        pointerEvents: isExiting ? 'none' : 'auto',
      }}
    >
      {/* Neural Noise background shader */}
      <NeuralNoise />

      {/* Subtle grain texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />

      {/* Centered layout row holding logo and clipping text container */}
      <div className="flex flex-row items-center justify-center h-28 md:h-40 max-w-[92vw] mx-auto relative">
        {/* Inline SVG Logo drawing animation container */}
        <motion.div 
          animate={{ x: showText ? -6 : 0 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 flex-shrink-0 flex items-center justify-center z-10"
        >
          <svg 
            viewBox="0 0 582 595" 
            className="w-full h-full"
            style={{ 
              filter: 'drop-shadow(0 0 25px rgba(255,255,255,0.08))',
              opacity: isMounted ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out'
            }}
          >
            <g stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
              {/* Main triangle outline & fill */}
              {isMounted && (
                <motion.path
                  d={path0}
                  initial={{ pathLength: 0, fill: "rgba(255, 255, 255, 0)" }}
                  animate={{ 
                    pathLength: 1, 
                    fill: "rgba(240, 244, 255, 0.95)"
                  }}
                  transition={{
                    pathLength: { duration: 1.8, ease: [0.76, 0, 0.24, 1] },
                    fill: { delay: 1.4, duration: 0.8, ease: "easeInOut" }
                  }}
                />
              )}
              {/* Bottom-left cut outline & fill */}
              {isMounted && (
                <motion.path
                  d={path1}
                  initial={{ pathLength: 0, fill: "rgba(255, 255, 255, 0)" }}
                  animate={{ 
                    pathLength: 1, 
                    fill: "rgba(240, 244, 255, 0.95)"
                  }}
                  transition={{
                    pathLength: { duration: 1.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
                    fill: { delay: 1.5, duration: 0.8, ease: "easeInOut" }
                  }}
                />
              )}
            </g>
          </svg>
        </motion.div>

        {/* Clipping container for text to slide out to the right */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ 
            width: showText ? "auto" : 0,
            opacity: showText ? 1 : 0
          }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="overflow-hidden flex flex-col items-center justify-center pl-2 sm:pl-3 md:pl-4 whitespace-nowrap"
        >
          {/* Brand Name Text */}
          <motion.h1 
            initial={{ x: -40 }}
            animate={{ x: showText ? 0 : -40 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="text-white font-extralight tracking-[0.16em] sm:tracking-[0.25em] md:tracking-[0.35em] text-sm sm:text-lg md:text-2xl mb-1 mr-[-0.16em] sm:mr-[-0.25em] md:mr-[-0.35em] text-center inline-flex items-center justify-center gap-2 sm:gap-3"
            style={{ fontFamily: "'Rostex', sans-serif" }}
          >
            <span>TEAM</span>
            <span>AXIOGEN</span>
          </motion.h1>

          {/* Animated Horizontal Divider Line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ 
              scaleX: showText ? 1 : 0,
              opacity: showText ? 0.8 : 0
            }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
            className="h-[1px] w-20 sm:w-28 md:w-36 bg-gradient-to-r from-transparent via-white/80 to-transparent my-1 sm:my-1.5"
            style={{ originX: 0.5 }}
          />

          {/* Tagline */}
          <motion.p
            initial={{ x: -30 }}
            animate={{ x: showText ? 0 : -30 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
            className="text-white/40 text-[8px] sm:text-[10px] md:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase font-light text-center"
          >
            Design · Build · Evolve
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom edge line that appears on exit */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '1px',
          background: 'rgba(255,255,255,0.1)',
          transition: 'opacity 0.3s',
          opacity: isExiting ? 1 : 0,
        }}
      />
    </div>
  );
};
