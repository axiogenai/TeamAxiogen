'use client';

import { useSyncExternalStore } from 'react';

// --------------------------------------------------------------------------
// Core Scroll Store — module-level state outside React's render cycle.
// Uses useSyncExternalStore for zero-risk subscription management.
// --------------------------------------------------------------------------

interface ScrollSnapshot {
  scrollProgress: number;
  scrollY: number;
}

let currentSnapshot: ScrollSnapshot = { scrollProgress: 0, scrollY: 0 };
const listeners = new Set<() => void>();
let stableHeight = 0;
let stableWidth = 0;

export function getStableHeight(): number {
  if (typeof window === 'undefined') return 0;
  if (stableHeight === 0) {
    stableHeight = window.innerHeight;
    stableWidth = window.innerWidth;
  }
  return stableHeight;
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);

  if (listeners.size === 1 && typeof window !== 'undefined') {
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    computeSnapshot();
  }

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && typeof window !== 'undefined') {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    }
  };
}

function onScroll() {
  computeSnapshot();
}

function onResize() {
  if (typeof window === 'undefined') return;
  const w = window.innerWidth;
  const h = window.innerHeight;
  
  // Only update stable dimensions if width changed (orientation change) or height changed significantly (keyboard open, etc.)
  if (w !== stableWidth || Math.abs(h - stableHeight) > 150) {
    stableWidth = w;
    stableHeight = h;
    computeSnapshot();
  }
}

function computeSnapshot() {
  if (typeof window === 'undefined') return;
  
  if (stableHeight === 0) {
    stableHeight = window.innerHeight;
    stableWidth = window.innerWidth;
  }

  const scrollY = Math.round(window.scrollY);
  const maxScroll = 14 * stableHeight;
  const raw = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;
  const scrollProgress = Math.min(Math.max(raw, 0), 100);

  if (
    currentSnapshot.scrollY !== scrollY ||
    currentSnapshot.scrollProgress !== scrollProgress
  ) {
    currentSnapshot = { scrollProgress, scrollY };
    listeners.forEach((l) => l());
  }
}

export function getSnapshot(): ScrollSnapshot {
  return currentSnapshot;
}

const SERVER_SNAPSHOT: ScrollSnapshot = { scrollProgress: 0, scrollY: 0 };
function getServerSnapshot(): ScrollSnapshot {
  return SERVER_SNAPSHOT;
}

/**
 * Raw scroll hook — use ONLY in components needing per-pixel updates
 * (e.g., FrameSequenceViewer canvas drawing).
 * Every component using this re-renders on EVERY scroll pixel.
 */
export function useScroll(): ScrollSnapshot {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

// --------------------------------------------------------------------------
// Derived Hooks — only trigger re-renders when the derived value changes.
// This is the key to Apple/Google-level scroll performance.
//
// useSyncExternalStore uses Object.is() comparison:
//   - Primitives (string, number, boolean): value equality
//   - Objects: reference equality (cached ref reused when unchanged)
// --------------------------------------------------------------------------

const TOTAL_FRAMES = 502;

function getCurrentFrame(scrollProgress: number): number {
  return Math.max(
    1,
    Math.min(TOTAL_FRAMES, Math.ceil((scrollProgress / 100) * TOTAL_FRAMES))
  );
}

/**
 * Returns the active nav section name.
 * Only re-renders when the section actually changes (~5 transitions total).
 */
export function useNavSection(): string {
  return useSyncExternalStore(
    subscribe,
    () => {
      const frame = getCurrentFrame(currentSnapshot.scrollProgress);
      if (frame <= 135) return 'hero';
      if (frame <= 245) return 'about';
      if (frame <= 355) return 'work';
      if (frame <= 477) return 'services';
      return 'contact';
    },
    () => 'hero'
  );
}

/**
 * Section visibility flags — only re-renders when a boundary is crossed.
 * Uses cached object reference to avoid unnecessary re-renders.
 */
interface SectionVisibility {
  showHero: boolean;
  showAbout: boolean;
  showProjects: boolean;
  projectPage: number;
  showServices: boolean;
  showContact: boolean;
}

let cachedVisibility: SectionVisibility = {
  showHero: false,
  showAbout: false,
  showProjects: false,
  projectPage: 0,
  showServices: false,
  showContact: false,
};

export function useSectionVisibility(): SectionVisibility {
  return useSyncExternalStore(
    subscribe,
    () => {
      const frame = getCurrentFrame(currentSnapshot.scrollProgress);
      const showHero = frame >= 26 && frame <= 135;
      const showAbout = frame >= 136 && frame <= 245;
      const showProjects = frame >= 246 && frame <= 355;
      const projectPage = frame > 300 ? 1 : 0;
      const showServices = frame >= 356 && frame <= 477;
      const showContact = frame >= 478 && frame <= 502;

      if (
        cachedVisibility.showHero !== showHero ||
        cachedVisibility.showAbout !== showAbout ||
        cachedVisibility.showProjects !== showProjects ||
        cachedVisibility.projectPage !== projectPage ||
        cachedVisibility.showServices !== showServices ||
        cachedVisibility.showContact !== showContact
      ) {
        cachedVisibility = {
          showHero,
          showAbout,
          showProjects,
          projectPage,
          showServices,
          showContact,
        };
      }
      return cachedVisibility;
    },
    () => cachedVisibility
  );
}

/**
 * Blur state — only re-renders ONCE when crossing frame 250.
 */
export function useIsBlurred(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => getCurrentFrame(currentSnapshot.scrollProgress) <= 250,
    () => true
  );
}

/**
 * Vignette opacity — only re-renders at frame 235 and 265 boundaries.
 */
export function useVignetteOpacity(): number {
  return useSyncExternalStore(
    subscribe,
    () => {
      const frame = getCurrentFrame(currentSnapshot.scrollProgress);
      return frame > 235 && frame < 265 ? 0.9 : 0.6;
    },
    () => 0.6
  );
}
