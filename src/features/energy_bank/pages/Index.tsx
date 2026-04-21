import { useState } from 'react';
import { useEnergyStore } from '@/hooks/useEnergyStore';
import { MorningCheckIn } from '@/components/MorningCheckIn';
import { BalanceDisplay } from '@/components/BalanceDisplay';
import { ActivityPicker } from '@/components/ActivityPicker';
import { TransactionLog } from '@/components/TransactionLog';
import { WeeklyInsights } from '@/components/WeeklyInsights';
import { ShowMyDay } from '@/components/ShowMyDay';
import { ProfileTab } from '@/components/ProfileTab';
import { CrashMode } from '@/components/CrashMode';
import { CrashButton } from '@/components/CrashButton';
import { BottomNav, TabId } from '@/components/BottomNav';
import { DailyPlanner } from '@/components/DailyPlanner';

export default function Index() {
  const {
    dayRecord,
    balance,
    isInDebt,
    debtAmount,
    checkedIn,
    crashMode,
    logActivity,
    deleteTransaction,
    completeCheckIn,
    toggleCrashMode,
  } = useEnergyStore();

  const [activeTab, setActiveTab] = useState<TabId>('today');

  if (!checkedIn) {
    return <MorningCheckIn onComplete={completeCheckIn} />;
  }

  if (crashMode) {
    return <CrashMode onExit={toggleCrashMode} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-md border-b border-border px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-sm font-semibold text-foreground">Energy Economy</h1>
            <p className="text-xs text-muted-foreground">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </p>
          </div>
          <BalanceDisplay
            balance={balance}
            startingEnergy={dayRecord.startingEnergy}
            isInDebt={isInDebt}
            compact
          />
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-5 mb-20">
        {activeTab === 'today' && (
          <div className="space-y-6">
            <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
              <BalanceDisplay
                balance={balance}
                startingEnergy={dayRecord.startingEnergy}
                isInDebt={isInDebt}
              />
              {dayRecord.debtRepayment && dayRecord.debtRepayment > 0 && (
                <div className="mt-4 text-xs text-center text-muted-foreground">
                  (Reduced by <span className="text-debt">{dayRecord.debtRepayment}</span> units debt repayment)
                </div>
              )}
              {isInDebt && (
                <div className="mt-4 bg-debt/10 border border-debt/20 rounded-lg px-3 py-2 text-center animate-pulse">
                  <p className="text-xs font-semibold text-debt">
                    ⚠️ You are {debtAmount} units in energy debt
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Estimated recovery: {Math.ceil(debtAmount / 10)} rest activities
                  </p>
                </div>
              )}
            </div>

            <ActivityPicker onSelect={logActivity} />

            <TransactionLog
              transactions={dayRecord.transactions}
              onDelete={deleteTransaction}
            />
          </div>
        )}

        {activeTab === 'planner' && <DailyPlanner />}

        {activeTab === 'insights' && <WeeklyInsights />}

        {activeTab === 'share' && (
          <ShowMyDay
            transactions={dayRecord.transactions}
            startingEnergy={dayRecord.startingEnergy}
            balance={balance}
          />
        )}

        {activeTab === 'profile' && <ProfileTab />}
      </main>

      <CrashButton onClick={toggleCrashMode} />
      <BottomNav active={activeTab} onNavigate={setActiveTab} />
    </div>
  );
}
