import { getUserId } from './auth';
import { saveEnergyLog } from './db';

const MIGRATION_KEY = 'eap_migration_done';

export async function migrateLocalToSupabase(): Promise<void> {
    if (localStorage.getItem(MIGRATION_KEY)) return;

    const userId = getUserId();
    if (!userId) return;

    try {
        const logsRaw = localStorage.getItem('energyLogs');
        if (logsRaw) {
            const logs = JSON.parse(logsRaw);
            for (const log of logs) {
                await saveEnergyLog(userId, {
                    date: log.timestamp.split('T')[0],
                    energy_level: log.level,
                    focus_level: 0,
                    stress_level: 0,
                    notes: log.factors ? `Factors: ${log.factors.join(', ')}` : ''
                });
            }
        }

        localStorage.setItem(MIGRATION_KEY, 'true');
    } catch (err) {
        console.error('Migration failed:', err);
    }
}
