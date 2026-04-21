import { useMemo } from 'react';
import { format } from 'date-fns';
import { type MoodEntry, type MoodType, MOOD_BG } from '@/types/mood';
import { useTranslation } from '@/contexts/TranslationContext';

interface Props {
  entries: MoodEntry[];
}

const HOURS_DISPLAY = [6, 9, 12, 15, 18, 21];
const TIME_START = 6;
const TIME_END = 23;
const TOTAL = TIME_END - TIME_START;

export default function Timeline({ entries }: Props) {
  const { t } = useTranslation();

  const positions = useMemo(() => {
    return entries.map((entry) => {
      const d = new Date(entry.timestamp);
      const hour = d.getHours() + d.getMinutes() / 60;
      const pct = Math.max(
        2,
        Math.min(98, ((hour - TIME_START) / TOTAL) * 100)
      );
      return { entry, pct };
    });
  }, [entries]);

  if (entries.length < 2) return null;

  return (
    <div className="bg-card rounded-2xl p-4 shadow-sm">
      <h3 className="text-sm font-bold mb-4">{t("Today's Timeline")}</h3>
      <div className="relative h-10 mx-2">
        {/* Track */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-secondary rounded-full -translate-y-1/2" />

        {/* Mood dots */}
        {positions.map(({ entry, pct }, i) => (
          <div
            key={i}
            className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full ${MOOD_BG[entry.mood]} shadow-md border-2 border-card`}
            style={{ left: `${pct}%` }}
            title={format(new Date(entry.timestamp), 'h:mm a')}
          />
        ))}
      </div>
      {/* Time labels */}
      <div className="relative h-4 mx-2 mt-1">
        {HOURS_DISPLAY.map((h) => {
          const pct = ((h - TIME_START) / TOTAL) * 100;
          return (
            <span
              key={h}
              className="absolute -translate-x-1/2 text-[9px] text-muted-foreground font-medium"
              style={{ left: `${pct}%` }}
            >
              {h > 12 ? `${h - 12}p` : h === 12 ? '12p' : `${h}a`}
            </span>
          );
        })}
      </div>
    </div>
  );
}
