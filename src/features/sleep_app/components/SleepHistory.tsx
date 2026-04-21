import { useMemo } from 'react';
import { getScoreTier } from '@/lib/scoreCalculator';

interface SleepLog {
  date: string;
  total_minutes: number | null;
  score: number | null;
  quality: number | null;
  bedtime: string | null;
  wake_time: string | null;
}

interface SleepHistoryProps {
  logs: SleepLog[];
}

const tierColorMap = {
  poor: 'hsl(35, 90%, 55%)',
  fair: 'hsl(200, 70%, 60%)',
  good: 'hsl(220, 70%, 55%)',
  excellent: 'hsl(150, 60%, 45%)',
};

export default function SleepHistory({ logs }: SleepHistoryProps) {
  // 30-day heatmap
  const heatmapDays = useMemo(() => {
    const result = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const log = logs.find(l => l.date === dateStr);
      result.push({ date: dateStr, score: log?.score ?? null, day: d.getDate() });
    }
    return result;
  }, [logs]);

  return (
    <div className="glass-card p-5 space-y-4">
      <h2 className="font-display text-lg font-semibold">History</h2>

      {/* Heatmap */}
      <div>
        <p className="text-xs text-muted-foreground mb-2">Last 30 days</p>
        <div className="grid grid-cols-10 gap-1">
          {heatmapDays.map((day, i) => {
            const tier = day.score ? getScoreTier(day.score).tier : null;
            const bg = tier ? tierColorMap[tier] : 'hsl(var(--muted))';
            const opacity = tier ? 1 : 0.15;
            return (
              <div
                key={i}
                className="aspect-square rounded-sm flex items-center justify-center"
                style={{ backgroundColor: bg, opacity }}
                title={`${day.date}: ${day.score ?? 'No data'}`}
              >
                <span className="text-[8px] font-medium" style={{ color: tier ? 'rgba(0,0,0,0.5)' : 'transparent' }}>
                  {day.day}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-3 mt-2 justify-end">
          {(['poor', 'fair', 'good', 'excellent'] as const).map(t => (
            <div key={t} className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: tierColorMap[t] }} />
              <span className="text-[9px] text-muted-foreground capitalize">{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent logs list */}
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {logs.slice(0, 10).map((log, i) => {
          const tier = log.score ? getScoreTier(log.score) : null;
          const color = tier ? tierColorMap[tier.tier] : undefined;
          return (
            <div key={i} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
              <div>
                <p className="text-sm font-medium">
                  {new Date(log.date + 'T12:00:00').toLocaleDateString('en', { month: 'short', day: 'numeric', weekday: 'short' })}
                </p>
                <p className="text-xs text-muted-foreground">
                  {log.bedtime} → {log.wake_time} · {log.total_minutes ? `${(log.total_minutes / 60).toFixed(1)}h` : '-'}
                </p>
              </div>
              {log.score !== null && (
                <span
                  className="text-sm font-bold px-3 py-1 rounded-full"
                  style={{ backgroundColor: `${color}22`, color }}
                >
                  {log.score}
                </span>
              )}
            </div>
          );
        })}
        {logs.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">No sleep data yet</p>
        )}
      </div>
    </div>
  );
}
