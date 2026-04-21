import { getUserId } from './auth';
import { saveSleepLog } from './db';

const MIGRATION_KEY = 'eap_migration_done';

export async function migrateLocalToSupabase(): Promise<void> {
    if (localStorage.getItem(MIGRATION_KEY)) return;

    const userId = getUserId();
    if (!userId) return;

    try {
        const logsRaw = localStorage.getItem('sleepLogs');
        if (logsRaw) {
            const logs = JSON.parse(logsRaw);
            for (const log of logs) {
                await saveSleepLog(userId, {
                    date: log.date,
                    bedtime: log.bedtime,
                    wakeTime: log.wakeTime,
                    totalMinutes: log.totalMinutes,
                    quality: log.quality,
                    score: log.score,
                    wakeUps: log.wakeUps,
                    symptoms: log.symptoms,
                    wakeFeeling: log.wakeFeeling
                });
            }
        }

        localStorage.setItem(MIGRATION_KEY, 'true');
    } catch (err) {
        console.error('Migration failed:', err);
    }
}
