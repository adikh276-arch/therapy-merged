import { sql } from '../../../lib/db';


const getEnv = (key: string) => {
    return import.meta.env[key] || (window as any).ENV?.[key] || "";
};



if (!connectionString) {
    console.error("CRITICAL: VITE_DATABASE_URL is missing! Ensure it is set in GitHub Secrets (build-time) or Environment Variables (runtime).");
}

export const pool = { query: (t, p) => (sql as any).query(t, p || []) };

export const query = async (text: string, params: any[] = []) => {
    if (!connectionString) {
        throw new Error("Database connection string is not configured.");
    }
    return pool.query(text, params);
};

export const createUserIfNotExists = async (userId: string) => {
    if (!userId) return;
    const result = await query("SELECT id FROM users WHERE id = $1", [userId]);
    if (result.rows.length === 0) {
        await query("INSERT INTO users (id) VALUES ($1)", [userId]);
    }
};
