
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { TimerSettings } from '@/hooks/useTimer';

interface TimerSettingsProps {
  settings: TimerSettings;
  onSettingsChange: (settings: TimerSettings) => void;
  onClose: () => void;
}

const TimerSettingsComponent = ({ settings, onSettingsChange, onClose }: TimerSettingsProps) => {
  return (
    <div className="flex-1 bg-white p-6">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Timer Settings</h1>
          <Button variant="outline" onClick={onClose}>
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
              onChange={(e) => onSettingsChange({ 
                ...settings, 
                activeTime: parseInt(e.target.value) || 30 
              })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="restTime">Rest Time (seconds)</Label>
            <Input
              id="restTime"
              type="number"
              value={settings.restTime}
              onChange={(e) => onSettingsChange({ 
                ...settings, 
                restTime: parseInt(e.target.value) || 10 
              })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="rounds">Number of Rounds</Label>
            <Input
              id="rounds"
              type="number"
              value={settings.rounds}
              onChange={(e) => onSettingsChange({ 
                ...settings, 
                rounds: parseInt(e.target.value) || 8 
              })}
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
};

export default TimerSettingsComponent;
