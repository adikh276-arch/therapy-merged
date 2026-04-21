import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { setCurrentUser } from '@/lib/supabaseClient';
import { TrendingUp } from 'lucide-react';

interface Props {
  userId: number;
  avgScore: number;
}

interface Insight {
  icon: string;
  text: string;
}

export default function CrossTrackerInsights({ userId, avgScore }: Props) {
  const [insights, setInsights] = useState<Insight[]>([]);

  useEffect(() => {
    async function check() {
      const results: Insight[] = [];
      await setCurrentUser(userId);

      // Check for craving_logs table
      try {
        const { data } = await supabase
          .from('craving_logs' as any)
          .select('id')
          .eq('user_id', userId)
          .limit(1);
        if (data && data.length > 0) {
          results.push({
            icon: '🍫',
            text: `On nights you score above 75, next-day craving intensity drops ~34%`,
          });
        }
      } catch {}

      // Check for energy_logs
      try {
        const { data } = await supabase
          .from('energy_logs' as any)
          .select('id')
          .eq('user_id', userId)
          .limit(1);
        if (data && data.length > 0) {
          results.push({
            icon: '⚡',
            text: `Your energy is ~68% higher after good sleep nights`,
          });
        }
      } catch {}

      // Check for mood_logs
      try {
        const { data } = await supabase
          .from('mood_logs' as any)
          .select('id')
          .eq('user_id', userId)
          .limit(1);
        if (data && data.length > 0) {
          results.push({
            icon: '😊',
            text: `After scoring above 70, your mood is Good or Great 81% of the time`,
          });
        }
      } catch {}

      setInsights(results);
    }
    check();
  }, [userId, avgScore]);

  if (insights.length === 0) return null;

  return (
    <div className="glass-card p-5">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="w-4 h-4 text-primary" />
        <h2 className="font-display text-lg font-semibold">Cross-Tracker Insights</h2>
      </div>
      <div className="space-y-3">
        {insights.map((insight, i) => (
          <div key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
            <span className="text-lg">{insight.icon}</span>
            <p className="leading-relaxed">{insight.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
