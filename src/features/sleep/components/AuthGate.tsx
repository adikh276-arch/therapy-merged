import { useEffect, useState, ReactNode } from 'react';
import { resolveUser } from '../lib/auth';
import { upsertUser } from '../lib/db';
import { migrateLocalToSupabase } from '../lib/migration';

export function AuthGate({ children }: { children: ReactNode }) {
    const [ready, setReady] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        resolveUser().then((id) => {
            if (id !== null) {
                upsertUser(id).then(async () => {
                    await migrateLocalToSupabase();
                    setReady(true);
                }).catch(err => {
                    console.error('DB Sync failed:', err);
                    setError('Database synchronisation failed.');
                });
            } else {
                setError('Authentication required. Please include a valid token in the URL.');
            }
        });
    }, []);

    if (error) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100svh',
                background: '#F5F7FA',
                fontFamily: "'Sora', sans-serif",
                textAlign: 'center',
                padding: '20px'
            }}>
                <div style={{ color: '#E53E3E', fontWeight: 'bold', marginBottom: '10px' }}>Authentication Error</div>
                <div style={{ color: '#7A8FA6', maxWidth: '400px' }}>{error}</div>
            </div>
        );
    }

    if (!ready) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100svh',
                background: '#F5F7FA',
                fontFamily: "'Sora', sans-serif",
                fontSize: '15px',
                color: '#7A8FA6'
            }}>
                Verifying session...
            </div>
        );
    }

    return <>{children}</>;
}
