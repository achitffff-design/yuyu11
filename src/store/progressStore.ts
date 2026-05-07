import { create } from 'zustand';
import { LearningProgress, LearningRecord } from '../types';

interface ProgressStore {
  progress: LearningProgress[];
  records: LearningRecord[];
  totalLearningTime: number;
  streakDays: number;
  setProgress: (progress: LearningProgress[]) => void;
  setRecords: (records: LearningRecord[]) => void;
  addProgress: (progress: LearningProgress) => void;
  updateProgress: (progressId: string, updates: Partial<LearningProgress>) => void;
  addRecord: (record: LearningRecord) => void;
  setStreakDays: (days: number) => void;
  calculateTotalTime: () => void;
}

export const useProgressStore = create<ProgressStore>((set, get) => ({
  progress: [],
  records: [],
  totalLearningTime: 0,
  streakDays: 0,
  setProgress: (progress) => set({ progress }),
  setRecords: (records) => {
    set({ records });
    const total = records.reduce((sum, record) => sum + record.duration, 0);
    set({ totalLearningTime: total });
  },
  addProgress: (progress) => set((state) => ({
    progress: [...state.progress, progress],
  })),
  updateProgress: (progressId, updates) => set((state) => ({
    progress: state.progress.map((p) =>
      p.id === progressId ? { ...p, ...updates } : p
    ),
  })),
  addRecord: (record) => set((state) => ({
    records: [...state.records, record],
  })),
  setStreakDays: (days) => set({ streakDays: days }),
  calculateTotalTime: () => {
    const { records } = get();
    const total = records.reduce((sum, record) => sum + record.duration, 0);
    set({ totalLearningTime: total });
  },
}));
