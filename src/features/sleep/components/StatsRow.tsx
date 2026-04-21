import { useMemo } from 'react';
import { getRecentLogs, formatMinutes } from '@/lib/sleep';

const StatsRow = () => {
  const stats = useMemo(() => {
    const logs = getRecentLogs(7);
    if (logs.length === 0) return null;

    const lastLog = logs.sort((a, b) => b.date.localeCompare(a.date))[0];
    const avgMins = Math.round(logs.reduce((a, b) => a + b.totalMinutes, 0) / logs.length);
    const avgScore = Math.round(logs.reduce((a, b) => a + b.score, 0) / logs.length);

    return {
      lastNight: formatMinutes(lastLog.totalMinutes),
      avgDuration: formatMinutes(avgMins),
      avgScore,
    };
  }, []);

  if (!stats) return null;

  const items = [
    { label: 'Last night', value: stats.lastNight },
    { label: '7-day avg', value: stats.avgDuration },
    { label: 'Avg score', value: String(stats.avgScore) },
  ];

  return (
    <div className="mx-4 flex gap-3">
      {items.map((item, i) => (
        <div key={i} className="flex-1 rounded-2xl bg-card p-3 text-center shadow-sm">
          <span className="block font-dm text-[11px] text-muted-foreground">{item.label}</span>
          <span className="block font-sora text-lg font-bold text-foreground">{item.value}</span>
        </div>
      ))}
    </div>
  );
};

export default StatsRow;
