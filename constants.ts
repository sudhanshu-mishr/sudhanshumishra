
import { Project, Skill, Achievement } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Synclane',
    description: 'A high-performance data orchestration platform designed for real-time synchronization across distributed engineering nodes.',
    tags: ['Real-time', 'Socket.io', 'Node.js'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop', // High-tech hardware/chip
    link: 'https://synclane-3.onrender.com',
    xpReward: 200,
  },
  {
    id: 'p2',
    title: 'Xynova',
    description: 'An AI-native synthesis environment for generative logic design and automated workflow acceleration.',
    tags: ['AI', 'React', 'Generative'],
    image: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=1200&auto=format&fit=crop', // Logic circuit aesthetic
    link: 'https://xynova-3.onrender.com',
    xpReward: 250,
  },
  {
    id: 'p3',
    title: 'Aura Smart Pen',
    description: 'A cognitive productivity tool focused on engineering deep-work cycles and complex mental model mapping.',
    tags: ['Embedded', 'IoT', 'VLSI'],
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200&auto=format&fit=crop', // Abstract digital node
    link: 'https://mindnes-2.onrender.com',
    xpReward: 150,
  },
];

export const SKILLS: Skill[] = [
  { name: 'Electronics (VLSI)', level: 85, category: 'Tools' },
  { name: 'Python / AI', level: 90, category: 'AI' },
  { name: 'React / Next.js', level: 92, category: 'Frontend' },
  { name: 'JavaScript / TS', level: 94, category: 'Frontend' },
  { name: 'Embedded C', level: 75, category: 'Backend' },
  { name: 'Full-Stack Dev', level: 88, category: 'Backend' },
  { name: 'LLM Prompting', level: 95, category: 'AI' },
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: 'first_contact', title: 'System Boot', description: 'Initiate the B.Tech ECE (VLSI) core archive.', unlocked: true, xp: 50 },
  { id: 'explorer', title: 'System Architect', description: 'Visit all engineering sub-modules.', unlocked: false, xp: 200 },
  { id: 'talkative', title: 'AI Synapse', description: 'Engage with the Neural Synthesis Node.', unlocked: false, xp: 100 },
  { id: 'skilled', title: 'Hardware Mastery', description: 'Review the silicon-layer capabilities.', unlocked: false, xp: 150 },
];

export const XP_PER_LEVEL = 500;
