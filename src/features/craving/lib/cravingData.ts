import { getUserId } from './auth';
import { saveCravingLog, deleteCravingLog, getCravingLogs } from './db';

export interface CravingLog {
  id: string;
  timestamp: string;
  intensity: number;
  intensityLabel: string;
  outcome: 'resisted' | 'smoked';
  trigger: string | null;
  location: string | null;
  quantity: number | null;
  notes: string | null;
}

export const INTENSITY_LEVELS = [
  { range: [1, 2], label: 'Minimal', key: 'minimal' as const },
  { range: [3, 4], label: 'Mild', key: 'mild' as const },
  { range: [5, 6], label: 'Moderate', key: 'moderate' as const },
  { range: [7, 8], label: 'High', key: 'high' as const },
  { range: [9, 10], label: 'Severe', key: 'severe' as const },
];

export const TRIGGERS = ['Stress', 'Boredom', 'After meal', 'Smell of smoke', 'Social', 'Fatigue', 'Habit', 'Other'];
export const LOCATIONS = ['Home', 'Workplace', 'Commute', 'Outdoors', 'Social setting', 'Other'];

export function getLogs(): CravingLog[] {
  try {
    return JSON.parse(localStorage.getItem('cravingLogs') || '[]');
  } catch { return []; }
}

export function saveLogs(logs: CravingLog[]) {
  localStorage.setItem('cravingLogs', JSON.stringify(logs));
}

export async function addLog(log: CravingLog) {
  const logs = getLogs();
  logs.unshift(log);
  saveLogs(logs);

  const userId = getUserId();
  if (userId) {
    try {
      await saveCravingLog(userId, {
        id: log.id,
        timestamp: log.timestamp,
        intensity: log.intensity,
        intensity_label: log.intensityLabel,
        outcome: log.outcome,
        trigger: log.trigger || undefined,
        location: log.location || undefined,
        quantity: log.quantity || undefined,
        notes: log.notes || undefined
      });
    } catch (err) {
      console.error('Failed to save to Supabase:', err);
    }
  }
  return logs;
}

export async function deleteLog(id: string) {
  const logs = getLogs().filter(l => l.id !== id);
  saveLogs(logs);

  const userId = getUserId();
  if (userId) {
    try {
      await deleteCravingLog(userId, id);
    } catch (err) {
      console.error('Failed to delete from Supabase:', err);
    }
  }
  return logs;
}

export async function syncFromSupabase() {
  const userId = getUserId();
  if (!userId) return;

  try {
    const dbLogs = await getCravingLogs(userId);
    if (dbLogs && dbLogs.length > 0) {
      const mappedLogs: CravingLog[] = dbLogs.map(l => ({
        id: l.id || '',
        timestamp: l.timestamp,
        intensity: l.intensity,
        intensityLabel: l.intensity_label,
        outcome: l.outcome as 'resisted' | 'smoked',
        trigger: l.trigger || null,
        location: l.location || null,
        quantity: l.quantity || null,
        notes: l.notes || null
      }));
      saveLogs(mappedLogs);
      return mappedLogs;
    }
  } catch (err) {
    console.error('Failed to sync from Supabase:', err);
  }
}

export function getResisted(): number {
  return getLogs().filter(l => l.outcome === 'resisted').length;
}

export function getTotal(): number {
  return getLogs().length;
}

export function getRestraintRate(): number {
  const total = getTotal();
  if (total === 0) return 0;
  return Math.round((getResisted() / total) * 100);
}

export function getTodayCount(): number {
  const today = new Date().toDateString();
  return getLogs().filter(l => new Date(l.timestamp).toDateString() === today).length;
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}
