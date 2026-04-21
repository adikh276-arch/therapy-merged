import { useMemo } from 'react';
import { type MoodEntry } from '@/types/mood';
import { useTranslation } from '@/contexts/TranslationContext';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  entries: MoodEntry[];
}

export default function ExpertBooking({ entries }: Props) {
  const { t } = useTranslation();

  const shouldShow = useMemo(() => {
    if (entries.length < 5) return false;

    const dateMap = new Map<string, MoodEntry[]>();
    entries.forEach((e) => {
      if (!dateMap.has(e.date)) dateMap.set(e.date, []);
      dateMap.get(e.date)!.push(e);
    });

    const sortedDates = Array.from(dateMap.keys())
      .sort()
      .reverse()
      .slice(0, 5);
    if (sortedDates.length < 5) return false;

    const allDifficult = sortedDates.every((date) => {
      const dayEntries = dateMap.get(date)!;
      return dayEntries.some((e) => e.mood === 'difficult');
    });

    const hasStrongUrge = entries.some(
      (e) =>
        sortedDates.includes(e.date) && e.tobacco_urge === 'strong'
    );

    return allDifficult && hasStrongUrge;
  }, [entries]);

  if (!shouldShow) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-mood-difficult-light border border-mood-difficult rounded-2xl p-5"
    >
      <div className="flex items-start gap-3">
        <Heart className="w-5 h-5 text-mood-difficult mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-bold mb-1">
            {t(
              "You've had 5 difficult days in a row. This is worth discussing with someone."
            )}
          </p>
          <p className="text-xs text-muted-foreground mb-3">
            {t(
              'Speaking with a counsellor can make a real difference.'
            )}
          </p>
          <a
            href="https://mantracare.com/book"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-primary-foreground font-bold text-sm px-4 py-2 rounded-xl hover:opacity-90 transition-opacity"
          >
            {t('Talk to a counsellor')}
          </a>
        </div>
      </div>
    </motion.div>
  );
}
