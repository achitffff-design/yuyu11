import { create } from 'zustand';
import { Topic, Comment } from '../types';

interface CommunityStore {
  topics: Topic[];
  comments: Comment[];
  selectedTopic: Topic | null;
  setTopics: (topics: Topic[]) => void;
  updateTopics: (updater: (topics: Topic[]) => Topic[]) => void;
  addTopic: (topic: Topic) => void;
  selectTopic: (topic: Topic | null) => void;
  setComments: (comments: Comment[]) => void;
  updateComments: (updater: (comments: Comment[]) => Comment[]) => void;
  addComment: (comment: Comment) => void;
}

export const useCommunityStore = create<CommunityStore>((set) => ({
  topics: [],
  comments: [],
  selectedTopic: null,
  setTopics: (topics) => set({ topics }),
  updateTopics: (updater) => set((state) => ({ topics: updater(state.topics) })),
  addTopic: (topic) => set((state) => ({
    topics: [topic, ...state.topics],
  })),
  selectTopic: (topic) => set({ selectedTopic: topic }),
  setComments: (comments) => set({ comments }),
  updateComments: (updater) => set((state) => ({ comments: updater(state.comments) })),
  addComment: (comment) => set((state) => ({
    comments: [...state.comments, comment],
  })),
}));
