import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, PlayCircle, ChevronRight, Star, Clock, CheckCircle } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { ProgressRing } from '../components/ProgressRing';
import { useCourseStore } from '../store/courseStore';
import { courseAPI } from '../api';
import { Chapter, Lesson } from '../types';

export function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const { selectedCourse, selectCourse } = useCourseStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      if (id) {
        const course = await courseAPI.getCourseById(id);
        if (course) {
          selectCourse(course);
        }
      }
    };
    fetchCourse();
  }, [id, selectCourse]);

  useEffect(() => {
    const fetchChapters = async () => {
      if (id) {
        const chaptersData = await courseAPI.getChaptersByCourse(id);
        setChapters(chaptersData);
        if (chaptersData.length > 0) {
          setSelectedChapter(chaptersData[0]);
        }
      }
    };
    fetchChapters();
  }, [id]);

  useEffect(() => {
    const fetchLessons = async () => {
      if (selectedChapter) {
        const lessonsData = await courseAPI.getLessonsByChapter(selectedChapter.id);
        setLessons(lessonsData);
      }
    };
    fetchLessons();
  }, [selectedChapter]);

  if (!selectedCourse) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">加载中...</p>
        </div>
      </div>
    );
  }

  const handleStartLesson = (lesson: Lesson) => {
    navigate(`/learn/${id}/${lesson.type}?lessonId=${lesson.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-64 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <button
            onClick={() => navigate('/courses')}
            className="flex items-center text-white/80 hover:text-white mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            返回课程列表
          </button>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <img
              src={selectedCourse.cover_image}
              alt={selectedCourse.name}
              className="w-48 h-48 rounded-xl object-cover shadow-lg"
            />
            <div className="flex-1 text-white">
              <div className="flex items-center space-x-2 mb-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                  {selectedCourse.language === 'english' ? '英语' : selectedCourse.language === 'japanese' ? '日语' : '韩语'}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  selectedCourse.level === 'beginner' ? 'bg-green-500' :
                  selectedCourse.level === 'intermediate' ? 'bg-yellow-500' : 'bg-red-500'
                }`}>
                  {selectedCourse.level === 'beginner' ? '入门' : selectedCourse.level === 'intermediate' ? '进阶' : '高级'}
                </span>
              </div>
              <h1 className="text-3xl font-bold mb-4">{selectedCourse.name}</h1>
              <p className="text-indigo-100 mb-6">{selectedCourse.description}</p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>{selectedCourse.total_chapters} 章节</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5" />
                  <span>4.8 (128 评价)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>预计 20 小时</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">课程大纲</h2>

              <div className="space-y-2">
                {chapters.map((chapter) => (
                  <div
                    key={chapter.id}
                    onClick={() => setSelectedChapter(chapter)}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      selectedChapter?.id === chapter.id
                        ? 'bg-indigo-50 border border-indigo-200'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-medium">
                          {chapter.order}
                        </span>
                        <div>
                          <h3 className="font-medium text-gray-800">{chapter.name}</h3>
                          <p className="text-sm text-gray-500">{chapter.description}</p>
                        </div>
                      </div>
                      <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${
                        selectedChapter?.id === chapter.id ? 'rotate-90' : ''
                      }`} />
                    </div>
                  </div>
                ))}
              </div>

              {selectedChapter && (
                <div className="mt-4 pl-4 border-l-2 border-indigo-300">
                  <h3 className="font-medium text-gray-700 mb-3">课时列表</h3>
                  <div className="space-y-2">
                    {lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            lesson.type === 'vocabulary' ? 'bg-blue-100 text-blue-600' :
                            lesson.type === 'grammar' ? 'bg-green-100 text-green-600' :
                            lesson.type === 'speaking' ? 'bg-orange-100 text-orange-600' :
                            'bg-purple-100 text-purple-600'
                          }`}>
                            {lesson.type === 'vocabulary' && '词汇'}
                            {lesson.type === 'grammar' && '语法'}
                            {lesson.type === 'speaking' && '口语'}
                            {lesson.type === 'listening' && '听力'}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">{lesson.name}</h4>
                            <p className="text-sm text-gray-500">
                              {lesson.type === 'vocabulary' && '单词记忆练习'}
                              {lesson.type === 'grammar' && '语法知识点讲解'}
                              {lesson.type === 'speaking' && '口语跟读练习'}
                              {lesson.type === 'listening' && '听力训练'}
                            </p>
                          </div>
                        </div>
                        <Button onClick={() => handleStartLesson(lesson)} variant="outline" size="sm">
                          <PlayCircle className="w-4 h-4 mr-1" />
                          开始学习
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">学习进度</h3>
              <ProgressRing progress={45} size={160} strokeWidth={10} />
              <p className="mt-4 text-gray-500">已完成 9/20 课时</p>
              <Button className="mt-4 w-full">
                <PlayCircle className="w-5 h-5 mr-2" />
                继续学习
              </Button>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">课程特点</h3>
              <ul className="space-y-3">
                {[
                  '专业教师精心设计',
                  '互动式学习体验',
                  '实时反馈与评估',
                  '灵活的学习节奏',
                ].map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">学习建议</h3>
              <p className="text-gray-600 text-sm">
                建议每天学习 30-60 分钟，保持学习的连贯性。完成每章节后进行复习巩固，效果更佳。
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
