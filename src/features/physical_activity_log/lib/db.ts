import { Pool, neonConfig } from '@neondatabase/serverless';

// Essential for browser environments
neonConfig.fetchConnectionCache = true;

const connectionString = import.meta.env.VITE_DATABASE_URL;

if (!connectionString) {
    console.error('✘ DATABASE_URL ERROR: The connection string is missing! Since this is a production build, you MUST add DATABASE_URL as a secret in your GitHub repository before building the Docker image.');
}

export const pool = new Pool({
    connectionString: connectionString,
});

neonConfig.wsProxy = (host) => {
    // Correctly extract the host if we have a valid Neon connection string, avoid localhost defaults
    if (connectionString && (host === 'localhost' || !host)) {
        try {
            const url = new URL(connectionString);
            return `${url.hostname}/v2`;
        } catch (e) {
            // Last-resort fallback if URL parser fails on certain protocols
            const match = connectionString.match(/@([^/]+)\//);
            if (match) return `${match[1]}/v2`;
        }
    }
    return `${host}/v2`;
};



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

