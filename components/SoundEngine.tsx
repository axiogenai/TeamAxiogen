'use client';

import { useRef, useEffect, createContext, useContext, useState, useCallback } from 'react';

interface SoundEngineProps {
  sectionChanged?: string;
}

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
}

function playWhoosh() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const duration = 0.3;
  const noise = ctx.createBufferSource();
  const buffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 2);
  }
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(2000, ctx.currentTime);
  filter.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + duration);
  filter.Q.value = 1;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.06, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  noise.start();
  noise.stop(ctx.currentTime + duration);
}

function playClick() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  osc.frequency.setValueAtTime(2200, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.06);
  osc.type = 'sine';

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.04, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.08);
}

/**
 * Sound Engine — programmatic audio via Web Audio API.
 * No audio files needed. Generates whoosh and click sounds.
 * OFF by default — user activates via toggle.
 */
export const SoundEngine = ({ sectionChanged }: SoundEngineProps) => {
  const [enabled, setEnabled] = useState(false);
  const prevSectionRef = useRef(sectionChanged);

  // Play whoosh on section change
  useEffect(() => {
    if (!enabled) return;
    if (sectionChanged && sectionChanged !== prevSectionRef.current) {
      playWhoosh();
    }
    prevSectionRef.current = sectionChanged;
  }, [sectionChanged, enabled]);

  // Add click sounds to interactive elements
  useEffect(() => {
    if (!enabled) return;

    function onHover(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], .cursor-pointer, .magnetic-btn')) {
        playClick();
      }
    }

    window.addEventListener('mouseover', onHover, { passive: true });
    return () => window.removeEventListener('mouseover', onHover);
  }, [enabled]);

  const toggle = useCallback(() => {
    if (!enabled) {
      // Resume audio context on first enable (browser requires user gesture)
      const ctx = getAudioContext();
      if (ctx && ctx.state === 'suspended') {
        ctx.resume();
      }
    }
    setEnabled(v => !v);
  }, [enabled]);

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 left-6 z-50 w-10 h-10 rounded-full bg-white/5 backdrop-blur-lg border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer select-none hidden md:flex"
      title={enabled ? 'Mute sounds' : 'Enable sounds'}
      aria-label={enabled ? 'Mute sounds' : 'Enable sounds'}
    >
      {enabled ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}
    </button>
  );
};
