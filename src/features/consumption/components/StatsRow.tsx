import { useMemo } from 'react';
import { SmokeLog } from '@/hooks/useSmokeLogs';
import { isSameDay, startOfWeek, getYesterday } from '@/lib/formatting';

interface StatsRowProps {
  logs: SmokeLog[];
}

const StatsRow = ({ logs }: StatsRowProps) => {
  const { weekTotal, sevenDayAvg, yesterdayCount } = useMemo(() => {
    const now = new Date();
    const weekStart = startOfWeek(now);
    const yesterday = getYesterday();

    let weekTotal = 0;
    let last7 = 0;
    let yesterdayCount = 0;
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    for (const log of logs) {
      const d = new Date(log.timestamp);
      if (d >= weekStart) weekTotal += log.count;
      if (d >= sevenDaysAgo) last7 += log.count;
      if (isSameDay(d, yesterday)) yesterdayCount += log.count;
    }

    return { weekTotal, sevenDayAvg: (last7 / 7).toFixed(1), yesterdayCount };
  }, [logs]);

  const items = [
    { value: weekTotal, label: 'This week' },
    { value: sevenDayAvg, label: '7-day avg' },
    { value: yesterdayCount, label: 'Yesterday' },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {items.map(item => (
        <div key={item.label} className="bg-card border border-border rounded-2xl py-2.5 px-3 text-center">
          <div className="font-heading text-lg font-bold text-foreground">{item.value}</div>
          <div className="font-body text-[11px] text-muted-foreground">{item.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsRow;
