'use client';

import { useSyncExternalStore } from 'react';

// --------------------------------------------------------------------------
// Scroll Store — uses useSyncExternalStore which is specifically designed
// for subscribing to external data sources in React 18+.
// This CANNOT cause "Maximum update depth exceeded" because:
//   1. State lives OUTSIDE React (module-level variables)
//   2. React only re-renders when getSnapshot() returns a new reference
//   3. We only create a new snapshot object when values actually change
// --------------------------------------------------------------------------

interface ScrollSnapshot {
  scrollProgress: number;
  scrollY: number;
}

// Module-level state — lives outside React's render cycle
let currentSnapshot: ScrollSnapshot = { scrollProgress: 0, scrollY: 0 };
const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
  listeners.add(listener);

  // Lazily attach the scroll listener on first subscription
  if (listeners.size === 1 && typeof window !== 'undefined') {
    window.addEventListener('scroll', onScroll, { passive: true });
    // Fire once to capture initial scroll position
    computeSnapshot();
  }

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && typeof window !== 'undefined') {
      window.removeEventListener('scroll', onScroll);
    }
  };
}

function onScroll() {
  // Compute directly — no rAF needed. This is just math (no DOM reads),
  // and passive scroll events are already frame-aligned by the browser.
  computeSnapshot();
}

function computeSnapshot() {
  const scrollY = Math.round(window.scrollY);
  const windowHeight = window.innerHeight;
  // 1500vh page → maxScroll = 14 × viewport height
  const maxScroll = 14 * windowHeight;
  const raw = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;
  const scrollProgress = Math.min(Math.max(raw, 0), 100);

  // Only create a new object (and notify) when values actually changed
  if (
    currentSnapshot.scrollY !== scrollY ||
    currentSnapshot.scrollProgress !== scrollProgress
  ) {
    currentSnapshot = { scrollProgress, scrollY };
    listeners.forEach((l) => l());
  }
}

function getSnapshot(): ScrollSnapshot {
  return currentSnapshot;
}

// Must be a stable reference — React will infinite-loop if this creates a new object each call
const SERVER_SNAPSHOT: ScrollSnapshot = { scrollProgress: 0, scrollY: 0 };

function getServerSnapshot(): ScrollSnapshot {
  return SERVER_SNAPSHOT;
}

/**
 * Zero-rerender-loop scroll hook.
 * Uses React 18's useSyncExternalStore — no useState, no useEffect,
 * no setTimeout, no chance of infinite render loops.
 */
export function useScroll(): ScrollSnapshot {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
