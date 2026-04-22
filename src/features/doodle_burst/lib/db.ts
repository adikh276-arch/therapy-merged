import { sql } from '../../../lib/db';
import { Pool } from "pg";

export const pool = { query: (t, p) => (sql as any).query(t, p || []) };

export const query = async (text: string, params?: any[]) => {
    const start = Date.now();
    try {
        const res = await pool.query(text, params);
        const duration = Date.now() - start;
        console.log("executed query", { text, duration, rows: res.rowCount });
        return res;
    } catch (err) {
        console.error("query error", err);
        throw err;
    }
};
