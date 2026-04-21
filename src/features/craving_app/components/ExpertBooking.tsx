import type { CravingLog } from '@/lib/supabase';
import { HeartHandshake } from 'lucide-react';

interface Props {
  logs: CravingLog[];
  t: (s: string) => string;
}

export default function ExpertBooking({ logs, t }: Props) {
  // Check last 3 logs
  const last3 = logs.slice(-3);
  if (last3.length < 3 || !last3.every(l => l.outcome === 'smoked')) return null;

  return (
    <div className="animate-fade-in card-calm border-calm-amber/30 bg-calm-amber-light/50">
      <div className="flex items-start gap-3">
        <HeartHandshake className="mt-0.5 h-5 w-5 text-calm-amber shrink-0" />
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">
            {t("You've acted on your last 3 cravings. Let's talk about strategies.")}
          </p>
          <button
            onClick={() => window.open('https://www.mantracare.com/book', '_blank')}
            className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-all hover:opacity-90"
          >
            {t('Book a counselling session')}
          </button>
        </div>
      </div>
    </div>
  );
}
