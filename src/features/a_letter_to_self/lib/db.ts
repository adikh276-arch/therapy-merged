import { sql } from '@/lib/db';

// For browser environments, @neondatabase/serverless handles the connection
// without Node-only dependencies like 'net' or 'tls'.
export const pool = { 
    query: (t: string, p?: any[]) => (sql as any).query(t, p || []),
    connect: () => { throw new Error("Pool.connect not supported in serverless HTTP mode"); }
};

export const query = (text: string, params?: any[]) => {
    return (sql as any).query(text, params || []);
};

export const initDb = async () => {
    const schema = `
CREATE TABLE IF NOT EXISTS users (
    id BIGINT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS letters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    emotional_state TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_letters_user_id ON letters(user_id);
  `;
    try {
        await query(schema);
        console.log("Database initialized");
    } catch (error) {
        console.error("Database initialization failed:", error);
    }
};
