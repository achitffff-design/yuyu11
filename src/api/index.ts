import { Course, Chapter, Lesson, Achievement, Topic, Comment, User, LearningProgress, LearningRecord } from '../types';
import { mockCourses, mockChapters, mockLessons, mockAchievements, mockTopics, mockComments, mockUsers } from '../data/mockData';

export const authAPI = {
  login: async (email: string, password: string): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const user = mockUsers.find((u) => u.email === email);
    if (user) {
      return user;
    }
    throw new Error('Invalid credentials');
  },

  register: async (email: string, password: string, name: string): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      created_at: new Date().toISOString(),
    };
    return newUser;
  },

  getUser: async (): Promise<User | null> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockUsers[0];
  },
};

export const courseAPI = {
  getCourses: async (): Promise<Course[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockCourses;
  },

  getCourseById: async (id: string): Promise<Course | undefined> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return mockCourses.find((c) => c.id === id);
  },

  getChaptersByCourse: async (courseId: string): Promise<Chapter[]> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return mockChapters.filter((ch) => ch.course_id === courseId);
  },

  getLessonsByChapter: async (chapterId: string): Promise<Lesson[]> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return mockLessons.filter((l) => l.chapter_id === chapterId);
  },

  getLessonById: async (id: string): Promise<Lesson | undefined> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return mockLessons.find((l) => l.id === id);
  },
};

export const progressAPI = {
  getProgress: async (userId: string): Promise<LearningProgress[]> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return [
      { id: 'p-1', user_id: userId, course_id: 'course-1', progress: 0.6, updated_at: new Date().toISOString() },
      { id: 'p-2', user_id: userId, course_id: 'course-4', progress: 0.3, updated_at: new Date().toISOString() },
    ];
  },

  updateProgress: async (userId: string, courseId: string, progress: number): Promise<LearningProgress> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return {
      id: `p-${Date.now()}`,
      user_id: userId,
      course_id: courseId,
      progress,
      updated_at: new Date().toISOString(),
    };
  },

  getRecords: async (userId: string): Promise<LearningRecord[]> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const now = new Date();
    const records: LearningRecord[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      records.push({
        id: `r-${i}`,
        user_id: userId,
        course_id: 'course-1',
        lesson_id: 'lesson-1',
        duration: 1800 + Math.random() * 1800,
        score: 70 + Math.random() * 30,
        created_at: date.toISOString(),
      });
    }
    return records;
  },

  addRecord: async (record: Omit<LearningRecord, 'id' | 'created_at'>): Promise<LearningRecord> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return {
      ...record,
      id: `r-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
  },
};

export const achievementAPI = {
  getAchievements: async (): Promise<Achievement[]> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return mockAchievements;
  },

  getUserAchievements: async (userId: string): Promise<string[]> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return ['ach-1', 'ach-4'];
  },

  unlockAchievement: async (userId: string, achievementId: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
  },
};

export const communityAPI = {
  getTopics: async (): Promise<Topic[]> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return mockTopics;
  },

  getTopicById: async (id: string): Promise<Topic | undefined> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return mockTopics.find((t) => t.id === id);
  },

  createTopic: async (topic: Omit<Topic, 'id' | 'created_at' | 'updated_at'>): Promise<Topic> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const now = new Date().toISOString();
    return {
      ...topic,
      id: `topic-${Date.now()}`,
      created_at: now,
      updated_at: now,
    };
  },

  getCommentsByTopic: async (topicId: string): Promise<Comment[]> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return mockComments.filter((c) => c.topic_id === topicId);
  },

  createComment: async (comment: Omit<Comment, 'id' | 'created_at'>): Promise<Comment> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return {
      ...comment,
      id: `comment-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
  },
};
