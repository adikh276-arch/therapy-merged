import { supabase, setUserContext } from './supabase';

export interface MoodLog {
    id: string;
    timestamp: number;
    date: string;
    mood: string;
    factors?: string[];
    tobacco_urge?: string;
    notes?: string;
}

export async function upsertUser(userId: number): Promise<void> {
    await setUserContext(userId);
    await supabase.from('users').upsert({ id: userId }, { onConflict: 'id' });
}

export async function saveMoodLog(userId: number, log: MoodLog) {
    await setUserContext(userId);
    const { error } = await supabase
        .from('mood_logs')
        .insert({
            user_id: userId,
            id: log.id,
            date: log.date,
            timestamp: log.timestamp,
            mood: log.mood,
            factors: log.factors,
            tobacco_urge: log.tobacco_urge,
            notes: log.notes
        });
    if (error) throw error;
}

export async function getMoodLogs(userId: number): Promise<MoodLog[]> {
    await setUserContext(userId);
    const { data, error } = await supabase
        .from('mood_logs')
        .select('*')
        .eq('user_id', userId)
        .order('timestamp', { ascending: false });
    if (error) throw error;

    return (data || []).map(l => ({
        id: l.id,
        timestamp: l.timestamp,
        date: l.date,
        mood: l.mood,
        factors: l.factors,
        tobacco_urge: l.tobacco_urge,
        notes: l.notes
    }));
}

export async function deleteMoodLog(userId: number, id: string) {
    await setUserContext(userId);
    const { error } = await supabase
        .from('mood_logs')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);
    if (error) throw error;
}
