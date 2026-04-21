import { useState, useEffect, useCallback } from 'react';
import {
  format,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isSameDay,
} from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/TranslationContext';
import { supabase, withUserContext } from '@/lib/supabase';
import {
  type MoodEntry,
  type MoodType,
  MOODS,
  MOOD_BG,
  MOOD_HEX,
} from '@/types/mood';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import BottomNav from '@/components/BottomNav';
import DayDetail from '@/components/DayDetail';
import LanguageSelector from '@/components/LanguageSelector';
import { Download } from 'lucide-react';

export default function History() {
  const { userId } = useAuth();
  const { t } = useTranslation();
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const fetchAll = useCallback(async () => {
    if (!userId) return;
    try {
      await withUserContext(userId);
      const { data } = await supabase
        .from('mood_logs')
        .select('*')
        .eq('user_id', userId)
        .order('timestamp', { ascending: false });
      if (data) setEntries(data);
    } catch (err) {
      console.error('Failed to fetch history:', err);
    }
  }, [userId]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const distribution = MOODS.map((m) => ({
    name: m.label,
    emoji: m.emoji,
    count: entries.filter((e) => e.mood === m.type).length,
    color: MOOD_HEX[m.type],
  }));

  const months = [0, 1, 2].map((i) => subMonths(new Date(), i));

  const getEntriesForDay = (day: Date) =>
    entries.filter((e) => isSameDay(new Date(e.date), day));

  const getLatestMood = (day: Date): MoodType | null => {
    const dayEntries = getEntriesForDay(day);
    if (!dayEntries.length) return null;
    dayEntries.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    return dayEntries[0].mood;
  };

  const exportData = () => {
    const csv = [
      'Date,Time,Mood,Factors,Tobacco Urge,Notes',
      ...entries.map(
        (e) =>
          `${e.date},${format(new Date(e.timestamp), 'HH:mm')},${e.mood},"${(
            (e.factors as string[]) || []
          ).join(',')}",${e.tobacco_urge || ''},"${(e.notes || '').replace(
            /"/g,
            '""'
          )}"`
      ),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mood-logs-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 glass-header z-40 px-5 py-3 flex items-center justify-between border-b border-border">
        <h1 className="text-lg font-extrabold">{t('History')}</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={exportData}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <Download className="w-4 h-4 text-muted-foreground" />
          </button>
          <LanguageSelector />
        </div>
      </header>

      <main className="px-4 py-4 space-y-4 max-w-lg mx-auto">
        {/* Mood Distribution Chart */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <h3 className="text-sm font-bold mb-3">
            {t('Mood Distribution')}
          </h3>
          <ResponsiveContainer width="100%" height={130}>
            <BarChart data={distribution} layout="vertical">
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="emoji"
                width={28}
                tick={{ fontSize: 16 }}
                axisLine={false}
                tickLine={false}
              />
              <Bar dataKey="count" radius={[0, 8, 8, 0]} barSize={16}>
                {distribution.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-[10px] text-muted-foreground text-center mt-1 font-medium">
            {entries.length} {t('total entries')}
          </p>
        </div>

        {/* Multi-month calendars */}
        {months.map((month) => {
          const start = startOfMonth(month);
          const end = endOfMonth(month);
          const days = eachDayOfInterval({ start, end });
          const padding = getDay(start);

          return (
            <div
              key={month.toISOString()}
              className="bg-card rounded-2xl p-4 shadow-sm"
            >
              <h3 className="text-sm font-bold mb-3">
                {format(month, 'MMMM yyyy')}
              </h3>
              <div className="grid grid-cols-7 gap-1 mb-1">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                  <div
                    key={i}
                    className="text-center text-[9px] font-bold text-muted-foreground"
                  >
                    {d}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: padding }).map((_, i) => (
                  <div key={`p-${i}`} />
                ))}
                {days.map((day) => {
                  const mood = getLatestMood(day);
                  return (
                    <button
                      key={day.toISOString()}
                      onClick={() => setSelectedDay(day)}
                      className={`aspect-square rounded-lg text-[9px] font-bold flex items-center justify-center ${
                        mood
                          ? `${MOOD_BG[mood]} text-card`
                          : 'bg-secondary text-muted-foreground'
                      }`}
                    >
                      {format(day, 'd')}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Recent entries list */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <h3 className="text-sm font-bold mb-3">{t('Recent Entries')}</h3>
          <div className="space-y-1">
            {entries.slice(0, 20).map((entry, i) => {
              const info = MOODS.find((m) => m.type === entry.mood);
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 py-2.5 border-b border-border last:border-0"
                >
                  <span className="text-xl">{info?.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold">
                      {t(info?.label || entry.mood)}
                    </p>
                    <p className="text-[10px] text-muted-foreground truncate">
                      {format(new Date(entry.timestamp), 'MMM d, h:mm a')}
                      {entry.notes && ` — ${entry.notes}`}
                    </p>
                  </div>
                </div>
              );
            })}
            {entries.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-6">
                {t('No entries yet')}
              </p>
            )}
          </div>
        </div>
      </main>

      <BottomNav />

      {selectedDay && (
        <DayDetail
          day={selectedDay}
          entries={getEntriesForDay(selectedDay)}
          onClose={() => setSelectedDay(null)}
        />
      )}
    </div>
  );
}
