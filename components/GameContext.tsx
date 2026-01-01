
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { GameState, Achievement } from '../types';
import { INITIAL_ACHIEVEMENTS, XP_PER_LEVEL } from '../constants';

interface GameContextType {
  state: GameState;
  isLevelingUp: boolean;
  theme: 'dark' | 'light';
  addXP: (amount: number) => void;
  unlockAchievement: (id: string) => void;
  markSectionVisited: (sectionId: string) => void;
  toggleTheme: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<GameState>({
    xp: 0,
    level: 1,
    achievements: INITIAL_ACHIEVEMENTS,
    discoveredSections: ['home'],
  });
  const [isLevelingUp, setIsLevelingUp] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  const addXP = useCallback((amount: number) => {
    setState(prev => {
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / XP_PER_LEVEL) + 1;
      
      if (newLevel > prev.level) {
        setIsLevelingUp(true);
        setTimeout(() => setIsLevelingUp(false), 3000);
      }

      return { ...prev, xp: newXP, level: newLevel };
    });
  }, []);

  const unlockAchievement = useCallback((id: string) => {
    setState(prev => {
      const achievementIndex = prev.achievements.findIndex(a => a.id === id);
      if (achievementIndex === -1 || prev.achievements[achievementIndex].unlocked) return prev;

      const newAchievements = [...prev.achievements];
      newAchievements[achievementIndex] = { ...newAchievements[achievementIndex], unlocked: true };
      
      const xpBonus = newAchievements[achievementIndex].xp;
      const newXP = prev.xp + xpBonus;
      const newLevel = Math.floor(newXP / XP_PER_LEVEL) + 1;

      if (newLevel > prev.level) {
        setIsLevelingUp(true);
        setTimeout(() => setIsLevelingUp(false), 3000);
      }

      return {
        ...prev,
        achievements: newAchievements,
        xp: newXP,
        level: newLevel
      };
    });
  }, []);

  const markSectionVisited = useCallback((sectionId: string) => {
    setState(prev => {
      if (prev.discoveredSections.includes(sectionId)) return prev;
      
      const newDiscovered = [...prev.discoveredSections, sectionId];
      const xpBonus = 50;
      const newXP = prev.xp + xpBonus;
      const newLevel = Math.floor(newXP / XP_PER_LEVEL) + 1;

      if (newLevel > prev.level) {
        setIsLevelingUp(true);
        setTimeout(() => setIsLevelingUp(false), 3000);
      }

      // Check for Explorer achievement
      const totalRequired = 5; // home, about, skills, projects, contact
      let updatedAchievements = prev.achievements;
      if (newDiscovered.length >= totalRequired) {
        const explorerIdx = updatedAchievements.findIndex(a => a.id === 'explorer');
        if (explorerIdx !== -1 && !updatedAchievements[explorerIdx].unlocked) {
            updatedAchievements = [...updatedAchievements];
            updatedAchievements[explorerIdx] = { ...updatedAchievements[explorerIdx], unlocked: true };
        }
      }

      return {
        ...prev,
        discoveredSections: newDiscovered,
        xp: newXP,
        level: newLevel,
        achievements: updatedAchievements
      };
    });
  }, []);

  return (
    <GameContext.Provider value={{ state, isLevelingUp, theme, addXP, unlockAchievement, markSectionVisited, toggleTheme }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within GameProvider");
  return context;
};
