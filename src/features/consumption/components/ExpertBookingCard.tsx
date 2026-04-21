import { useMemo } from 'react';
import { AlertTriangle } from 'lucide-react';
import { SmokeLog } from '@/hooks/useSmokeLogs';
import { isSameDay } from '@/lib/formatting';

interface ExpertBookingCardProps {
  logs: SmokeLog[];
  todayCount: number;
}

const ExpertBookingCard = ({ logs, todayCount }: ExpertBookingCardProps) => {
  const alert = useMemo(() => {
    const now = new Date();

    // Pattern 1: increasing trend
    const last7Start = new Date(now); last7Start.setDate(last7Start.getDate() - 7); last7Start.setHours(0,0,0,0);
    const prev7Start = new Date(now); prev7Start.setDate(prev7Start.getDate() - 14); prev7Start.setHours(0,0,0,0);

    let last7 = 0, prev7 = 0;
    for (const log of logs) {
      const d = new Date(log.timestamp);
      if (d >= last7Start) last7 += log.count;
      else if (d >= prev7Start) prev7 += log.count;
    }

    if (prev7 > 0 && last7 > prev7 * 1.3) {
      return {
        msg: 'Your cigarette consumption has increased significantly over the past week.',
        btn: 'Talk to a counsellor',
        pattern: 'increasing_trend',
      };
    }

    // Pattern 2: high daily
    if (todayCount > 15) {
      return {
        msg: 'High consumption today. Speaking with someone might help.',
        btn: 'Book a session',
        pattern: 'high_count',
      };
    }

    // Pattern 3: cross-tracker combo
    if (todayCount > 10) {
      try {
        const moodRaw = localStorage.getItem('moodLogs');
        const sleepRaw = localStorage.getItem('sleepLogs');
        if (moodRaw || sleepRaw) {
          let risky = false;
          if (moodRaw) {
            const moodLogs = JSON.parse(moodRaw);
            const todayMood = moodLogs.find((m: any) => isSameDay(new Date(m.timestamp || m.date), now));
            if (todayMood && ['difficult', 'low', 'very low'].includes((todayMood.mood || todayMood.value || '').toLowerCase())) risky = true;
          }
          if (sleepRaw) {
            const sleepLogs = JSON.parse(sleepRaw);
            const lastSleep = sleepLogs[sleepLogs.length - 1];
            if (lastSleep && (lastSleep.score ?? lastSleep.hours ?? 100) < 50) risky = true;
          }
          if (risky) {
            return {
              msg: 'Multiple challenging factors detected. Support is available.',
              btn: 'Connect with an expert',
              pattern: 'cross_tracker',
            };
          }
        }
      } catch {}
    }

    return null;
  }, [logs, todayCount]);

  if (!alert) return null;

  const today = new Date().toISOString().split('T')[0];
  const bookingUrl = `yourapp://booking?source=consumption&pattern=${alert.pattern}&date=${today}`;

  return (
    <div className="bg-warning-foreground border rounded-2xl p-4 space-y-3" style={{ borderColor: 'hsl(38 92% 44% / 0.4)' }}>
      <div className="flex items-start gap-2">
        <AlertTriangle size={18} className="text-warning mt-0.5 shrink-0" />
        <p className="font-body text-sm text-foreground">{alert.msg}</p>
      </div>
      <a
        href={bookingUrl}
        className="block w-full h-[52px] bg-warning text-primary-foreground font-heading text-[15px] font-semibold rounded-[14px] tap-scale flex items-center justify-center"
      >
        {alert.btn}
      </a>
    </div>
  );
};

export default ExpertBookingCard;
