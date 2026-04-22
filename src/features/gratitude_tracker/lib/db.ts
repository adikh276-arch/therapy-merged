import { sql } from '@/lib/db';


const getEnv = (key: string) => {
    return import.meta.env[key] || (window as any).ENV?.[key] || "";
};



export const pool = { query: (t: string, p?: any[]) => (sql as any).query(t, p || []) };

export const query = async (text: string, params: any[] = []) => {
    try {
        const res = await pool.query(text, params);
        return { rows: Array.isArray(res) ? res : (res.rows || []) };
    } catch (err) {
        console.error("Query failed:", text, err);
        return { rows: [] };
    }
};

export const createUserIfNotExists = async (userId: string) => {
    if (!userId) return;
    const result = await query("SELECT id FROM users WHERE id = $1", [userId]);
    if (!result.rows || result.rows.length === 0) {
        await query("INSERT INTO users (id) VALUES ($1)", [userId]);
    }
};
