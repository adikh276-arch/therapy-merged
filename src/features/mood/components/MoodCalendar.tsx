import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MoodLog, MoodLevel, MOOD_CONFIG } from '@/types/mood';

interface MoodCalendarProps {
  logs: MoodLog[];
  getLatestMoodForDate: (date: string) => MoodLevel | null;
  getLogsForDate: (date: string) => MoodLog[];
}

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function moodBg(mood: MoodLevel) {
  const map: Record<MoodLevel, string> = {
    great: 'bg-mood-great',
    good: 'bg-mood-good',
    okay: 'bg-mood-okay',
    low: 'bg-mood-low',
    difficult: 'bg-mood-difficult',
  };
  return map[mood];
}

export default function MoodCalendar({ logs, getLatestMoodForDate, getLogsForDate }: MoodCalendarProps) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const todayStr = today.toISOString().split('T')[0];

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    let startDow = firstDay.getDay(); // 0=Sun
    startDow = startDow === 0 ? 6 : startDow - 1; // convert to Mon=0

    const days: (string | null)[] = [];
    for (let i = 0; i < startDow; i++) days.push(null);
    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push(`${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`);
    }
    return days;
  }, [year, month]);

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
    setSelectedDate(null);
  };

  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
    setSelectedDate(null);
  };

  const selectedLogs = selectedDate ? getLogsForDate(selectedDate) : [];

  // Month summary
  const monthLogs = useMemo(() => {
    const prefix = `${year}-${String(month + 1).padStart(2, '0')}`;
    return logs.filter(l => l.date.startsWith(prefix));
  }, [logs, year, month]);

  const moodDistribution = useMemo(() => {
    const datesWithMood = new Map<string, MoodLevel>();
    monthLogs.forEach(l => {
      const existing = datesWithMood.get(l.date);
      if (!existing) datesWithMood.set(l.date, l.mood);
      else {
        // Latest wins
        const latest = monthLogs.filter(x => x.date === l.date).sort((a, b) => b.timestamp - a.timestamp)[0];
        datesWithMood.set(l.date, latest.mood);
      }
    });
    const counts: Record<MoodLevel, number> = { great: 0, good: 0, okay: 0, low: 0, difficult: 0 };
    datesWithMood.forEach(m => counts[m]++);
    const total = datesWithMood.size;
    return { counts, total };
  }, [monthLogs]);

  const goodPercentage = moodDistribution.total > 0
    ? Math.round(((moodDistribution.counts.great + moodDistribution.counts.good) / moodDistribution.total) * 100)
    : 0;

  return (
    <div className="space-y-4">
      {/* Calendar Card */}
      <div className="rounded-2xl bg-card p-5 shadow-sm border border-border">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          <h3 className="font-serif text-lg text-foreground">{MONTH_NAMES[month]} {year}</h3>
          <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Day names */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {DAY_NAMES.map(d => (
            <div key={d} className="text-center text-[10px] font-medium text-muted-foreground/70 py-1">{d}</div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((dateStr, i) => {
            if (!dateStr) return <div key={`empty-${i}`} />;
            const mood = getLatestMoodForDate(dateStr);
            const dayNum = parseInt(dateStr.split('-')[2]);
            const isToday = dateStr === todayStr;
            const isSelected = dateStr === selectedDate;
            const dayLogs = getLogsForDate(dateStr);
            const hasMultiple = dayLogs.length > 1;

            return (
              <motion.button
                key={dateStr}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedDate(isSelected ? null : dateStr)}
                className={`relative aspect-square rounded-lg flex flex-col items-center justify-center text-xs font-medium transition-all ${
                  mood ? `${moodBg(mood)} text-white` : 'bg-mood-empty text-muted-foreground'
                } ${isToday ? 'ring-2 ring-primary ring-offset-1 ring-offset-background' : ''} ${
                  isSelected ? 'ring-2 ring-foreground/40' : ''
                }`}
              >
                {dayNum}
                {hasMultiple && (
                  <div className="absolute bottom-0.5 flex gap-0.5">
                    {dayLogs.slice(0, 3).map((_, idx) => (
                      <div key={idx} className="w-1 h-1 rounded-full bg-white/60" />
                    ))}
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Selected day detail */}
      <AnimatePresence>
        {selectedDate && selectedLogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="rounded-2xl bg-card p-5 shadow-sm border border-border"
          >
            <p className="text-sm font-medium text-foreground mb-3">
              {new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
            <div className="space-y-2">
              {selectedLogs.map(log => {
                const cfg = MOOD_CONFIG[log.mood];
                return (
                  <div key={log.id} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                    <span className="text-xl">{cfg.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">{cfg.label}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(log.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                        </span>
                      </div>
                      {log.factors && (
                        <div className="flex gap-1 mt-1">
                          {log.factors.map(f => (
                            <span key={f} className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent text-accent-foreground">{f}</span>
                          ))}
                        </div>
                      )}
                      {log.tobaccoUrge && (
                        <span className="text-[10px] text-warning mt-1 block">Tobacco urge: {log.tobaccoUrge}</span>
                      )}
                      {log.notes && <p className="text-xs text-muted-foreground mt-1">{log.notes}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Month summary */}
      {moodDistribution.total > 0 && (
        <div className="rounded-2xl bg-card p-5 shadow-sm border border-border">
          <p className="text-sm font-medium text-foreground mb-3">This month</p>
          {/* Bar chart */}
          <div className="flex gap-1 h-3 rounded-full overflow-hidden mb-3">
            {(['great', 'good', 'okay', 'low', 'difficult'] as MoodLevel[]).map(mood => {
              const pct = (moodDistribution.counts[mood] / moodDistribution.total) * 100;
              if (pct === 0) return null;
              return (
                <div
                  key={mood}
                  className={moodBg(mood)}
                  style={{ width: `${pct}%` }}
                />
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">{goodPercentage}%</span> of your days were Good or Great
          </p>
          {/* Legend */}
          <div className="flex flex-wrap gap-3 mt-3">
            {(['great', 'good', 'okay', 'low', 'difficult'] as MoodLevel[]).map(mood => {
              if (moodDistribution.counts[mood] === 0) return null;
              const cfg = MOOD_CONFIG[mood];
              return (
                <div key={mood} className="flex items-center gap-1.5">
                  <div className={`w-2.5 h-2.5 rounded-full ${moodBg(mood)}`} />
                  <span className="text-[10px] text-muted-foreground">{cfg.label} ({moodDistribution.counts[mood]})</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
