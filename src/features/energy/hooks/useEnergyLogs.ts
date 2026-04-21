import { useState, useCallback, useEffect } from "react";
import { EnergyLog, Discovery, FACTORS } from "@/types/energy";

const LOGS_KEY = "energyLogs";
const DISCOVERIES_KEY = "energyDiscoveries";
const MIN_ENTRIES = 10;
const MIN_SAMPLE = 5;
const MIN_IMPACT = 15;

function loadLogs(): EnergyLog[] {
  try {
    const raw = localStorage.getItem(LOGS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLogs(logs: EnergyLog[]) {
  localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
}

function calculateDiscoveries(logs: EnergyLog[]): Discovery[] {
  if (logs.length < MIN_ENTRIES) return [];
  const results: Discovery[] = [];
  for (const factor of FACTORS) {
    const withFactor = logs.filter((l) => l.factors.includes(factor.id));
    const withoutFactor = logs.filter((l) => !l.factors.includes(factor.id));
    if (withFactor.length < MIN_SAMPLE || withoutFactor.length < 2) continue;
    const avgWith = withFactor.reduce((s, l) => s + l.level, 0) / withFactor.length;
    const avgWithout = withoutFactor.reduce((s, l) => s + l.level, 0) / withoutFactor.length;
    const impact = ((avgWith - avgWithout) / avgWithout) * 100;
    if (Math.abs(impact) > MIN_IMPACT) {
      results.push({
        factor: factor.label,
        impact: Math.round(impact),
        direction: impact > 0 ? "positive" : "negative",
        sampleSize: withFactor.length,
        lastCalculated: new Date().toISOString(),
      });
    }
  }
  return results.sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact));
}

export function useEnergyLogs() {
  const [logs, setLogs] = useState<EnergyLog[]>(loadLogs);
  const [discoveries, setDiscoveries] = useState<Discovery[]>(() => {
    try {
      const raw = localStorage.getItem(DISCOVERIES_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const addLog = useCallback(
    (level: number, factors: string[]) => {
      const entry: EnergyLog = {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        level,
        factors,
      };
      const next = [...logs, entry];
      setLogs(next);
      saveLogs(next);
      const newDiscoveries = calculateDiscoveries(next);
      setDiscoveries(newDiscoveries);
      localStorage.setItem(DISCOVERIES_KEY, JSON.stringify(newDiscoveries));
    },
    [logs]
  );

  const deleteLog = useCallback(
    (id: string) => {
      const next = logs.filter((l) => l.id !== id);
      setLogs(next);
      saveLogs(next);
      const newDiscoveries = calculateDiscoveries(next);
      setDiscoveries(newDiscoveries);
      localStorage.setItem(DISCOVERIES_KEY, JSON.stringify(newDiscoveries));
    },
    [logs]
  );

  // Derived helpers
  const todayLogs = (() => {
    const today = new Date().toDateString();
    return logs.filter((l) => new Date(l.timestamp).toDateString() === today);
  })();

  const todayAvg =
    todayLogs.length > 0
      ? +(todayLogs.reduce((s, l) => s + l.level, 0) / todayLogs.length).toFixed(1)
      : 0;

  // Weekly data (last 7 days)
  const weeklyData = (() => {
    const days: { date: string; avg: number | null }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toDateString();
      const dayLogs = logs.filter((l) => new Date(l.timestamp).toDateString() === dateStr);
      days.push({
        date: d.toLocaleDateString("en-US", { weekday: "short" }),
        avg: dayLogs.length > 0 ? +(dayLogs.reduce((s, l) => s + l.level, 0) / dayLogs.length).toFixed(1) : null,
      });
    }
    return days;
  })();

  const last7Avg = (() => {
    const vals = weeklyData.map((d) => d.avg).filter((v): v is number => v !== null);
    return vals.length > 0 ? +(vals.reduce((s, v) => s + v, 0) / vals.length).toFixed(1) : 0;
  })();

  const prev7Avg = (() => {
    const days: number[] = [];
    for (let i = 13; i >= 7; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toDateString();
      const dayLogs = logs.filter((l) => new Date(l.timestamp).toDateString() === dateStr);
      if (dayLogs.length > 0) days.push(dayLogs.reduce((s, l) => s + l.level, 0) / dayLogs.length);
    }
    return days.length > 0 ? +(days.reduce((s, v) => s + v, 0) / days.length).toFixed(1) : 0;
  })();

  const isTrendingUp = last7Avg > prev7Avg && prev7Avg > 0;

  // Consecutive low days
  const consecutiveLowDays = (() => {
    let count = 0;
    const d = new Date();
    for (let i = 0; i < 14; i++) {
      const dateStr = d.toDateString();
      const dayLogs = logs.filter((l) => new Date(l.timestamp).toDateString() === dateStr);
      const avg = dayLogs.length > 0 ? dayLogs.reduce((s, l) => s + l.level, 0) / dayLogs.length : null;
      if (avg !== null && avg <= 2) {
        count++;
      } else if (avg !== null) {
        count = 0;
      }
      d.setDate(d.getDate() - 1);
    }
    return count;
  })();

  // History (last 14 days logs, sorted desc)
  const historyLogs = [...logs].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return {
    logs,
    discoveries,
    todayLogs,
    todayAvg,
    weeklyData,
    last7Avg,
    isTrendingUp,
    consecutiveLowDays,
    historyLogs,
    addLog,
    deleteLog,
    totalEntries: logs.length,
  };
}
