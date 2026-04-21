import { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/TranslationContext';
import { supabase, withUserContext } from '@/lib/supabase';
import { type MoodEntry } from '@/types/mood';
import LanguageSelector from '@/components/LanguageSelector';
import MoodLogger from '@/components/MoodLogger';
import CalendarGrid from '@/components/CalendarGrid';
import Timeline from '@/components/Timeline';
import InsightsPanel from '@/components/InsightsPanel';
import ExpertBooking from '@/components/ExpertBooking';
import BottomNav from '@/components/BottomNav';

export default function Index() {
  const { userId } = useAuth();
  const { t } = useTranslation();
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [todayEntries, setTodayEntries] = useState<MoodEntry[]>([]);

  const fetchEntries = useCallback(async () => {
    if (!userId) return;
    try {
      await withUserContext(userId);
      const { data } = await supabase
        .from('mood_logs')
        .select('*')
        .eq('user_id', userId)
        .order('timestamp', { ascending: false });

      if (data) {
        setEntries(data);
        const today = format(new Date(), 'yyyy-MM-dd');
        setTodayEntries(data.filter((e) => e.date === today));
      }
    } catch (err) {
      console.error('Failed to fetch entries:', err);
    }
  }, [userId]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 glass-header z-40 px-5 py-3 flex items-center justify-between border-b border-border">
        <h1 className="text-lg font-extrabold">{t('Mood Tracker')}</h1>
        <LanguageSelector />
      </header>

      <main className="px-4 py-4 space-y-4 max-w-lg mx-auto">
        <MoodLogger onLogged={fetchEntries} />
        <CalendarGrid entries={entries} />
        <Timeline entries={todayEntries} />
        <InsightsPanel entries={entries} />
        <ExpertBooking entries={entries} />
      </main>

      <BottomNav />
    </div>
  );
}
