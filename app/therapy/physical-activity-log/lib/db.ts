import { getDb } from "@/lib/db";
export const sql = getDb("physical_activity_log");
export const dbRequest = async (query: string, params: any[] = []) => {
  const rows = await (sql as any)(query, params);
  return rows;
};
export const initSchema = async () => {}; // Core migration handles this
