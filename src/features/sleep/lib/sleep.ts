export interface SleepLog {
  id: string;
  date: string; // YYYY-MM-DD
  bedtime: string; // HH:MM
  wakeTime: string; // HH:MM
  totalMinutes: number;
  quality: number; // 1-5
  score: number; // 0-100
  wakeUps: number | null;
  symptoms: string[] | null;
  wakeFeeling: string | null;
}

export const QUALITY_LABELS = ['', 'Poor', 'Low', 'Fair', 'Good', 'Excellent'];
export const QUALITY_EMOJIS = ['', '😴', '🙁', '😐', '🙂', '⭐'];

export const SYMPTOM_OPTIONS = [
  'Tobacco cravings',
  'Night sweats',
  'Vivid dreams',
  'Restless',
  'Coughing',
  'None',
];

export function getScoreBand(score: number): { label: string; colorClass: string; hslVar: string } {
  if (score <= 50) return { label: 'Poor', colorClass: 'text-sleep-red', hslVar: 'var(--sleep-score-red)' };
  if (score <= 70) return { label: 'Below Average', colorClass: 'text-sleep-orange', hslVar: 'var(--sleep-score-orange)' };
  if (score <= 85) return { label: 'Good', colorClass: 'text-sleep-blue', hslVar: 'var(--sleep-score-blue)' };
  return { label: 'Excellent', colorClass: 'text-sleep-green', hslVar: 'var(--sleep-score-green)' };
}

export function getScoreColor(score: number): string {
  if (score <= 50) return 'hsl(354, 70%, 54%)';
  if (score <= 70) return 'hsl(36, 91%, 44%)';
  if (score <= 85) return 'hsl(202, 93%, 59%)';
  return 'hsl(155, 87%, 48%)';
}

export function calculateDurationMinutes(bedtime: string, wakeTime: string): number {
  const [bh, bm] = bedtime.split(':').map(Number);
  const [wh, wm] = wakeTime.split(':').map(Number);
  let bedMin = bh * 60 + bm;
  let wakeMin = wh * 60 + wm;
  if (wakeMin <= bedMin) wakeMin += 24 * 60;
  return wakeMin - bedMin;
}

export function formatMinutes(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h} hr ${m} min`;
}

export function calculateScore(
  totalMinutes: number,
  quality: number,
  wakeUps?: number | null,
  symptoms?: string[] | null
): number {
  // Duration scoring (max 60)
  const hours = totalMinutes / 60;
  const halfHourBlocks = Math.round((hours - 8) * 2);
  let durationScore: number;
  if (halfHourBlocks >= 0) {
    durationScore = Math.min(60, 50 + halfHourBlocks * 5);
  } else {
    durationScore = Math.max(0, 50 + halfHourBlocks * 5);
  }

  // Quality scoring (max 20)
  const qualityScore = quality * 4;

  // Penalties
  let penalty = 0;
  if (wakeUps && wakeUps > 0) penalty += wakeUps * 3;
  if (symptoms && symptoms.length > 0) {
    const real = symptoms.filter(s => s !== 'None');
    penalty += real.length * 2;
  }

  return Math.max(0, Math.min(100, durationScore + qualityScore - penalty));
}

export function getSleepLogs(): SleepLog[] {
  try {
    const raw = localStorage.getItem('sleepLogs');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveSleepLog(log: SleepLog) {
  const logs = getSleepLogs();
  const idx = logs.findIndex(l => l.date === log.date);
  if (idx >= 0) logs[idx] = log;
  else logs.push(log);
  logs.sort((a, b) => b.date.localeCompare(a.date));
  localStorage.setItem('sleepLogs', JSON.stringify(logs));
}

export function deleteSleepLog(id: string) {
  const logs = getSleepLogs().filter(l => l.id !== id);
  localStorage.setItem('sleepLogs', JSON.stringify(logs));
}

export function getTodayStr(): string {
  return new Date().toISOString().split('T')[0];
}

export function getRecentLogs(days: number): SleepLog[] {
  const logs = getSleepLogs();
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  const cutoffStr = cutoff.toISOString().split('T')[0];
  return logs.filter(l => l.date >= cutoffStr);
}
