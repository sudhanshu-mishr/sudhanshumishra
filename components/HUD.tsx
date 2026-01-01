
import React, { useState, useEffect } from 'react';
import { useGame } from './GameContext';
import { XP_PER_LEVEL } from '../constants';
import { motion } from 'framer-motion';
import { Terminal, Activity, Cpu, Clock, Instagram, Sun, Moon, Link as LinkIcon, ShieldAlert } from 'lucide-react';

const HUD: React.FC = () => {
  const { state, theme, toggleTheme } = useGame();
  const [time, setTime] = useState(new Date());
  const [cpuLoad, setCpuLoad] = useState(42);
  const [hasKey, setHasKey] = useState<boolean>(false);

  const xpInCurrentLevel = state.xp % XP_PER_LEVEL;
  const progressPercent = (xpInCurrentLevel / XP_PER_LEVEL) * 100;

  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio?.hasSelectedApiKey) {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasKey(selected);
      }
    };
    checkKey();
    
    const timer = setInterval(() => setTime(new Date()), 1000);
    const cpuTimer = setInterval(() => setCpuLoad(prev => {
      const delta = Math.floor(Math.random() * 5) - 2;
      return Math.min(Math.max(prev + delta, 30), 65);
    }), 2000);
    return () => {
      clearInterval(timer);
      clearInterval(cpuTimer);
    };
  }, []);

  const handleAuthorize = async () => {
    if (window.aistudio?.openSelectKey) {
      await window.aistudio.openSelectKey();
      setHasKey(true); // Assume success per protocol to avoid race condition
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-8 py-6 pointer-events-none">
      <div className="max-w-[1800px] mx-auto flex justify-between items-start">
        
        {/* Brand Identity */}
        <div className="flex items-start gap-8 pointer-events-auto">
          <div className="flex flex-col">
            <span className="font-syncopate font-bold text-sm tracking-[0.3em] text-[var(--text)]">
              SUDHANSHU MISHRA
            </span>
            <span className="text-[9px] font-syncopate text-blue-500/60 mt-0.5 tracking-[0.5em]">
              ENGINEERING STUDIO
            </span>
          </div>

          <div className="hidden sm:flex flex-col gap-1 pt-1">
            <div className={`flex items-center gap-2 text-[8px] font-syncopate ${hasKey ? 'text-green-500' : 'text-amber-500'}`}>
              <div className={`w-1 h-1 rounded-full ${hasKey ? 'bg-green-500' : 'bg-amber-500 animate-pulse'}`}></div>
              {hasKey ? 'NEURAL_LINK_ESTABLISHED' : 'NEURAL_LINK_OFFLINE'}
            </div>
            {!hasKey && (
              <button 
                onClick={handleAuthorize}
                className="text-[7px] font-syncopate text-blue-500 hover:underline tracking-widest uppercase text-left pointer-events-auto"
              >
                [ AUTHORIZE_SYSTEM ]
              </button>
            )}
          </div>
        </div>

        {/* Global Progress State & Metrics */}
        <div className="flex items-start gap-10 pointer-events-auto">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-black/5 hover:bg-white/10 transition-colors pointer-events-auto group"
            title="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun size={18} className="text-blue-400 group-hover:rotate-45 transition-transform" />
            ) : (
              <Moon size={18} className="text-blue-600 group-hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* Metrics Panel */}
          <div className="hidden lg:flex flex-col gap-3 text-right">
            <div className="flex items-center justify-end gap-3 text-[9px] font-syncopate text-[var(--text)]/40 tracking-widest uppercase">
              <span className="flex items-center gap-1"><Clock size={10} /> {time.toLocaleTimeString([], { hour12: false })}</span>
              <span className="w-[1px] h-3 bg-white/10"></span>
              <span className="flex items-center gap-1"><Cpu size={10} /> {cpuLoad}% CORE_LOAD</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1.5">
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-syncopate text-[var(--text)]/30 tracking-[0.2em] uppercase">Core_Sync</span>
              <span className="text-[10px] font-bold text-[var(--text)] tracking-widest">LVL_{state.level.toString().padStart(2, '0')}</span>
            </div>
            <div className="w-48 h-[2px] bg-[var(--text)]/5 relative">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.6)]"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
          
          {/* Action Button: INQUIRE */}
          <motion.a 
            href="https://www.instagram.com/sudhanshu_mishra107/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2.5 bg-[var(--text)] text-[var(--bg)] px-6 py-2 rounded-sm text-[10px] font-syncopate font-bold tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.1)] group"
          >
             <Instagram size={12} className="group-hover:rotate-12 transition-transform" />
             <span>INQUIRE</span>
          </motion.a>
        </div>

      </div>
    </nav>
  );
};

export default HUD;
