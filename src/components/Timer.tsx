
import { useState } from 'react';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTimer, TimerSettings } from '@/hooks/useTimer';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import TimerSettingsComponent from './TimerSettings';

const Timer = () => {
  const [settings, setSettings] = useState<TimerSettings>({
    activeTime: 30,
    restTime: 10,
    rounds: 8
  });
  const [showSettings, setShowSettings] = useState(false);

  const {
    currentRound,
    isActive,
    isPaused,
    isRestPeriod,
    timeLeft,
    startTimer,
    pauseTimer,
    resetTimer
  } = useTimer(settings);

  const progress = isRestPeriod 
    ? ((settings.restTime - timeLeft) / settings.restTime) * 100
    : ((settings.activeTime - timeLeft) / settings.activeTime) * 100;

  if (showSettings) {
    return (
      <TimerSettingsComponent
        settings={settings}
        onSettingsChange={setSettings}
        onClose={() => setShowSettings(false)}
      />
    );
  }

  return (
    <div className="flex-1 bg-yoga-gradient p-6">
      <div className="max-w-lg mx-auto text-center">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">Practice Timer</h1>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setShowSettings(true)}
            className="text-white hover:bg-white/20"
          >
            <Settings className="w-6 h-6" />
          </Button>
        </div>

        <TimerDisplay
          timeLeft={timeLeft}
          isRestPeriod={isRestPeriod}
          progress={progress}
        />

        {/* Round Indicator */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-8">
          <div className="text-white/80 text-sm mb-1">Round</div>
          <div className="text-3xl font-bold text-white">
            {currentRound} / {settings.rounds}
          </div>
        </div>

        <TimerControls
          isActive={isActive}
          isPaused={isPaused}
          onStart={startTimer}
          onPause={pauseTimer}
          onReset={resetTimer}
        />

        {/* Status */}
        <div className="mt-8 text-white/80">
          {!isActive && currentRound === settings.rounds && timeLeft === settings.activeTime && (
            <p>Workout Complete! 🎉</p>
          )}
          {isActive && (
            <p className="animate-pulse-gentle">
              {isRestPeriod ? 'Take a breath and prepare for the next pose' : 'Hold your pose with mindful breathing'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Timer;
