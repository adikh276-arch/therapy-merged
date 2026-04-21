import { useMemo } from 'react';
import { getScoreTier } from '@/lib/scoreCalculator';

interface DayData {
  date: string;
  total_minutes: number | null;
  score: number | null;
}

interface WeeklyChartProps {
  data: DayData[];
}

const tierColorMap = {
  poor: 'hsl(35, 90%, 55%)',
  fair: 'hsl(200, 70%, 60%)',
  good: 'hsl(220, 70%, 55%)',
  excellent: 'hsl(150, 60%, 45%)',
};

export default function WeeklyChart({ data }: WeeklyChartProps) {
  const days = useMemo(() => {
    const result: DayData[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const existing = data.find(x => x.date === dateStr);
      result.push(existing || { date: dateStr, total_minutes: null, score: null });
    }
    return result;
  }, [data]);

  const maxMin = Math.max(600, ...days.map(d => d.total_minutes || 0));

  return (
    <div className="glass-card p-5">
      <h2 className="font-display text-lg font-semibold mb-4">This Week</h2>
      <div className="flex items-end justify-between gap-2 h-40">
        {days.map((day, i) => {
          const height = day.total_minutes ? (day.total_minutes / maxMin) * 100 : 0;
          const tier = day.score ? getScoreTier(day.score).tier : 'poor';
          const color = day.total_minutes ? tierColorMap[tier] : 'hsl(var(--muted))';
          const dayLabel = new Date(day.date + 'T12:00:00').toLocaleDateString('en', { weekday: 'short' });
          const hours = day.total_minutes ? (day.total_minutes / 60).toFixed(1) : '-';

          return (
            <div key={i} className="flex flex-col items-center gap-1 flex-1">
              <span className="text-[10px] text-muted-foreground font-medium">
                {day.score ?? '-'}
              </span>
              <div className="w-full flex items-end h-28">
                <div
                  className="w-full bar-chart-bar min-h-[4px]"
                  style={{
                    height: `${Math.max(3, height)}%`,
                    backgroundColor: color,
                    opacity: day.total_minutes ? 1 : 0.2,
                  }}
                />
              </div>
              <span className="text-[10px] text-muted-foreground">{hours}h</span>
              <span className="text-[10px] text-muted-foreground">{dayLabel}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
