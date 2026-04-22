export interface DoodleEntry {
  doodle_id: string; // From the database schema
  dataUrl: string; // The S3 URL
  timestamp: number;
  date: string; // YYYY-MM-DD
}

import { sql } from '@/lib/db';

export async function getDoodleHistory(): Promise<DoodleEntry[]> {
  const userId = sessionStorage.getItem("user_id");
  if (!userId) return [];

  try {
    const rows = await (sql as any)`
      SELECT id as doodle_id, image_url, created_at 
      FROM doodle_logs 
      WHERE user_id = ${userId} 
      ORDER BY created_at DESC
    `;
    
    return rows.map((row: any) => ({
      doodle_id: row.doodle_id.toString(),
      dataUrl: row.image_url,
      timestamp: new Date(row.created_at).getTime(),
      date: new Date(row.created_at).toISOString().split("T")[0],
    }));
  } catch (error) {
    console.error("Failed to fetch doodle history", error);
    return [];
  }
}

export async function saveDoodle(dataUrl: string): Promise<DoodleEntry | null> {
  const userId = sessionStorage.getItem("user_id");
  if (!userId) return null;

  try {
    const [row] = await (sql as any)`
      INSERT INTO doodle_logs (user_id, image_url)
      VALUES (${userId}, ${dataUrl})
      RETURNING id as doodle_id, image_url, created_at
    `;

    return {
      doodle_id: row.doodle_id.toString(),
      dataUrl: row.image_url,
      timestamp: new Date(row.created_at).getTime(),
      date: new Date(row.created_at).toISOString().split("T")[0],
    };
  } catch (error) {
    console.error("Save doodle error", error);
    return null;
  }
}

export async function deleteDoodle(id: string) {
  try {
    await (sql as any)`DELETE FROM doodle_logs WHERE id = ${id}`;
  } catch (error) {
    console.error("Delete doodle error", error);
  }
}

export function groupByDate(entries: DoodleEntry[]): Record<string, DoodleEntry[]> {
  const groups: Record<string, DoodleEntry[]> = {};
  for (const entry of entries) {
    if (!groups[entry.date]) groups[entry.date] = [];
    groups[entry.date].push(entry);
  }
  return groups;
}
