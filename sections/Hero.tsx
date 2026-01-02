
import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Zap, Loader2, Crosshair } from 'lucide-react';
import { useGame } from '../components/GameContext';
import RobotScene from '../components/RobotScene';

const Hero: React.FC = () => {
  const { addXP, theme } = useGame();

  const handleScroll = () => {
    addXP(25);
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-32 overflow-hidden">
      {/* Structural Lines */}
      <div className={`absolute top-0 left-0 w-full h-[1px] ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'}`}></div>
      <div className={`absolute bottom-0 left-0 w-full h-[1px] ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'}`}></div>
      <div className={`absolute top-0 right-[15%] w-[1px] h-full ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'} hidden lg:block`}></div>
      
      <div className="max-w-[1600px] w-full mx-auto relative z-10 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-6 mb-12">
              <span className="text-[10px] font-syncopate text-blue-500 font-bold uppercase tracking-[0.6em]">B.TECH ECE (VLSI) // YEAR 01</span>
              <div className={`flex-1 h-[1px] ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}></div>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-bold font-syncopate mb-12 leading-[0.95] tracking-[-0.05em] text-[var(--text)] uppercase">
              Silicon <br />
              <span className="text-transparent" style={{ WebkitTextStroke: theme === 'dark' ? '1px rgba(255,255,255,0.15)' : '1px rgba(0,0,0,0.1)' }}>Digital</span> <br />
              Synthesis<span className="text-blue-600">.</span>
            </h1>

            <div className="flex flex-col md:flex-row gap-12 md:items-end">
              <div className="flex-1">
                <p className={`text-xl md:text-2xl ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} font-light leading-relaxed tracking-tight max-w-2xl`}>
                  Synthesizing <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}>VLSI design principles</span> with full-stack AI architectures. Building the next generation of engineer-led startups.
                </p>
              </div>

              <div className="flex shrink-0">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleScroll}
                  className={`group relative px-10 py-5 ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'} font-syncopate font-bold text-[10px] tracking-[0.3em] overflow-hidden transition-all duration-500 uppercase`}
                >
                  <div className="relative z-10 flex items-center gap-3">
                    EXPLORE_SEQUENCE
                    <ArrowDownRight size={16} className="group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
                  </div>
                  <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* 3D Interactive Robot Model Column */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
            className="lg:col-span-5 h-[450px] lg:h-[650px] relative group"
          >
            {/* Viewport UI Decor */}
            <div className="absolute inset-0 pointer-events-none z-20">
               <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 ${theme === 'dark' ? 'border-white/20' : 'border-black/10'}`}></div>
               <div className={`absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 ${theme === 'dark' ? 'border-white/20' : 'border-black/10'}`}></div>
               <div className={`absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 ${theme === 'dark' ? 'border-white/20' : 'border-black/10'}`}></div>
               <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 ${theme === 'dark' ? 'border-white/20' : 'border-black/10'}`}></div>
               
               <div className="absolute top-8 left-8 flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-[9px] font-syncopate text-blue-500/80">
                     <Crosshair size={10} /> OBJ_TRACK_ACTIVE
                  </div>
               </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
            
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <Loader2 size={32} className="text-blue-500 animate-spin" />
              </div>
            }>
              <RobotScene />
            </Suspense>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-16 right-8 md:right-16 lg:right-32 flex items-center gap-4">
        <div className="flex flex-col items-end">
          <span className={`text-[9px] font-syncopate ${theme === 'dark' ? 'text-white/30' : 'text-black/30'} tracking-widest uppercase mb-1`}>Origin_Node</span>
          <span className={`text-xs font-light ${theme === 'dark' ? 'text-white/80' : 'text-black/80'}`}>Vadodara, India</span>
        </div>
        <div className={`w-10 h-10 rounded-full border ${theme === 'dark' ? 'border-white/5' : 'border-black/5'} flex items-center justify-center`}>
           <Zap size={18} className="text-blue-500/50" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
