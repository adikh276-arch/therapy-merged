import { useState, useCallback, useMemo } from 'react';
import TopBar from '@/components/TopBar';
import ScoreCard from '@/components/ScoreCard';
import QuickLogCard from '@/components/QuickLogCard';
import WeeklyProgress from '@/components/WeeklyProgress';
import StatsRow from '@/components/StatsRow';
import CrossTrackerInsight from '@/components/CrossTrackerInsight';
import ExpertBooking from '@/components/ExpertBooking';
import HistoryDrawer from '@/components/HistoryDrawer';
import { getSleepLogs, getTodayStr, type SleepLog } from '@/lib/sleep';

const Index = () => {
  const [historyOpen, setHistoryOpen] = useState(false);
  const [todayLog, setTodayLog] = useState<SleepLog | null>(() => {
    const logs = getSleepLogs();
    return logs.find(l => l.date === getTodayStr()) || null;
  });
  const [refreshKey, setRefreshKey] = useState(0);

  const handleLogged = useCallback((log: SleepLog) => {
    setTodayLog(log);
    setRefreshKey(k => k + 1);
  }, []);

  const handleDataChange = useCallback(() => {
    const logs = getSleepLogs();
    setTodayLog(logs.find(l => l.date === getTodayStr()) || null);
    setRefreshKey(k => k + 1);
  }, []);

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto pb-8">
      <TopBar onHistoryOpen={() => setHistoryOpen(true)} />

      <div className="space-y-4" key={refreshKey}>
        {todayLog && <ScoreCard log={todayLog} />}

        <QuickLogCard onLogged={handleLogged} existingLog={todayLog} />

        <CrossTrackerInsight />

        <WeeklyProgress />

        <StatsRow />

        <ExpertBooking />
      </div>

      <HistoryDrawer
        open={historyOpen}
        onOpenChange={setHistoryOpen}
        onDataChange={handleDataChange}
      />
    </div>
  );
};

export default Index;
