import { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
} from 'date-fns';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';
import { type MoodEntry, type MoodType, MOOD_BG } from '@/types/mood';
import DayDetail from './DayDetail';

const DAY_NAMES = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function CalendarGrid({ entries }: { entries: MoodEntry[] }) {
  const { t } = useTranslation();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startPadding = getDay(monthStart);

  const getEntriesForDay = (day: Date) =>
    entries.filter((e) => isSameDay(new Date(e.date), day));

  const getLatestMood = (day: Date): MoodType | null => {
    const dayEntries = getEntriesForDay(day);
    if (dayEntries.length === 0) return null;
    dayEntries.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    return dayEntries[0].mood;
  };

  return (
    <div className="bg-card rounded-2xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-2 rounded-full hover:bg-secondary transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <h2 className="text-base font-extrabold">
          {t(format(currentMonth, 'MMMM'))} {format(currentMonth, 'yyyy')}
        </h2>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-2 rounded-full hover:bg-secondary transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAY_NAMES.map((d, i) => (
          <div
            key={i}
            className="text-center text-[10px] font-bold text-muted-foreground uppercase"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {Array.from({ length: startPadding }).map((_, i) => (
          <div key={`pad-${i}`} />
        ))}
        {days.map((day) => {
          const mood = getLatestMood(day);
          const dayEntries = getEntriesForDay(day);
          const today = isToday(day);

          return (
            <motion.button
              key={day.toISOString()}
              whileTap={{ scale: 0.88 }}
              onClick={() => setSelectedDay(day)}
              className={`aspect-square rounded-xl flex flex-col items-center justify-center relative text-sm font-bold transition-all ${
                mood
                  ? `${MOOD_BG[mood]} text-card`
                  : 'bg-secondary text-muted-foreground'
              } ${today ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}`}
            >
              {format(day, 'd')}
              {dayEntries.length > 1 && (
                <div className="flex gap-0.5 absolute bottom-1">
                  {dayEntries.slice(0, 3).map((_, i) => (
                    <div
                      key={i}
                      className="w-1 h-1 rounded-full bg-card"
                    />
                  ))}
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

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
