import { create } from 'zustand';
import { Course, Chapter, Lesson, LanguageType, LevelType } from '../types';

interface CourseStore {
  courses: Course[];
  selectedCourse: Course | null;
  selectedChapter: Chapter | null;
  selectedLesson: Lesson | null;
  filterLanguage: LanguageType | 'all';
  filterLevel: LevelType | 'all';
  setCourses: (courses: Course[]) => void;
  selectCourse: (course: Course | null) => void;
  selectChapter: (chapter: Chapter | null) => void;
  selectLesson: (lesson: Lesson | null) => void;
  setFilterLanguage: (language: LanguageType | 'all') => void;
  setFilterLevel: (level: LevelType | 'all') => void;
}

export const useCourseStore = create<CourseStore>((set) => ({
  courses: [],
  selectedCourse: null,
  selectedChapter: null,
  selectedLesson: null,
  filterLanguage: 'all',
  filterLevel: 'all',
  setCourses: (courses) => set({ courses }),
  selectCourse: (course) => set({ selectedCourse: course, selectedChapter: null, selectedLesson: null }),
  selectChapter: (chapter) => set({ selectedChapter: chapter, selectedLesson: null }),
  selectLesson: (lesson) => set({ selectedLesson: lesson }),
  setFilterLanguage: (language) => set({ filterLanguage: language }),
  setFilterLevel: (level) => set({ filterLevel: level }),
}));
