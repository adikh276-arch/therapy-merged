import { useState, useEffect, useRef, useCallback } from 'react';
import { Timer, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const CALM_PROMPTS = [
  "Observe the feeling without acting",
  "Breathe: 4 counts in, hold 4, 4 counts out",
  "This will pass",
  "You're doing great",
];

const TOTAL_SECONDS = 300; // 5 minutes

const CravingTimer = () => {
  const [running, setRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);
  const [done, setDone] = useState(false);
  const [promptIdx, setPromptIdx] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const promptRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimers = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (promptRef.current) clearInterval(promptRef.current);
  }, []);

  useEffect(() => {
    return clearTimers;
  }, [clearTimers]);

  const startTimer = () => {
    setRunning(true);
    setDone(false);
    setSecondsLeft(TOTAL_SECONDS);
    setPromptIdx(0);

    intervalRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearTimers();
          setDone(true);
          setRunning(false);
          if (navigator.vibrate) navigator.vibrate(200);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    promptRef.current = setInterval(() => {
      setPromptIdx(prev => (prev + 1) % CALM_PROMPTS.length);
    }, 30000);
  };

  const progress = secondsLeft / TOTAL_SECONDS;
  const minutes = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const circumference = 2 * Math.PI * 52;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="w-full">
      {!running && !done && (
        <Button
          onClick={startTimer}
          variant="outline"
          className="w-full h-14 rounded-2xl border-2 border-primary/40 text-primary font-bold text-base hover:bg-primary/5 transition-colors"
        >
          <span className="flex items-center justify-center gap-2">
            <Timer size={20} /> Start 5-minute timer
          </span>
        </Button>
      )}

      {running && (
        <div className="tracker-card flex flex-col items-center animate-slide-up">
          <div className="relative w-32 h-32">
            <svg width="128" height="128" className="transform -rotate-90">
              <circle cx="64" cy="64" r="52" fill="none" stroke="hsl(var(--muted))" strokeWidth="6" />
              <circle
                cx="64" cy="64" r="52" fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000 ease-linear"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-3xl font-black text-foreground">
                {minutes}:{secs.toString().padStart(2, '0')}
              </div>
              <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">remaining</div>
            </div>
          </div>
          <p className="mt-6 text-sm font-medium text-foreground text-center">
            {CALM_PROMPTS[promptIdx]}
          </p>
        </div>
      )}

      {done && (
        <div className="tracker-card flex flex-col items-center animate-slide-up">
          <div className="text-4xl mb-4">✨</div>
          <h3 className="text-lg font-bold text-foreground">5 minutes complete</h3>
          <p className="mt-2 text-sm text-muted-foreground text-center font-medium">
            You handled that wave beautifully. How are you feeling now?
          </p>
          <button
            onClick={startTimer}
            className="mt-6 text-sm text-primary font-bold hover:underline"
          >
            Start again
          </button>
        </div>
      )}
    </div>
  );
};

export default CravingTimer;
