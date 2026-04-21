import { getUserId } from './auth';
import { saveCravingLog } from './db';

const MIGRATION_KEY = 'eap_migration_done';

export async function migrateLocalToSupabase(): Promise<void> {
    if (localStorage.getItem(MIGRATION_KEY)) return;

    const userId = getUserId();
    if (!userId) return;

    try {
        const logsRaw = localStorage.getItem('cravingLogs');
        if (logsRaw) {
            const logs = JSON.parse(logsRaw);
            for (const log of logs) {
                await saveCravingLog(userId, {
                    timestamp: log.timestamp,
                    intensity: log.intensity,
                    intensity_label: log.intensityLabel,
                    outcome: log.outcome,
                    trigger: log.trigger,
                    location: log.location,
                    quantity: log.quantity,
                    notes: log.notes
                });
            }
        }

        localStorage.setItem(MIGRATION_KEY, 'true');
    } catch (err) {
        console.error('Migration failed:', err);
    }
}
