import { Course, Chapter, Lesson, Achievement, Topic, Comment, User } from '../types';

export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'john@example.com',
    name: 'John Doe',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-2',
    email: 'jane@example.com',
    name: 'Jane Smith',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    created_at: '2024-02-15T00:00:00Z',
  },
];

export const mockCourses: Course[] = [
  {
    id: 'course-1',
    name: '英语入门',
    language: 'english',
    level: 'beginner',
    description: '从零开始学习英语，掌握基础词汇和日常对话',
    cover_image: 'https://picsum.photos/400/300?random=1',
    total_chapters: 10,
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'course-2',
    name: '英语进阶',
    language: 'english',
    level: 'intermediate',
    description: '提升英语水平，掌握复杂语法和高级词汇',
    cover_image: 'https://picsum.photos/400/300?random=2',
    total_chapters: 12,
    created_at: '2024-01-15T00:00:00Z',
  },
  {
    id: 'course-3',
    name: '英语高级',
    language: 'english',
    level: 'advanced',
    description: '精通英语，掌握商务英语和学术写作',
    cover_image: 'https://picsum.photos/400/300?random=3',
    total_chapters: 15,
    created_at: '2024-02-01T00:00:00Z',
  },
  {
    id: 'course-4',
    name: '日语入门',
    language: 'japanese',
    level: 'beginner',
    description: '学习日语五十音图和基础会话',
    cover_image: 'https://picsum.photos/400/300?random=4',
    total_chapters: 8,
    created_at: '2024-01-05T00:00:00Z',
  },
  {
    id: 'course-5',
    name: '日语进阶',
    language: 'japanese',
    level: 'intermediate',
    description: '掌握日语语法和日常交流',
    cover_image: 'https://picsum.photos/400/300?random=5',
    total_chapters: 10,
    created_at: '2024-01-20T00:00:00Z',
  },
  {
    id: 'course-6',
    name: '韩语入门',
    language: 'korean',
    level: 'beginner',
    description: '学习韩语字母和基础词汇',
    cover_image: 'https://picsum.photos/400/300?random=6',
    total_chapters: 8,
    created_at: '2024-01-10T00:00:00Z',
  },
  {
    id: 'course-7',
    name: '韩语进阶',
    language: 'korean',
    level: 'intermediate',
    description: '提升韩语听说能力',
    cover_image: 'https://picsum.photos/400/300?random=7',
    total_chapters: 10,
    created_at: '2024-02-05T00:00:00Z',
  },
];

export const mockChapters: Chapter[] = [
  { id: 'ch-1', course_id: 'course-1', name: '问候与自我介绍', order: 1, description: '学习日常问候语和自我介绍' },
  { id: 'ch-2', course_id: 'course-1', name: '数字与时间', order: 2, description: '学习数字表达和时间表述' },
  { id: 'ch-3', course_id: 'course-1', name: '家庭与朋友', order: 3, description: '学习家庭成员和朋友相关词汇' },
];

export const mockLessons: Lesson[] = [
  {
    id: 'lesson-1',
    chapter_id: 'ch-1',
    name: '基础问候语',
    type: 'vocabulary',
    order: 1,
    content: {
      vocabulary: [
        { word: 'Hello', translation: '你好', pronunciation: '/həˈloʊ/', example: 'Hello, my name is John.' },
        { word: 'Hi', translation: '嗨', pronunciation: '/haɪ/', example: 'Hi, how are you?' },
        { word: 'Good morning', translation: '早上好', pronunciation: '/ɡʊd ˈmɔːrnɪŋ/', example: 'Good morning, everyone.' },
        { word: 'Good afternoon', translation: '下午好', pronunciation: '/ɡʊd ˌæftərˈnuːn/', example: 'Good afternoon, teacher.' },
        { word: 'Good evening', translation: '晚上好', pronunciation: '/ɡʊd ˈiːvnɪŋ/', example: 'Good evening, my dear.' },
      ],
    },
  },
  {
    id: 'lesson-2',
    chapter_id: 'ch-1',
    name: '自我介绍语法',
    type: 'grammar',
    order: 2,
    content: {
      grammar: [
        {
          rule: 'Be动词的用法',
          explanation: 'Be动词(am, is, are)用于表示身份、状态和特征',
          examples: ['I am a student.', 'You are my friend.', 'He is from China.'],
          questions: [
            { question: 'She ___ a teacher.', options: ['am', 'is', 'are'], correctAnswer: 1 },
            { question: 'We ___ happy.', options: ['am', 'is', 'are'], correctAnswer: 2 },
            { question: 'I ___ from Japan.', options: ['am', 'is', 'are'], correctAnswer: 0 },
          ],
        },
      ],
    },
  },
  {
    id: 'lesson-3',
    chapter_id: 'ch-1',
    name: '口语练习',
    type: 'speaking',
    order: 3,
    content: {
      speaking: [
        { text: 'Hello, my name is [Your Name].', translation: '你好，我的名字是[你的名字]。' },
        { text: 'Nice to meet you.', translation: '很高兴认识你。' },
        { text: 'How are you today?', translation: '你今天好吗？' },
        { text: 'I am fine, thank you.', translation: '我很好，谢谢。' },
      ],
    },
  },
  {
    id: 'lesson-4',
    chapter_id: 'ch-2',
    name: '数字听力',
    type: 'listening',
    order: 1,
    content: {
      listening: [
        {
          text: 'Listen to the numbers and choose the correct answer.',
          questions: [
            { question: 'What is the number?', options: ['12', '20', '21'], correctAnswer: 1 },
            { question: 'How many apples?', options: ['5', '15', '50'], correctAnswer: 0 },
          ],
        },
      ],
    },
  },
];

