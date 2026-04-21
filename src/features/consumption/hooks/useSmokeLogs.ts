import { useState, useEffect, useCallback } from 'react';
import { generateId } from '@/lib/formatting';

export interface SmokeLog {
  id: string;
  timestamp: string;
  count: number;
  location: string | null;
  trigger: string | null;
  mood: string | null;
  notes: string | null;
}

export interface LifetimeProfile {
  startMonth: number;
  startYear: number;
  avgPerDay: number;
  perPack: number;
  costPerCig: number;
  profileSet: boolean;
}

export interface LifetimeStats {
  totalCigarettes: number;
  totalPacks: number;
  totalSpend: number;
  lifeMinutesLost: number;
  lifeDays: number;
}

const LOGS_KEY = 'smokeLogs';
const PROFILE_KEY = 'lifetimeProfile';
const STATS_KEY = 'lifetimeStats';
const SETUP_KEY = 'setupDone';

function loadJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function calculateStats(profile: LifetimeProfile): LifetimeStats {
  const now = new Date();
  const startDate = new Date(profile.startYear, profile.startMonth - 1, 1);
  const diffMs = now.getTime() - startDate.getTime();
  const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  const totalCigarettes = diffDays * profile.avgPerDay;
  const totalPacks = Math.round(totalCigarettes / profile.perPack);
  const totalSpend = totalCigarettes * profile.costPerCig;
  const lifeMinutesLost = totalCigarettes * 11;
  const lifeDays = Math.round(lifeMinutesLost / 1440);
  return { totalCigarettes, totalPacks, totalSpend, lifeMinutesLost, lifeDays };
}

export function useSmokeLogs() {
  const [logs, setLogs] = useState<SmokeLog[]>([]);
  const [profile, setProfile] = useState<LifetimeProfile | null>(null);
  const [stats, setStats] = useState<LifetimeStats | null>(null);
  const [setupDone, setSetupDone] = useState(false);

  useEffect(() => {
    setLogs(loadJson<SmokeLog[]>(LOGS_KEY, []));
    const p = loadJson<LifetimeProfile | null>(PROFILE_KEY, null);
    if (p && p.profileSet) {
      setProfile(p);
      setStats(calculateStats(p));
    }
    setSetupDone(!!localStorage.getItem(SETUP_KEY));
  }, []);

  const saveLogs = useCallback((newLogs: SmokeLog[]) => {
    setLogs(newLogs);
    localStorage.setItem(LOGS_KEY, JSON.stringify(newLogs));
  }, []);

  const addLog = useCallback((detail?: { location?: string; trigger?: string; mood?: string; notes?: string }) => {
    const entry: SmokeLog = {
      id: generateId(),
      timestamp: new Date().toISOString(),
      count: 1,
      location: detail?.location ?? null,
      trigger: detail?.trigger ?? null,
      mood: detail?.mood ?? null,
      notes: detail?.notes ?? null,
    };
    const newLogs = [...logs, entry];
    saveLogs(newLogs);
    return entry;
  }, [logs, saveLogs]);

  const removeLastToday = useCallback(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayLogs = logs.filter(l => new Date(l.timestamp) >= today);
    if (todayLogs.length === 0) return false;
    const lastId = todayLogs[todayLogs.length - 1].id;
    saveLogs(logs.filter(l => l.id !== lastId));
    return true;
  }, [logs, saveLogs]);

  const deleteLog = useCallback((id: string) => {
    saveLogs(logs.filter(l => l.id !== id));
  }, [logs, saveLogs]);

  const saveProfile = useCallback((p: LifetimeProfile) => {
    const withFlag = { ...p, profileSet: true };
    setProfile(withFlag);
    localStorage.setItem(PROFILE_KEY, JSON.stringify(withFlag));
    const s = calculateStats(withFlag);
    setStats(s);
    localStorage.setItem(STATS_KEY, JSON.stringify(s));
    localStorage.setItem(SETUP_KEY, 'true');
    setSetupDone(true);
  }, []);

  const skipSetup = useCallback(() => {
    localStorage.setItem(SETUP_KEY, 'true');
    setSetupDone(true);
  }, []);

  return { logs, addLog, removeLastToday, deleteLog, profile, stats, setupDone, saveProfile, skipSetup };
}
