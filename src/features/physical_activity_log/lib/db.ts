import { sql } from '../../../lib/db';


// Essential for browser environments




export const pool = { query: (t: string, p?: any[]) => (sql as any).query(t, p || []) };



/**
 * Executes the schema SQL if tables don't exist.
 */
export async function initDatabase() {
    const schema = `
    CREATE TABLE IF NOT EXISTS users (
        id BIGINT PRIMARY KEY,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS activities (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        date DATE NOT NULL,
        emoji TEXT,
        name TEXT NOT NULL,
        duration INTEGER NOT NULL,
        notes TEXT,
        created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_activities_user_id ON activities(user_id);
    CREATE INDEX IF NOT EXISTS idx_activities_date ON activities(date);
  `;

    try {
        await pool.query(schema);
        console.log('✔ Database schema initialized successfully');

        // Ensure the current user exists in the users table
        const userId = sessionStorage.getItem("user_id");
        if (userId) {
            await pool.query('INSERT INTO users (id) VALUES ($1) ON CONFLICT (id) DO NOTHING', [userId]);
        }
    } catch (err) {
        console.error('✘ Database initialization failed:', err);
    }
}

