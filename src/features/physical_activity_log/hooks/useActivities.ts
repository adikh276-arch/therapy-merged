import { useState, useEffect, useCallback, useMemo } from "react";
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval, parseISO, subDays } from "date-fns";
import { pool } from "../lib/db";

export interface Activity {
  id: string;
  date: string;
  emoji: string;
  name: string;
  duration: number;
  notes?: string;
}

const EMOJI_MAP: Record<string, string> = {
  run: "🏃", walk: "🚶", swim: "🏊", bike: "🚴", yoga: "🧘", hike: "🥾",
  dance: "💃", gym: "🏋️", stretch: "🤸", meditation: "🧘",
};

function getEmoji(name: string): string {
  return EMOJI_MAP[name.toLowerCase()] || "💪";
}

export type ViewMode = "daily" | "weekly" | "monthly";

export function useActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const userId = sessionStorage.getItem("user_id");

  const fetchActivities = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      const res = await pool.query(
        "SELECT id, to_char(date, 'YYYY-MM-DD') as date, emoji, name, duration, notes FROM activities WHERE user_id = $1 ORDER BY date DESC",
        [userId]
      );
      setActivities(res.rows);
    } catch (err) {
      console.error("Failed to fetch activities:", err);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const addActivity = useCallback(async (date: string, name: string, duration: number, notes?: string) => {
    if (!userId) return;
    const emoji = getEmoji(name);
    try {
      const res = await pool.query(
        "INSERT INTO activities (user_id, date, emoji, name, duration, notes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, to_char(date, 'YYYY-MM-DD') as date, emoji, name, duration, notes",
        [userId, date, emoji, name, duration, notes]
      );
      setActivities(prev => [res.rows[0], ...prev]);
    } catch (err) {
      console.error("Failed to add activity:", err);
    }
  }, [userId]);

  const editActivity = useCallback(async (id: string, updates: Partial<Omit<Activity, "id">>) => {
    if (!userId) return;
    try {
      let query = "UPDATE activities SET ";
      const values: any[] = [];
      let paramCount = 1;

      if (updates.name) {
        query += `name = $${paramCount}, emoji = $${paramCount + 1}, `;
        values.push(updates.name, getEmoji(updates.name));
        paramCount += 2;
      }
      if (updates.duration !== undefined) {
        query += `duration = $${paramCount}, `;
        values.push(updates.duration);
        paramCount++;
      }
      if (updates.notes !== undefined) {
        query += `notes = $${paramCount}, `;
        values.push(updates.notes);
        paramCount++;
      }

      query = query.replace(/, $/, "") + ` WHERE id = $${paramCount} AND user_id = $${paramCount + 1} RETURNING id, to_char(date, 'YYYY-MM-DD') as date, emoji, name, duration, notes`;
      values.push(id, userId);

      const res = await pool.query(query, values);
      setActivities(prev =>
        prev.map(a => a.id === id ? res.rows[0] : a)
      );
    } catch (err) {
      console.error("Failed to edit activity:", err);
    }
  }, [userId]);

  const deleteActivity = useCallback(async (id: string) => {
    if (!userId) return;
    try {
      await pool.query("DELETE FROM activities WHERE id = $1 AND user_id = $2", [id, userId]);
      setActivities(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      console.error("Failed to delete activity:", err);
    }
  }, [userId]);

  const groupedByDate = useMemo(() => {
    const groups: Record<string, Activity[]> = {};
    activities.forEach(a => {
      if (!groups[a.date]) groups[a.date] = [];
      groups[a.date].push(a);
    });
    return groups;
  }, [activities]);

  const stats = useMemo(() => {
    const now = new Date();
    const weekStart = startOfWeek(now, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(now, { weekStartsOn: 1 });
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);

    const thisWeek = activities.filter(a => {
      const d = parseISO(a.date);
      return isWithinInterval(d, { start: weekStart, end: weekEnd });
    });

    const thisMonth = activities.filter(a => {
      const d = parseISO(a.date);
      return isWithinInterval(d, { start: monthStart, end: monthEnd });
    });

    const weekMinutes = thisWeek.reduce((s, a) => s + a.duration, 0);
    const monthMinutes = thisMonth.reduce((s, a) => s + a.duration, 0);

    const freq: Record<string, number> = {};
    activities.forEach(a => { freq[a.name] = (freq[a.name] || 0) + 1; });
    const mostFrequent = Object.entries(freq).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";

    const longestSession = activities.length > 0
      ? Math.max(...activities.map(a => a.duration))
      : 0;

    let streak = 0;
    const activeDays = new Set(activities.map(a => a.date));
    let checkDate = now;
    if (!activeDays.has(format(checkDate, "yyyy-MM-dd"))) {
      checkDate = subDays(checkDate, 1);
    }
    while (activeDays.has(format(checkDate, "yyyy-MM-dd"))) {
      streak++;
      checkDate = subDays(checkDate, 1);
    }

    return { weekMinutes, monthMinutes, mostFrequent, longestSession, streak };
  }, [activities]);

  const chartData = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const date = subDays(now, 6 - i);
      const dateStr = format(date, "yyyy-MM-dd");
      const dayActivities = activities.filter(a => a.date === dateStr);
      const minutes = dayActivities.reduce((s, a) => s + a.duration, 0);
      return { day: format(date, "EEE"), date: dateStr, minutes };
    });
  }, [activities]);

  const weeklyTrend = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 4 }, (_, i) => {
      const weekEnd = subDays(now, i * 7);
      const weekStart = subDays(weekEnd, 6);
      const weekActivities = activities.filter(a => {
        const d = parseISO(a.date);
        return isWithinInterval(d, { start: weekStart, end: weekEnd });
      });
      const minutes = weekActivities.reduce((s, a) => s + a.duration, 0);
      return { week: `W${4 - i}`, minutes };
    }).reverse();
  }, [activities]);

  return {
    activities,
    isLoading,
    groupedByDate,
    stats,
    chartData,
    weeklyTrend,
    addActivity,
    editActivity,
    deleteActivity,
    refresh: fetchActivities
  };
}

