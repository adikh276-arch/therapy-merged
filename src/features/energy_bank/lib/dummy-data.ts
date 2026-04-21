import { DayRecord, Transaction, WeekSummary } from './types';

const TODAY = '2026-02-07';

function tx(id: string, activityId: string, name: string, emoji: string, cost: number, time: string, balanceAfter: number, ts: number): Transaction {
  return { id, activityId, activityName: name, emoji, cost, time, balanceAfter, timestamp: ts };
}

export const TODAY_RECORD: DayRecord = {
  date: TODAY,
  startingEnergy: 55,
  expectedEnergy: 60,
  transactions: [
    tx('t1', 'morning-routine', 'Morning routine', '☀️', 25, '08:30', 30, 1738925400000),
    tx('t2', 'grocery-shopping', 'Quick grocery run', '🛒', 28, '10:15', 2, 1738931700000),
    tx('t3', 'make-lunch', 'Made lunch', '🥪', 8, '12:00', -6, 1738938000000),
    tx('t4', 'nap-20min', '20-min nap', '😴', -12, '13:30', 6, 1738943400000),
    tx('t5', 'light-cleaning', 'Light cleaning', '✨', 15, '14:00', -9, 1738945200000),
    tx('t6', 'stretching', 'Gentle stretching', '🤸', -5, '14:30', -4, 1738947000000),
  ],
  tags: [],
  isCrashMode: false,
};

export const WEEK_HISTORY: WeekSummary[] = [
  { date: '2026-02-01', started: 70, spent: 85, netBalance: -15 },
  { date: '2026-02-02', started: 52, spent: 50, netBalance: 2 },
  { date: '2026-02-03', started: 65, spent: 45, netBalance: 20 },
  { date: '2026-02-04', started: 75, spent: 95, netBalance: -20 },
  { date: '2026-02-05', started: 50, spent: 55, netBalance: -5 },
  { date: '2026-02-06', started: 45, spent: 40, netBalance: 5 },
  { date: '2026-02-07', started: 55, spent: 59, netBalance: -4 },
];

export const DETECTED_PATTERNS = [
  "Thursday crash pattern detected — weekly meeting costs 45 units",
  "You recover best on Wednesdays and Saturdays",
  "You overspend 3 out of 7 days",
];

export const DUMMY_INSIGHTS = {
  avgDailyEnergy: 58,
  healthyPersonEnergy: 200,
  capacityPercent: 29,
  mostExpensive: { name: 'Weekly work meeting', cost: 45 },
  bestInvestment: { name: 'Sunday meal prep', roi: 35 },
  crashRisk: 40,
  weeklyDeposited: 412,
  weeklySpent: 429,
  weeklyNet: -17,
  daysInDebt: 3,
};

export function getInitialBalance(): number {
  const stored = localStorage.getItem('energy-today');
  if (stored) {
    const parsed = JSON.parse(stored);
    if (parsed.date === TODAY) return parsed.balance;
  }
  // Return current balance from dummy data
  return -4;
}

export function hasCheckedInToday(): boolean {
  const stored = localStorage.getItem('energy-checkin');
  if (stored) {
    const parsed = JSON.parse(stored);
    return parsed.date === TODAY;
  }
  // Dummy data says they already checked in
  return true;
}
