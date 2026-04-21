import { useState, useCallback } from 'react';
import { Transaction, DayRecord, EnergyTag, EnergyZone, RecurringModifier, PlanItem } from '@/lib/types';
import { TODAY_RECORD, hasCheckedInToday } from '@/lib/dummy-data';
import { DEFAULT_ACTIVITIES } from '@/lib/activities';

const TODAY = '2026-02-07';

function loadDay(): DayRecord {
  const stored = localStorage.getItem('energy-day-' + TODAY);
  if (stored) return JSON.parse(stored);
  // Save dummy data initially
  localStorage.setItem('energy-day-' + TODAY, JSON.stringify(TODAY_RECORD));
  return TODAY_RECORD;
}

function saveDay(record: DayRecord) {
  localStorage.setItem('energy-day-' + TODAY, JSON.stringify(record));
}

export function getEnergyZone(balance: number, startingEnergy: number): EnergyZone {
  const pct = startingEnergy > 0 ? (balance / startingEnergy) * 100 : 0;
  if (balance <= 0) return 'critical';
  if (pct >= 60) return 'high';
  if (pct >= 30) return 'medium';
  if (pct >= 15) return 'low';
  return 'critical';
}

export function getBalanceColor(balance: number): string {
  if (balance <= 0) return 'text-debt';
  if (balance >= 60) return 'text-surplus';
  if (balance >= 30) return 'text-energy-medium';
  if (balance >= 10) return 'text-energy-low';
  return 'text-energy-critical';
}

