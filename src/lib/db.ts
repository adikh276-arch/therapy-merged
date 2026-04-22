import { neon, neonConfig } from '@neondatabase/serverless';

// Version: 1.0.1 - Unified Monorepo DB Client

const connectionString = import.meta.env.VITE_DATABASE_URL || "";

if (!connectionString) {
  console.warn('VITE_DATABASE_URL is not defined. Data persistence may fail.');
}

// Singleton SQL client
export const sql = connectionString ? neon(connectionString, { disableWarningInBrowsers: true }) : null;

/**
 * Global DB Query Helper
 * Standardizes how all features interact with the shared PostgreSQL database.
 */
export async function dbRequest<T = any>(query: string, params: any[] = []): Promise<T[]> {
  if (!sql) {
    console.warn('DB execute failed: sql client not initialized.');
    return [];
  }

  try {
    const result = await (sql as any).query(query, params);
    return Array.isArray(result) ? result : (result.rows || []);
  } catch (error) {
    console.error('Unified DB Error:', error);
    throw error;
  }
}

export default sql;
