import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Sparkles, Settings } from 'lucide-react';
import SilkShader from './silk-shader';
import { AiHeroBackground } from './ai-hero-background';
import { HeroHighlight, Highlight } from './hero-highlight';
import { PortfolioGallery } from './portfolio-gallery';
import { AnimatedLayerButton } from './button';
import { GlowingEffect } from './glowing-effect';
import { cn } from '../../lib/utils';

// --- TYPE DEFINITIONS FOR PROPS ---
interface Project { title: string; description: string; tags: string[]; image?: string; link?: string; }
interface Stat { value: string; label: string; }

export interface PortfolioPageProps {
  hero?: { subtitle: React.ReactNode; };
  ctaButtons?: { primary: { label: string; onClick?: () => void; }; };
  projects?: Project[];
  stats?: Stat[];
  showAnimatedBackground?: boolean;
}

// Fixed: Added 'key' to props type to resolve TS2322 error during mapping in PortfolioPage
const GridItem = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: React.ReactNode; key?: string | number }) => {
  return (
    <li className="list-none w-full max-w-sm">
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-white/5 p-2 md:rounded-[1.5rem] md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] border-white/10 bg-[#0a0a0c] p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-8">
          <div className="relative flex flex-1 flex-col justify-between gap-6">
            <div className="w-fit rounded-lg border-[0.75px] border-white/10 bg-white/5 p-3 text-blue-500">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-3xl leading-[1.375rem] font-bold font-syncopate tracking-[-0.04em] uppercase text-white">
                {title}
              </h3>
              <p className="text-[9px] font-syncopate font-bold tracking-[0.4em] uppercase text-white/30">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

// --- MAIN PORTFOLIO COMPONENT ---
const PortfolioPage: React.FC<PortfolioPageProps> = ({
  hero,
  ctaButtons,
  projects = [],
  stats = [],
  showAnimatedBackground = true,
}) => {
  const statIcons = [<Cpu size={24} />, <Sparkles size={24} />, <Settings size={24} />];

  return (
    <div className="relative bg-[#030303] text-white overflow-x-hidden min-h-screen font-inter">
      {/* Silicon Digital Synthesis Background Layers */}
      {showAnimatedBackground && (
        <>
          <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
            <AiHeroBackground />
          </div>
          <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
            <SilkShader className="w-full h-full" />
          </div>
          <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#030303]/40 via-transparent to-[#030303] pointer-events-none" />
        </>
      )}
      
      <div className="relative z-10">
        <nav className="w-full px-8 py-8 backdrop-blur-md sticky top-0 border-b border-white/5 z-[100]">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Left Side: Logo */}
                <div className="flex items-center space-x-3 group cursor-default">
                    <div className="w-9 h-9 rounded bg-blue-600/10 border border-blue-500/20 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/20 transition-colors duration-500" />
                        <span className="font-syncopate text-[10px] font-bold text-white tracking-widest relative z-10">SM</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-syncopate text-[9px] font-bold text-white tracking-[0.4em] uppercase">MISHRA</span>
                        <span className="font-syncopate text-[7px] text-blue-500/60 tracking-[0.2em] uppercase">V4.2_ENGINEERING</span>
                    </div>
                </div>

                {/* Right Side: Inquire Button */}
                <AnimatedLayerButton 
                  className="w-[160px] h-[44px]"
                  onClick={() => window.open('https://www.instagram.com/sudhanshu_mishra107/', '_blank')}
                >
                  INQUIRE
                </AnimatedLayerButton>
            </div>
        </nav>

        <main className="w-full px-8">
            {/* HERO SECTION */}
            <section id="hero" className="min-h-[85vh] flex flex-col items-center justify-center pt-20">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="mb-12"
                    >
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-syncopate font-bold text-white tracking-tighter mb-8 leading-[0.85] uppercase">
                            <HeroHighlight containerClassName="h-auto py-0 bg-transparent">
                                <Highlight className="px-6 rounded-2xl">SUDHANSHU</Highlight>
                            </HeroHighlight>
                            <span className="block gradient-text tracking-tighter py-4">MISHRA</span>
                        </h1>
                        <p className="max-w-3xl mx-auto text-lg md:text-xl font-light text-white/50 leading-relaxed tracking-tight">
                            {hero?.subtitle}
                        </p>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="flex flex-col sm:flex-row gap-8 justify-center items-center mt-12"
                    >
                        <AnimatedLayerButton 
                          className="w-[220px] h-[60px]"
                          onClick={ctaButtons?.primary.onClick}
                        >
                          {ctaButtons?.primary.label || 'EXPLORE_ARCHIVES'}
                        </AnimatedLayerButton>
                    </motion.div>
                </div>
            </section>

            {/* PROJECT ARCHIVES */}
            <PortfolioGallery 
              title="ARCHIVE_COLLECTION"
              images={projects.map(p => ({
                src: p.image || "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
                alt: p.title,
                link: p.link
              }))}
              className="w-full -mt-20"
            />

            {/* SYNTHESIS STATS */}
            <section id="skills" className="py-40">
                <div className="max-w-7xl mx-auto">
                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-12 justify-items-center">
                        {stats.map((stat, index) => (
                          <GridItem 
                            key={stat.label}
                            icon={statIcons[index] || <Cpu size={24} />}
                            title={stat.value}
                            description={stat.label}
                          />
                        ))}
                    </ul>
                </div>
            </section>
        </main>
      </div>
    </div>
  );
};

export { PortfolioPage };