export interface Activity {
  id: string;
  name: string;
  emoji: string;
  cost: number; // negative = deposit/recovery
  category: ActivityCategory;
  isInvestment?: boolean;
}

export type ActivityCategory = 'basic' | 'work' | 'household' | 'recovery' | 'social' | 'health' | 'transport' | 'leisure';

export interface Transaction {
  id: string;
  activityId: string;
  activityName: string;
  emoji: string;
  cost: number;
  time: string; // HH:MM
  balanceAfter: number;
  timestamp: number;
}

export interface PlanItem {
  id: string;
  activityId: string;
  order: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface DayForecast {
  date: string;
  predictedEnergy: number;
  confidence: number;
  zone: EnergyZone;
}

export interface RecurringModifier {
  id: string;
  sourceActivityId: string;
  sourceActivityName: string;
  amountPerDay: number; // positive = gain, negative = ongoing cost
  daysRemaining: number;
  totalGenerated: number; // to calculate ROI
}

export interface DayRecord {
  date: string; // YYYY-MM-DD
  startingEnergy: number;
  expectedEnergy: number;
  transactions: Transaction[];
  plannedActivities: PlanItem[];
  tags: EnergyTag[];
  isCrashMode: boolean;
  debtRepayment?: number;
  activeModifiers?: RecurringModifier[];
  metrics?: {
    totalSpent: number;
    totalDeposited: number;
    lowestBalance: number;
  };
}

export type EnergyTag = 'slept-poorly' | 'high-pain' | 'flare-up' | 'feeling-good' | 'stressed' | 'medicated';

export type EnergyZone = 'high' | 'medium' | 'low' | 'critical';

export interface WeekSummary {
  date: string;
  started: number;
  spent: number;
  netBalance: number;
}

export type ShareStyle = 'minimal' | 'illustrated' | 'bold';
