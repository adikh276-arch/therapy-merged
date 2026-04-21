import { useState } from "react";
import { Zap, Lightbulb, History } from "lucide-react";
import { useEnergyLogs } from "@/hooks/useEnergyLogs";
import EnergyLogCard from "@/components/energy/EnergyLogCard";
import TodayTimeline from "@/components/energy/TodayTimeline";
import DiscoveriesCard from "@/components/energy/DiscoveriesCard";
import WeeklyTrendCard from "@/components/energy/WeeklyTrendCard";
import StatsRow from "@/components/energy/StatsRow";
import ExpertBookingCard from "@/components/energy/ExpertBookingCard";
import CrossTrackerCard from "@/components/energy/CrossTrackerCard";
import DiscoveriesView from "@/components/energy/DiscoveriesView";
import HistoryDrawer from "@/components/energy/HistoryDrawer";

export default function Index() {
  const {
    logs,
    discoveries,
    todayLogs,
    todayAvg,
    weeklyData,
    last7Avg,
    isTrendingUp,
    consecutiveLowDays,
    historyLogs,
    addLog,
    deleteLog,
    totalEntries,
  } = useEnergyLogs();

  const [showDiscoveries, setShowDiscoveries] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-card/90 backdrop-blur-sm border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Zap size={18} className="text-primary" />
          <span className="font-sora text-[17px] font-bold text-foreground">Energy</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowHistory(true)}
            className="text-muted-foreground hover:text-foreground transition-colors p-1"
            aria-label="History"
          >
            <History size={20} />
          </button>
          <button
            onClick={() => setShowDiscoveries(true)}
            className="text-primary hover:text-primary/80 transition-colors p-1"
            aria-label="Discoveries"
          >
            <Lightbulb size={20} />
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-lg mx-auto px-4 py-5 space-y-4 pb-10">
        {/* Expert booking (shows only when triggered) */}
        <ExpertBookingCard
          logs={logs}
          todayLogs={todayLogs}
          consecutiveLowDays={consecutiveLowDays}
          last7Avg={last7Avg}
        />

        {/* Quick log */}
        <EnergyLogCard onLog={addLog} />

        {/* Stats row */}
        <StatsRow
          todayCount={todayLogs.length}
          todayAvg={todayAvg}
          discoveriesCount={discoveries.length}
        />

        {/* Today's timeline */}
        <div className="bg-card rounded-lg shadow-card px-4 py-3">
          <TodayTimeline logs={todayLogs} avg={todayAvg} />
        </div>

        {/* Discoveries */}
        <DiscoveriesCard
          totalEntries={totalEntries}
          discoveries={discoveries}
          onViewAll={() => setShowDiscoveries(true)}
        />

        {/* Cross-tracker */}
        <CrossTrackerCard logs={logs} />

        {/* Weekly trend */}
        <WeeklyTrendCard
          weeklyData={weeklyData}
          last7Avg={last7Avg}
          isTrendingUp={isTrendingUp}
        />
      </main>

      {/* Overlays */}
      {showDiscoveries && (
        <DiscoveriesView
          discoveries={discoveries}
          logs={logs}
          onClose={() => setShowDiscoveries(false)}
        />
      )}

      {showHistory && (
        <HistoryDrawer
          logs={historyLogs}
          onDelete={deleteLog}
          onClose={() => setShowHistory(false)}
        />
      )}
    </div>
  );
}
