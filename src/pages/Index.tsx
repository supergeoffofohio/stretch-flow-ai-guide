
import { useState } from 'react';
import { Home, Play, BookOpen, User, Clock } from 'lucide-react';
import YogaLibrary from '@/components/YogaLibrary';
import Timer from '@/components/Timer';
import Routines from '@/components/Routines';
import Profile from '@/components/Profile';

const tabs = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'library', label: 'Library', icon: BookOpen },
  { id: 'timer', label: 'Timer', icon: Clock },
  { id: 'routines', label: 'Routines', icon: Play },
  { id: 'profile', label: 'Profile', icon: User },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'library':
        return <YogaLibrary />;
      case 'timer':
        return <Timer />;
      case 'routines':
        return <Routines />;
      case 'profile':
        return <Profile />;
      default:
        return (
          <div className="flex-1 bg-yoga-gradient p-6">
            <div className="max-w-lg mx-auto">
              <div className="text-center mb-8 pt-8">
                <h1 className="text-4xl font-bold text-white mb-2">ZenFlow</h1>
                <p className="text-white/80 text-lg">Your personal yoga companion</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 mb-6">
                <h2 className="text-2xl font-semibold text-white mb-4">Today's Practice</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 rounded-2xl p-4 text-center">
                    <div className="text-3xl font-bold text-white">15</div>
                    <div className="text-white/80 text-sm">Minutes</div>
                  </div>
                  <div className="bg-white/20 rounded-2xl p-4 text-center">
                    <div className="text-3xl font-bold text-white">8</div>
                    <div className="text-white/80 text-sm">Poses</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => setActiveTab('routines')}
                  className="w-full bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-left hover:bg-white/30 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-semibold">Quick Start Routines</h3>
                      <p className="text-white/70 text-sm">Pre-built routines for every level</p>
                    </div>
                    <Play className="w-6 h-6 text-white" />
                  </div>
                </button>

                <button 
                  onClick={() => setActiveTab('library')}
                  className="w-full bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-left hover:bg-white/30 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-semibold">Pose Library</h3>
                      <p className="text-white/70 text-sm">100+ yoga poses with video guides</p>
                    </div>
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                </button>

                <button 
                  onClick={() => setActiveTab('timer')}
                  className="w-full bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-left hover:bg-white/30 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-semibold">Practice Timer</h3>
                      <p className="text-white/70 text-sm">Customizable timer with alerts</p>
                    </div>
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {renderContent()}
      
      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 px-4 py-2 safe-area-pb">
        <div className="flex justify-around items-center max-w-lg mx-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'text-yoga-forest bg-yoga-cream' 
                    : 'text-gray-500 hover:text-yoga-forest'
                }`}
              >
                <Icon className={`w-6 h-6 mb-1 ${isActive ? 'scale-110' : ''} transition-transform`} />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Index;
