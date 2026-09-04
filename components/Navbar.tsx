'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  useNavSection, 
  getStableHeight, 
  getProjectPagesCount, 
  getMaxScrollMultiplier, 
  getSectionFrames 
} from '../hooks/useScroll';
import { MagneticButton } from './MagneticButton';

const TOTAL_FRAMES = 502;

export const Navbar = ({ ready = true }: { ready?: boolean }) => {
  const [mounted, setMounted] = useState(false);
  const activeSection = useNavSection();

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToFrame = (frame: number) => {
    const maxScroll = getMaxScrollMultiplier() * getStableHeight();
    const targetY = (frame / TOTAL_FRAMES) * maxScroll;
    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  };

  const frames = getSectionFrames();
  const P = getProjectPagesCount();
  
  const navItems = [
    { id: 'about', label: 'About', frame: frames[1] ?? 83 },
    { id: 'founder', label: 'Founders', frame: frames[2] ?? 167 },
    { id: 'work', label: 'Work', frame: frames[3] ?? 250 },
    { id: 'services', label: 'Services', frame: frames[3 + P] ?? 334 },
    { id: 'contact', label: 'Contact', frame: frames[4 + P] ?? 418 },
  ];

  if (!mounted) return null;

  return (
    <>
      {/* Brand Logo - Top Left */}
      <div className="flex fixed top-4 md:top-6 left-4 md:left-8 z-50 pointer-events-auto select-none items-center gap-2.5">
        <button 
          onClick={() => scrollToFrame(frames[0] ?? 42)}
          className="hover:opacity-90 transition-all cursor-pointer flex items-center gap-2.5 group"
        >
          <div className="w-7 h-7 flex items-center justify-center">
            <svg viewBox="0 0 582 595" className="w-7 h-7 text-white fill-white stroke-white">
              <g fill="#ffffff" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 287 61 L 291 55 L 295 58 L 304 76 L 308 80 L 323 107 L 325 108 L 328 116 L 331 118 L 335 127 L 344 139 L 348 149 L 351 152 L 366 180 L 369 182 L 369 184 L 393 222 L 403 242 L 406 244 L 408 250 L 413 256 L 420 270 L 426 278 L 427 282 L 431 286 L 431 288 L 455 326 L 456 331 L 460 335 L 467 349 L 485 376 L 493 392 L 497 396 L 500 404 L 505 409 L 513 426 L 515 427 L 524 444 L 527 447 L 526 449 L 494 450 L 408 450 L 406 446 L 403 444 L 399 436 L 399 433 L 396 431 L 388 416 L 378 403 L 375 396 L 372 394 L 357 367 L 346 352 L 345 348 L 332 330 L 318 316 L 309 310 L 297 305 L 298 303 L 308 301 L 310 299 L 332 299 L 334 301 L 346 304 L 365 316 L 380 329 L 382 328 L 363 302 L 346 285 L 344 281 L 317 259 L 305 232 L 302 232 L 297 243 L 292 248 L 292 252 L 282 270 L 279 273 L 276 280 L 272 282 L 262 269 L 241 249 L 215 236 L 194 231 L 194 228 L 200 216 L 203 214 L 207 204 L 209 203 L 213 193 L 223 178 L 231 161 L 234 159 L 234 156 L 243 138 L 252 125 L 268 94 L 272 89 L 274 83 L 287 62 Z" />
                <path d="M 156 286 L 164 278 L 183 268 L 193 266 L 208 266 L 218 268 L 229 273 L 241 283 L 248 292 L 253 302 L 255 310 L 255 334 L 253 343 L 246 357 L 243 360 L 233 382 L 230 385 L 223 401 L 217 409 L 215 415 L 213 416 L 209 426 L 207 427 L 194 452 L 67 455 L 65 453 L 66 450 L 68 449 L 84 415 L 87 413 L 91 403 L 94 400 L 103 381 L 105 380 L 109 369 L 111 368 L 115 358 L 117 357 L 118 353 L 125 343 L 128 334 L 131 331 L 133 324 L 136 321 L 145 302 L 151 294 L 151 292 L 156 287 Z" />
              </g>
            </svg>
          </div>
          <span className="text-sm font-black tracking-tighter text-white uppercase bg-gradient-to-r from-white via-purple-100 to-indigo-200 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            AXIOGEN
          </span>
        </button>
      </div>

      {/* Floating Capsule Menu - Center (Desktop) */}
      <div className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-max px-4 pointer-events-none">
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={ready ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="flex items-center space-x-1 bg-black/85 backdrop-blur-xl border border-white/10 rounded-full p-1.5 pointer-events-auto shadow-2xl shadow-purple-950/20"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToFrame(item.frame)}
                className={`relative px-2.5 md:px-4 py-1.5 md:py-2 text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest cursor-pointer select-none transition-all duration-300 ${
                  isActive 
                    ? 'text-white font-extrabold' 
                    : 'text-white/50 hover:text-white/80 font-medium'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navPill"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 mr-[-0.1em]">{item.label}</span>
              </button>
            );
          })}
        </motion.div>
      </div>

      {/* Top Right Action Button */}
      <div className="fixed top-6 right-4 md:right-8 z-50 pointer-events-auto flex items-center gap-3">
        <MagneticButton as="div" strength={0.35} radius={80}>
          <button 
            onClick={() => scrollToFrame(frames[4 + P] ?? 418)}
            className="hidden md:block px-5 py-2.5 bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-white/20 rounded-full text-xs font-semibold uppercase tracking-widest text-white hover:bg-white hover:text-black hover:border-white transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
          >
            Let&apos;s Talk
          </button>
        </MagneticButton>
      </div>
    </>
  );
};
