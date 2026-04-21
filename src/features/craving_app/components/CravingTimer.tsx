import { useState, useEffect, useRef, useCallback } from 'react';
import { Timer, Pause, Play, RotateCcw } from 'lucide-react';

const PROMPTS = [
  'Observe the feeling without acting',
  'Breathe: 4 counts in, hold 4, 4 counts out',
  'This will pass',
  "You're doing great",
  'Notice where you feel it in your body',
  'Each second is a victory',
];

const TOTAL_SECONDS = 300; // 5 minutes

interface Props {
  t: (s: string) => string;
}

export default function CravingTimer({ t }: Props) {
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(TOTAL_SECONDS);
  const [complete, setComplete] = useState(false);
  const [promptIdx, setPromptIdx] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const stop = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  useEffect(() => {
    if (!running) { stop(); return; }

    intervalRef.current = window.setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          stop();
          setRunning(false);
          setComplete(true);
          if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return stop;
  }, [running, stop]);

  // Rotate prompts every 30 seconds
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setPromptIdx(i => (i + 1) % PROMPTS.length), 30000);
    return () => clearInterval(id);
  }, [running]);

  const reset = () => { stop(); setRunning(false); setSeconds(TOTAL_SECONDS); setComplete(false); setPromptIdx(0); };

  const progress = 1 - seconds / TOTAL_SECONDS;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const circumference = 2 * Math.PI * 90;

  if (!running && !complete && seconds === TOTAL_SECONDS) {
    return (
      <div className="card-calm text-center">
        <h2 className="text-display text-lg font-semibold text-foreground mb-2">{t('Craving timer')}</h2>
        <p className="text-sm text-muted-foreground mb-4">{t('Cravings typically pass within 3-5 minutes')}</p>
        <button
          onClick={() => setRunning(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
        >
          <Timer className="h-4 w-4" />
          {t('Start 5-minute timer')}
        </button>
      </div>
    );
  }

  return (
    <div className="card-calm text-center">
      {complete ? (
        <div className="animate-celebration space-y-3 py-4">
          <div className="text-4xl">🎉</div>
          <h3 className="text-display text-xl font-bold text-primary">{t('You did it!')}</h3>
          <p className="text-sm text-muted-foreground">{t('The craving has passed. You are stronger than you think.')}</p>
          <button onClick={reset} className="mt-2 inline-flex items-center gap-2 rounded-xl bg-muted px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-muted/80">
            <RotateCcw className="h-4 w-4" />
            {t('Reset')}
          </button>
        </div>
      ) : (
        <div className="space-y-4 py-2">
          {/* Circular timer */}
          <div className="relative mx-auto h-52 w-52">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="90" fill="none" strokeWidth="6" className="stroke-muted" />
              <circle
                cx="100" cy="100" r="90" fill="none" strokeWidth="6"
                className="stroke-primary transition-all duration-1000"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - progress)}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-display text-4xl font-bold text-foreground">
                {mins}:{secs.toString().padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Prompt */}
          <p className="text-sm text-muted-foreground animate-fade-in min-h-[2.5rem]" key={promptIdx}>
            {t(PROMPTS[promptIdx])}
          </p>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setRunning(r => !r)}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {running ? t('Pause') : t('Resume')}
            </button>
            <button onClick={reset} className="rounded-xl bg-muted p-2.5 text-muted-foreground hover:bg-muted/80">
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
