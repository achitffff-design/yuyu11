import { create } from 'zustand';
import { Achievement, UserAchievement } from '../types';

interface AchievementStore {
  achievements: Achievement[];
  userAchievements: UserAchievement[];
  setAchievements: (achievements: Achievement[]) => void;
  setUserAchievements: (userAchievements: UserAchievement[]) => void;
  unlockAchievement: (achievementId: string) => void;
  isUnlocked: (achievementId: string) => boolean;
  getUnlockedCount: () => number;
}

export const useAchievementStore = create<AchievementStore>((set, get) => ({
  achievements: [],
  userAchievements: [],
  setAchievements: (achievements) => set({ achievements }),
  setUserAchievements: (userAchievements) => set({ userAchievements }),
  unlockAchievement: (achievementId) => {
    const { userAchievements } = get();
    if (!userAchievements.some((ua) => ua.achievement_id === achievementId)) {
      const newUserAchievement: UserAchievement = {
        id: `ua-${Date.now()}`,
        user_id: 'current-user',
        achievement_id: achievementId,
        unlocked_at: new Date().toISOString(),
      };
      set((state) => ({
        userAchievements: [...state.userAchievements, newUserAchievement],
      }));
    }
  },
  isUnlocked: (achievementId) => {
    const { userAchievements } = get();
    return userAchievements.some((ua) => ua.achievement_id === achievementId);
  },
  getUnlockedCount: () => {
    const { userAchievements } = get();
    return userAchievements.length;
  },
}));
