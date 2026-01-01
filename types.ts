

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  xpReward: number;
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  category: 'Frontend' | 'Backend' | 'Tools' | 'AI';
  icon?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  xp: number;
}

export interface GameState {
  xp: number;
  level: number;
  achievements: Achievement[];
  discoveredSections: string[];
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

// Global augmentation for the Gemini API Studio integration
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    // Removed readonly to fix error: All declarations of 'aistudio' must have identical modifiers.
    aistudio: AIStudio;
  }

  // Fixing TS2580: Cannot find name 'process'
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY: string;
    }
  }

  // Changed from const to var to fix error: Cannot redeclare block-scoped variable 'process'.
  // Using var inside declare global correctly augments the global scope.
  var process: {
    env: NodeJS.ProcessEnv;
  };
}

export {};
