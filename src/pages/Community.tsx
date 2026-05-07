import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MessageCircle, User, Calendar, Send, Plus, ArrowLeft, Search } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useCommunityStore } from '../store/communityStore';
import { communityAPI } from '../api';
import { Topic, Comment } from '../types';

export function Community() {
  const { topics, updateTopics, comments, updateComments, selectedTopic, selectTopic } = useCommunityStore();
  const [showTopicDetail, setShowTopicDetail] = useState(false);
  const [newTopic, setNewTopic] = useState({ title: '', content: '', category: '学习方法' });
  const [newComment, setNewComment] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    const fetchTopics = async () => {
      const topicsData = await communityAPI.getTopics();
      setTopics(topicsData);
    };
    fetchTopics();
  }, [setTopics]);

  useEffect(() => {
    if (selectedTopic) {
      const fetchComments = async () => {
        const commentsData = await communityAPI.getCommentsByTopic(selectedTopic.id);
        setComments(commentsData);
      };
      fetchComments();
    }
  }, [selectedTopic, setComments]);

  const handleSelectTopic = (topic: Topic) => {
    selectTopic(topic);
    setShowTopicDetail(true);
  };

  const handleCreateTopic = async () => {
    if (!newTopic.title || !newTopic.content) return;
    const topic = await communityAPI.createTopic({
      user_id: 'user-1',
      title: newTopic.title,
      content: newTopic.content,
      category: newTopic.category,
    });
    updateTopics(prev => [topic, ...prev]);
    setNewTopic({ title: '', content: '', category: '学习方法' });
    setShowCreateModal(false);
  };

  const handleCreateComment = async () => {
    if (!newComment || !selectedTopic) return;
    const comment = await communityAPI.createComment({
      topic_id: selectedTopic.id,
      user_id: 'user-1',
      content: newComment,
    });
    updateComments(prev => [...prev, { ...comment, author: { id: 'user-1', name: '我', email: 'me@example.com', created_at: '' } }]);
    setNewComment('');
  };

  const categories = ['学习方法', '日语学习', '英语学习', '韩语学习', '影视推荐', '其他'];

  const filteredTopics = topics.filter(topic =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (showTopicDetail && selectedTopic) {
    return (
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setShowTopicDetail(false)}
              className="flex items-center text-white/80 hover:text-white mb-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              返回社区
            </button>
            <h1 className="text-3xl font-bold mb-2">{selectedTopic.title}</h1>
            <div className="flex items-center space-x-4 text-indigo-100">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                {selectedTopic.category}
              </span>
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{selectedTopic.author?.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(selectedTopic.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4" />
                <span>{selectedTopic.comments_count || comments.length} 评论</span>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card className="p-6 mb-6">
            <p className="text-gray-800 text-lg leading-relaxed">{selectedTopic.content}</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">评论 ({comments.length})</h3>

            <div className="space-y-4 mb-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3">
                  <img
                    src={comment.author?.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User'}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-800">{comment.author?.name}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(comment.created_at).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-600">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-3">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="写下你的评论..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
              <Button onClick={handleCreateComment}>
                <Send className="w-4 h-4 mr-2" />
                发送
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">学习社区</h1>
          <p className="text-indigo-100">与其他学习者交流经验，分享学习心得</p>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索话题..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
            </div>
            <Button onClick={() => setShowCreateModal(true)} className="flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              发布话题
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {filteredTopics.map((topic) => (
                <Card key={topic.id} className="p-6 cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleSelectTopic(topic)}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{topic.title}</h3>
                      <p className="text-gray-500 line-clamp-2 mb-4">{topic.content}</p>
                      <div className="flex items-center space-x-4">
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm">
                          {topic.category}
                        </span>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <User className="w-4 h-4" />
                          <span>{topic.author?.name}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(topic.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <MessageCircle className="w-4 h-4" />
                          <span>{topic.comments_count}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">热门话题</h3>
                <div className="space-y-3">
                  {filteredTopics.slice(0, 5).map((topic, index) => (
                    <div key={topic.id} className="flex items-center space-x-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                        index === 0 ? 'bg-red-500 text-white' :
                        index === 1 ? 'bg-orange-500 text-white' :
                        index === 2 ? 'bg-yellow-500 text-white' :
                        'bg-gray-200 text-gray-600'
                      }`}>
                        {index + 1}
                      </span>
                      <span className="text-gray-600 hover:text-indigo-600 cursor-pointer truncate" onClick={() => handleSelectTopic(topic)}>
                        {topic.title}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">社区公告</h3>
                <p className="text-gray-600 text-sm">
                  欢迎加入学习社区！请遵守社区规范，文明交流，共同营造良好的学习氛围。
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="p-6 max-w-lg w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">发布新话题</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">标题</label>
                <input
                  type="text"
                  value={newTopic.title}
                  onChange={(e) => setNewTopic(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="请输入话题标题"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">分类</label>
                <select
                  value={newTopic.category}
                  onChange={(e) => setNewTopic(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">内容</label>
                <textarea
                  value={newTopic.content}
                  onChange={(e) => setNewTopic(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="请输入话题内容"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
                  取消
                </Button>
                <Button onClick={handleCreateTopic}>
                  <Send className="w-4 h-4 mr-2" />
                  发布
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
