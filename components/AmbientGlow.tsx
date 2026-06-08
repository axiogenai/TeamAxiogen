'use client';

import { motion } from 'framer-motion';

export const AmbientGlow = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-5">
      {/* Glow 1 */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-indigo-500/10 blur-[120px]"
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 60, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 25,
          ease: "easeInOut",
        }}
      />
      {/* Glow 2 */}
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[45vw] h-[45vw] rounded-full bg-purple-500/10 blur-[150px]"
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 50, -40, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: "easeInOut",
        }}
      />
      {/* Glow 3 */}
      <motion.div
        className="absolute top-1/2 left-2/3 w-[35vw] h-[35vw] rounded-full bg-pink-500/5 blur-[100px]"
        animate={{
          x: [0, 40, -50, 0],
          y: [0, 60, -30, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};
