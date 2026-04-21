import { getUserId } from './auth';
import { saveMoodLog } from './db';

const MIGRATION_KEY = 'eap_migration_done';

export async function migrateLocalToSupabase(): Promise<void> {
    if (localStorage.getItem(MIGRATION_KEY)) return;

    const userId = getUserId();
    if (!userId) return;

    try {
        const logsRaw = localStorage.getItem('moodLogs');
        if (logsRaw) {
            const logs = JSON.parse(logsRaw);
            for (const log of logs) {
                await saveMoodLog(userId, {
                    date: log.date,
                    mood_score: 0, // Need to map mood strings to score if needed, or update DB schema
                    mood_label: log.mood,
                    mood_emoji: '', // Map if needed
                    triggers: log.factors,
                    symptoms: [],
                    notes: log.notes
                });
            }
        }

        localStorage.setItem(MIGRATION_KEY, 'true');
    } catch (err) {
        console.error('Migration failed:', err);
    }
}
