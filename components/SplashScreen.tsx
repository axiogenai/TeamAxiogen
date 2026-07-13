'use client';

import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth progress counter from 0 to 100 over 3.2s
    const duration = 3200;
    const startTime = performance.now();

    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const progressValue = Math.min(Math.floor((elapsed / duration) * 100), 100);
      
      if (progressValue >= 0) {
        setProgress(progressValue);
      }

      if (elapsed < duration) {
        requestAnimationFrame(updateProgress);
      }
    };

    requestAnimationFrame(updateProgress);

    // Auto-dismiss after 4.5 seconds to match animation timings
    const animOutTimer = setTimeout(() => {
      setIsAnimatingOut(true);
    }, 4500);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 5300); // 4.5s + 0.8s transition out

    return () => {
      clearTimeout(animOutTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 w-full h-screen z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden select-none splash-active-marker"
      style={{
        transition: 'opacity 0.8s ease, transform 0.8s ease',
        opacity: isAnimatingOut ? 0 : 1,
        transform: isAnimatingOut ? 'scale(1.02)' : 'scale(1)',
        pointerEvents: isAnimatingOut ? 'none' : 'auto',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <style>{`
        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          opacity: 0;
          animation: gridFade 3s cubic-bezier(0.4, 0, 0.2, 1) 0.5s forwards;
        }

        @keyframes gridFade {
          to { opacity: 1; }
        }

        .logo-wrapper {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 32px;
        }

        .logo-img {
          width: 180px;
          height: auto;
          opacity: 0;
          transform: scale(0.85) translateY(20px);
          animation: logoReveal 1.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
          filter: drop-shadow(0 0 30px rgba(255,255,255,0.15));
        }

        @keyframes logoReveal {
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .logo-glow {
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 60%);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
          animation: glowPulse 4s ease-in-out 1.5s infinite alternate, glowFadeIn 2s ease 0.5s forwards;
        }

        @keyframes glowFadeIn {
          to { opacity: 1; }
        }

        @keyframes glowPulse {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(1.3); opacity: 0.2; }
        }

        .brand-name {
          font-size: 52px;
          font-weight: 800;
          letter-spacing: 14px;
          color: #ffffff;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(30px);
          animation: textReveal 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.8s forwards;
        }

        @keyframes textReveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .tagline {
          font-size: 15px;
          font-weight: 400;
          letter-spacing: 6px;
          color: rgba(255,255,255,0.55);
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(20px);
          animation: textReveal 1.4s cubic-bezier(0.16, 1, 0.3, 1) 1.2s forwards;
        }

        .progress-container {
          position: absolute;
          bottom: 80px;
          left: 50%;
          transform: translateX(-50%);
          width: 200px;
          height: 1px;
          background: rgba(255,255,255,0.1);
          overflow: hidden;
          opacity: 0;
          animation: fadeIn 1s ease 1.5s forwards;
        }

        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
          transition: width 0.1s ease-out;
        }

        @keyframes fadeIn {
          to { opacity: 1; }
        }

        .loading-text {
          position: absolute;
          bottom: 48px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 3px;
          color: rgba(255,255,255,0.55);
          text-transform: uppercase;
          opacity: 0;
          animation: fadeIn 1s ease 1.8s forwards;
        }

        .particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 5;
        }

        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(255,255,255,0.3);
          border-radius: 50%;
          opacity: 0;
        }

        .particle:nth-child(1) { left: 20%; top: 30%; animation: float 6s ease-in-out 2s infinite, particleFade 1s ease 2s forwards; }
        .particle:nth-child(2) { left: 75%; top: 25%; animation: float 8s ease-in-out 2.5s infinite, particleFade 1s ease 2.5s forwards; }
        .particle:nth-child(3) { left: 45%; top: 70%; animation: float 7s ease-in-out 3s infinite, particleFade 1s ease 3s forwards; }
        .particle:nth-child(4) { left: 80%; top: 60%; animation: float 5s ease-in-out 2.2s infinite, particleFade 1s ease 2.2s forwards; }
        .particle:nth-child(5) { left: 15%; top: 65%; animation: float 9s ease-in-out 2.8s infinite, particleFade 1s ease 2.8s forwards; }
        .particle:nth-child(6) { left: 60%; top: 20%; animation: float 6.5s ease-in-out 3.2s infinite, particleFade 1s ease 3.2s forwards; }

        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-5px); }
          75% { transform: translateY(-25px) translateX(8px); }
        }

        @keyframes particleFade {
          to { opacity: 1; }
        }

        .corner {
          position: absolute;
          width: 40px;
          height: 40px;
          opacity: 0;
          animation: cornerReveal 1.5s cubic-bezier(0.16, 1, 0.3, 1) 1s forwards;
        }

        .corner-tl { top: 40px; left: 40px; border-top: 1px solid rgba(255,255,255,0.15); border-left: 1px solid rgba(255,255,255,0.15); }
        .corner-tr { top: 40px; right: 40px; border-top: 1px solid rgba(255,255,255,0.15); border-right: 1px solid rgba(255,255,255,0.15); }
        .corner-bl { bottom: 40px; left: 40px; border-bottom: 1px solid rgba(255,255,255,0.15); border-left: 1px solid rgba(255,255,255,0.15); }
        .corner-br { bottom: 40px; right: 40px; border-bottom: 1px solid rgba(255,255,255,0.15); border-right: 1px solid rgba(255,255,255,0.15); }

        @keyframes cornerReveal {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }

        .scan-line {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
          animation: scanMove 4s linear infinite;
          opacity: 0;
          animation-delay: 2s;
        }

        @keyframes scanMove {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }


        @media (max-width: 600px) {
          .brand-name { font-size: 36px; letter-spacing: 8px; }
          .tagline { font-size: 12px; letter-spacing: 4px; }
          .logo-img { width: 140px; }
          .corner { width: 24px; height: 24px; }
          .corner-tl, .corner-tr { top: 24px; }
          .corner-bl, .corner-br { bottom: 24px; }
          .corner-tl, .corner-bl { left: 24px; }
          .corner-tr, .corner-br { right: 24px; }
        }
      `}</style>


      <div className="grid-overlay"></div>
      <div className="scan-line"></div>

      <div className="particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      <div className="corner corner-tl"></div>
      <div className="corner corner-tr"></div>
      <div className="corner corner-bl"></div>
      <div className="corner corner-br"></div>


      <div className="logo-wrapper">
        <div className="logo-glow"></div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="logo-img" src="/logo.png" alt="AXIOGEN Logo" />
        <h1 className="brand-name">AXIOGEN</h1>
        <p className="tagline">Design · Build · Evolve</p>
      </div>

      <div className="progress-container">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="loading-text">Initializing experience</div>
    </div>
  );
};
