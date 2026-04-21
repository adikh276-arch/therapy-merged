import { query } from "./db";
import { getSessionUserId } from "./auth";

export interface LetterEntry {
  id: string; // Used as UUID in DB
  date: string;
  time: string;
  content: string;
  emotionalState: string;
  createdAt: string;
  updatedAt: string;
}

export async function getEntries(): Promise<LetterEntry[]> {
  const userId = getSessionUserId();
  if (!userId) return [];

  try {
    const res = await query(
      "SELECT * FROM letters WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );
    return res.rows.map(row => ({
      id: row.id,
      date: new Date(row.created_at).toISOString().split('T')[0],
      time: new Date(row.created_at).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      }),
      content: row.content,
      emotionalState: row.emotional_state,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }));
  } catch (error) {
    console.error("Failed to fetch entries:", error);
    return [];
  }
}

export async function saveEntry(entry: LetterEntry): Promise<void> {
  const userId = getSessionUserId();
  if (!userId) return;

  const sql = `
    INSERT INTO letters (id, user_id, content, emotional_state, created_at, updated_at)
    VALUES ($1, $2, $3, $4, $5, $6)
    ON CONFLICT (id) DO UPDATE SET
      content = EXCLUDED.content,
      emotional_state = EXCLUDED.emotional_state,
      updated_at = EXCLUDED.updated_at
  `;

  try {
    await query(sql, [
      entry.id,
      userId,
      entry.content,
      entry.emotionalState,
      entry.createdAt,
      entry.updatedAt
    ]);
  } catch (error) {
    console.error("Failed to save entry:", error);
  }
}

export async function deleteEntry(id: string): Promise<void> {
  const userId = getSessionUserId();
  if (!userId) return;

  try {
    await query("DELETE FROM letters WHERE id = $1 AND user_id = $2", [id, userId]);
  } catch (error) {
    console.error("Failed to delete entry:", error);
  }
}

export function generateId(): string {
  return crypto.randomUUID();
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getCurrentDate(): string {
  return new Date().toISOString().split("T")[0];
}

export function getCurrentTime(): string {
  return new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
