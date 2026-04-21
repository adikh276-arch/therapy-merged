import { Pool, neonConfig } from "@neondatabase/serverless";

// Optional: Enable WebSocket for connection pooling if in browser/edge
// neonConfig.useFetchConnection = true;

const connectionString = import.meta.env.VITE_DATABASE_URL || process?.env?.DATABASE_URL;

if (!connectionString) {
    console.warn("DATABASE_URL/VITE_DATABASE_URL is not defined in environment variables.");
}

export const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

export const query = (text: string, params?: any[]) => {
    return pool.query(text, params);
};
