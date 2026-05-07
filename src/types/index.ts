export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  created_at: string;
}

export interface Course {
  id: string;
  name: string;
  language: 'english' | 'japanese' | 'korean';
  level: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  cover_image: string;
  total_chapters: number;
  created_at: string;
}

export interface Chapter {
  id: string;
  course_id: string;
  name: string;
  order: number;
  description: string;
}

export interface Lesson {
  id: string;
  chapter_id: string;
  name: string;
  type: 'vocabulary' | 'grammar' | 'speaking' | 'listening';
  content: LessonContent;
  order: number;
}

export interface LessonContent {
  vocabulary?: VocabularyItem[];
  grammar?: GrammarItem[];
  speaking?: SpeakingItem[];
  listening?: ListeningItem[];
}

export interface VocabularyItem {
  word: string;
  translation: string;
  pronunciation: string;
  example?: string;
}

export interface GrammarItem {
  rule: string;
  explanation: string;
  examples: string[];
  questions: GrammarQuestion[];
}

export interface GrammarQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface SpeakingItem {
  text: string;
  translation: string;
}

export interface ListeningItem {
  audioUrl?: string;
  text: string;
  questions: ListeningQuestion[];
}

export interface ListeningQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface LearningProgress {
  id: string;
  user_id: string;
  course_id: string;
  chapter_id?: string;
  lesson_id?: string;
  progress: number;
  completed_at?: string;
  updated_at: string;
}

export interface LearningRecord {
  id: string;
  user_id: string;
  course_id: string;
  lesson_id: string;
  duration: number;
  score: number;
  created_at: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: 'learning' | 'daily' | 'streak' | 'community';
  condition: AchievementCondition;
  points: number;
}

export interface AchievementCondition {
  type: string;
  value: number;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  unlocked_at: string;
}

export interface Topic {
  id: string;
  user_id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
  updated_at: string;
  author?: User;
  comments_count?: number;
}

export interface Comment {
  id: string;
  topic_id: string;
  user_id: string;
  content: string;
  created_at: string;
  author?: User;
}

export type LanguageType = 'english' | 'japanese' | 'korean';
export type LevelType = 'beginner' | 'intermediate' | 'advanced';
