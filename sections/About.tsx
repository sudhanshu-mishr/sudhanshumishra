
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Cpu, Globe, Zap, Code } from 'lucide-react';
import { useGame } from '../components/GameContext';
import { Component as LogicGateTester } from '../components/ui/asmr-background';

const About: React.FC = () => {
  const { markSectionVisited, theme } = useGame();
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView) markSectionVisited('about');
  }, [inView, markSectionVisited]);

  const stats = [
    { label: 'Engineering Core', value: 'ECE (VLSI)', icon: <Cpu size={14} /> },
    { label: 'Global Network', value: 'Remote / Hybrid', icon: <Globe size={14} /> },
    { label: 'Commerce Node', value: 'Freelance Lead', icon: <Zap size={14} /> },
    { label: 'Code Base', value: 'Python & React', icon: <Code size={14} /> },
  ];

  return (
    <section id="about" ref={ref} className="py-40 px-8 md:px-16 border-b border-[var(--border)]">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-24 items-start">
          
          <div className="lg:w-1/3">
            <span className="text-[10px] font-syncopate text-blue-500 tracking-[0.5em] mb-6 block font-bold">01 — DOSSIER</span>
            <h2 className={`text-5xl md:text-6xl font-bold font-syncopate mb-12 leading-tight text-[var(--text)] tracking-tighter`}>
              BEYOND <br />
              <span className="opacity-20">TRANSISTORS</span>
            </h2>
            <div className={`space-y-8 text-[var(--sub-text)] text-lg font-light leading-relaxed mb-12`}>
              <p>
                Based in Vadodara, I am a first-year B.Tech ECE student specializing in VLSI design. I view technology not just as code, but as a bridge between physical hardware and digital intelligence.
              </p>
              <p>
                Whether it's developing AI-powered prototypes like the smart pen or building high-performance SaaS tools, my focus remains on engineering excellence and entrepreneurial growth.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <LogicGateTester />
            </motion.div>
          </div>

          <div className={`lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border)] border border-[var(--border)]`}>
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: idx * 0.1 }}
                className={`bg-[var(--card-bg)] p-12 hover:bg-blue-500/[0.02] transition-colors group relative overflow-hidden`}
              >
                 <div className="text-blue-500 mb-8 group-hover:scale-110 transition-transform origin-left">{stat.icon}</div>
                 <div className="text-[10px] font-syncopate text-[var(--sub-text)] opacity-60 mb-3 tracking-[0.3em] uppercase">{stat.label}</div>
                 <div className={`text-2xl font-medium text-[var(--text)] group-hover:text-blue-600 transition-colors`}>{stat.value}</div>
                 
                 <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[var(--border)] group-hover:border-blue-500/30 transition-colors"></div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
