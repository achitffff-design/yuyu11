import { useState, useEffect } from 'react';
import { User, Mail, Calendar, BookOpen, Award, Settings, Edit3, Save, X } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { ProgressRing } from '../components/ProgressRing';
import { useUserStore } from '../store/userStore';
import { useAchievementStore } from '../store/achievementStore';
import { useProgressStore } from '../store/progressStore';
import { achievementAPI } from '../api';

export function Profile() {
  const { user, updateUser } = useUserStore();
  const { achievements, userAchievements, setAchievements, setUserAchievements } = useAchievementStore();
  const { streakDays, totalLearningTime } = useProgressStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [activeTab, setActiveTab] = useState('achievements');

  useEffect(() => {
    const fetchData = async () => {
      const achievementsData = await achievementAPI.getAchievements();
      setAchievements(achievementsData);
      const userAchievementIds = await achievementAPI.getUserAchievements('user-1');
      const userAchievementsData = userAchievementIds.map(id => ({
        id: `ua-${id}`,
        user_id: 'user-1',
        achievement_id: id,
        unlocked_at: new Date().toISOString(),
      }));
      setUserAchievements(userAchievementsData);
    };
    fetchData();
  }, [setAchievements, setUserAchievements]);

  const handleSave = () => {
    if (editName.trim()) {
      updateUser({ name: editName });
      setIsEditing(false);
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}小时${minutes}分钟`;
  };

  const unlockedCount = userAchievements.length;
  const totalPoints = userAchievements.reduce((sum, userAchievement) => {
    const achievement = achievements.find(a => a.id === userAchievement.achievement_id);
    return sum + (achievement?.points || 0);
  }, 0);

  const tabs = [
    { id: 'achievements', label: '成就', icon: Award },
    { id: 'stats', label: '统计', icon: BookOpen },
    { id: 'settings', label: '设置', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">个人中心</h1>
          <p className="text-indigo-100">管理你的学习账户和查看学习成果</p>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Card className="p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <img
                  src={user?.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User'}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white hover:bg-indigo-600 transition-colors">
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 text-center md:text-left">
                {isEditing ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                      autoFocus
                    />
                    <Button size="sm" onClick={handleSave}>
                      <Save className="w-4 h-4 mr-1" />
                      保存
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => setIsEditing(false)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                      {user?.name}
                      <button
                        onClick={() => {
                          setEditName(user?.name || '');
                          setIsEditing(true);
                        }}
                        className="text-gray-400 hover:text-indigo-500 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </h2>
                  </div>
                )}
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>{user?.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>加入于 {new Date(user?.created_at || Date.now()).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-indigo-600">{streakDays}</div>
                  <div className="text-sm text-gray-500">连续天数</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">{formatTime(totalLearningTime)}</div>
                  <div className="text-sm text-gray-500">累计学习</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-pink-600">{totalPoints}</div>
                  <div className="text-sm text-gray-500">总积分</div>
                </div>
              </div>
            </div>
          </Card>

          <div className="flex border-b border-gray-200 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {activeTab === 'achievements' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => {
                const isUnlocked = userAchievements.some(ua => ua.achievement_id === achievement.id);
                return (
                  <Card
                    key={achievement.id}
                    className={`p-6 ${isUnlocked ? 'bg-gradient-to-r from-indigo-50 to-purple-50' : 'bg-gray-50'}`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isUnlocked
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500'
                          : 'bg-gray-200'
                      }`}>
                        {isUnlocked ? (
                          <Award className="w-7 h-7 text-white" />
                        ) : (
                          <div className="w-6 h-6 border-2 border-gray-400 rounded" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold ${isUnlocked ? 'text-gray-800' : 'text-gray-400'}`}>
                          {achievement.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">{achievement.description}</p>
                        <div className="flex items-center justify-between mt-3">
                          <span className={`text-sm font-medium ${isUnlocked ? 'text-indigo-600' : 'text-gray-400'}`}>
                            {achievement.points} 积分
                          </span>
                          {isUnlocked && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                              已解锁
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">学习概况</h3>
                <div className="flex items-center justify-center mb-6">
                  <ProgressRing progress={65} size={180} strokeWidth={12} />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">完成课程</span>
                    <span className="font-medium">2/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full" style={{ width: '40%' }} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">学习课时</span>
                    <span className="font-medium">45/120</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full" style={{ width: '37.5%' }} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">掌握词汇</span>
                    <span className="font-medium">320/500</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full" style={{ width: '64%' }} />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">学习数据</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                    <div>
                      <div className="text-sm text-gray-500">本周学习</div>
                      <div className="text-xl font-bold text-blue-600">156 分钟</div>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                    <div>
                      <div className="text-sm text-gray-500">平均正确率</div>
                      <div className="text-xl font-bold text-green-600">85%</div>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Award className="w-6 h-6 text-green-600" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                    <div>
                      <div className="text-sm text-gray-500">获得成就</div>
                      <div className="text-xl font-bold text-purple-600">{unlockedCount} 个</div>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Award className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl">
                    <div>
                      <div className="text-sm text-gray-500">连续学习</div>
                      <div className="text-xl font-bold text-orange-600">{streakDays} 天</div>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <User className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'settings' && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">账户设置</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">邮箱地址</label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">用户名</label>
                  <input
                    type="text"
                    value={user?.name || ''}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">密码</label>
                  <input
                    type="password"
                    placeholder="修改密码"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-800">深色模式</div>
                    <div className="text-sm text-gray-500">启用深色主题</div>
                  </div>
                  <button className="w-12 h-6 bg-gray-300 rounded-full relative">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow" />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-800">每日提醒</div>
                    <div className="text-sm text-gray-500">每天提醒学习</div>
                  </div>
                  <button className="w-12 h-6 bg-indigo-500 rounded-full relative">
                    <div className="absolute left-7 top-1 w-4 h-4 bg-white rounded-full shadow" />
                  </button>
                </div>

                <div className="flex space-x-3">
                  <Button variant="secondary">保存更改</Button>
                  <Button variant="danger">删除账户</Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
