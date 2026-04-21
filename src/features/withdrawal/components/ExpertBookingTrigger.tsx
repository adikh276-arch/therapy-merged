import { getWithdrawalLogs } from '@/lib/storage';
import { getDaysSinceQuit } from '@/lib/milestones';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExpertBookingTriggerProps {
  quitDate: string;
}

const ExpertBookingTrigger = ({ quitDate }: ExpertBookingTriggerProps) => {
  const logs = getWithdrawalLogs();
  const days = getDaysSinceQuit(quitDate);

  let message: string | null = null;
  let cta = 'Contact support now';

  // Pattern 1: Severe symptoms (latest log)
  if (logs.length > 0 && logs[0].severity >= 9) {
    message = 'Severe withdrawal symptoms require attention.';
  }
  // Pattern 2: 3+ consecutive high severity
  else if (logs.length >= 3 && logs.slice(0, 3).every(l => l.severity >= 7)) {
    message = 'Withdrawal symptoms persisting at high levels. A counsellor can help.';
    cta = 'Book a session';
  }
  // Pattern 3: Relapse indicators
  else if (days > 7) {
    try {
      const smokeLogs = localStorage.getItem('smokeLogs');
      if (smokeLogs) {
        const parsed = JSON.parse(smokeLogs);
        if (Array.isArray(parsed) && parsed.length > 0) {
          message = "Patterns suggest you might be struggling. Support is here.";
          cta = 'Talk to someone';
        }
      }
    } catch {}
  }

  if (!message) return null;

  return (
    <div className="mx-4 mt-4 bg-card border border-destructive/20 rounded-2xl p-5">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
          <Phone size={16} className="text-destructive" />
        </div>
        <div className="flex-1">
          <p className="font-body text-sm text-foreground font-medium">{message}</p>
          <Button size="sm" variant="destructive" className="mt-3">{cta}</Button>
        </div>
      </div>
    </div>
  );
};

export default ExpertBookingTrigger;
