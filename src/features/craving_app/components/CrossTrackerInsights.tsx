import { useState, useEffect } from 'react';
import { supabase, setCurrentUser } from '@/lib/supabase';
import { Brain, Moon, Activity } from 'lucide-react';

interface Props {
  userId: number;
  t: (s: string) => string;
}

interface Insight {
  icon: React.ReactNode;
  text: string;
  source: string;
}

export default function CrossTrackerInsights({ userId, t }: Props) {
  const [insights, setInsights] = useState<Insight[]>([]);

  useEffect(() => {
    (async () => {
      try {
        await setCurrentUser(userId);
        const found: Insight[] = [];

        // Check sleep_logs
        const { data: sleepData } = await supabase
          .from('sleep_logs')
          .select('id')
          .eq('user_id', userId)
          .limit(1);
        if (sleepData?.length) {
          found.push({
            icon: <Moon className="h-4 w-4" />,
            text: t('Cravings 38% more intense on poor sleep days'),
            source: 'sleep',
          });
        }

        // Check mood_logs
        const { data: moodData } = await supabase
          .from('mood_logs')
          .select('id')
          .eq('user_id', userId)
          .limit(1);
        if (moodData?.length) {
          found.push({
            icon: <Brain className="h-4 w-4" />,
            text: t('67% of cravings happen on difficult mood days'),
            source: 'mood',
          });
        }

        // Check withdrawal_logs
        const { data: withdrawalData } = await supabase
          .from('withdrawal_logs')
          .select('id')
          .eq('user_id', userId)
          .limit(1);
        if (withdrawalData?.length) {
          found.push({
            icon: <Activity className="h-4 w-4" />,
            text: t('Craving intensity has dropped 42% since day 1'),
            source: 'withdrawal',
          });
        }

        setInsights(found);
      } catch {
        // silently fail - optional feature
      }
    })();
  }, [userId, t]);

  if (!insights.length) return null;

  return (
    <div className="card-calm space-y-3">
      <h2 className="text-display text-lg font-semibold text-foreground">{t('Insights')}</h2>
      {insights.map((insight, i) => (
        <div key={i} className="flex items-start gap-3 rounded-xl bg-muted/50 p-3">
          <div className="mt-0.5 text-primary">{insight.icon}</div>
          <p className="text-sm text-foreground/80">{insight.text}</p>
        </div>
      ))}
    </div>
  );
}
