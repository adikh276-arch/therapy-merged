import { useState, useRef } from 'react';
import { Minus, Plus } from 'lucide-react';
import { formatTime12h } from '@/lib/formatting';
import { SmokeLog } from '@/hooks/useSmokeLogs';

const LOCATIONS = ['Home', 'Workplace', 'Commute', 'Social', 'Outdoors', 'Other'];
const TRIGGERS = ['Stress', 'Boredom', 'After meal', 'Habit', 'Social pressure', 'Other'];
const MOODS = [
  { emoji: '😣', label: 'Very low' },
  { emoji: '😟', label: 'Low' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '🙂', label: 'Good' },
  { emoji: '😄', label: 'Great' },
];

interface MainLoggingCardProps {
  todayCount: number;
  lastLogTime: Date | null;
  onAdd: (detail?: { location?: string; trigger?: string; mood?: string; notes?: string }) => void;
  onRemove: () => boolean;
}

const MainLoggingCard = ({ todayCount, lastLogTime, onAdd, onRemove }: MainLoggingCardProps) => {
  const [showDetail, setShowDetail] = useState(false);
  const [location, setLocation] = useState<string | null>(null);
  const [trigger, setTrigger] = useState<string | null>(null);
  const [mood, setMood] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [animating, setAnimating] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);

  const handleAdd = () => {
    setAnimating(true);
    setTimeout(() => setAnimating(false), 300);
    onAdd({
      location: location ?? undefined,
      trigger: trigger ?? undefined,
      mood: mood ?? undefined,
      notes: notes || undefined,
    });
    setLocation(null);
    setTrigger(null);
    setMood(null);
    setNotes('');
  };

  const handleRemove = () => {
    onRemove();
  };

  return (
    <div className="bg-card rounded-lg border border-border card-shadow p-5 space-y-4">
      {/* Circle counter */}
      <div className="flex flex-col items-center gap-2">
        <div className="w-[140px] h-[140px] rounded-full border border-border flex flex-col items-center justify-center">
          <span
            ref={countRef}
            className={`font-heading text-[52px] font-bold text-foreground leading-none ${animating ? 'animate-scale-pop' : ''}`}
          >
            {todayCount}
          </span>
          <span className="font-body text-xs text-muted-foreground">today</span>
        </div>
        <span className="font-body text-xs text-muted-foreground">
          {lastLogTime ? `Last: ${formatTime12h(lastLogTime)}` : 'No entries today'}
        </span>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleRemove}
          className="flex-1 h-14 rounded-[14px] bg-input border border-border flex items-center justify-center tap-scale transition-colors"
        >
          <Minus size={20} className="text-muted-foreground" />
        </button>
        <button
          onClick={handleAdd}
          className="flex-1 h-14 rounded-[14px] bg-primary flex items-center justify-center tap-scale transition-colors"
        >
          <Plus size={20} className="text-primary-foreground" />
        </button>
      </div>

      {/* Detail toggle */}
      <button
        onClick={() => setShowDetail(!showDetail)}
        className="w-full text-center font-body text-[13px] text-primary"
      >
        {showDetail ? 'Hide detail' : 'Add detail'}
      </button>

      {/* Detail section */}
      {showDetail && (
        <div className="space-y-4 transition-all duration-300">
          {/* Where */}
          <div className="space-y-2">
            <span className="font-body text-xs font-medium text-foreground uppercase tracking-wide">Where</span>
            <div className="flex flex-wrap gap-2">
              {LOCATIONS.map(l => (
                <button
                  key={l}
                  onClick={() => setLocation(location === l ? null : l)}
                  className={`px-3.5 py-1.5 rounded-lg font-body text-[13px] min-h-[36px] tap-scale transition-colors border ${
                    location === l
                      ? 'bg-accent border-primary text-primary-dark font-medium'
                      : 'bg-card border-border text-muted-foreground'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Trigger */}
          <div className="space-y-2">
            <span className="font-body text-xs font-medium text-foreground uppercase tracking-wide">What triggered</span>
            <div className="flex flex-wrap gap-2">
              {TRIGGERS.map(t => (
                <button
                  key={t}
                  onClick={() => setTrigger(trigger === t ? null : t)}
                  className={`px-3.5 py-1.5 rounded-lg font-body text-[13px] min-h-[36px] tap-scale transition-colors border ${
                    trigger === t
                      ? 'bg-accent border-primary text-primary-dark font-medium'
                      : 'bg-card border-border text-muted-foreground'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Mood */}
          <div className="space-y-2">
            <span className="font-body text-xs font-medium text-foreground uppercase tracking-wide">Mood at the time</span>
            <div className="flex gap-2 justify-between">
              {MOODS.map(m => (
                <button
                  key={m.label}
                  onClick={() => setMood(mood === m.label ? null : m.label)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl tap-scale transition-colors ${
                    mood === m.label
                      ? 'bg-accent border-2 border-primary'
                      : 'bg-input'
                  }`}
                  title={m.label}
                >
                  {m.emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <input
              type="text"
              placeholder="Optional notes"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full bg-input border border-border rounded-xl px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-card outline-none transition-colors"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainLoggingCard;
