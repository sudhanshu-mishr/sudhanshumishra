
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useGame } from '../components/GameContext';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  const { markSectionVisited, theme } = useGame();
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView) markSectionVisited('skills');
  }, [inView, markSectionVisited]);

  return (
    <section id="skills" ref={ref} className={`py-40 px-8 md:px-16 ${theme === 'dark' ? 'bg-[#08080a]' : 'bg-slate-50'} border-b border-[var(--border)] transition-colors duration-500`}>
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-32 gap-16">
          <div className="max-w-xl">
            <span className="text-[10px] font-syncopate text-blue-500 tracking-[0.5em] mb-6 block font-bold">02 — CAPACITY</span>
            <h2 className={`text-5xl md:text-6xl font-bold font-syncopate ${theme === 'dark' ? 'text-white' : 'text-slate-900'} leading-none tracking-tighter`}>
              SYSTEM <br />
              <span className={theme === 'dark' ? 'text-white/20' : 'text-slate-200'}>THROUGHPUT</span>
            </h2>
          </div>
          <p className={`${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'} font-light text-xl max-w-md leading-relaxed`}>
            A comprehensive mapping of technical proficiencies across front-end engineering, back-end orchestration, and cognitive architectures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
          {SKILLS.map((skill, idx) => (
            <motion.div 
              key={skill.name}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.05, duration: 0.6 }}
              className="group cursor-default"
            >
              <div className={`flex justify-between items-end mb-4 border-b ${theme === 'dark' ? 'border-white/5' : 'border-slate-200'} pb-2`}>
                <span className={`font-syncopate text-[9px] ${theme === 'dark' ? 'text-white/60' : 'text-slate-500'} tracking-[0.2em] group-hover:text-blue-500 transition-colors uppercase`}>
                  {skill.name}
                </span>
                <span className={`text-[12px] font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'} tracking-tighter group-hover:scale-110 transition-transform`}>
                  {skill.level.toString().padStart(2, '0')}%
                </span>
              </div>
              <div className={`h-[2px] ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-200'} relative overflow-hidden`}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 + (idx * 0.05) }}
                  className="h-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.3)] group-hover:shadow-[0_0_15px_rgba(37,99,235,0.8)] transition-shadow duration-300"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
