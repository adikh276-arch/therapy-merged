export type MoodType = "great" | "good" | "okay" | "low" | "difficult";
export type UrgeType = "none" | "mild" | "strong";
export type FactorType = "Work" | "Sleep" | "Health" | "Relationships" | "Recovery" | "Fatigue" | "Achievement" | "Other";

export interface MoodEntry {
  id: string;
  timestamp: string;
  date: string;
  mood: MoodType;
  factors: FactorType[];
  tobaccoUrge: UrgeType;
  notes: string | null;
}

const STORAGE_KEY = "moodLogs";

export function getMoodLogs(): MoodEntry[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveMoodLog(entry: MoodEntry): void {
  const logs = getMoodLogs();
  logs.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

export function deleteMoodLog(id: string): void {
  const logs = getMoodLogs().filter(l => l.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

export function getLogsForDate(date: string): MoodEntry[] {
  return getMoodLogs().filter(l => l.date === date);
}

export function getLogsForMonth(year: number, month: number): MoodEntry[] {
  const prefix = `${year}-${String(month + 1).padStart(2, "0")}`;
  return getMoodLogs().filter(l => l.date.startsWith(prefix));
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

export const MOOD_CONFIG: Record<MoodType, { emoji: string; label: string; color: string; bgColor: string; borderColor: string }> = {
  great:     { emoji: "😄", label: "Great",     color: "mood-great",     bgColor: "mood-great-bg",     borderColor: "#0EA66E" },
  good:      { emoji: "🙂", label: "Good",      color: "mood-good",      bgColor: "mood-good-bg",      borderColor: "#35AEF7" },
  okay:      { emoji: "😐", label: "Okay",      color: "mood-okay",      bgColor: "mood-okay-bg",      borderColor: "#DDE3EC" },
  low:       { emoji: "😟", label: "Low",       color: "mood-low",       bgColor: "mood-low-bg",       borderColor: "#D97706" },
  difficult: { emoji: "😣", label: "Difficult", color: "mood-difficult", bgColor: "mood-difficult-bg", borderColor: "#DC3545" },
};

export const FACTORS: FactorType[] = ["Work", "Sleep", "Health", "Relationships", "Recovery", "Fatigue", "Achievement", "Other"];
