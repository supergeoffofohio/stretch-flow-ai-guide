
interface TimerDisplayProps {
  timeLeft: number;
  isRestPeriod: boolean;
  progress: number;
}

const TimerDisplay = ({ timeLeft, isRestPeriod, progress }: TimerDisplayProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
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
  );
};

export default TimerDisplay;
