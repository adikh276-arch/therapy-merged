import { useMemo } from 'react';
import { MoodLog, MOOD_CONFIG, MoodLevel } from '@/types/mood';

interface TodayTimelineProps {
  logs: MoodLog[];
}

function moodBg(mood: MoodLevel) {
  const map: Record<MoodLevel, string> = {
    great: 'bg-mood-great',
    good: 'bg-mood-good',
    okay: 'bg-mood-okay',
    low: 'bg-mood-low',
    difficult: 'bg-mood-difficult',
  };
  return map[mood];
}

export default function TodayTimeline({ logs }: TodayTimelineProps) {
  const todayStr = new Date().toISOString().split('T')[0];
  const todayLogs = useMemo(() =>
    logs.filter(l => l.date === todayStr).sort((a, b) => a.timestamp - b.timestamp),
    [logs, todayStr]
  );

  if (todayLogs.length < 2) return null;

  const startHour = 6;
  const endHour = 23;
  const totalMinutes = (endHour - startHour) * 60;

  return (
    <div className="rounded-2xl bg-card p-5 shadow-sm border border-border">
      <p className="text-sm font-medium text-foreground mb-3">Today's timeline</p>
      <div className="relative h-8">
        {/* Track */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 rounded-full bg-secondary" />
        
        {/* Hour markers */}
        <div className="absolute inset-x-0 top-full mt-1 flex justify-between">
          <span className="text-[9px] text-muted-foreground/50">6AM</span>
          <span className="text-[9px] text-muted-foreground/50">12PM</span>
          <span className="text-[9px] text-muted-foreground/50">6PM</span>
          <span className="text-[9px] text-muted-foreground/50">11PM</span>
        </div>

        {/* Dots */}
        {todayLogs.map(log => {
          const d = new Date(log.timestamp);
          const mins = (d.getHours() - startHour) * 60 + d.getMinutes();
          const pct = Math.max(0, Math.min(100, (mins / totalMinutes) * 100));
          const cfg = MOOD_CONFIG[log.mood];

          return (
            <div
              key={log.id}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 group"
              style={{ left: `${pct}%` }}
            >
              <div className={`w-4 h-4 rounded-full ${moodBg(log.mood)} ring-2 ring-card shadow-sm cursor-pointer`} />
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-foreground text-background text-[10px] px-2 py-1 rounded-lg whitespace-nowrap shadow-lg">
                  {cfg.emoji} {cfg.label} · {d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
