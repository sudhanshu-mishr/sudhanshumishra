
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from './GameContext';

const LevelUpOverlay: React.FC = () => {
  const { isLevelingUp, state } = useGame();

  return (
    <AnimatePresence>
      {isLevelingUp && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[500] pointer-events-none flex items-center justify-center bg-blue-600/10 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 1.2, opacity: 0 }}
            className="text-center"
          >
            <motion.div 
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
              className="text-[12px] font-syncopate text-blue-400 tracking-[1em] mb-4"
            >
              SYSTEM UPGRADED
            </motion.div>
            <h2 className="text-7xl md:text-9xl font-bold font-syncopate text-white tracking-tighter mb-2">
              LEVEL <span className="text-blue-500">{state.level}</span>
            </h2>
            <div className="flex justify-center gap-2">
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: [0, 40, 0] }}
                  transition={{ delay: i * 0.05, repeat: Infinity, duration: 1 }}
                  className="w-1 bg-blue-500/50"
                />
              ))}
            </div>
          </motion.div>
          
          {/* Glitch lines */}
          <div className="absolute inset-0 overflow-hidden">
             {Array.from({ length: 5 }).map((_, i) => (
               <motion.div
                 key={i}
                 animate={{ 
                   y: ['0%', '100%'],
                   opacity: [0, 1, 0]
                 }}
                 transition={{ 
                   duration: 0.5, 
                   delay: i * 0.1, 
                   repeat: Infinity,
                   ease: "linear"
                 }}
                 className="w-full h-px bg-white/20"
               />
             ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LevelUpOverlay;
