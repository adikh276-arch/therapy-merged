import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Moon } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from '@/hooks/useTranslation';
import LoadingScreen from '@/components/LoadingScreen';
import ScoreRing from '@/components/ScoreRing';
import SleepLogForm from '@/components/SleepLogForm';
import WeeklyChart from '@/components/WeeklyChart';
import SleepHistory from '@/components/SleepHistory';
import OptimizationTips from '@/components/OptimizationTips';
import CrossTrackerInsights from '@/components/CrossTrackerInsights';
import ExpertBooking from '@/components/ExpertBooking';
import LanguageSelector from '@/components/LanguageSelector';
import CelebrationModal from '@/components/CelebrationModal';
import {
  fetchTodayLog,
  fetchSleepLogs,
  fetchWeeklyLogs,
  upsertSleepLog,
} from '@/lib/supabaseClient';
import { getScoreTier } from '@/lib/scoreCalculator';

export default function Index() {
  const { loading: authLoading, userId } = useAuth();
  const { lang, setLang, t, translateBatch, languages } = useTranslation();

  const [todayLog, setTodayLog] = useState<any>(null);
  const [allLogs, setAllLogs] = useState<any[]>([]);
  const [weeklyLogs, setWeeklyLogs] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [celebration, setCelebration] = useState<{ show: boolean; score: number }>({
    show: false,
    score: 0,
  });

  // Translate UI strings
  useEffect(() => {
    translateBatch([
      'Log Sleep', 'This Week', 'History', 'Tips', 'Calculate Score',
      'Bedtime (last night)', 'Wake time', 'How was your sleep?',
      'Poor', 'Low', 'Fair', 'Good', 'Excellent', 'total sleep',
    ]);
  }, [lang, translateBatch]);

  // Load data
  const loadData = useCallback(async () => {
    if (!userId) return;
    setDataLoading(true);
    const [today, all, weekly] = await Promise.all([
      fetchTodayLog(userId),
      fetchSleepLogs(userId, 30),
      fetchWeeklyLogs(userId),
    ]);
    setTodayLog(today);
    setAllLogs(all);
    setWeeklyLogs(weekly);
    if (today?.score) setShowScore(true);
    setDataLoading(false);
  }, [userId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Stats
  const avgScore = useMemo(() => {
    const scored = weeklyLogs.filter(l => l.score != null);
    if (scored.length === 0) return 0;
    return Math.round(scored.reduce((s, l) => s + l.score, 0) / scored.length);
  }, [weeklyLogs]);

  const avgMinutes = useMemo(() => {
    const withMin = allLogs.filter(l => l.total_minutes != null);
    if (withMin.length === 0) return 480;
    return Math.round(withMin.reduce((s, l) => s + l.total_minutes, 0) / withMin.length);
  }, [allLogs]);

  const personalBest = useMemo(() => {
    return Math.max(0, ...allLogs.map(l => l.score || 0));
  }, [allLogs]);

  // Handle score calculation
  const handleCalculate = async (data: {
    bedtime: string;
    wakeTime: string;
    totalMinutes: number;
    quality: number;
    score: number;
  }) => {
    if (!userId) return;
    setSaving(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      const saved = await upsertSleepLog(userId, {
        date: today,
        bedtime: data.bedtime,
        wake_time: data.wakeTime,
        total_minutes: data.totalMinutes,
        quality: data.quality,
        score: data.score,
      });
      setTodayLog(saved);
      setShowScore(true);

      // Check personal best
      if (data.score > personalBest) {
        setTimeout(() => setCelebration({ show: true, score: data.score }), 1500);
      }

      await loadData();
    } catch (err) {
      console.error('Save error:', err);
    } finally {
      setSaving(false);
    }
  };

  if (authLoading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/30">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Moon className="w-5 h-5 text-primary" />
            <h1 className="font-display font-bold text-base">Sleep Tracker</h1>
          </div>
          <LanguageSelector lang={lang} setLang={setLang} languages={languages} />
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 pt-6 space-y-5">
        {dataLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-muted border-t-primary animate-spin" />
          </div>
        ) : (
          <>
            {/* Hero Score Ring */}
            {showScore && todayLog?.score != null && (
              <motion.div
                className="flex justify-center py-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <ScoreRing
                  score={todayLog.score}
                  avgScore={avgScore}
                />
              </motion.div>
            )}

            {showScore && todayLog?.score != null && (
              <motion.p
                className="text-center text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                Sleep score: {todayLog.score}/100 — {getScoreTier(todayLog.score).label} sleep!
              </motion.p>
            )}

            {/* Sleep Log Form */}
            {!todayLog && (
              <SleepLogForm onCalculate={handleCalculate} loading={saving} />
            )}

            {/* Expert Booking Alert */}
            <ExpertBooking recentLogs={allLogs} />

            {/* Weekly Chart */}
            <WeeklyChart data={weeklyLogs} />

            {/* Optimization Tips */}
            <OptimizationTips
              avgMinutes={avgMinutes}
              avgScore={avgScore}
              lastScore={todayLog?.score ?? null}
            />

            {/* Cross-Tracker Insights */}
            <CrossTrackerInsights userId={userId!} avgScore={avgScore} />

            {/* History */}
            <SleepHistory logs={allLogs} />
          </>
        )}
      </main>

      {/* Celebration Modal */}
      <CelebrationModal
        show={celebration.show}
        score={celebration.score}
        onClose={() => setCelebration({ show: false, score: 0 })}
      />
    </div>
  );
}
