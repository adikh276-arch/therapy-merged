import { useState, useCallback, useEffect } from 'react';
import { MoodLog, MoodLevel, Factor, TobaccoUrge } from '@/types/mood';
import { getUserId } from '@/lib/auth';
import { saveMoodLog, getMoodLogs as fetchLogsFromDb } from '@/lib/db';

const STORAGE_KEY = 'mood-tracker-logs';

function loadLogs(): MoodLog[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLogsToLocal(logs: MoodLog[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

export function useMoodStore() {
  const [logs, setLogs] = useState<MoodLog[]>(loadLogs);

  useEffect(() => {
    saveLogsToLocal(logs);
  }, [logs]);

  const syncFromSupabase = useCallback(async () => {
    const userId = getUserId();
    if (!userId) return;

    try {
      const dbLogs = await fetchLogsFromDb(userId);
      if (dbLogs && dbLogs.length > 0) {
        const mappedLogs: MoodLog[] = dbLogs.map(l => ({
          id: l.id,
          timestamp: l.timestamp,
          date: l.date,
          mood: l.mood as MoodLevel,
          factors: l.factors as Factor[],
          tobaccoUrge: (l.tobacco_urge || 'none') as TobaccoUrge,
          notes: l.notes
        }));
        setLogs(mappedLogs);
      }
    } catch (err) {
      console.error('Failed to sync from Supabase:', err);
    }
  }, []);

  useEffect(() => {
    syncFromSupabase();
  }, [syncFromSupabase]);

  const addLog = useCallback(async (
    mood: MoodLevel,
    factors?: Factor[],
    tobaccoUrge?: TobaccoUrge,
    notes?: string,
  ) => {
    const now = new Date();
    const logId = crypto.randomUUID();
    const log: MoodLog = {
      id: logId,
      timestamp: now.getTime(),
      date: now.toISOString().split('T')[0],
      mood,
      factors: factors?.length ? factors : undefined,
      tobaccoUrge: tobaccoUrge !== 'none' ? tobaccoUrge : undefined,
      notes: notes?.trim() || undefined,
    };

    setLogs(prev => [...prev, log]);

    const userId = getUserId();
    if (userId) {
      try {
        await saveMoodLog(userId, {
          id: log.id,
          timestamp: log.timestamp,
          date: log.date,
          mood: log.mood,
          factors: log.factors,
          tobacco_urge: log.tobaccoUrge,
          notes: log.notes
        });
      } catch (err) {
        console.error('Failed to save to Supabase:', err);
      }
    }

    return log;
  }, []);

  const getLogsForDate = useCallback((date: string) => {
    return logs.filter(l => l.date === date).sort((a, b) => a.timestamp - b.timestamp);
  }, [logs]);

  const getLogsForMonth = useCallback((year: number, month: number) => {
    const prefix = `${year}-${String(month + 1).padStart(2, '0')}`;
    return logs.filter(l => l.date.startsWith(prefix));
  }, [logs]);

  const getLatestMoodForDate = useCallback((date: string): MoodLevel | null => {
    const dayLogs = logs.filter(l => l.date === date);
    if (!dayLogs.length) return null;
    return dayLogs.sort((a, b) => b.timestamp - a.timestamp)[0].mood;
  }, [logs]);

  const getConsecutiveDifficultDays = useCallback(() => {
    const today = new Date();
    let count = 0;
    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const latest = getLatestMoodForDate(dateStr);
      if (latest === 'difficult') count++;
      else break;
    }
    return count;
  }, [getLatestMoodForDate]);

  return { logs, addLog, getLogsForDate, getLogsForMonth, getLatestMoodForDate, getConsecutiveDifficultDays, refresh: syncFromSupabase };
}
