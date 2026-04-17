import { getDb } from "@/lib/db";
export const sql = getDb("know_your_values");
export const dbRequest = async (query: string, params: any[] = []) => {
  const rows = await (sql as any)(query, params);
  return rows;
};
export const initSchema = async () => {}; // Core migration handles this
