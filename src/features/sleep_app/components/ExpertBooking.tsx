import { useMemo } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  recentLogs: { total_minutes: number | null; date: string }[];
}

export default function ExpertBooking({ recentLogs }: Props) {
  const showAlert = useMemo(() => {
    if (recentLogs.length < 5) return false;
    const recent5 = recentLogs.slice(0, 5);
    return recent5.every(l => (l.total_minutes || 0) < 360); // less than 6 hours
  }, [recentLogs]);

  if (!showAlert) return null;

  return (
    <div className="glass-card p-5 border-destructive/30">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
        <div className="space-y-2">
          <h3 className="font-display font-semibold text-sm">Sleep Deprivation Alert</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            You've had 5+ consecutive nights under 6 hours. Sleep deprivation significantly increases relapse risk.
          </p>
          <Button
            size="sm"
            className="mt-1"
            onClick={() => window.open('https://www.mantracare.com', '_blank')}
          >
            Talk to an Expert
          </Button>
        </div>
      </div>
    </div>
  );
}
