
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TimerControlsProps {
  isActive: boolean;
  isPaused: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

const TimerControls = ({ isActive, isPaused, onStart, onPause, onReset }: TimerControlsProps) => {
  return (
    <div className="flex justify-center gap-4">
      <Button
        onClick={onReset}
        size="lg"
        variant="outline"
        className="bg-white/20 border-white/30 text-white hover:bg-white/30"
      >
        <RotateCcw className="w-6 h-6" />
      </Button>
      
      <Button
        onClick={isActive && !isPaused ? onPause : onStart}
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
  );
};

export default TimerControls;
