import { getUserId } from './auth';
import { saveWithdrawalLog } from './db';

const MIGRATION_KEY = 'eap_migration_done';

export async function migrateLocalToSupabase(): Promise<void> {
    if (localStorage.getItem(MIGRATION_KEY)) return;

    const userId = getUserId();
    if (!userId) return;

    try {
        const logsRaw = localStorage.getItem('withdrawalLogs');
        if (logsRaw) {
            const logs = JSON.parse(logsRaw);
            for (const log of logs) {
                await saveWithdrawalLog(userId, {
                    date: log.timestamp.split('T')[0],
                    severity_score: log.severity,
                    symptoms: [
                        ...(log.physicalSymptoms || []),
                        ...(log.mentalSymptoms || []),
                        ...(log.sleepSymptoms || [])
                    ],
                    notes: log.copingMethods ? `Coping: ${log.copingMethods.join(', ')}` : ''
                });
            }
        }

        localStorage.setItem(MIGRATION_KEY, 'true');
    } catch (err) {
        console.error('Migration failed:', err);
    }
}
