import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Flame, Award, Target, ArrowRight, Star, TrendingUp, CheckCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ProgressRing } from '../components/ProgressRing';
import { useCourseStore } from '../store/courseStore';
import { useProgressStore } from '../store/progressStore';
import { useAchievementStore } from '../store/achievementStore';
import { courseAPI } from '../api';

export function Home() {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const { setCourses } = useCourseStore();
  const { streakDays, totalLearningTime } = useProgressStore();
  const { achievements, userAchievements } = useAchievementStore();

  useEffect(() => {
    const fetchCourses = async () => {
      const courses = await courseAPI.getCourses();
      setCourses(courses);
      setFeaturedCourses(courses.slice(0, 3));
    };
    fetchCourses();
  }, [setCourses]);

  const unlockedCount = userAchievements.length;
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}小时${minutes}分钟`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              开启你的语言学习之旅
            </h1>
            <p className="text-xl text-indigo-100 mb-8">
              沉浸式多语种学习平台，支持英语、日语、韩语等主流语言，让学习更高效、更有趣
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                <BookOpen className="w-5 h-5 mr-2" />
                开始学习
              </Button>
              <Button size="lg" variant="outline">
                浏览课程
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Flame className="w-7 h-7 text-orange-500" />
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">{streakDays}</div>
              <div className="text-gray-500">连续学习天数</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-7 h-7 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">{formatTime(totalLearningTime)}</div>
              <div className="text-gray-500">累计学习时间</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-7 h-7 text-pink-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">{unlockedCount}/{achievements.length}</div>
              <div className="text-gray-500">已获得成就</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-7 h-7 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">85%</div>
              <div className="text-gray-500">今日目标完成</div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">热门课程</h2>
              <p className="text-gray-500 mt-2">精选优质课程，助你快速入门</p>
            </div>
            <Link
              to="/courses"
              className="flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
            >
              查看全部课程
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course: any) => (
              <Card key={course.id} hover onClick={() => {}}>
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
                    <span className="text-sm text-gray-500">{course.total_chapters} 个章节</span>
                    <Button variant="outline" size="sm">
                      开始学习
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">学习进度</h2>
            <p className="text-gray-500 mt-2">追踪你的学习成果</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">总体进度</h3>
              <div className="flex items-center justify-center mb-6">
                <ProgressRing progress={60} size={180} strokeWidth={12} />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">英语入门</span>
                  <span className="font-medium">60%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full" style={{ width: '60%' }} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">日语入门</span>
                  <span className="font-medium">30%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full" style={{ width: '30%' }} />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">最近成就</h3>
              <div className="grid grid-cols-2 gap-4">
                {achievements.slice(0, 4).map((achievement) => {
                  const isUnlocked = userAchievements.some(ua => ua.achievement_id === achievement.id);
                  return (
                    <div
                      key={achievement.id}
                      className={`flex items-center space-x-3 p-4 rounded-xl ${
                        isUnlocked ? 'bg-gradient-to-r from-indigo-50 to-purple-50' : 'bg-gray-50'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        isUnlocked ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : 'bg-gray-200'
                      }`}>
                        {isUnlocked ? (
                          <Star className="w-6 h-6 text-white" />
                        ) : (
                          <div className="w-4 h-4 border-2 border-gray-400 rounded" />
                        )}
                      </div>
                      <div>
                        <div className={`font-medium ${isUnlocked ? 'text-gray-800' : 'text-gray-400'}`}>
                          {achievement.name}
                        </div>
                        <div className="text-xs text-gray-500">{achievement.points} 积分</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">准备好开始学习了吗？</h2>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
            加入我们，开启你的语言学习之旅。每天坚持，成就更好的自己。
          </p>
          <Button size="lg">
            <BookOpen className="w-5 h-5 mr-2" />
            立即开始学习
          </Button>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">学习统计</h2>
            <p className="text-gray-500 mt-2">过去7天的学习情况</p>
          </div>

          <div className="grid grid-cols-7 gap-4">
            {['周一', '周二', '周三', '周四', '周五', '周六', '周日'].map((day, index) => (
              <div key={day} className="text-center">
                <div className="text-sm text-gray-500 mb-2">{day}</div>
                <div className={`h-32 bg-gray-100 rounded-lg flex items-end justify-center pb-2 ${
                  index < 5 ? 'bg-gradient-to-t from-indigo-500 to-indigo-300' : 'bg-gradient-to-t from-purple-500 to-purple-300'
                }`} style={{ height: `${60 + Math.random() * 40}px` }}>
                  <span className="text-white text-xs font-medium">{Math.floor(20 + Math.random() * 40)}分钟</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
