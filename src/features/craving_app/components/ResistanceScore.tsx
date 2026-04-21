import { useMemo } from 'react';
import type { CravingLog } from '@/lib/supabase';

interface Props {
  logs: CravingLog[];
  t: (s: string) => string;
}

export default function ResistanceScore({ logs, t }: Props) {
  const { resisted, total, rate } = useMemo(() => {
    const total = logs.length;
    const resisted = logs.filter(l => l.outcome === 'resisted').length;
    const rate = total > 0 ? Math.round((resisted / total) * 100) : 0;
    return { resisted, total, rate };
  }, [logs]);

  return (
    <div className="gradient-hero rounded-3xl p-6 text-center" style={{ boxShadow: 'var(--shadow-glow)' }}>
      <p className="text-sm text-muted-foreground mb-1">{t('Your resistance')}</p>
      <div className="animate-count-up">
        <span className="text-display text-6xl font-bold text-primary">{resisted}</span>
      </div>
      <p className="text-foreground/80 mt-2 text-base">
        {t(`cigarette${resisted !== 1 ? 's' : ''} you chose not to smoke`)}
      </p>
      {total > 0 && (
        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5">
          <span className="text-sm font-semibold text-primary">{rate}%</span>
          <span className="text-xs text-muted-foreground">{t('restraint rate')}</span>
        </div>
      )}
    </div>
  );
}
