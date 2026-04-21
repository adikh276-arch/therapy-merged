import { query } from "./db";

export interface PauseEntry {
  id: string;
  date: string;
  emotions: string[];
  action: string;
  notes?: string;
  trigger_context?: string;
}

export const saveEntry = async (entry: Omit<PauseEntry, "id" | "date">) => {
  const userId = sessionStorage.getItem("user_id");
  if (!userId) throw new Error("User not authenticated");

  try {
    const { rows } = await query(
      "INSERT INTO pause_entries (user_id, emotions, action, notes, trigger_context) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [userId, entry.emotions, entry.action, entry.notes || null, entry.trigger_context || null]
    );
    return rows[0] as PauseEntry;
  } catch (error) {
    console.error("Failed to save pause entry:", error);
    throw error;
  }
};

export const getHistory = async (): Promise<PauseEntry[]> => {
  const userId = sessionStorage.getItem("user_id");
  if (!userId) return [];

  try {
    const { rows } = await query(
      "SELECT * FROM pause_entries WHERE user_id = $1 ORDER BY date DESC",
      [userId]
    );
    return rows.map(row => ({
      ...row,
      id: row.id.toString(),
      date: row.date.toISOString(),
      emotions: row.emotions || [],
    }));
  } catch (error) {
    console.error("Failed to fetch pause history:", error);
    return [];
  }
};
