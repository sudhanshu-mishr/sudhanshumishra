
import React, { useState, useEffect } from 'react';
import { GameProvider, useGame } from './components/GameContext';
import { PortfolioPage } from './components/ui/starfall-portfolio-landing';
import { PROJECTS } from './constants';
import AIGuide from './components/AIGuide';
import LevelUpOverlay from './components/LevelUpOverlay';
import Testimonials from './sections/Testimonials';
import { SpiralAnimation } from './components/ui/spiral-animation';
import { Highlight } from './components/ui/hero-highlight';
import { renderCanvas } from './components/ui/canvas';
import { AnimatePresence, motion } from 'framer-motion';

const AppContent: React.FC = () => {
  const { addXP } = useGame();
  const [isIntro, setIsIntro] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // Trigger the text reveal shortly after the animation starts
  useEffect(() => {
    const contentTimer = setTimeout(() => setShowContent(true), 1200);
    
    // Automatically transition to the main page after 6 seconds of total intro time
    const autoEnterTimer = setTimeout(() => {
      handleEnter();
    }, 6000); 

    return () => {
      clearTimeout(contentTimer);
      clearTimeout(autoEnterTimer);
    };
  }, []);

  // Initialize cursor canvas once the app is ready or after intro
  useEffect(() => {
    if (!isIntro) {
      const timer = setTimeout(() => renderCanvas(), 100);
      return () => clearTimeout(timer);
    }
  }, [isIntro]);

  const handleCTA = () => {
    addXP(50);
    const archiveSection = document.getElementById('archives');
    if (archiveSection) {
      archiveSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEnter = () => {
    addXP(100);
    setIsIntro(false);
  };

  const portfolioProps = {
    hero: {
      subtitle: 'B.Tech ECE (VLSI) Specialist. Engineering robust AI-native architectures and high-performance digital environments for the next generation of startups.',
    },
    ctaButtons: {
      primary: {
        label: 'Explore Archives',
        onClick: handleCTA,
      },
    },
    projects: PROJECTS,
    stats: [
      { value: 'VLSI', label: 'Primary Node' },
      { value: 'AI/ML', label: 'Logic Layer' },
      { value: 'NODE', label: 'Backend Synthesis' },
    ],
    showAnimatedBackground: true,
  };

  return (
    <div className="relative min-h-screen bg-[#030303] overflow-x-hidden">
      {/* Global Ribbon Cursor Canvas */}
      {!isIntro && (
        <canvas
          id="cursor-canvas"
          className="fixed inset-0 pointer-events-none z-[9999] mix-blend-screen opacity-60"
        />
      )}

      <AnimatePresence mode="wait">
        {isIntro ? (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[1000] bg-black overflow-hidden flex items-center justify-center"
          >
            <div className="absolute inset-0 z-0">
              <SpiralAnimation />
            </div>

            <AnimatePresence>
              {showContent && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="relative z-10 flex flex-col items-center gap-12 text-center px-4"
                >
                  <div className="flex flex-col gap-6">
                    <motion.div 
                      initial={{ letterSpacing: '0.2em', opacity: 0 }}
                      animate={{ letterSpacing: '0.8em', opacity: 1 }}
                      transition={{ duration: 2.5, ease: "easeOut" }}
                      className="text-[10px] md:text-[12px] font-syncopate text-blue-500 font-bold uppercase"
                    >
                      ARCHIVE_SYSTEM_V4.2
                    </motion.div>
                    
                    <motion.h1 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 1.5, delay: 0.3 }}
                      className="text-4xl md:text-7xl lg:text-8xl font-syncopate font-bold text-white tracking-[-0.05em] leading-tight uppercase"
                      style={{ textShadow: '0 0 30px rgba(255, 255, 255, 0.2)' }}
                    >
                      <Highlight className="bg-blue-600/10 dark:bg-blue-600/20 px-6 rounded-2xl">
                        SUDHANSHU <br className="md:hidden" /> MISHRA
                      </Highlight>
                    </motion.h1>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1, duration: 2 }}
                      className="text-[10px] font-syncopate text-white/20 tracking-[0.5em] uppercase mt-4"
                    >
                      SYNCHRONIZING_CORES...
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <PortfolioPage {...portfolioProps} />
            <Testimonials />
            <LevelUpOverlay />
            <AIGuide />

            <footer id="contact-footer" className="bg-[#030303] py-32 border-t border-white/5 relative z-10 px-8">
              <div className="max-w-7xl mx-auto text-center">
                <h2 className="font-syncopate text-4xl font-bold mb-8 tracking-tighter uppercase">INITIATE UPLINK</h2>
                <p className="inter-font text-white/40 max-w-xl mx-auto mb-12 font-light text-balance leading-relaxed">
                  Ready to synthesize a high-performance project? Contact the studio via <span className="text-white font-medium">msudhanshu416@gmail.com</span> or Instagram <span className="text-white font-medium">@sudhanshu_mishra107</span>.
                </p>
                <div className="flex flex-wrap justify-center gap-12 text-[10px] font-bold tracking-[0.5em] text-white/20 uppercase font-syncopate">
                   <a href="#" className="hover:text-blue-500 transition-colors">GitHub</a>
                   <a href="#" className="hover:text-blue-500 transition-colors">LinkedIn</a>
                   <a href="https://www.instagram.com/sudhanshu_mishra107/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">Instagram</a>
                </div>
                <div className="mt-20 text-[8px] opacity-10 font-syncopate tracking-[0.3em] uppercase">
                  &copy; 2024 SUDHANSHU MISHRA // ALL RIGHTS RESERVED // STARFALL CORE v4.2
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
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
