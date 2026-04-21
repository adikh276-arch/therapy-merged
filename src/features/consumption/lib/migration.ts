import { getUserId } from './auth';
import { saveSmokeLog, saveSmokingProfile } from './db';

const MIGRATION_KEY = 'eap_migration_done';

export async function migrateLocalToSupabase(): Promise<void> {
    if (localStorage.getItem(MIGRATION_KEY)) return;

    const userId = getUserId();
    if (!userId) return;

    try {
        // 1. Migrate Profile
        const profileRaw = localStorage.getItem('lifetimeProfile');
        if (profileRaw) {
            const p = JSON.parse(profileRaw);
            await saveSmokingProfile(userId, {
                start_month: p.startMonth,
                start_year: p.startYear,
                avg_per_day: p.avgPerDay,
                per_pack: p.perPack,
                cost_per_cig: p.costPerCig
            });
        }

        // 2. Migrate Logs
        const logsRaw = localStorage.getItem('smokeLogs');
        if (logsRaw) {
            const logs = JSON.parse(logsRaw);
            for (const log of logs) {
                await saveSmokeLog(userId, {
                    timestamp: log.timestamp,
                    count: log.count,
                    location: log.location,
                    trigger: log.trigger,
                    mood: log.mood,
                    notes: log.notes
                });
            }
        }

        localStorage.setItem(MIGRATION_KEY, 'true');
    } catch (err) {
        console.error('Migration failed:', err);
    }
}
