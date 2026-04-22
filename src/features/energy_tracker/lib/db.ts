import { sql } from '../../../lib/db';

export const pool = { 
    query: (t: string, p?: any[]) => (sql as any).query(t, p || []) 
};

export const initSchema = async () => {
    // Schema initialization should be done via a centralized migrations script 
    // or handled within the shared db init.
    console.log('Energy Tracker: initSchema skipped (browsersafe).');
};
