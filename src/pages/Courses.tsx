import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, BookOpen, Star, ArrowRight } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useCourseStore } from '../store/courseStore';
import { courseAPI } from '../api';
import { LanguageType, LevelType } from '../types';

export function Courses() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const { courses, filterLanguage, filterLevel, setFilterLanguage, setFilterLevel, selectCourse } = useCourseStore();

  useEffect(() => {
    const fetchCourses = async () => {
      const coursesData = await courseAPI.getCourses();
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLanguage = filterLanguage === 'all' || course.language === filterLanguage;
    const matchesLevel = filterLevel === 'all' || course.level === filterLevel;
    return matchesSearch && matchesLanguage && matchesLevel;
  });

  const languages: { value: LanguageType | 'all'; label: string }[] = [
    { value: 'all', label: '全部语言' },
    { value: 'english', label: '英语' },
    { value: 'japanese', label: '日语' },
    { value: 'korean', label: '韩语' },
  ];

  const levels: { value: LevelType | 'all'; label: string }[] = [
    { value: 'all', label: '全部难度' },
    { value: 'beginner', label: '入门' },
    { value: 'intermediate', label: '进阶' },
    { value: 'advanced', label: '高级' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">课程中心</h1>
          <p className="text-indigo-100">探索丰富的语言课程，开启你的学习之旅</p>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索课程..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
            </div>
            <Button variant="secondary" onClick={() => setShowFilters(!showFilters)} className="flex items-center justify-center">
              <Filter className="w-5 h-5 mr-2" />
              筛选
            </Button>
          </div>

          {showFilters && (
            <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
              <div className="flex flex-wrap gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">语言</label>
                  <div className="flex flex-wrap gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.value}
                        onClick={() => setFilterLanguage(lang.value)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          filterLanguage === lang.value
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">难度</label>
                  <div className="flex flex-wrap gap-2">
                    {levels.map((level) => (
                      <button
                        key={level.value}
                        onClick={() => setFilterLevel(level.value)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          filterLevel === level.value
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {level.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {filteredCourses.length} 个课程
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} hover onClick={() => selectCourse(course)}>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.cover_image}
                    alt={course.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700">
                      {course.language === 'english' ? '英语' : course.language === 'japanese' ? '日语' : '韩语'}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      course.level === 'beginner' ? 'bg-green-500 text-white' :
                      course.level === 'intermediate' ? 'bg-yellow-500 text-white' : 'bg-red-500 text-white'
                    }`}>
                      {course.level === 'beginner' ? '入门' : course.level === 'intermediate' ? '进阶' : '高级'}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.name}</h3>
                  <p className="text-gray-500 mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{course.total_chapters} 章节</span>
                    </div>
                    <Link
                      to={`/courses/${course.id}`}
                      className="flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                      查看详情
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">没有找到匹配的课程</h3>
              <p className="text-gray-500">尝试调整筛选条件或搜索关键词</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
