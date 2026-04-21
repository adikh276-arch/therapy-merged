import { TriggerData } from "./TriggerDetective";

export interface TriggerEntry extends TriggerData {
  timestamp: string;
}

const STORAGE_KEY = "trigger-detective-entries";

export function saveEntry(data: TriggerData): void {
  const entries = getEntries();
  entries.push({ ...data, timestamp: new Date().toISOString() });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function getEntries(): TriggerEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
