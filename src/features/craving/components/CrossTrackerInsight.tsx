import { getLogs } from '@/lib/cravingData';
import { TrendingDown, Moon, Brain, Zap, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CrossTrackerInsightProps {
  refreshKey: number;
}

const CrossTrackerInsight = ({ refreshKey: _ }: CrossTrackerInsightProps) => {
  const insights: { icon: React.ReactNode; text: string }[] = [];
  const logs = getLogs();
  if (logs.length < 3) return null;

  // Check sleep correlation
  try {
    const sleepLogs = JSON.parse(localStorage.getItem('sleepLogs') || '[]');
    if (sleepLogs.length > 0) {
      const poorSleepDays = new Set(
        sleepLogs.filter((s: any) => s.score < 60).map((s: any) => new Date(s.timestamp || s.date).toDateString())
      );
      const cravingsOnPoorSleep = logs.filter(l => poorSleepDays.has(new Date(l.timestamp).toDateString()));
      const avgOnPoor = cravingsOnPoorSleep.length > 0 ? cravingsOnPoorSleep.reduce((a, c) => a + c.intensity, 0) / cravingsOnPoorSleep.length : 0;
      const avgOverall = logs.reduce((a, c) => a + c.intensity, 0) / logs.length;
      if (avgOnPoor > avgOverall && cravingsOnPoorSleep.length >= 2) {
        const pct = Math.round(((avgOnPoor - avgOverall) / avgOverall) * 100);
        insights.push({ icon: <Moon size={16} className="text-lavender" />, text: `Cravings are ${pct}% more intense when you sleep poorly.` });
      }
    }
  } catch { }

  // Check mood correlation
  try {
    const moodLogs = JSON.parse(localStorage.getItem('moodLogs') || '[]');
    if (moodLogs.length > 0) {
      const difficultDays = new Set(
        moodLogs.filter((m: any) => m.mood === 'difficult' || m.score < 4).map((m: any) => new Date(m.timestamp || m.date).toDateString())
      );
      const cravingsOnDifficult = logs.filter(l => difficultDays.has(new Date(l.timestamp).toDateString()));
      if (cravingsOnDifficult.length > 0) {
        const pct = Math.round((cravingsOnDifficult.length / logs.length) * 100);
        if (pct > 50) {
          insights.push({ icon: <Brain size={16} className="text-teal" />, text: `${pct}% of cravings happen on difficult mood days.` });
        }
      }
    }
  } catch { }

  // Check withdrawal trend
  try {
    const sortedLogs = [...logs].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    const half = Math.floor(sortedLogs.length / 2);
    if (half > 2) {
      const firstHalfAvg = sortedLogs.slice(0, half).reduce((a, c) => a + c.intensity, 0) / half;
      const secondHalfAvg = sortedLogs.slice(half).reduce((a, c) => a + c.intensity, 0) / (sortedLogs.length - half);
      if (secondHalfAvg < firstHalfAvg) {
        const decrease = Math.round(((firstHalfAvg - secondHalfAvg) / firstHalfAvg) * 100);
        insights.push({ icon: <TrendingDown size={16} className="text-teal" />, text: `Cravings intensity decreased ${decrease}% since the start.` });
      }
    }
  } catch { }

  if (insights.length === 0) return null;

  return (
    <div className="rounded-3xl bg-lavender/5 border border-lavender/10 p-6 animate-slide-up">
      <h3 className="text-xs font-bold text-lavender uppercase tracking-widest mb-4 flex items-center gap-2">
        <Lightbulb size={14} />
        Cross-Tracker Insights
      </h3>
      <div className="space-y-4">
        {insights.map((insight, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="mt-0.5 shrink-0">{insight.icon}</div>
            <p className="text-xs font-medium text-muted-foreground leading-relaxed italic">{insight.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrossTrackerInsight;
