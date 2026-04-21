import { useMemo } from 'react';
import { Lightbulb } from 'lucide-react';
import { SmokeLog } from '@/hooks/useSmokeLogs';
import { isSameDay } from '@/lib/formatting';

interface CrossTrackerInsightProps {
  logs: SmokeLog[];
}

function getDailyCountMap(logs: SmokeLog[]): Map<string, number> {
  const map = new Map<string, number>();
  for (const log of logs) {
    const d = new Date(log.timestamp).toDateString();
    map.set(d, (map.get(d) || 0) + log.count);
  }
  return map;
}

const CrossTrackerInsight = ({ logs }: CrossTrackerInsightProps) => {
  const insight = useMemo(() => {
    if (logs.length < 7) return null;
    const dailyCounts = getDailyCountMap(logs);

    // Check sleep
    try {
      const sleepRaw = localStorage.getItem('sleepLogs');
      if (sleepRaw) {
        const sleepLogs = JSON.parse(sleepRaw);
        if (Array.isArray(sleepLogs) && sleepLogs.length > 0) {
          let lowSleepTotal = 0, lowSleepDays = 0;
          let normalTotal = 0, normalDays = 0;
          for (const s of sleepLogs) {
            const dateKey = new Date(s.timestamp || s.date).toDateString();
            const count = dailyCounts.get(dateKey);
            if (count === undefined) continue;
            const hours = s.hours ?? s.duration ?? 0;
            if (hours < 6) { lowSleepTotal += count; lowSleepDays++; }
            else { normalTotal += count; normalDays++; }
          }
          if (lowSleepDays >= 2 && normalDays >= 2) {
            const pct = Math.round(((lowSleepTotal / lowSleepDays) / (normalTotal / normalDays) - 1) * 100);
            if (pct > 20) return `You smoke ${pct}% more on days you sleep under 6 hours.`;
          }
        }
      }
    } catch {}

    // Check mood
    try {
      const moodRaw = localStorage.getItem('moodLogs');
      if (moodRaw) {
        const moodLogs = JSON.parse(moodRaw);
        if (Array.isArray(moodLogs) && moodLogs.length > 0) {
          let lowMoodTotal = 0, lowDays = 0, normalTotal = 0, normalDays = 0;
          for (const m of moodLogs) {
            const dateKey = new Date(m.timestamp || m.date).toDateString();
            const count = dailyCounts.get(dateKey);
            if (count === undefined) continue;
            const val = (m.mood || m.value || '').toLowerCase();
            if (val === 'difficult' || val === 'low' || val === 'very low') { lowMoodTotal += count; lowDays++; }
            else { normalTotal += count; normalDays++; }
          }
          if (lowDays >= 2 && normalDays >= 2) {
            const pct = Math.round(((lowMoodTotal / lowDays) / (normalTotal / normalDays) - 1) * 100);
            if (pct > 20) return `Difficult mood days show ${pct}% higher cigarette consumption.`;
          }
        }
      }
    } catch {}

    // Check craving
    try {
      const cravingRaw = localStorage.getItem('cravingLogs');
      if (cravingRaw) {
        const cravingLogs = JSON.parse(cravingRaw);
        if (Array.isArray(cravingLogs) && cravingLogs.length > 0) {
          return 'Consider using the Craving tracker when urges hit — resistance tools are available.';
        }
      }
    } catch {}

    return null;
  }, [logs]);

  if (!insight) return null;

  return (
    <div className="relative rounded-2xl p-4 border overflow-hidden" style={{
      background: 'linear-gradient(135deg, hsl(207 100% 96%) 0%, hsl(216 33% 97%) 100%)',
      borderColor: 'hsl(203 92% 59% / 0.25)',
    }}>
      <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-sm bg-primary" />
      <div className="pl-3">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Lightbulb size={16} className="text-primary" />
          <span className="font-heading text-sm font-bold text-foreground">Pattern noticed</span>
        </div>
        <p className="font-body text-sm text-body">{insight}</p>
      </div>
    </div>
  );
};

export default CrossTrackerInsight;
