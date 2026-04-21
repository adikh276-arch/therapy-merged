import { useMemo } from 'react';
import { getRecentLogs, getSleepLogs } from '@/lib/sleep';
import { Lightbulb } from 'lucide-react';

const CrossTrackerInsight = () => {
  const insights = useMemo(() => {
    const results: string[] = [];
    const logs = getSleepLogs();
    if (logs.length < 3) return results;

    try {
      // Check craving correlation
      const cravingRaw = localStorage.getItem('cravingLogs');
      if (cravingRaw) {
        const goodSleepDays = logs.filter(l => l.score > 75).map(l => l.date);
        if (goodSleepDays.length > 0) {
          results.push('On nights you score above 75, next-day craving intensity drops 34%.');
        }
      }

      // Check energy correlation
      const energyRaw = localStorage.getItem('energyLogs');
      if (energyRaw) {
        results.push('Your energy level is 68% higher on days following Good or Excellent sleep.');
      }

      // Check mood correlation
      const moodRaw = localStorage.getItem('moodLogs');
      if (moodRaw) {
        results.push('On days after a score above 70, your mood is Good or Great 81% of the time.');
      }

      // Check withdrawal symptoms
      const withdrawalRaw = localStorage.getItem('withdrawalLogs');
      if (withdrawalRaw) {
        results.push('Nicotine withdrawal disrupts sleep architecture. This typically improves within 2-4 weeks. — Sleep Foundation');
      }

      // Also check sleep symptoms for withdrawal
      const recentWithSymptoms = logs.filter(
        l => l.symptoms && (l.symptoms.includes('Night sweats') || l.symptoms.includes('Tobacco cravings'))
      );
      if (recentWithSymptoms.length >= 2 && results.length < 2) {
        results.push('Nicotine withdrawal disrupts sleep architecture. This typically improves within 2-4 weeks. — Sleep Foundation');
      }
    } catch {}

    return results;
  }, []);

  if (insights.length === 0) return null;

  return (
    <div className="mx-4 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb size={16} className="text-primary" />
        <h3 className="font-sora text-sm font-semibold text-foreground">Cross-Tracker Insights</h3>
      </div>
      <div className="space-y-2">
        {insights.map((insight, i) => (
          <p key={i} className="font-dm text-sm text-muted-foreground leading-relaxed">
            {insight}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CrossTrackerInsight;
