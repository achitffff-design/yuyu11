import { useEffect, useState } from 'react';
import { BookOpen, Clock, Award, TrendingUp, Target, Flame, Calendar } from 'lucide-react';
import { Card } from '../components/Card';
import { ProgressRing } from '../components/ProgressRing';
import { useProgressStore } from '../store/progressStore';
import { useAchievementStore } from '../store/achievementStore';
import { useCourseStore } from '../store/courseStore';
import { progressAPI, courseAPI } from '../api';
import { LearningRecord } from '../types';

export function Progress() {
  const { progress, records, setProgress, setRecords, streakDays, setStreakDays } = useProgressStore();
  const { achievements, userAchievements } = useAchievementStore();
  const { courses } = useCourseStore();
  const [weeklyData, setWeeklyData] = useState<{ day: string; minutes: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const userProgress = await progressAPI.getProgress('user-1');
      setProgress(userProgress);
      const userRecords = await progressAPI.getRecords('user-1');
      setRecords(userRecords);
      setStreakDays(7);

      const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
      const data = days.map((day, index) => ({
        day,
        minutes: Math.floor(20 + Math.random() * 60),
      }));
      setWeeklyData(data);
    };
    fetchData();
  }, [setProgress, setRecords, setStreakDays]);

  const totalMinutes = records.reduce((sum, record) => sum + Math.floor(record.duration / 60), 0);
  const avgScore = records.length > 0
    ? Math.round(records.reduce((sum, record) => sum + record.score, 0) / records.length)
    : 0;
  const unlockedCount = userAchievements.length;

  const getCourseProgress = (courseId: string) => {
    const courseProgress = progress.find(p => p.course_id === courseId);
    return courseProgress ? courseProgress.progress * 100 : 0;
  };

  const getCourseById = (courseId: string) => {
    return courses.find(c => c.id === courseId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">学习进度</h1>
          <p className="text-indigo-100">追踪你的学习成果，见证进步的每一步</p>
        </div>
      </section>

      <section className="py-8 px-4">
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
                <Clock className="w-7 h-7 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">{totalMinutes}</div>
              <div className="text-gray-500">本周学习分钟</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-7 h-7 text-pink-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">{unlockedCount}/{achievements.length}</div>
              <div className="text-gray-500">获得成就</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-7 h-7 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">{avgScore}%</div>
              <div className="text-gray-500">平均正确率</div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">课程进度</h3>
              <div className="space-y-4">
                {progress.map((p) => {
                  const course = getCourseById(p.course_id);
                  if (!course) return null;
                  return (
                    <div key={p.id} className="flex items-center space-x-4">
                      <ProgressRing progress={p.progress * 100} size={80} strokeWidth={6} />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{course.name}</h4>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-sm text-gray-500">
                            {course.language === 'english' ? '英语' : course.language === 'japanese' ? '日语' : '韩语'} - {course.level === 'beginner' ? '入门' : course.level === 'intermediate' ? '进阶' : '高级'}
                          </span>
                          <span className="font-semibold text-indigo-600">{Math.round(p.progress * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div
                            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
                            style={{ width: `${p.progress * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">本周学习统计</h3>
              <div className="flex items-end justify-between h-48 gap-2">
                {weeklyData.map((item) => (
                  <div key={item.day} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-gradient-to-t from-indigo-500 to-purple-400 rounded-t-lg mb-2 transition-all hover:from-indigo-600 hover:to-purple-500"
                      style={{ height: `${(item.minutes / 80) * 100}%` }}
                    />
                    <span className="text-sm text-gray-500">{item.day}</span>
                    <span className="text-xs text-gray-400">{item.minutes}min</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">学习记录</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">日期</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">课程</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">时长</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">得分</th>
                  </tr>
                </thead>
                <tbody>
                  {records.slice(0, 10).map((record) => {
                    const course = getCourseById(record.course_id);
                    return (
                      <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{new Date(record.created_at).toLocaleDateString()}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <BookOpen className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{course?.name || '未知课程'}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{Math.floor(record.duration / 60)}分钟</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            record.score >= 80 ? 'bg-green-100 text-green-700' :
                            record.score >= 60 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {Math.round(record.score)}%
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
