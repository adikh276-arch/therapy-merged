import axios from 'axios';
import { sql } from './db';

export async function verifyAndInitializeUser(token: string): Promise<string | null> {
    try {
        // Validate token with MantraCare API
        const response = await axios.post('https://api.mantracare.com/user/user-info', { token });
        const { user_id } = response.data;

        if (!user_id || user_id === 'null') {
            console.error('No user_id returned from API');
            return null;
        }

        const userIdStr = user_id.toString();

        // DB Initialization/Upsert
        if (sql) {
            try {
                // First, ensure the users table exists.
                await sql`
                    CREATE TABLE IF NOT EXISTS users (
                        id BIGINT PRIMARY KEY,
                        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
                    )
                `;

                // Upsert user
                await sql`
                    INSERT INTO users (id) 
                    VALUES (${user_id}) 
                    ON CONFLICT (id) DO NOTHING
                `;
                console.log('User initialized in DB');
            } catch (dbErr) {
                console.error('Failed to initialize user in DB:', dbErr);
                // Continue even if DB insert fails to allow login
            }
        }

        return userIdStr;
    } catch (err) {
        console.error('Handshake failed:', err);
        return null;
    }
}
