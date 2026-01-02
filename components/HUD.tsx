
import React, { useState, useEffect } from 'react';
import { useGame } from './GameContext';
import { motion } from 'framer-motion';
import { Cpu, Clock, Sun, Moon } from 'lucide-react';
import { AnimatedLayerButton } from './ui/button';
import '../types'; 

const HUD: React.FC = () => {
  const { theme, toggleTheme } = useGame();
  const [time, setTime] = useState(new Date());
  const [cpuLoad, setCpuLoad] = useState(42);
  const [hasKey, setHasKey] = useState<boolean>(false);

  useEffect(() => {
    const checkKey = async () => {
      if (typeof window !== 'undefined' && window.aistudio?.hasSelectedApiKey) {
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
    if (typeof window !== 'undefined' && window.aistudio?.openSelectKey) {
      await window.aistudio.openSelectKey();
      setHasKey(true); 
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
          
          {/* Action Button: INQUIRE */}
          <AnimatedLayerButton 
            className="pointer-events-auto w-[160px] h-[44px]"
            onClick={() => window.open('https://www.instagram.com/sudhanshu_mishra107/', '_blank')}
          >
            INQUIRE
          </AnimatedLayerButton>
        </div>

      </div>
    </nav>
  );
};

export default HUD;