export function useEnergyStore() {
  const [dayRecord, setDayRecord] = useState<DayRecord>(loadDay);
  const [checkedIn, setCheckedIn] = useState(hasCheckedInToday);
  const [crashMode, setCrashMode] = useState(false);
  const [totalDebt, setTotalDebt] = useState(() => {
    const stored = localStorage.getItem('energy-debt');
    return stored ? parseInt(stored) : 0;
  });

  // Calculate real-time balance
  const balance = dayRecord.startingEnergy -
    (dayRecord.debtRepayment || 0) -
    dayRecord.transactions.reduce((acc, t) => acc + t.cost, 0);

  // Calculate projected balance (considering planned items)
  const plannedCost = (dayRecord.plannedActivities || []).reduce((acc, p) => {
    const activity = DEFAULT_ACTIVITIES.find(a => a.id === p.activityId);
    return acc + (activity ? activity.cost : 0);
  }, 0);

  const projectedBalance = balance - plannedCost;

  const isInDebt = balance < 0;
  const debtAmount = isInDebt ? Math.abs(balance) : 0;

  // Persist debt updates
  const updateDebt = (amount: number) => {
    const newDebt = Math.max(0, amount);
    setTotalDebt(newDebt);
    localStorage.setItem('energy-debt', newDebt.toString());
  };

  const logActivity = useCallback((activityId: string) => {
    const activity = DEFAULT_ACTIVITIES.find(a => a.id === activityId);
    if (!activity) return;

    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    // We calculate balance AFTER this transaction for the record
    const cost = activity.cost;
    const currentBalance = dayRecord.startingEnergy - (dayRecord.debtRepayment || 0) - dayRecord.transactions.reduce((acc, t) => acc + t.cost, 0);
    const newBalance = currentBalance - cost;

    const transaction: Transaction = {
      id: 'tx-' + Date.now(),
      activityId: activity.id,
      activityName: activity.name,
      emoji: activity.emoji,
      cost: cost,
      time,
      balanceAfter: newBalance,
      timestamp: Date.now(),
    };

    setDayRecord(prev => {
      // Check for investment
      let newModifiers = prev.activeModifiers || [];
      if (activity.isInvestment) {
        // Define investment logic (hardcoded for demo/MVP)
        // e.g., Meal Prep (-30) -> +10 for 3 days
        // e.g., Rest (-20) -> +5 for 7 days
        let modifier: RecurringModifier | null = null;

        if (activity.id === 'meal-prep') {
          modifier = {
            id: 'mod-' + Date.now(),
            sourceActivityId: activity.id,
            sourceActivityName: activity.name,
            amountPerDay: 10,
            daysRemaining: 3,
            totalGenerated: 0
          };
        } else if (activity.id === 'physical-therapy' || activity.id === 'therapy') {
          modifier = {
            id: 'mod-' + Date.now(),
            sourceActivityId: activity.id,
            sourceActivityName: activity.name,
            amountPerDay: 5,
            daysRemaining: 5,
            totalGenerated: 0
          };
        }

        if (modifier) {
          newModifiers = [...newModifiers, modifier];
        }
      }

      // Metrics update
      const currentLowest = prev.metrics?.lowestBalance ?? prev.startingEnergy;
      const newLowest = Math.min(currentLowest, newBalance);

      const updated = {
        ...prev,
        transactions: [...prev.transactions, transaction],
        activeModifiers: newModifiers,
        metrics: {
          ...prev.metrics,
          totalSpent: (prev.metrics?.totalSpent || 0) + (cost > 0 ? cost : 0),
          totalDeposited: (prev.metrics?.totalDeposited || 0) + (cost < 0 ? Math.abs(cost) : 0),
          lowestBalance: newLowest,
        }
      };

      if (newBalance < 0) {
        updateDebt(Math.abs(newBalance));
      }

      saveDay(updated);
      return updated;
    });
  }, [dayRecord]);

  const planActivity = useCallback((activityId: string) => {
    setDayRecord(prev => {
      const newPlanItem: PlanItem = {
        id: 'plan-' + Date.now(),
        activityId,
        order: (prev.plannedActivities?.length || 0) + 1
      };
      const updated = {
        ...prev,
        plannedActivities: [...(prev.plannedActivities || []), newPlanItem]
      };
      saveDay(updated);
      return updated;
    });
  }, []);

  const removePlannedActivity = useCallback((planId: string) => {
    setDayRecord(prev => {
      const updated = {
        ...prev,
        plannedActivities: (prev.plannedActivities || []).filter(p => p.id !== planId)
      };
      saveDay(updated);
      return updated;
    });
  }, []);

  const completePlannedActivity = useCallback((planId: string) => {
    setDayRecord(prev => {
      const planItem = (prev.plannedActivities || []).find(p => p.id === planId);
      if (!planItem) return prev;

      // Log it
      const activity = DEFAULT_ACTIVITIES.find(a => a.id === planItem.activityId);
      if (!activity) return prev;

      // Remove from plan and add to log logic is handled by calling logActivity, 
      // but state updates need to be atomic or sequential.
      // For simplicity, we'll just modify the record here directly similar to logActivity

      const now = new Date();
      const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
      const currentBalance = prev.startingEnergy - (prev.debtRepayment || 0) - prev.transactions.reduce((acc, t) => acc + t.cost, 0);
      const newBalance = currentBalance - activity.cost;

      const transaction: Transaction = {
        id: 'tx-' + Date.now(),
        activityId: activity.id,
        activityName: activity.name,
        emoji: activity.emoji,
        cost: activity.cost,
        time,
        balanceAfter: newBalance,
        timestamp: Date.now(),
      };

      const updated = {
        ...prev,
        transactions: [...prev.transactions, transaction],
        plannedActivities: (prev.plannedActivities || []).filter(p => p.id !== planId)
      };

      if (newBalance < 0) {
        // We can't use updateDebt here easily because it's a separate state, 
        // so we rely on the effect or just set it if we were component-side, 
        // but here we are in a hook. We'll update the ref/local storage as side effect?
        // Actually we can just update the localStorage directly here for consistency
        const newDebtAmount = Math.abs(newBalance);
        localStorage.setItem('energy-debt', newDebtAmount.toString());
        // We also need to trigger a re-render for debt, but `totalDebt` state handles that on next load/update?
        // Better to expose a way to refresh debt or just use the derived isInDebt for now.
      }

      saveDay(updated);
      return updated;
    });
    // Update local debt state to match
    const stored = localStorage.getItem('energy-debt');
    if (stored) setTotalDebt(parseInt(stored));
  }, []);

  const deleteTransaction = useCallback((txId: string) => {
    setDayRecord(prev => {
      const newTransactions = prev.transactions.filter(t => t.id !== txId);
      // Recalculate balances... logic simplifies to just removing it, 
      // as balance is derived in render for display, 
      // but we store balanceAfter for history. We should re-calc that if we want it accurate.

      let running = prev.startingEnergy - (prev.debtRepayment || 0);
      const recalculated = newTransactions.map(t => {
        running -= t.cost;
        return { ...t, balanceAfter: running };
      });

      const updated = { ...prev, transactions: recalculated };
      saveDay(updated);

      // Update debt if we're back in positive
      if (running >= 0) {
        localStorage.setItem('energy-debt', '0');
        setTotalDebt(0);
      } else {
        localStorage.setItem('energy-debt', Math.abs(running).toString());
        setTotalDebt(Math.abs(running));
      }

      return updated;
    });
  }, []);

  const completeCheckIn = useCallback((energy: number, tags: EnergyTag[]) => {
    // 1. Debt Handling
    const existingDebt = parseInt(localStorage.getItem('energy-debt') || '0');
    let repayment = 0;
    let actualStart = energy;

    if (existingDebt > 0) {
      repayment = Math.min(existingDebt, energy);
      const remainingDebt = existingDebt - repayment;
      localStorage.setItem('energy-debt', remainingDebt.toString());
      setTotalDebt(remainingDebt);
    }

    // 2. Investment/Modifier Handling from PREVIOUS day (simulated persistence needed)
    // Since we only load TODAY, we need to load "yesterday's" modifiers.
    // aggregated modifiers logic:
    // For MVP, we'll store modifiers in a separate 'global-modifiers' key or just carry them over if we had a backend.
    // Let's assume we read from 'energy-modifiers' localStorage.

    const storedModifiersStr = localStorage.getItem('energy-modifiers');
    let activeModifiers: RecurringModifier[] = storedModifiersStr ? JSON.parse(storedModifiersStr) : [];

    // Apply today's benefit
    let investmentReturn = 0;
    const nextModifiers = activeModifiers.map((m: RecurringModifier) => {
      if (m.daysRemaining > 0) {
        investmentReturn += m.amountPerDay;
        return {
          ...m,
          daysRemaining: m.daysRemaining - 1,
          totalGenerated: m.totalGenerated + m.amountPerDay
        };
      }
      return m;
    }).filter((m: RecurringModifier) => m.daysRemaining > 0);

    localStorage.setItem('energy-modifiers', JSON.stringify(nextModifiers));

    // Add investment return to starting energy or treating it as a "Deposit" transaction?
    // Treating it as starting energy boost is cleaner for "Account Balance" metaphor.

    const finalStartingEnergy = energy + investmentReturn;

    const newRecord: DayRecord = {
      date: TODAY,
      startingEnergy: finalStartingEnergy, // Includes investment returns
      expectedEnergy: 60,
      transactions: [],
      plannedActivities: [],
      tags,
      isCrashMode: false,
      debtRepayment: repayment,
      activeModifiers: nextModifiers,
    };
    saveDay(newRecord);
    setDayRecord(newRecord);
    setCheckedIn(true);
    localStorage.setItem('energy-checkin', JSON.stringify({ date: TODAY }));
  }, []);

  const toggleCrashMode = useCallback(() => {
    setCrashMode(prev => !prev);
  }, []);

  return {
    dayRecord,
    balance,
    projectedBalance,
    isInDebt,
    debtAmount,
    totalDebt,
    checkedIn,
    crashMode,
    logActivity,
    planActivity,
    removePlannedActivity,
    completePlannedActivity,
    deleteTransaction,
    completeCheckIn,
    toggleCrashMode,
  };
}
