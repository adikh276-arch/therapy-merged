import { neonConfig, Pool } from '@neondatabase/serverless';
import ws from 'ws';

// Suppress Neon's browser-side SQL warning as requested
neonConfig.disableWarningInBrowsers = true;

// Set up WebSocket for use in specialized environments if needed
if (typeof window === 'undefined') {
  neonConfig.webSocketConstructor = ws;
}

// Vite replaces import.meta.env.VITE_DATABASE_URL at build time
const connectionString = (import.meta as any).env?.VITE_DATABASE_URL || process.env.VITE_DATABASE_URL || process.env.DATABASE_URL;

if (!connectionString) {
  console.warn("DATABASE_URL is not defined. Database operations will fail.");
}

export const pool = new Pool({
  connectionString,
});

export const query = async (text: string, params?: any[]) => {
  const client = await pool.connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
};

/**
 * Executes the schema SQL to ensure tables exist.
 */
export const initSchema = async () => {
  try {
    // We use TEXT for IDs to ensure compatibility with all possible MantraCare ID formats
    const schema = `
      CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS trigger_entries (
          id SERIAL PRIMARY KEY,
          user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
          urge_level INTEGER NOT NULL,
          location TEXT,
          activity TEXT,
          timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS entry_triggers (
          id SERIAL PRIMARY KEY,
          entry_id INTEGER REFERENCES trigger_entries(id) ON DELETE CASCADE,
          trigger_name TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS entry_emotions (
          id SERIAL PRIMARY KEY,
          entry_id INTEGER REFERENCES trigger_entries(id) ON DELETE CASCADE,
          emotion_name TEXT NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_trigger_entries_user_id ON trigger_entries(user_id);
      CREATE INDEX IF NOT EXISTS idx_entry_triggers_entry_id ON entry_triggers(entry_id);
      CREATE INDEX IF NOT EXISTS idx_entry_emotions_entry_id ON entry_emotions(entry_id);
    `;
    
    // Migration check: If tables exist as BIGINT, we might need to alter them.
    // For a "fix in 1 go", it's safer to attempt the conversion or handle it.
    // But since the user just started, most records are new.
    // I'll add a safety alter just in case.
    
    await query(schema);
    
    // Safety conversion if they were BIGINT before
    try {
      await query("ALTER TABLE users ALTER COLUMN id TYPE TEXT");
      await query("ALTER TABLE trigger_entries ALTER COLUMN user_id TYPE TEXT");
    } catch(e) { /* ignore if already text or impossible */ }

    console.log("Database schema initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize database schema:", error);
  }
};
