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

  // Fix: Use 'var' declaration in declare global for 'aistudio'. 
  // This automatically adds it to the Window interface and resolves "identical modifiers" conflicts 
  // that can occur with explicit interface Window augmentations in some environments.
  var aistudio: AIStudio;

  // Fixing TS2580: Cannot find name 'process' by augmenting the NodeJS namespace
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY: string;
    }
  }

  // Fix: Removed the var process declaration to resolve the "Cannot redeclare block-scoped variable" error.
  // The NodeJS.ProcessEnv augmentation above correctly types the existing global process.env.
}

export {};