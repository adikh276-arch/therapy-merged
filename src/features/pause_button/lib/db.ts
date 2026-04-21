import { neon, neonConfig } from "@neondatabase/serverless";

// Suppress the security warning in the browser as we acknowledge the risks 
// for this specific implementation.
neonConfig.disableWarningInBrowsers = true;

const DATABASE_URL = import.meta.env.VITE_DATABASE_URL || "";

const sql = neon(DATABASE_URL);

/**
 * Execute a query with parameters.
 */
export const query = async (text: string, params: any[] = []) => {
  try {
    // According to the error message, we must use .query for conventional function calls
    const result = await (sql as any).query(text, params);
    return { rows: result };
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
};

/**
 * Initialize the database schema if it doesn't exist.
 */
export const initSchema = async () => {
  try {
    // Tagged templates are the preferred way for static queries
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id BIGINT PRIMARY KEY,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS pause_entries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
        date TIMESTAMP DEFAULT NOW(),
        emotions TEXT[],
        action TEXT,
        notes TEXT,
        trigger_context TEXT
      );
    `;

    console.log("✔ Database schema verified/initialized");
  } catch (error) {
    console.error("✘ Failed to initialize schema:", error);
  }
};

export default sql;
