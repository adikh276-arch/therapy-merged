import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { calculateDuration, formatDuration, calculateSleepScore } from '@/lib/scoreCalculator';
import { Button } from '@/components/ui/button';

interface SleepLogFormProps {
  onCalculate: (data: {
    bedtime: string;
    wakeTime: string;
    totalMinutes: number;
    quality: number;
    score: number;
  }) => void;
  loading?: boolean;
}

const QUALITY_OPTIONS = [
  { value: 1, emoji: '😴', label: 'Poor' },
  { value: 2, emoji: '🙁', label: 'Low' },
  { value: 3, emoji: '😐', label: 'Fair' },
  { value: 4, emoji: '🙂', label: 'Good' },
  { value: 5, emoji: '⭐', label: 'Excellent' },
];

export default function SleepLogForm({ onCalculate, loading }: SleepLogFormProps) {
  const [bedtime, setBedtime] = useState('23:00');
  const [wakeTime, setWakeTime] = useState('07:00');
  const [quality, setQuality] = useState<number>(0);

  const duration = useMemo(() => {
    if (!bedtime || !wakeTime) return 0;
    return calculateDuration(bedtime, wakeTime);
  }, [bedtime, wakeTime]);

  const canCalculate = bedtime && wakeTime && quality > 0 && duration > 0;

  const handleSubmit = () => {
    if (!canCalculate) return;
    const score = calculateSleepScore(duration, quality);
    onCalculate({ bedtime, wakeTime: wakeTime, totalMinutes: duration, quality, score });
  };

  return (
    <div className="glass-card p-5 space-y-5">
      <h2 className="font-display text-lg font-semibold">Log Sleep</h2>

      {/* Time inputs */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-muted-foreground font-medium mb-1.5 block">
            Bedtime (last night)
          </label>
          <input
            type="time"
            value={bedtime}
            onChange={e => setBedtime(e.target.value)}
            className="time-input"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground font-medium mb-1.5 block">
            Wake time
          </label>
          <input
            type="time"
            value={wakeTime}
            onChange={e => setWakeTime(e.target.value)}
            className="time-input"
          />
        </div>
      </div>

      {/* Duration */}
      {duration > 0 && (
        <motion.div
          className="text-center py-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span className="text-2xl font-bold font-display">{formatDuration(duration)}</span>
          <span className="text-muted-foreground text-sm ml-2">total sleep</span>
        </motion.div>
      )}

      {/* Quality */}
      <div>
        <label className="text-xs text-muted-foreground font-medium mb-2 block">
          How was your sleep?
        </label>
        <div className="flex justify-between gap-1">
          {QUALITY_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => setQuality(opt.value)}
              className={`emoji-btn flex-1 ${quality === opt.value ? 'selected' : ''}`}
            >
              <span className="text-2xl">{opt.emoji}</span>
              <span className="text-[10px] text-muted-foreground">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <Button
        onClick={handleSubmit}
        disabled={!canCalculate || loading}
        className="w-full h-12 text-base font-semibold"
        size="lg"
      >
        {loading ? 'Saving…' : 'Calculate Score'}
      </Button>
    </div>
  );
}
