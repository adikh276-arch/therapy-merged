import { getDaysSinceQuit } from '@/lib/milestones';
import { getWithdrawalLogs } from '@/lib/storage';
import { TrendingDown, Brain, Moon, Sparkles } from 'lucide-react';

interface CrossTrackerInsightProps {
  quitDate: string;
}

const CrossTrackerInsight = ({ quitDate }: CrossTrackerInsightProps) => {
  const days = getDaysSinceQuit(quitDate);
  const logs = getWithdrawalLogs();
  const insights: { icon: React.ReactNode; text: string }[] = [];

  // Symptom trend
  if (logs.length >= 3) {
    const recent = logs.slice(0, 3);
    const older = logs.slice(-3);
    const recentAvg = recent.reduce((s, l) => s + l.severity, 0) / recent.length;
    const olderAvg = older.reduce((s, l) => s + l.severity, 0) / older.length;
    if (recentAvg < olderAvg) {
      const pct = Math.round(((olderAvg - recentAvg) / olderAvg) * 100);
      insights.push({
        icon: <TrendingDown size={16} className="text-accent" />,
        text: `Your withdrawal severity has decreased by ${pct}% over recent logs.`,
      });
    }
  }

  // Craving check
  try {
    const cravingLogs = localStorage.getItem('cravingLogs');
    if (cravingLogs) {
      const parsed = JSON.parse(cravingLogs);
      if (Array.isArray(parsed) && parsed.length >= 3) {
        const recent = parsed.slice(0, 3);
        const older = parsed.slice(-3);
        const rAvg = recent.reduce((s: number, l: any) => s + (l.intensity || 0), 0) / recent.length;
        const oAvg = older.reduce((s: number, l: any) => s + (l.intensity || 0), 0) / older.length;
        if (rAvg < oAvg) {
          const pct = Math.round(((oAvg - rAvg) / oAvg) * 100);
          insights.push({
            icon: <Brain size={16} className="text-primary" />,
            text: `Your craving intensity has dropped ${pct}% since day 1.`,
          });
        }
      }
    }
  } catch {}

  // Sleep check
  try {
    const sleepLogs = localStorage.getItem('sleepLogs');
    if (sleepLogs && days > 3) {
      insights.push({
        icon: <Moon size={16} className="text-primary" />,
        text: `Your sleep may be improving now that nicotine has cleared your system.`,
      });
    }
  } catch {}

  // Past peak withdrawal
  if (days > 3 && insights.length === 0) {
    insights.push({
      icon: <Sparkles size={16} className="text-accent" />,
      text: `The worst is behind you. Withdrawal symptoms typically peak around day 3.`,
    });
  }

  if (insights.length === 0) return null;

  return (
    <div className="mx-4 mt-4 rounded-2xl gradient-hero p-5">
      <h3 className="font-heading text-sm font-bold text-foreground mb-3">Insights</h3>
      <div className="space-y-3">
        {insights.map((ins, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="mt-0.5">{ins.icon}</div>
            <p className="font-body text-sm text-foreground">{ins.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrossTrackerInsight;
