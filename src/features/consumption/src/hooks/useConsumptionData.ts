import { useState, useCallback, useEffect } from "react";

export interface SmokeLog {
  id: string;
  timestamp: number;
  count: number;
  location?: string;
  trigger?: string;
  mood?: string;
  notes?: string;
}

export interface LifetimeProfile {
  startMonth: number;
  startYear: number;
  avgPerDay: number;
  perPack: number;
  costPerCig: number;
}

export interface LifetimeStats {
  totalCigarettes: number;
  lifeDaysAffected: number;
  totalSpend: number;
  totalPacks: number;
}

const MINUTES_PER_CIG = 11;
const STORAGE_KEYS = {
  logs: "smokeLogs",
  profile: "lifetimeProfile",
  stats: "lifetimeStats",
};

function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

function formatIndianNumber(num: number): string {
  const str = Math.round(num).toString();
  if (str.length <= 3) return str;
  let last3 = str.slice(-3);
  let rest = str.slice(0, -3);
  const parts: string[] = [];
  while (rest.length > 2) {
    parts.unshift(rest.slice(-2));
    rest = rest.slice(0, -2);
  }
  if (rest.length > 0) parts.unshift(rest);
  return parts.join(",") + "," + last3;
}

function calcLifetimeStats(profile: LifetimeProfile, loggedCount: number): LifetimeStats {
  const now = new Date();
  const start = new Date(profile.startYear, profile.startMonth - 1);
  const diffMs = now.getTime() - start.getTime();
  const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  const estimatedTotal = diffDays * profile.avgPerDay + loggedCount;
  const lifeDaysAffected = Math.round((estimatedTotal * MINUTES_PER_CIG) / (60 * 24));
  const totalSpend = estimatedTotal * profile.costPerCig;
  const totalPacks = Math.round(estimatedTotal / profile.perPack);
  return { totalCigarettes: estimatedTotal, lifeDaysAffected, totalSpend, totalPacks };
}

function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

export function useConsumptionData() {
  const [logs, setLogs] = useState<SmokeLog[]>(() => loadJSON(STORAGE_KEYS.logs, []));
  const [profile, setProfile] = useState<LifetimeProfile | null>(() => loadJSON(STORAGE_KEYS.profile, null));
  const [pendingDetails, setPendingDetails] = useState<Partial<Pick<SmokeLog, "location" | "trigger" | "mood" | "notes">>>({});

  useEffect(() => { saveJSON(STORAGE_KEYS.logs, logs); }, [logs]);
  useEffect(() => { if (profile) saveJSON(STORAGE_KEYS.profile, profile); }, [profile]);

  const todayLogs = logs.filter((l) => {
    const d = new Date(l.timestamp);
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    return key === getTodayKey();
  });

  const todayCount = todayLogs.reduce((s, l) => s + l.count, 0);

  const lastLogTime = todayLogs.length > 0
    ? new Date(Math.max(...todayLogs.map((l) => l.timestamp)))
    : null;

  const addOne = useCallback(() => {
    const entry: SmokeLog = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      count: 1,
      ...pendingDetails,
    };
    setLogs((prev) => [...prev, entry]);
    setPendingDetails({});
    return entry;
  }, [pendingDetails]);

  const removeLastToday = useCallback(() => {
    setLogs((prev) => {
      const todayKey = getTodayKey();
      const idx = [...prev].reverse().findIndex((l) => {
        const d = new Date(l.timestamp);
        return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}` === todayKey;
      });
      if (idx === -1) return prev;
      const realIdx = prev.length - 1 - idx;
      return [...prev.slice(0, realIdx), ...prev.slice(realIdx + 1)];
    });
  }, []);

  const deleteLog = useCallback((id: string) => {
    setLogs((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const saveProfile = useCallback((p: LifetimeProfile) => {
    setProfile(p);
  }, []);

  const totalLogged = logs.reduce((s, l) => s + l.count, 0);
  const stats = profile ? calcLifetimeStats(profile, totalLogged) : null;

  // Last 7 days data
  const weekData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    const dayLabel = d.toLocaleDateString("en", { weekday: "short" });
    const count = logs
      .filter((l) => {
        const ld = new Date(l.timestamp);
        return `${ld.getFullYear()}-${ld.getMonth()}-${ld.getDate()}` === key;
      })
      .reduce((s, l) => s + l.count, 0);
    return { label: dayLabel, count, isToday: i === 6 };
  });

  return {
    logs,
    profile,
    todayCount,
    lastLogTime,
    stats,
    weekData,
    addOne,
    removeLastToday,
    deleteLog,
    saveProfile,
    setPendingDetails,
    pendingDetails,
    hasProfile: !!profile,
    formatIndianNumber,
  };
}