export const mockAchievements: Achievement[] = [
  { id: 'ach-1', name: '初学者', description: '完成第一个课程', icon: 'Star', type: 'learning', condition: { type: 'completed_courses', value: 1 }, points: 100 },
  { id: 'ach-2', name: '坚持不懈', description: '连续学习7天', icon: 'Flame', type: 'streak', condition: { type: 'streak_days', value: 7 }, points: 200 },
  { id: 'ach-3', name: '词汇大师', description: '学习100个单词', icon: 'BookOpen', type: 'learning', condition: { type: 'learned_words', value: 100 }, points: 300 },
  { id: 'ach-4', name: '每日学习', description: '完成今日学习目标', icon: 'Target', type: 'daily', condition: { type: 'daily_goal', value: 1 }, points: 50 },
  { id: 'ach-5', name: '社区活跃', description: '发表10条评论', icon: 'MessageCircle', type: 'community', condition: { type: 'comments', value: 10 }, points: 150 },
  { id: 'ach-6', name: '全能学者', description: '完成所有学习模块', icon: 'Award', type: 'learning', condition: { type: 'completed_modules', value: 4 }, points: 500 },
];

export const mockTopics: Topic[] = [
  {
    id: 'topic-1',
    user_id: 'user-1',
    title: '英语学习心得分享',
    content: '最近开始学习英语，感觉每天坚持很重要。分享一下我的学习方法：每天背20个单词，听30分钟听力，练习15分钟口语。大家有什么好的学习方法吗？',
    category: '学习方法',
    created_at: '2024-03-01T10:00:00Z',
    updated_at: '2024-03-01T10:00:00Z',
    author: mockUsers[0],
    comments_count: 5,
  },
  {
    id: 'topic-2',
    user_id: 'user-2',
    title: '日语五十音图记忆技巧',
    content: '五十音图真的很难记啊！分享一个我觉得有用的方法：把假名做成卡片，每天抽时间复习。大家有什么更好的方法吗？',
    category: '日语学习',
    created_at: '2024-03-02T14:30:00Z',
    updated_at: '2024-03-02T14:30:00Z',
    author: mockUsers[1],
    comments_count: 8,
  },
  {
    id: 'topic-3',
    user_id: 'user-1',
    title: '推荐一部好看的韩语剧',
    content: '想通过韩剧学习韩语，大家有什么推荐的吗？最好是发音清晰、剧情有趣的。',
    category: '影视推荐',
    created_at: '2024-03-03T09:00:00Z',
    updated_at: '2024-03-03T09:00:00Z',
    author: mockUsers[0],
    comments_count: 12,
  },
];

export const mockComments: Comment[] = [
  { id: 'comment-1', topic_id: 'topic-1', user_id: 'user-2', content: '同感！每天坚持真的很重要。我每天早上起床后学习30分钟，效果很好。', created_at: '2024-03-01T11:00:00Z', author: mockUsers[1] },
  { id: 'comment-2', topic_id: 'topic-1', user_id: 'user-1', content: '谢谢分享！我也试试早上学习。', created_at: '2024-03-01T12:00:00Z', author: mockUsers[0] },
];
