import { useMemo } from 'react';
import { getSleepLogs, getRecentLogs } from '@/lib/sleep';
import { AlertTriangle } from 'lucide-react';

const ExpertBooking = () => {
  const alert = useMemo(() => {
    const logs = getSleepLogs();
    if (logs.length < 5) return null;

    const sorted = [...logs].sort((a, b) => a.date.localeCompare(b.date));

    // Pattern 1: 5+ consecutive nights < 6 hours
    let consecutive = 0;
    for (let i = sorted.length - 1; i >= 0 && consecutive < 5; i--) {
      if (sorted[i].totalMinutes < 360) consecutive++;
      else break;
    }
    if (consecutive >= 5) {
      return {
        message: 'Under 6 hours of sleep significantly increases relapse risk.',
        action: 'Talk to an expert',
      };
    }

    // Pattern 2: Persistent tobacco cravings at night
    const recentCraving = sorted
      .slice(-5)
      .filter(l => l.symptoms?.includes('Tobacco cravings'));
    if (recentCraving.length >= 5) {
      return {
        message: 'Persistent nicotine withdrawal affecting sleep. A counsellor can help.',
        action: 'Book a session',
      };
    }

    // Pattern 3: Low score + cross-tracker
    const latest = sorted[sorted.length - 1];
    if (latest && latest.score < 50) {
      try {
        const smokeLogs = localStorage.getItem('smokeLogs');
        const cravingLogs = localStorage.getItem('cravingLogs');
        const moodLogs = localStorage.getItem('moodLogs');
        if (smokeLogs || cravingLogs || moodLogs) {
          return {
            message: 'Poor sleep combined with other risk factors. Support is available.',
            action: 'Connect with someone',
          };
        }
      } catch {}
    }

    return null;
  }, []);

  if (!alert) return null;

  return (
    <div className="mx-4 rounded-2xl bg-destructive/5 border border-destructive/20 p-5">
      <div className="flex items-start gap-3">
        <AlertTriangle size={20} className="text-destructive mt-0.5 shrink-0" />
        <div className="flex-1">
          <p className="font-dm text-sm text-foreground leading-relaxed">{alert.message}</p>
          <button className="mt-3 px-4 py-2 rounded-xl bg-destructive text-destructive-foreground font-dm text-sm font-medium hover:opacity-90 transition-opacity">
            {alert.action}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpertBooking;
