import { useMemo } from 'react';
import { getRecentLogs, getScoreColor, formatMinutes } from '@/lib/sleep';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const WeeklyProgress = () => {
  const data = useMemo(() => {
    const logs = getRecentLogs(7);
    const today = new Date();
    const result: { day: string; hours: number; score: number | null; color: string }[] = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayIdx = (d.getDay() + 6) % 7; // Mon=0
      const log = logs.find(l => l.date === dateStr);
      result.push({
        day: DAYS[dayIdx],
        hours: log ? log.totalMinutes / 60 : 0,
        score: log ? log.score : null,
        color: log ? getScoreColor(log.score) : 'hsl(var(--border))',
      });
    }
    return result;
  }, []);

  const avgHours = useMemo(() => {
    const withData = data.filter(d => d.score !== null);
    if (withData.length === 0) return 0;
    return (withData.reduce((a, b) => a + b.hours, 0) / withData.length).toFixed(1);
  }, [data]);

  const avgScore = useMemo(() => {
    const withData = data.filter(d => d.score !== null);
    if (withData.length === 0) return 0;
    return Math.round(withData.reduce((a, b) => a + (b.score || 0), 0) / withData.length);
  }, [data]);

  const maxH = 10;

  return (
    <div className="mx-4 rounded-2xl bg-card p-5 shadow-sm">
      <h3 className="font-sora text-base font-semibold text-foreground mb-4">This week</h3>
      <div className="relative h-48">
        {/* 7hr dashed line */}
        <div
          className="absolute left-0 right-0 border-t border-dashed border-muted-foreground/30"
          style={{ bottom: `${(7 / maxH) * 100}%` }}
        >
          <span className="absolute -top-4 right-0 font-dm text-[10px] text-muted-foreground">7h</span>
        </div>

        <div className="flex items-end justify-between h-full gap-2">
          {data.map((d, i) => {
            const heightPct = d.hours > 0 ? (d.hours / maxH) * 100 : 0;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                {d.score !== null && (
                  <span className="font-dm text-[10px] font-medium text-foreground">
                    {d.score}
                  </span>
                )}
                <div
                  className="w-full rounded-t-lg min-h-[4px] transition-all"
                  style={{
                    height: `${heightPct}%`,
                    backgroundColor: d.color,
                    maxWidth: 32,
                  }}
                />
                <span className="font-dm text-[11px] text-muted-foreground">{d.day}</span>
              </div>
            );
          })}
        </div>
      </div>
      <p className="mt-3 text-center font-dm text-sm text-muted-foreground">
        7-day average: {avgHours} hours | Avg score: {avgScore}
      </p>
    </div>
  );
};

export default WeeklyProgress;
