import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Heart, AlertTriangle } from 'lucide-react';
import { MoodLog, MoodLevel, MOOD_CONFIG } from '@/types/mood';

interface InsightsPanelProps {
  logs: MoodLog[];
  consecutiveDifficult: number;
}

export default function InsightsPanel({ logs, consecutiveDifficult }: InsightsPanelProps) {
  const insights = useMemo(() => {
    const results: { icon: React.ReactNode; text: string; type: 'insight' | 'warning' | 'positive' }[] = [];

    if (logs.length < 3) {
      results.push({
        icon: <Lightbulb className="w-4 h-4" />,
        text: 'Log a few more moods to start seeing patterns. Keep going!',
        type: 'insight',
      });
      return results;
    }

    // Factor-mood correlation
    const factorMoods: Record<string, MoodLevel[]> = {};
    logs.forEach(l => {
      l.factors?.forEach(f => {
        if (!factorMoods[f]) factorMoods[f] = [];
        factorMoods[f].push(l.mood);
      });
    });

    const goodMoods: MoodLevel[] = ['great', 'good'];
    Object.entries(factorMoods).forEach(([factor, moods]) => {
      if (moods.length >= 3) {
        const goodPct = Math.round((moods.filter(m => goodMoods.includes(m)).length / moods.length) * 100);
        if (goodPct >= 70) {
          results.push({
            icon: <Lightbulb className="w-4 h-4" />,
            text: `When ${factor.toLowerCase()} is a factor, you feel Good or Great ${goodPct}% of the time.`,
            type: 'positive',
          });
        }
      }
    });

    // Streak
    const today = new Date();
    let streak = 0;
    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      if (logs.some(l => l.date === dateStr)) streak++;
      else break;
    }
    if (streak >= 3) {
      results.push({
        icon: <Heart className="w-4 h-4" />,
        text: `${streak}-day logging streak! Consistency is key to self-awareness.`,
        type: 'positive',
      });
    }

    // Tobacco correlation
    const tobaccoLogs = logs.filter(l => l.tobaccoUrge === 'strong');
    if (tobaccoLogs.length >= 2) {
      const lowMoodTobacco = tobaccoLogs.filter(l => l.mood === 'low' || l.mood === 'difficult');
      const pct = Math.round((lowMoodTobacco.length / tobaccoLogs.length) * 100);
      if (pct >= 50) {
        results.push({
          icon: <AlertTriangle className="w-4 h-4" />,
          text: `${pct}% of your strong tobacco urges happen on low/difficult days.`,
          type: 'warning',
        });
      }
    }

    // Always show something — if no insights found, show a positive message
    if (results.length === 0) {
      results.push({
        icon: <Heart className="w-4 h-4" />,
        text: 'Great consistency! Keep logging to unlock more personalised insights.',
        type: 'positive',
      });
    }

    return results.slice(0, 3);
  }, [logs]);

  // Always render if consecutiveDifficult >= 5 or if there are insights to show
  // Don't silently return null when toggled
  if (insights.length === 0 && consecutiveDifficult < 5) return (
    <div className="rounded-xl bg-secondary border border-border p-4">
      <p className="text-xs text-muted-foreground">Log moods daily to unlock insights about your patterns.</p>
    </div>
  );

  return (
    <div className="space-y-3">
      {consecutiveDifficult >= 5 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-warning-surface border border-warning/20 p-5"
        >
          <div className="flex items-start gap-3">
            <Heart className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">You've had {consecutiveDifficult} difficult days in a row</p>
              <p className="text-xs text-muted-foreground mt-1">This is worth discussing with someone who can help. You don't have to do this alone.</p>
              <button className="mt-3 text-xs font-medium text-primary hover:underline">
                Find support →
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {insights.map((insight, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className={`rounded-xl p-4 flex items-start gap-3 ${insight.type === 'warning' ? 'bg-warning-surface border border-warning/20' :
              insight.type === 'positive' ? 'bg-success/5 border border-success/10' :
                'bg-secondary border border-border'
            }`}
        >
          <span className={`mt-0.5 flex-shrink-0 ${insight.type === 'warning' ? 'text-warning' :
              insight.type === 'positive' ? 'text-success' :
                'text-primary'
            }`}>
            {insight.icon}
          </span>
          <p className="text-xs text-foreground leading-relaxed">{insight.text}</p>
        </motion.div>
      ))}
    </div>
  );
}
