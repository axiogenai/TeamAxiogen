'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

let globalSoundEnabled = false;

export function playTransitionSound() {
  if (!globalSoundEnabled) return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.18);
    
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.18);
  } catch (e) {
    // Audio context may fail to start if page not interacted with yet
  }
}

export function playHoverSound() {
  if (!globalSoundEnabled) return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(950, ctx.currentTime);
    
    gain.gain.setValueAtTime(0.008, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch (e) {
    // Ignore audio errors
  }
}

export const SoundManager: React.FC = () => {
  const [enabled, setEnabled] = useState(false);

  const toggleSound = () => {
    const nextState = !enabled;
    setEnabled(nextState);
    globalSoundEnabled = nextState;
    localStorage.setItem('axiogen_sound_enabled', String(nextState));
    
    // Play a test sound to initialize audio context on user gesture
    if (nextState) {
      setTimeout(() => {
        playHoverSound();
      }, 50);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('axiogen_sound_enabled');
    if (saved === 'true') {
      setEnabled(true);
      globalSoundEnabled = true;
    }
  }, []);

  return (
    <button
      onClick={toggleSound}
      className="fixed bottom-6 right-6 z-[999] p-3 bg-black/60 border border-white/10 hover:border-white/30 rounded-full text-white/60 hover:text-white transition-all shadow-lg backdrop-blur-md cursor-pointer hover:scale-105"
      aria-label="Toggle Sound Effects"
    >
      {enabled ? <Volume2 className="w-5 h-5 text-purple-400" /> : <VolumeX className="w-5 h-5" />}
    </button>
  );
};
