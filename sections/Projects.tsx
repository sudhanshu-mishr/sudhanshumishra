
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUpRight, Hash } from 'lucide-react';
import { useGame } from '../components/GameContext';
import { PROJECTS } from '../constants';

const Projects: React.FC = () => {
  const { markSectionVisited, addXP, theme } = useGame();
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView) markSectionVisited('projects');
  }, [inView, markSectionVisited]);

  const handleProjectClick = (link: string) => {
    addXP(20);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="projects" ref={ref} className="py-40 px-8 md:px-16 border-b border-white/5">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-32">
          <div>
            <span className="text-[10px] font-syncopate text-blue-500 tracking-[0.5em] mb-6 block font-bold">03 — ARCHIVES</span>
            <h2 className={`text-5xl md:text-6xl font-bold font-syncopate ${theme === 'dark' ? 'text-white' : 'text-black'} leading-tight tracking-tighter`}>
              ACTIVE <br />
              <span className={theme === 'dark' ? 'text-white/20' : 'text-black/10'}>PROJECTS</span>
            </h2>
          </div>
          <div className={`text-[10px] font-syncopate ${theme === 'dark' ? 'text-white/30' : 'text-black/30'} tracking-[0.3em] uppercase hidden lg:block`}>
            Filtered by relevance — Studio Selections
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.8, 
                delay: idx % 2 === 0 ? 0 : 0.2, 
                ease: [0.21, 1, 0.36, 1] 
              }}
              className="group cursor-pointer"
              onClick={() => handleProjectClick(project.link)}
            >
              <div className={`relative aspect-[16/10] overflow-hidden mb-12 ${theme === 'dark' ? 'bg-[#121214] border-white/5' : 'bg-slate-200 border-black/5'} border`}>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover scale-[1.01] group-hover:scale-110 transition-transform duration-1000 ease-out opacity-80 group-hover:opacity-100 grayscale-[0.5] group-hover:grayscale-0" 
                />
                
                {/* Scanning Line Effect */}
                <motion.div 
                  className="absolute inset-x-0 h-[2px] bg-blue-500/50 z-10 pointer-events-none opacity-0 group-hover:opacity-100"
                  animate={{ top: ['0%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />

                <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                <div className={`absolute top-8 right-8 w-12 h-12 ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'} rounded-full flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out shadow-[0_10px_30px_rgba(0,0,0,0.5)]`}>
                  <ArrowUpRight size={20} />
                </div>
              </div>
              
              <div className="flex items-start gap-8">
                <span className="text-[10px] font-syncopate text-blue-500 font-bold border border-blue-500/30 w-10 h-10 flex items-center justify-center shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                  { (idx + 1).toString().padStart(2, '0') }
                </span>
                <div className="flex-1">
                  <h3 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'} font-syncopate group-hover:text-blue-500 transition-colors mb-4 tracking-tighter`}>
                    {project.title}
                  </h3>
                  <div className="flex gap-4 mb-6">
                    {project.tags.map(tag => (
                      <span key={tag} className={`text-[9px] font-syncopate ${theme === 'dark' ? 'text-white/30' : 'text-black/30'} uppercase tracking-widest flex items-center gap-1`}>
                        <Hash size={8} /> {tag}
                      </span>
                    ))}
                  </div>
                  <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} text-lg font-light leading-relaxed max-w-xl`}>
                    {project.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
