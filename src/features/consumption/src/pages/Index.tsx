import { useState, useCallback } from "react";
import { useConsumptionData } from "@/hooks/useConsumptionData";
import { Cigarette, BarChart3, Minus, Plus, Lightbulb, MessageCircle } from "lucide-react";
import ProfileSetup from "@/components/ProfileSetup";
import CircularCounter from "@/components/CircularCounter";
import ImpactMessage from "@/components/ImpactMessage";
import LifetimeImpact from "@/components/LifetimeImpact";
import WeekSummary from "@/components/WeekSummary";
import HistoryDrawer from "@/components/HistoryDrawer";
import DetailExpander from "@/components/DetailExpander";

const Index = () => {
  const {
    logs, profile, todayCount, lastLogTime, stats,
    weekData, addOne, removeLastToday, deleteLog,
    saveProfile, setPendingDetails, hasProfile, formatIndianNumber,
  } = useConsumptionData();

  const [showSetup, setShowSetup] = useState(!hasProfile);
  const [showHistory, setShowHistory] = useState(false);
  const [messageTrigger, setMessageTrigger] = useState(0);
  const [setupDismissed, setSetupDismissed] = useState(() => !!localStorage.getItem("setupDismissed"));

  const handleAdd = useCallback(() => {
    addOne();
    setMessageTrigger((p) => p + 1);
  }, [addOne]);

  const handleSkip = () => {
    setShowSetup(false);
    setSetupDismissed(true);
    localStorage.setItem("setupDismissed", "1");
  };

  const handleSaveProfile = (p: Parameters<typeof saveProfile>[0]) => {
    saveProfile(p);
    setShowSetup(false);
    setSetupDismissed(true);
    localStorage.setItem("setupDismissed", "1");
  };

  const showProfileSetup = showSetup && !setupDismissed;

  // Detect high-risk pattern
  const thisWeekTotal = weekData.reduce((s, d) => s + d.count, 0);
  const lastWeekish = thisWeekTotal; // simplified: show if avg > 15/day
  const highRisk = thisWeekTotal > 0 && thisWeekTotal / 7 > 15;

  return (
    <div className="min-h-screen bg-background">
      {/* Profile Setup Modal */}
      {showProfileSetup && (
        <ProfileSetup onSave={handleSaveProfile} onSkip={handleSkip} />
      )}

      {/* Top Nav */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-5 py-3 max-w-lg mx-auto">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Cigarette size={18} className="text-primary" />
            </div>
            <h1 className="text-base font-semibold text-foreground font-sans">Consumption</h1>
          </div>
          <button
            onClick={() => setShowHistory(true)}
            className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <BarChart3 size={18} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto px-5 pb-12">
        {/* Hero Counter */}
        <div className="flex flex-col items-center pt-8 pb-4">
          <CircularCounter count={todayCount} />
          {lastLogTime && (
            <p className="text-xs text-muted-foreground mt-2">
              Last recorded {lastLogTime.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={removeLastToday}
            disabled={todayCount === 0}
            className="w-16 h-16 rounded-2xl bg-secondary text-secondary-foreground flex items-center justify-center text-2xl font-medium hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            <Minus size={24} />
          </button>
          <button
            onClick={handleAdd}
            className="w-20 h-20 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center text-3xl font-medium shadow-lg hover:opacity-90 transition-all active:scale-95"
          >
            <Plus size={28} />
          </button>
        </div>

        {/* Impact Message */}
        <div className="h-16 flex items-center justify-center mb-2">
          <ImpactMessage triggerKey={messageTrigger} />
        </div>

        {/* Detail Expander */}
        <div className="mb-8 flex justify-center">
          <DetailExpander onUpdate={setPendingDetails} />
        </div>

        {/* Lifetime Impact */}
        {stats && (
          <div className="mb-10">
            <LifetimeImpact stats={stats} formatNumber={formatIndianNumber} />
          </div>
        )}

        {/* Pattern Insight (placeholder) */}
        {stats && todayCount > 3 && (
          <div className="mb-8 rounded-2xl p-4 bg-gradient-to-br from-secondary to-accent">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Lightbulb size={16} className="text-primary" />
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                You've logged {todayCount} today. Your average this week is{" "}
                {(thisWeekTotal / Math.max(weekData.filter((d) => d.count > 0).length, 1)).toFixed(0)} per active day.
              </p>
            </div>
          </div>
        )}

        {/* Week Summary */}
        {weekData.some((d) => d.count > 0) && (
          <div className="mb-8">
            <WeekSummary data={weekData} />
          </div>
        )}

        {/* Expert Booking */}
        {highRisk && (
          <div className="mb-8 rounded-2xl p-4 bg-warning-soft border border-warning/20">
            <p className="text-sm text-warning-foreground font-medium mb-2">
              Your consumption has increased significantly this week
            </p>
            <button className="flex items-center gap-2 text-sm font-medium text-primary hover:underline">
              <MessageCircle size={16} />
              Talk to a counsellor
            </button>
          </div>
        )}

        {/* Setup prompt if not done */}
        {!hasProfile && setupDismissed && (
          <button
            onClick={() => { setShowSetup(true); setSetupDismissed(false); }}
            className="w-full rounded-2xl p-4 bg-secondary text-left hover:bg-accent transition-colors mb-8"
          >
            <p className="text-sm font-medium text-foreground">Set up your profile</p>
            <p className="text-xs text-muted-foreground mt-0.5">See your lifetime impact with a quick 30-second setup</p>
          </button>
        )}
      </main>

      {/* History Drawer */}
      <HistoryDrawer
        open={showHistory}
        onClose={() => setShowHistory(false)}
        logs={logs}
        onDelete={deleteLog}
        weekData={weekData}
      />
    </div>
  );
};

export default Index;
