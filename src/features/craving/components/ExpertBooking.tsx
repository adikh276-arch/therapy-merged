import { getLogs } from '@/lib/cravingData';
import type { CravingLog } from '@/lib/cravingData';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ExpertBookingProps {
  refreshKey: number;
}

const ExpertBooking = ({ refreshKey: _ }: ExpertBookingProps) => {
  const logs = getLogs();
  if (logs.length < 3) return null;

  const last3 = logs.slice(0, 3);
  const last7 = logs.slice(0, 7);
  const today = new Date().toDateString();

  // Pattern 1: Last 3 all smoked
  const allSmoked = last3.every(l => l.outcome === 'smoked');

  // Pattern 2: 5/7 high intensity
  const highCount = last7.filter(l => l.intensity >= 8).length;
  const highIntensity = last7.length >= 5 && highCount >= 5;

  // Pattern 3: Cross-tracker
  let crossTrigger = false;
  const smokedToday = logs.some(l => l.outcome === 'smoked' && new Date(l.timestamp).toDateString() === today);
  if (smokedToday) {
    try {
      const moodLogs = JSON.parse(localStorage.getItem('moodLogs') || '[]');
      const difficultToday = moodLogs.some((m: any) => new Date(m.timestamp || m.date).toDateString() === today && (m.mood === 'difficult' || m.score < 4));
      const sleepLogs = JSON.parse(localStorage.getItem('sleepLogs') || '[]');
      const poorSleep = sleepLogs.some((s: any) => {
        const d = new Date(s.timestamp || s.date);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return d.toDateString() === yesterday.toDateString() && s.score < 50;
      });
      crossTrigger = difficultToday || poorSleep;
    } catch { }
  }

  if (!allSmoked && !highIntensity && !crossTrigger) return null;

  let message = '';
  let buttonText = '';
  if (allSmoked) {
    message = "You've acted on your last 3 cravings. Let's talk about strategies.";
    buttonText = 'Book a counselling session';
  } else if (highIntensity) {
    message = 'High-intensity cravings persisting. Professional support can help.';
    buttonText = 'Connect with an expert';
  } else {
    message = 'Multiple challenging factors detected. Support is available.';
    buttonText = 'Talk to someone';
  }

  return (
    <div className="rounded-3xl bg-coral/5 border border-coral/10 p-6 animate-slide-up">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-coral/10 flex items-center justify-center shrink-0">
          <AlertCircle size={20} className="text-coral" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground leading-relaxed">{message}</p>
          <Button variant="link" className="mt-2 h-auto p-0 text-coral font-bold flex items-center gap-2 hover:no-underline hover:opacity-80">
            {buttonText} →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExpertBooking;
