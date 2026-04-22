import { sql } from '../../../lib/db';


// Version check log
console.log("DB Module Loaded: v1.0.2 - Using Pool with HTTP Cache");

// Allow connection from browser




if (connectionString) {
    console.log("DB Endpoint:", connectionString.split('@')[1]?.split('/')[0]);
} else {
    console.warn("VITE_DATABASE_URL is MISSING! Queries will fail.");
}

export const pool = { query: (t, p) => (sql as any).query(t, p || []) };

export const sql = async (text: string, params?: any[]) => {
    console.log("SQL Exec:", text, params);
    try {
        const res = await pool.query(text, params || []);
        console.log("SQL Success, rows:", res.rowCount);
        return res;
    } catch (error) {
        console.error("SQL Error:", error);
        throw error;
    }
};

export const query = sql;
