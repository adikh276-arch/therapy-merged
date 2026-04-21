import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/TranslationContext';
import { supabase, withUserContext } from '@/lib/supabase';
import { type MoodEntry } from '@/types/mood';
import { Lightbulb } from 'lucide-react';

interface Props {
  entries: MoodEntry[];
}

export default function InsightsPanel({ entries }: Props) {
  const { userId } = useAuth();
  const { t } = useTranslation();
  const [insights, setInsights] = useState<string[]>([]);

  useEffect(() => {
    if (!userId || entries.length < 5) {
      setInsights([]);
      return;
    }
    generateInsights();
  }, [userId, entries.length]);

  const generateInsights = async () => {
    if (!userId) return;
    const result: string[] = [];
    const total = entries.length;

    // Mood distribution
    const counts: Record<string, number> = {};
    entries.forEach((e) => {
      counts[e.mood] = (counts[e.mood] || 0) + 1;
    });
    const positiveRate = Math.round(
      (((counts.great || 0) + (counts.good || 0)) / total) * 100
    );
    if (positiveRate > 50) {
      result.push(
        `${positiveRate}% of your entries are Good or Great. Keep it up!`
      );
    } else if (positiveRate < 30) {
      result.push(
        `Only ${positiveRate}% of entries are positive. Consider speaking with a counsellor.`
      );
    }

    // Tobacco correlation
    const strongUrge = entries.filter((e) => e.tobacco_urge === 'strong');
    if (strongUrge.length >= 3) {
      const lowWithUrge = strongUrge.filter(
        (e) => e.mood === 'difficult' || e.mood === 'low'
      ).length;
      const pct = Math.round((lowWithUrge / strongUrge.length) * 100);
      if (pct > 40) {
        result.push(
          `${pct}% of strong tobacco urges happen during low or difficult moods.`
        );
      }
    }

    // Top factor
    const factorCounts: Record<string, number> = {};
    entries.forEach((e) => {
      if (e.factors) {
        (e.factors as string[]).forEach((f) => {
          factorCounts[f] = (factorCounts[f] || 0) + 1;
        });
      }
    });
    const topFactor = Object.entries(factorCounts).sort(
      (a, b) => b[1] - a[1]
    )[0];
    if (topFactor && topFactor[1] >= 3) {
      result.push(
        `"${topFactor[0]}" is your top mood factor (${topFactor[1]} times).`
      );
    }

    // Cross-tracker: sleep
    try {
      await withUserContext(userId);
      const { data: sleepData } = await supabase
        .from('sleep_logs')
        .select('date, score')
        .eq('user_id', userId)
        .gte('score', 75);

      if (sleepData && sleepData.length > 3) {
        const goodSleepDates = new Set(sleepData.map((s: any) => s.date));
        const moodsOnGoodSleep = entries.filter(
          (e) =>
            goodSleepDates.has(e.date) &&
            (e.mood === 'great' || e.mood === 'good')
        );
        const totalOnGoodSleep = entries.filter((e) =>
          goodSleepDates.has(e.date)
        );
        if (totalOnGoodSleep.length > 0) {
          const pct = Math.round(
            (moodsOnGoodSleep.length / totalOnGoodSleep.length) * 100
          );
          result.push(
            `On well-rested days, your mood is Good or Great ${pct}% of the time.`
          );
        }
      }
    } catch {
      // sleep_logs table may not exist
    }

    setInsights(result);
  };

  if (insights.length === 0) return null;

  return (
    <div className="bg-card rounded-2xl p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-bold">{t('Insights')}</h3>
      </div>
      <div className="space-y-2">
        {insights.map((insight, i) => (
          <p
            key={i}
            className="text-sm text-accent-foreground bg-accent rounded-xl px-3 py-2.5"
          >
            {t(insight)}
          </p>
        ))}
      </div>
    </div>
  );
}
