export interface WithdrawalLog {
  id: string;
  timestamp: string;
  severity: number;
  physicalSymptoms: string[];
  mentalSymptoms: string[];
  sleepSymptoms: string[];
  copingMethods: string[];
}

export function getQuitDate(): string | null {
  return localStorage.getItem('quitDate');
}

export function setQuitDate(date: string): void {
  localStorage.setItem('quitDate', date);
}

export function getSeenMilestones(): string[] {
  const raw = localStorage.getItem('milestonesReached');
  return raw ? JSON.parse(raw) : [];
}

export function markMilestoneSeen(id: string): void {
  const seen = getSeenMilestones();
  if (!seen.includes(id)) {
    seen.push(id);
    localStorage.setItem('milestonesReached', JSON.stringify(seen));
  }
}

export function getWithdrawalLogs(): WithdrawalLog[] {
  const raw = localStorage.getItem('withdrawalLogs');
  return raw ? JSON.parse(raw) : [];
}

export function addWithdrawalLog(log: WithdrawalLog): void {
  const logs = getWithdrawalLogs();
  logs.unshift(log);
  localStorage.setItem('withdrawalLogs', JSON.stringify(logs));
}

export function deleteWithdrawalLog(id: string): void {
  const logs = getWithdrawalLogs().filter(l => l.id !== id);
  localStorage.setItem('withdrawalLogs', JSON.stringify(logs));
}

export function getAvgPerDay(): number {
  try {
    const profile = localStorage.getItem('lifetimeProfile');
    if (profile) {
      const parsed = JSON.parse(profile);
      if (parsed.avgPerDay) return parsed.avgPerDay;
    }
  } catch {}
  return 10;
}
