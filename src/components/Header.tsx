import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Globe, BookOpen, BarChart3, User, LogOut, Menu, X } from 'lucide-react';
import { useUserStore } from '../store/userStore';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isLoggedIn, logout } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { href: '/', label: '首页', icon: Globe },
    { href: '/courses', label: '课程中心', icon: BookOpen },
    { href: '/progress', label: '学习进度', icon: BarChart3 },
    { href: '/community', label: '社区', icon: User },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                语言学习平台
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center space-x-2">
                  <img
                    src={user?.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User'}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-gray-700 font-medium">{user?.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>退出</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-600 hover:text-indigo-600">
                  登录
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all"
                >
                  注册
                </Link>
              </div>
            )}
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="flex items-center space-x-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
              {isLoggedIn ? (
                <div className="flex flex-col space-y-2 px-4">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-3 py-2 text-gray-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <img
                      src={user?.avatar_url}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{user?.name}</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 py-2 text-gray-600 hover:text-red-500"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>退出</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 px-4">
                  <Link
                    to="/login"
                    className="py-2 text-gray-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    登录
                  </Link>
                  <Link
                    to="/register"
                    className="py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    注册
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
