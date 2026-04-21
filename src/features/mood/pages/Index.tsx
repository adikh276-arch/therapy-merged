import { Smile, BarChart3 } from 'lucide-react';
import { useState } from 'react';
import { useMoodStore } from '@/hooks/useMoodStore';
import MoodLogger from '@/components/MoodLogger';
import MoodCalendar from '@/components/MoodCalendar';
import TodayTimeline from '@/components/TodayTimeline';
import InsightsPanel from '@/components/InsightsPanel';

const Index = () => {
  const { logs, addLog, getLogsForDate, getLatestMoodForDate, getConsecutiveDifficultDays } = useMoodStore();
  const [showInsights, setShowInsights] = useState(false);
  const consecutiveDifficult = getConsecutiveDifficultDays();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-md px-4 py-6 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Smile className="w-6 h-6 text-primary" />
            <h1 className="font-serif text-2xl text-foreground">Mood Tracker</h1>
          </div>
          <button
            onClick={() => setShowInsights(!showInsights)}
            className={`p-2 rounded-lg transition-colors ${showInsights ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary text-muted-foreground'}`}
          >
            <BarChart3 className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Quick Log */}
          <MoodLogger onLog={addLog} />

          {/* Today Timeline */}
          <TodayTimeline logs={logs} />

          {/* Insights (toggled) */}
          {showInsights && (
            <InsightsPanel logs={logs} consecutiveDifficult={consecutiveDifficult} />
          )}

          {/* Consecutive difficult warning (always show) */}
          {!showInsights && consecutiveDifficult >= 5 && (
            <InsightsPanel logs={[]} consecutiveDifficult={consecutiveDifficult} />
          )}

          {/* Calendar */}
          <MoodCalendar
            logs={logs}
            getLatestMoodForDate={getLatestMoodForDate}
            getLogsForDate={getLogsForDate}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
