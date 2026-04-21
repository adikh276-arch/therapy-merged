import { useState, useEffect, useCallback } from 'react';
import { supabase, setCurrentUser, type CravingLog } from '@/lib/supabase';
import { useTranslation } from '@/hooks/useTranslation';
import ResistanceScore from '@/components/ResistanceScore';
import LogCraving from '@/components/LogCraving';
import CravingTimer from '@/components/CravingTimer';
import CrossTrackerInsights from '@/components/CrossTrackerInsights';
import ExpertBooking from '@/components/ExpertBooking';
import History from '@/components/History';
import LanguageSelector from '@/components/LanguageSelector';
import { Leaf } from 'lucide-react';

interface Props {
  userId: number;
}

export default function Dashboard({ userId }: Props) {
  const { lang, setLang, t, languages } = useTranslation();
  const [logs, setLogs] = useState<CravingLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await setCurrentUser(userId);
      const { data } = await supabase
        .from('craving_logs')
        .select('*')
        .eq('user_id', userId)
        .order('timestamp', { ascending: true });
      setLogs(data || []);
      setLoading(false);
    })();
  }, [userId]);

  const handleLogged = useCallback((log: CravingLog) => {
    setLogs(prev => [...prev, log]);
  }, []);

  const handleDelete = useCallback((idx: number) => {
    setLogs(prev => prev.filter((_, i) => i !== idx));
  }, []);

  const resistedCount = logs.filter(l => l.outcome === 'resisted').length;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Leaf className="h-8 w-8 text-primary animate-breathe" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-primary" />
            <span className="text-display text-base font-semibold text-foreground">{t('Craving Tracker')}</span>
          </div>
          <LanguageSelector lang={lang} languages={languages} onChange={setLang} />
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-lg space-y-4 px-4 py-6 pb-12">
        <ResistanceScore logs={logs} t={t} />
        <LogCraving userId={userId} onLogged={handleLogged} resistedCount={resistedCount} t={t} />
        <CravingTimer t={t} />
        <ExpertBooking logs={logs} t={t} />
        <CrossTrackerInsights userId={userId} t={t} />
        {logs.length > 0 && <History logs={logs} userId={userId} onDelete={handleDelete} t={t} />}
      </main>
    </div>
  );
}
