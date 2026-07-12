'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const ShaderAnimation = dynamic(() => import('./ShaderAnimation').then((m) => m.ShaderAnimation), {
  ssr: false,
});

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar from 0 to 100 over 1.6s
    const startTime = performance.now();
    const duration = 1600;
    const animateProgress = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(pct);
      if (elapsed < duration) requestAnimationFrame(animateProgress);
    };
    requestAnimationFrame(animateProgress);

    const timer1 = setTimeout(() => {
      setIsAnimatingOut(true);
    }, 1800);

    const timer2 = setTimeout(() => {
      onComplete();
    }, 2600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030306] text-white select-none overflow-hidden"
      style={{
        transform: isAnimatingOut ? 'translateY(-100vh)' : 'translateY(0)',
        transition: 'transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)',
        willChange: 'transform',
      }}
    >
      <style>{`
        @keyframes loadingSlide {
          from { left: -100%; }
          to { left: 100%; }
        }
        .animate-loading-slide {
          animation: loadingSlide 1.5s ease-in-out forwards;
        }
        @keyframes scaleIn {
          from { transform: scale(0.85); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scaleIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Dynamic Cosmic Portal Shader Background */}
      <ShaderAnimation />

      {/* Logo container */}
      <div className="relative flex flex-col items-center gap-4 z-10 animate-scale-in">
        {/* ASCII Symbol — Staggered line reveal */}
        <motion.pre
          className="text-white/70 leading-none select-none pointer-events-none mb-2"
          style={{
            fontFamily: 'monospace',
            fontSize: '5.2px',
            lineHeight: '5.6px',
            letterSpacing: '0.8px',
            whiteSpace: 'pre',
            textShadow: '0 0 12px rgba(168, 130, 255, 0.45)',
          }}
          aria-hidden="true"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.015,
                delayChildren: 0.1,
              }
            }
          }}
          initial="hidden"
          animate="visible"
        >
          {`                                                            ##                                                             
                                                            ###                                                            
                                                          ######                                                           
                                                         #########                                                         
                                                        ###########                                                        
                                                       #############                                                       
                                                      ###############                                                      
                                                     #################                                                     
                                                    ###################                                                    
                                                   #####################                                                   
                                                  #######################                                                  
                                                 #########################                                                 
                                                ############################                                               
                                               ##############################                                              
                                              ################################                                             
                                             ##################################                                            
                                            ####################################                                           
                                           ######################################                                          
                                          ########################################                                         
                                         ##########################################                                        
                                           #########################################                                       
                                                 ##############  ####################                                      
                                                   *##########    ####################                                     
                                                     ########      ####################                                    
                                     ###########       #####         ####################                                  
                                  #################      #              ##################                                 
                                 ###################                     ##################                                
                               #######################           #####     #################                               
                              *#######################         ###########  #################                              
                             #########################            ########### ################                             
                            ##########################              ###########################                            
                            ##########################                ##########################                           
                           ###########################                 ##########################                          
                          ###########################                   ##########################*                        
                        *###########################                     ###########################                       
                       ############################                       *##########################                      
                       ###########################                          ##########################                     
                      ###########################                            ##########################                    
                    ############################                              ##########################                   
                   *###########################                                ##########################                  
                   ###########################                                  ##########################                 
                  ###########################                                     #########################                
                  ###########################                                       #########################               
                 ###########################                                         #########################              
                ###########################                                           #########################`.split('\n').map((line, i) => (
            <motion.span
              key={i}
              className="block"
              variants={{
                hidden: { opacity: 0, y: 3, filter: 'blur(2px)' },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  filter: 'blur(0px)',
                  transition: { type: 'spring', stiffness: 200, damping: 15 }
                }
              }}
            >
              {line}
            </motion.span>
          ))}
        </motion.pre>

        <div className="relative flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-300 to-indigo-200 drop-shadow-[0_4px_12px_rgba(0,0,0,0.50)] uppercase">
            AXIOGEN
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-[9px] md:text-xs uppercase tracking-[0.4em] text-white/60 text-center">
          Engineering Digital Futures
        </p>
      </div>

      {/* Progress loading bar at the bottom */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-semibold tabular-nums">
          {progress}%
        </span>
        <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%`, boxShadow: '0 0 12px rgba(168, 85, 247, 0.6)' }}
          />
        </div>
      </div>
    </div>
  );
};
