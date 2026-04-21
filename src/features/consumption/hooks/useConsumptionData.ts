import { useState, useCallback, useEffect } from "react";
import { getUserId } from "@/lib/auth";
import {
  getSmokingProfile,
  saveSmokingProfile,
  getSmokeLogs,
  saveSmokeLog,
  deleteSmokeLog as deleteLogFromDb
} from "@/lib/db";

export interface SmokeLog {
  id: string;
  timestamp: string; // Changed to string for DB compatibility
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
  const [userId, setUserId] = useState<number | null>(getUserId());

  // Fetch from Supabase on mount
  useEffect(() => {
    const uid = getUserId();
    if (!uid) return;
    setUserId(uid);

    const fetchData = async () => {
      try {
        const [dbProfile, dbLogs] = await Promise.all([
          getSmokingProfile(uid),
          getSmokeLogs(uid)
        ]);

        if (dbProfile) {
          const mappedProfile = {
            startMonth: dbProfile.start_month,
            startYear: dbProfile.start_year,
            avgPerDay: dbProfile.avg_per_day,
            perPack: dbProfile.per_pack,
            costPerCig: dbProfile.cost_per_cig
          };
          setProfile(mappedProfile);
          saveJSON(STORAGE_KEYS.profile, mappedProfile);
        }

        if (dbLogs) {
          const mappedLogs = dbLogs.map(l => ({
            id: String(l.id),
            timestamp: l.timestamp,
            count: l.count,
            location: l.location || undefined,
            trigger: l.trigger || undefined,
            mood: l.mood || undefined,
            notes: l.notes || undefined
          }));
          setLogs(mappedLogs);
          saveJSON(STORAGE_KEYS.logs, mappedLogs);
        }
      } catch (err) {
        console.error("Failed to fetch from Supabase:", err);
      }
    };

    fetchData();
  }, []);

  const todayLogs = logs.filter((l) => {
    const d = new Date(l.timestamp);
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    return key === getTodayKey();
  });

  const todayCount = todayLogs.reduce((s, l) => s + l.count, 0);

  const lastLogTime = todayLogs.length > 0
    ? new Date(Math.max(...todayLogs.map((l) => new Date(l.timestamp).getTime())))
    : null;

  const addOne = useCallback(async () => {
    const entry: SmokeLog = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      count: 1,
      ...pendingDetails,
    };

    setLogs((prev) => {
      const next = [...prev, entry];
      saveJSON(STORAGE_KEYS.logs, next);
      return next;
    });
    setPendingDetails({}); // Reset internal pending state

    if (userId) {
      try {
        await saveSmokeLog(userId, {
          timestamp: entry.timestamp,
          count: entry.count,
          location: entry.location,
          trigger: entry.trigger,
          mood: entry.mood,
          notes: entry.notes
        });
      } catch (err) {
        console.error("Failed to save log to Supabase:", err);
      }
    }
    return entry;
  }, [pendingDetails, userId, logs]);

  const removeLastToday = useCallback(async () => {
    const todayKey = getTodayKey();
    const lastToday = [...logs].reverse().find((l) => {
      const d = new Date(l.timestamp);
      return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}` === todayKey;
    });

    if (!lastToday) return;

    const newLogs = logs.filter(l => l.id !== lastToday.id);
    setLogs(newLogs);
    saveJSON(STORAGE_KEYS.logs, newLogs);

    if (userId) {
      try {
        await deleteLogFromDb(userId, lastToday.id);
      } catch (err) {
        console.error("Failed to delete from Supabase:", err);
      }
    }
  }, [logs, userId]);

  const deleteLog = useCallback(async (id: string) => {
    const newLogs = logs.filter((l) => l.id !== id);
    setLogs(newLogs);
    saveJSON(STORAGE_KEYS.logs, newLogs);

    if (userId) {
      try {
        await deleteLogFromDb(userId, id);
      } catch (err) {
        console.error("Failed to delete from Supabase:", err);
      }
    }
  }, [logs, userId]);

  const saveProfileHandler = useCallback(async (p: LifetimeProfile) => {
    setProfile(p);
    saveJSON(STORAGE_KEYS.profile, p);

    if (userId) {
      try {
        await saveSmokingProfile(userId, {
          start_month: p.startMonth,
          start_year: p.startYear,
          avg_per_day: p.avgPerDay,
          per_pack: p.perPack,
          cost_per_cig: p.costPerCig
        });
      } catch (err) {
        console.error("Failed to save profile to Supabase:", err);
      }
    }
  }, [userId]);

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
    saveProfile: saveProfileHandler,
    setPendingDetails,
    pendingDetails,
    hasProfile: !!profile,
    formatIndianNumber,
  };
}
