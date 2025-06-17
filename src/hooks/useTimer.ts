
import { useState, useEffect, useRef } from 'react';
import { playCountdownBeep } from '@/utils/audioUtils';

export interface TimerSettings {
  activeTime: number;
  restTime: number;
  rounds: number;
}

export const useTimer = (settings: TimerSettings) => {
  const [currentRound, setCurrentRound] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isRestPeriod, setIsRestPeriod] = useState(false);
  const [timeLeft, setTimeLeft] = useState(settings.activeTime);
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

  return {
    currentRound,
    isActive,
    isPaused,
    isRestPeriod,
    timeLeft,
    startTimer,
    pauseTimer,
    resetTimer
  };
};
