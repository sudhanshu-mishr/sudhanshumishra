
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
  // Define AIStudio interface to match the global type expected by the environment
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    // Fixed: Added 'readonly' and used 'AIStudio' type to satisfy "identical modifiers" and "same type" requirements.
    readonly aistudio: AIStudio;
  }
}
