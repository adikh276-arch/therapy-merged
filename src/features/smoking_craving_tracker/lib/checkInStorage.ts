import { pool } from "./db";

export interface CheckInEntry {
  id: string;
  user_id: string;
  date: string; // ISO string
  craving: boolean;
  intensity?: number;
  trigger?: string;
  choice?: string;
}

export async function saveCheckIn(entry: Omit<CheckInEntry, "id" | "date" | "user_id">): Promise<CheckInEntry | null> {
  const userId = sessionStorage.getItem("user_id");
  if (!userId) {
    console.error("No user_id found in session storage.");
    return null;
  }

  try {
    // Phase 11 & 12: Ensure user exists and persist data with isolation
    await ensureUserExists(userId);

    const query = `
      INSERT INTO check_ins (user_id, craving, intensity, trigger, choice)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [
      userId,
      entry.craving,
      entry.intensity ?? null,
      entry.trigger ?? null,
      entry.choice ?? null,
    ];

    const res = await pool.query(query, values);
    return res.rows[0];
  } catch (error) {
    console.error("failing to save check-in:", error);
    return null;
  }
}

export async function getCheckIns(): Promise<CheckInEntry[]> {
  const userId = sessionStorage.getItem("user_id");
  if (!userId) return [];

  try {
    const res = await pool.query("SELECT * FROM check_ins WHERE user_id = $1 ORDER BY date DESC", [userId]);
    return res.rows;
  } catch (error) {
    console.error("failing to fetch check-ins:", error);
    return [];
  }
}

async function ensureUserExists(userId: string) {
  try {
    const res = await pool.query("SELECT id FROM users WHERE id = $1", [userId]);
    if (res.rowCount === 0) {
      await pool.query("INSERT INTO users (id) VALUES ($1)", [userId]);
      console.log(`User ${userId} initialized in database.`);
    }
  } catch (error) {
    console.error("failing to ensure user exists:", error);
  }
}

export function groupByDate(entries: CheckInEntry[]): Record<string, CheckInEntry[]> {
  const groups: Record<string, CheckInEntry[]> = {};
  for (const e of entries) {
    const key = new Date(e.date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    if (!groups[key]) groups[key] = [];
    groups[key].push(e);
  }
  return groups;
}
