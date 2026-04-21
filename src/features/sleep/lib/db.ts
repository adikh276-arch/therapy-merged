import { supabase, setUserContext } from './supabase';

interface SleepLog {
    id?: string;
    date: string;
    bedtime: string;
    wakeTime: string;
    totalMinutes: number;
    quality: number;
    score: number;
    wakeUps?: number | null;
    symptoms?: string[] | null;
    wakeFeeling?: string | null;
}

export async function upsertUser(userId: number): Promise<void> {
    await setUserContext(userId);
    await supabase.from('users').upsert({ id: userId }, { onConflict: 'id' });
}

export async function saveSleepLog(userId: number, log: SleepLog) {
    await setUserContext(userId);
    const { error } = await (supabase
        .from('sleep_logs') as any)
        .upsert({ user_id: userId, ...log }, { onConflict: ['user_id', 'date'] });
    if (error) throw error;
}

export async function getSleepLogs(userId: number): Promise<SleepLog[]> {
    await setUserContext(userId);
    const { data, error } = await supabase
        .from('sleep_logs')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false });
    if (error) throw error;
    return data || [];
}

export async function deleteSleepLog(userId: number, id: string) {
    await setUserContext(userId);
    const { error } = await supabase
        .from('sleep_logs')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);
    if (error) throw error;
}
