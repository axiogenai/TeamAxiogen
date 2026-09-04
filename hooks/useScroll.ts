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

let projectCount = 12; // default
const projectCountListeners = new Set<() => void>();

export function setProjectCount(count: number) {
  if (projectCount !== count) {
    projectCount = count;
    computeSnapshot();
    projectCountListeners.forEach((l) => l());
  }
}

export function subscribeProjectCount(listener: () => void): () => void {
  projectCountListeners.add(listener);
  return () => {
    projectCountListeners.delete(listener);
  };
}

export function useProjectCount(): number {
  return useSyncExternalStore(subscribeProjectCount, () => projectCount, () => 12);
}

export function getIsMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

export function getProjectPagesCount(): number {
  if (getIsMobile()) {
    // 3 projects per page on mobile
    return Math.max(1, Math.ceil(projectCount / 3));
  }
  return Math.max(1, Math.ceil(projectCount / 6));
}

export function getTotalStates(): number {
  // Hero (0), About (1), Founder (2), Global Reach (3), Projects (P pages), Services, Contact
  return 6 + getProjectPagesCount();
}

export function getMaxScrollMultiplier(): number {
  return getTotalStates() - 2;
}

export function getSectionFrames(): number[] {
  const totalStates = getTotalStates();
  const slice = 502 / totalStates;
  
  const frames: number[] = [];
  for (let i = 0; i < totalStates; i++) {
    frames.push(Math.round(slice * i + slice / 2));
  }
  return frames;
}

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
  const maxScroll = getMaxScrollMultiplier() * stableHeight;
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

export function useScroll(): ScrollSnapshot {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

const TOTAL_FRAMES = 502;

function getCurrentFrame(scrollProgress: number): number {
  return Math.max(
    1,
    Math.min(TOTAL_FRAMES, Math.ceil((scrollProgress / 100) * TOTAL_FRAMES))
  );
}

export function useNavSection(): string {
  return useSyncExternalStore(
    subscribe,
    () => {
      const frame = getCurrentFrame(currentSnapshot.scrollProgress);
      const P = getProjectPagesCount();
      const totalStates = getTotalStates();
      const slice = TOTAL_FRAMES / totalStates;

      if (frame <= slice) return 'hero';
      if (frame <= slice * 2) return 'about';
      if (frame <= slice * 3) return 'founder';
      if (frame <= slice * 4) return 'global-reach';
      if (frame <= slice * (4 + P)) return 'work';
      if (frame <= slice * (5 + P)) return 'services';
      return 'contact';
    },
    () => 'hero'
  );
}

interface SectionVisibility {
  showHero: boolean;
  showAbout: boolean;
  showAboutUs: boolean;
  showSkills: boolean;
  showFounder: boolean;
  showGlobalReach: boolean;
  showProjects: boolean;
  projectPage: number;
  showServices: boolean;
  showContact: boolean;
}

let cachedVisibility: SectionVisibility = {
  showHero: false,
  showAbout: false,
  showAboutUs: false,
  showSkills: false,
  showFounder: false,
  showGlobalReach: false,
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
      const P = getProjectPagesCount();
      const totalStates = getTotalStates();
      const slice = TOTAL_FRAMES / totalStates;

      let showHero = false;
      let showAbout = false;
      let showAboutUs = false;
      let showSkills = false;
      let showFounder = false;
      let showGlobalReach = false;
      let showProjects = false;
      let projectPage = 0;
      let showServices = false;
      let showContact = false;

      showHero = frame >= 1 && frame <= slice;
      showAbout = frame > slice && frame <= slice * 2;
      showAboutUs = showAbout;
      showSkills = showAbout;
      showFounder = frame > slice * 2 && frame <= slice * 3;
      showGlobalReach = frame > slice * 3 && frame <= slice * 4;
      showProjects = frame > slice * 4 && frame <= slice * (4 + P);
      if (showProjects) {
        const relativeFrame = frame - slice * 4;
        projectPage = Math.min(P - 1, Math.floor(relativeFrame / slice));
      }
      showServices = frame > slice * (4 + P) && frame <= slice * (5 + P);
      showContact = frame > slice * (5 + P) && frame <= TOTAL_FRAMES;

      if (
        cachedVisibility.showHero !== showHero ||
        cachedVisibility.showAbout !== showAbout ||
        cachedVisibility.showAboutUs !== showAboutUs ||
        cachedVisibility.showSkills !== showSkills ||
        cachedVisibility.showFounder !== showFounder ||
        cachedVisibility.showGlobalReach !== showGlobalReach ||
        cachedVisibility.showProjects !== showProjects ||
        cachedVisibility.projectPage !== projectPage ||
        cachedVisibility.showServices !== showServices ||
        cachedVisibility.showContact !== showContact
      ) {
        cachedVisibility = {
          showHero,
          showAbout,
          showAboutUs,
          showSkills,
          showFounder,
          showGlobalReach,
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

export function useIsBlurred(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => getCurrentFrame(currentSnapshot.scrollProgress) <= 250,
    () => true
  );
}

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
