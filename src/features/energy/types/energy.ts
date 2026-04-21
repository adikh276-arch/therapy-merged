export interface EnergyLog {
  id: string;
  timestamp: string; // ISO
  level: number; // 1–5
  factors: string[];
}

export interface Discovery {
  factor: string;
  impact: number; // percentage (can be negative)
  direction: "positive" | "negative";
  sampleSize: number;
  lastCalculated: string; // ISO
}

export interface EnergyLevel {
  value: number;
  emoji: string;
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export const ENERGY_LEVELS: EnergyLevel[] = [
  { value: 1, emoji: "🪫", label: "Severely depleted", color: "#DC3545", bgColor: "#FFF1F1", borderColor: "#DC3545" },
  { value: 2, emoji: "😩", label: "Low", color: "#D97706", bgColor: "#FFFBEB", borderColor: "#D97706" },
  { value: 3, emoji: "😐", label: "Moderate", color: "#7A8FA6", bgColor: "#F0F4F8", borderColor: "#7A8FA6" },
  { value: 4, emoji: "⚡", label: "Good", color: "#35AEF7", bgColor: "#EBF6FF", borderColor: "#35AEF7" },
  { value: 5, emoji: "🚀", label: "High", color: "#0EA66E", bgColor: "#ECFDF5", borderColor: "#0EA66E" },
];

export const FACTORS = [
  { id: "poor_sleep", label: "Poor sleep", emoji: "💤" },
  { id: "good_sleep", label: "Good sleep", emoji: "💤" },
  { id: "caffeine", label: "Caffeine", emoji: "☕" },
  { id: "skipped_meal", label: "Skipped meal", emoji: "🍽️" },
  { id: "ate_well", label: "Ate well", emoji: "🍽️" },
  { id: "exercise", label: "Exercise", emoji: "💪" },
  { id: "stress", label: "Stress", emoji: "😰" },
  { id: "medication", label: "Medication", emoji: "💊" },
  { id: "withdrawal", label: "Withdrawal symptoms", emoji: "🚬" },
  { id: "other", label: "Other", emoji: "✨" },
];

export function getLevelInfo(level: number): EnergyLevel {
  return ENERGY_LEVELS.find((l) => l.value === level) ?? ENERGY_LEVELS[2];
}

export function getLevelDotClass(level: number): string {
  const map: Record<number, string> = {
    1: "bg-energy-1",
    2: "bg-energy-2",
    3: "bg-energy-3",
    4: "bg-energy-4",
    5: "bg-energy-5",
  };
  return map[level] ?? "bg-muted";
}
