
import React from 'react';
import { GameProvider, useGame } from './components/GameContext';
import HUD from './components/HUD';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Contact from './sections/Contact';
import AIGuide from './components/AIGuide';
import InteractiveBackground from './components/InteractiveBackground';
import CursorTrail from './components/CursorTrail';
import LevelUpOverlay from './components/LevelUpOverlay';

const AppContent: React.FC = () => {
  const { theme } = useGame();
  
  return (
    <div className={`relative min-h-screen selection:bg-blue-500 selection:text-white transition-colors duration-500 ${theme === 'dark' ? 'bg-[#0a0a0c] text-slate-100' : 'bg-[#f8fafc] text-slate-900'}`}>
      
      {/* Global Visual FX - Scanlines */}
      <div className={`fixed inset-0 z-[1000] pointer-events-none overflow-hidden transition-opacity duration-1000 ${theme === 'dark' ? 'opacity-[0.03]' : 'opacity-[0.015]'}`}>
         <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
      </div>

      {/* Visual FX Layers */}
      <InteractiveBackground />
      <CursorTrail />
      <LevelUpOverlay />
      
      {/* Core Interface */}
      <HUD />
      
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <AIGuide />

      {/* Studio Footer */}
      <footer className={`relative z-10 py-24 border-t border-[var(--border)] transition-colors duration-500 ${theme === 'dark' ? 'bg-[#0a0a0c]/80' : 'bg-white/80'} backdrop-blur-md px-6`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
            <div className="lg:col-span-2">
              <div className="font-syncopate font-bold text-2xl mb-8">
                SUDHANSHU<span className="text-blue-500">.</span>MISHRA
              </div>
              <p className="text-[var(--sub-text)] font-light max-w-sm leading-relaxed">
                Building the high-performance infrastructure of the future. Focused on AI-native experiences and resilient engineering.
              </p>
            </div>
            <div>
              <div className="text-[10px] font-syncopate text-[var(--sub-text)] opacity-40 uppercase tracking-widest mb-6">Navigation</div>
              <ul className="space-y-4 text-xs font-syncopate text-[var(--sub-text)]">
                 <li><a href="#home" className="hover:text-blue-500 transition-colors uppercase tracking-widest">Mission</a></li>
                 <li><a href="#about" className="hover:text-blue-500 transition-colors uppercase tracking-widest">Dossier</a></li>
                 <li><a href="#projects" className="hover:text-blue-500 transition-colors uppercase tracking-widest">Archives</a></li>
                 <li><a href="#contact" className="hover:text-blue-500 transition-colors uppercase tracking-widest">Contact</a></li>
              </ul>
            </div>
            <div>
              <div className="text-[10px] font-syncopate text-[var(--sub-text)] opacity-40 uppercase tracking-widest mb-6">Connect</div>
              <ul className="space-y-4 text-xs font-syncopate text-[var(--sub-text)]">
                 <li><a href="#" className="hover:text-blue-500 transition-colors uppercase tracking-widest">LinkedIn</a></li>
                 <li><a href="#" className="hover:text-blue-500 transition-colors uppercase tracking-widest">GitHub</a></li>
                 <li><a href="https://www.instagram.com/sudhanshu_mishra107/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors uppercase tracking-widest">Instagram</a></li>
                 <li><a href="#" className="hover:text-blue-500 transition-colors uppercase tracking-widest">X / Twitter</a></li>
                 <li><a href="#" className="hover:text-blue-500 transition-colors uppercase tracking-widest">Bento</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[9px] font-syncopate text-[var(--sub-text)] opacity-30 tracking-[0.2em]">
              &copy; 2024 SUDHANSHU MISHRA &mdash; STUDIO v4.1 &mdash; ALL RIGHTS RESERVED
            </div>
            <div className="flex gap-8">
               <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span className="text-[9px] font-syncopate text-[var(--sub-text)] opacity-30 uppercase">Core Stable</span>
               </div>
               <span className="text-[9px] font-syncopate text-[var(--sub-text)] opacity-30 uppercase">Global Access Enabled</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
};

export default App;
