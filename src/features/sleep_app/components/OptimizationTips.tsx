import { useMemo } from 'react';
import { Lightbulb } from 'lucide-react';

interface TipsProps {
  avgMinutes: number;
  avgScore: number;
  lastScore: number | null;
}

export default function OptimizationTips({ avgMinutes, avgScore, lastScore }: TipsProps) {
  const tips = useMemo(() => {
    const result: string[] = [];
    const avgHours = avgMinutes / 60;

    if (avgHours < 7) {
      const pointsGain = Math.round((7.5 - avgHours) * 10);
      result.push(`Getting ${avgHours < 6.5 ? '7-7.5' : '7.5-8'} hours could add ~${pointsGain} points to your score`);
    }
    if (avgHours > 9) {
      result.push('Sleeping over 9 hours may indicate poor sleep quality. Aim for 7-8.5 hours.');
    }
    if (avgScore < 60) {
      result.push('Focus on consistent bedtimes. A regular schedule can improve sleep quality by 20-30%.');
    }
    if (lastScore && lastScore > avgScore + 10) {
      result.push("Great improvement! Keep repeating last night's routine.");
    }
    if (result.length === 0) {
      result.push("You're doing great! Maintain your current sleep routine for best results.");
    }
    return result;
  }, [avgMinutes, avgScore, lastScore]);

  return (
    <div className="glass-card p-5">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="w-4 h-4 text-score-excellent" />
        <h2 className="font-display text-lg font-semibold">Tips</h2>
      </div>
      <div className="space-y-2">
        {tips.map((tip, i) => (
          <p key={i} className="text-sm text-muted-foreground leading-relaxed">
            💡 {tip}
          </p>
        ))}
      </div>
    </div>
  );
}
