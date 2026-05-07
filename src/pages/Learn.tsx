import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Volume2, CheckCircle, XCircle, ArrowRight, BookOpen, Target } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { courseAPI } from '../api';
import { Lesson } from '../types';

export function Learn() {
  const { courseId, module } = useParams<{ courseId: string; module: string }>();
  const [searchParams] = useSearchParams();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const fetchLesson = async () => {
      const lessonId = searchParams.get('lessonId');
      if (lessonId) {
        const lessonData = await courseAPI.getLessonById(lessonId);
        if (lessonData) {
          setLesson(lessonData);
        }
      }
    };
    fetchLesson();
  }, [searchParams]);

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">加载中...</p>
        </div>
      </div>
    );
  }

  const vocabularyItems = lesson.content.vocabulary || [];
  const grammarItems = lesson.content.grammar || [];
  const speakingItems = lesson.content.speaking || [];
  const listeningItems = lesson.content.listening || [];

  const handleNext = () => {
    if (module === 'vocabulary' && currentIndex < vocabularyItems.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowAnswer(false);
    } else if (module === 'grammar' && currentIndex < grammarItems[0]?.questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowAnswer(false);
    } else if (module === 'speaking' && currentIndex < speakingItems.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (module === 'listening' && currentIndex < listeningItems[0]?.questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowAnswer(false);
    } else {
      setCompleted(true);
    }
  };

  const handleSelectOption = (index: number) => {
    if (!showAnswer) {
      setSelectedOption(index);
      setShowAnswer(true);
      if (module === 'grammar' && index === grammarItems[0]?.questions[currentIndex]?.correctAnswer) {
        setScore(prev => prev + 1);
      } else if (module === 'listening' && index === listeningItems[0]?.questions[currentIndex]?.correctAnswer) {
        setScore(prev => prev + 1);
      }
    }
  };

  if (completed) {
    const totalQuestions = module === 'vocabulary' ? vocabularyItems.length :
                          module === 'grammar' ? grammarItems[0]?.questions.length || 0 :
                          module === 'speaking' ? speakingItems.length :
                          listeningItems[0]?.questions.length || 0;
    const percentage = Math.round((score / totalQuestions) * 100);

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
            percentage >= 80 ? 'bg-green-100' : percentage >= 60 ? 'bg-yellow-100' : 'bg-red-100'
          }`}>
            <Target className={`w-12 h-12 ${
              percentage >= 80 ? 'text-green-600' : percentage >= 60 ? 'text-yellow-600' : 'text-red-600'
            }`} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">学习完成!</h2>
          <p className="text-gray-500 mb-4">你已经完成了本次学习</p>
          <div className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {percentage}%
          </div>
          <p className="text-gray-600 mb-6">得分: {score}/{totalQuestions}</p>
          <div className="flex space-x-4 justify-center">
            <Button variant="secondary" onClick={() => window.history.back()}>
              返回课程
            </Button>
            <Button onClick={() => {
              setCurrentIndex(0);
              setScore(0);
              setCompleted(false);
              setSelectedOption(null);
              setShowAnswer(false);
            }}>
              <BookOpen className="w-5 h-5 mr-2" />
              重新学习
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => window.history.back()}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              返回
            </button>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                module === 'vocabulary' ? 'bg-blue-100 text-blue-600' :
                module === 'grammar' ? 'bg-green-100 text-green-600' :
                module === 'speaking' ? 'bg-orange-100 text-orange-600' :
                'bg-purple-100 text-purple-600'
              }`}>
                {module === 'vocabulary' && '词汇'}
                {module === 'grammar' && '语法'}
                {module === 'speaking' && '口语'}
                {module === 'listening' && '听力'}
              </span>
              <span className="text-gray-500">
                {currentIndex + 1}/{
                  module === 'vocabulary' ? vocabularyItems.length :
                  module === 'grammar' ? grammarItems[0]?.questions.length || 0 :
                  module === 'speaking' ? speakingItems.length :
                  listeningItems[0]?.questions.length || 0
                }
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {module === 'vocabulary' && vocabularyItems[currentIndex] && (
          <Card className="p-8">
            <div className="text-center mb-8">
              <button className="mb-4 p-4 bg-indigo-100 rounded-full hover:bg-indigo-200 transition-colors">
                <Volume2 className="w-12 h-12 text-indigo-600" />
              </button>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">{vocabularyItems[currentIndex].word}</h2>
              <p className="text-gray-500 text-lg">{vocabularyItems[currentIndex].pronunciation}</p>
            </div>

            <div className={`p-6 rounded-xl mb-6 ${showAnswer ? 'bg-green-50' : 'bg-gray-50'}`}>
              <h3 className="font-medium text-gray-700 mb-2">中文翻译</h3>
              {showAnswer ? (
                <p className="text-2xl text-green-600">{vocabularyItems[currentIndex].translation}</p>
              ) : (
                <button
                  onClick={() => setShowAnswer(true)}
                  className="text-lg text-gray-400 hover:text-gray-600"
                >
                  点击显示答案
                </button>
              )}
            </div>

            {vocabularyItems[currentIndex].example && (
              <div className="p-6 bg-indigo-50 rounded-xl">
                <h3 className="font-medium text-gray-700 mb-2">例句</h3>
                <p className="text-gray-800">{vocabularyItems[currentIndex].example}</p>
              </div>
            )}

            <div className="mt-8 flex justify-center">
              <Button onClick={handleNext}>
                {currentIndex < vocabularyItems.length - 1 ? '下一个' : '完成'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </Card>
        )}

        {module === 'grammar' && grammarItems[0] && (
          <Card className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{grammarItems[0].rule}</h2>
              <p className="text-gray-600 mb-6">{grammarItems[0].explanation}</p>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-800 mb-2">例句</h3>
                <ul className="space-y-2">
                  {grammarItems[0].examples.map((example, index) => (
                    <li key={index} className="text-green-700">{example}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">练习题</h3>
              <p className="text-xl text-gray-800 mb-6">{grammarItems[0].questions[currentIndex]?.question}</p>
              <div className="space-y-3">
                {grammarItems[0].questions[currentIndex]?.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectOption(index)}
                    disabled={showAnswer}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      showAnswer
                        ? index === grammarItems[0].questions[currentIndex]?.correctAnswer
                          ? 'bg-green-100 border-2 border-green-500'
                          : selectedOption === index
                            ? 'bg-red-100 border-2 border-red-500'
                            : 'bg-gray-50'
                        : selectedOption === index
                          ? 'bg-indigo-100 border-2 border-indigo-500'
                          : 'bg-gray-50 border-2 border-transparent hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {showAnswer && index === grammarItems[0].questions[currentIndex]?.correctAnswer && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                      {showAnswer && selectedOption === index && index !== grammarItems[0].questions[currentIndex]?.correctAnswer && (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                      <span className="font-medium">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {showAnswer && (
              <div className="p-4 bg-blue-50 rounded-lg mb-8">
                <p className="text-blue-800">
                  {selectedOption === grammarItems[0].questions[currentIndex]?.correctAnswer
                    ? '✓ 回答正确!'
                    : `✗ 正确答案是: ${grammarItems[0].questions[currentIndex]?.options[grammarItems[0].questions[currentIndex]?.correctAnswer || 0]}`}
                </p>
              </div>
            )}

            <div className="flex justify-center">
              <Button onClick={handleNext} disabled={!showAnswer}>
                {currentIndex < grammarItems[0].questions.length - 1 ? '下一题' : '完成'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </Card>
        )}

        {module === 'speaking' && speakingItems[currentIndex] && (
          <Card className="p-8">
            <div className="text-center mb-8">
              <button className="mb-4 p-4 bg-orange-100 rounded-full hover:bg-orange-200 transition-colors">
                <Volume2 className="w-12 h-12 text-orange-600" />
              </button>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{speakingItems[currentIndex].text}</h2>
              <p className="text-gray-500 text-lg">{speakingItems[currentIndex].translation}</p>
            </div>

            <div className="p-6 bg-orange-50 rounded-xl mb-8">
              <h3 className="font-medium text-orange-800 mb-4">练习口语</h3>
              <div className="flex justify-center">
                <button className="p-8 bg-white rounded-full shadow-lg hover:shadow-xl transition-all">
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center">
                    <Volume2 className="w-10 h-10 text-white" />
                  </div>
                </button>
              </div>
              <p className="text-center text-orange-600 mt-4">点击麦克风开始跟读</p>
            </div>

            <div className="flex justify-center">
              <Button onClick={handleNext}>
                {currentIndex < speakingItems.length - 1 ? '下一句' : '完成'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </Card>
        )}

        {module === 'listening' && listeningItems[0] && (
          <Card className="p-8">
            <div className="mb-8">
              <h3 className="font-medium text-gray-700 mb-4">听力材料</h3>
              <div className="p-6 bg-purple-50 rounded-xl">
                <div className="flex items-center space-x-4">
                  <button className="p-3 bg-white rounded-full shadow hover:shadow-md transition-all">
                    <Volume2 className="w-8 h-8 text-purple-600" />
                  </button>
                  <div className="flex-1">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-400 to-indigo-400 w-3/4"></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">0:00 / 0:45</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">选择题</h3>
              <p className="text-xl text-gray-800 mb-6">{listeningItems[0].questions[currentIndex]?.question}</p>
              <div className="space-y-3">
                {listeningItems[0].questions[currentIndex]?.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectOption(index)}
                    disabled={showAnswer}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      showAnswer
                        ? index === listeningItems[0].questions[currentIndex]?.correctAnswer
                          ? 'bg-green-100 border-2 border-green-500'
                          : selectedOption === index
                            ? 'bg-red-100 border-2 border-red-500'
                            : 'bg-gray-50'
                        : selectedOption === index
                          ? 'bg-purple-100 border-2 border-purple-500'
                          : 'bg-gray-50 border-2 border-transparent hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {showAnswer && index === listeningItems[0].questions[currentIndex]?.correctAnswer && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                      {showAnswer && selectedOption === index && index !== listeningItems[0].questions[currentIndex]?.correctAnswer && (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                      <span className="font-medium">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {showAnswer && (
              <div className="p-4 bg-blue-50 rounded-lg mb-8">
                <p className="text-blue-800">
                  {selectedOption === listeningItems[0].questions[currentIndex]?.correctAnswer
                    ? '✓ 回答正确!'
                    : `✗ 正确答案是: ${listeningItems[0].questions[currentIndex]?.options[listeningItems[0].questions[currentIndex]?.correctAnswer || 0]}`}
                </p>
              </div>
            )}

            <div className="flex justify-center">
              <Button onClick={handleNext} disabled={!showAnswer}>
                {currentIndex < listeningItems[0].questions.length - 1 ? '下一题' : '完成'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
