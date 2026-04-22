import { sql } from '@/lib/db';


// Version check log
console.log("DB Module Loaded: v1.0.2 - Using Pool with HTTP Cache");

// Allow connection from browser




export const pool = { query: (t: string, p?: any[]) => (sql as any).query(t, p || []) };

export const dbQuery = async (text: string, params?: any[]) => {
    console.log("SQL Exec:", text, params);
    try {
        const res = await pool.query(text, params || []);
        return res;
    } catch (error) {
        console.error("SQL Error:", error);
        throw error;
    }
};

export const query = dbQuery;
