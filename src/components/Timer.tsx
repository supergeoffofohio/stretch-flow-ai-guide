import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

interface TimerSettings {
  activeTime: number;
  restTime: number;
  rounds: number;
}

const Timer = () => {
  const [settings, setSettings] = useState<TimerSettings>({
    activeTime: 30,
    restTime: 10,
    rounds: 8
  });
  const [currentRound, setCurrentRound] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isRestPeriod, setIsRestPeriod] = useState(false);
  const [timeLeft, setTimeLeft] = useState(settings.activeTime);
  const [showSettings, setShowSettings] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(time => {
          // Play countdown beeps
          if (time === 3) {
            playCountdownBeep('short');
          } else if (time === 2) {
            playCountdownBeep('short');
          } else if (time === 1) {
            playCountdownBeep('long');
          }

          if (time <= 1) {
            if (isRestPeriod) {
              if (currentRound >= settings.rounds) {
                // Workout complete
                setIsActive(false);
                setCurrentRound(1);
                setIsRestPeriod(false);
                return settings.activeTime;
              } else {
                // Start next active period
                setCurrentRound(round => round + 1);
                setIsRestPeriod(false);
                return settings.activeTime;
              }
            } else {
              // Start rest period
              setIsRestPeriod(true);
              return settings.restTime;
            }
          }
          return time - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, isPaused, isRestPeriod, currentRound, settings]);

  const playCountdownBeep = (type: 'short' | 'long') => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Use a more harmonic, calming frequency (A4 note)
    oscillator.frequency.value = 440;
    oscillator.type = 'sine';
    
    const duration = type === 'short' ? 0.2 : 0.6;
    const volume = 0.2; // Softer volume for calming effect
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  };

  const playAlert = () => {
    // Create a simple beep sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const startTimer = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsPaused(false);
    setCurrentRound(1);
    setIsRestPeriod(false);
    setTimeLeft(settings.activeTime);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = isRestPeriod 
    ? ((settings.restTime - timeLeft) / settings.restTime) * 100
    : ((settings.activeTime - timeLeft) / settings.activeTime) * 100;

  if (showSettings) {
    return (
      <div className="flex-1 bg-white p-6">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Timer Settings</h1>
            <Button 
              variant="outline" 
              onClick={() => setShowSettings(false)}
            >
              Done
            </Button>
          </div>

          <div className="space-y-6">
            <div>
              <Label htmlFor="activeTime">Active Time (seconds)</Label>
              <Input
                id="activeTime"
                type="number"
                value={settings.activeTime}
                onChange={(e) => setSettings(prev => ({ 
                  ...prev, 
                  activeTime: parseInt(e.target.value) || 30 
                }))}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="restTime">Rest Time (seconds)</Label>
              <Input
                id="restTime"
                type="number"
                value={settings.restTime}
                onChange={(e) => setSettings(prev => ({ 
                  ...prev, 
                  restTime: parseInt(e.target.value) || 10 
                }))}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="rounds">Number of Rounds</Label>
              <Input
                id="rounds"
                type="number"
                value={settings.rounds}
                onChange={(e) => setSettings(prev => ({ 
                  ...prev, 
                  rounds: parseInt(e.target.value) || 8 
                }))}
                className="mt-1"
              />
            </div>

            <Card className="p-4 bg-yoga-cream">
              <h3 className="font-semibold mb-2">Preview</h3>
              <p className="text-sm text-gray-600">
                {settings.rounds} rounds × {settings.activeTime}s active + {settings.restTime}s rest
              </p>
              <p className="text-sm text-gray-600">
                Total time: {Math.floor((settings.activeTime + settings.restTime) * settings.rounds / 60)} minutes
              </p>
            </Card>
          </div>
        </div>
      </div>
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

        {/* Timer Display */}
        <div className="relative mb-8">
          <div className="w-64 h-64 mx-auto relative">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="4"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="white"
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                className="transition-all duration-1000 ease-linear"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-5xl font-bold text-white mb-2">
                {formatTime(timeLeft)}
              </div>
              <div className="text-white/80 text-lg">
                {isRestPeriod ? 'Rest' : 'Active'}
              </div>
            </div>
          </div>
        </div>

        {/* Round Indicator */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-8">
          <div className="text-white/80 text-sm mb-1">Round</div>
          <div className="text-3xl font-bold text-white">
            {currentRound} / {settings.rounds}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={resetTimer}
            size="lg"
            variant="outline"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <RotateCcw className="w-6 h-6" />
          </Button>
          
          <Button
            onClick={isActive && !isPaused ? pauseTimer : startTimer}
            size="lg"
            className="bg-white text-yoga-forest hover:bg-white/90 px-8"
          >
            {isActive && !isPaused ? 
              <Pause className="w-6 h-6 mr-2" /> : 
              <Play className="w-6 h-6 mr-2" />
            }
            {isActive && !isPaused ? 'Pause' : 'Start'}
          </Button>
        </div>

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
