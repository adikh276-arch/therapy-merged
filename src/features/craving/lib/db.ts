import { supabase, setUserContext } from './supabase';

interface CravingLog {
    id?: string;
    timestamp: string;
    intensity: number;
    intensity_label: string;
    outcome: string;
    trigger?: string;
    location?: string;
    quantity?: number;
    notes?: string;
}

export async function upsertUser(userId: number): Promise<void> {
    await setUserContext(userId);
    await supabase.from('users').upsert({ id: userId }, { onConflict: 'id' });
}

export async function saveCravingLog(userId: number, log: CravingLog) {
    await setUserContext(userId);
    const { error } = await supabase
        .from('craving_logs')
        .insert({ user_id: userId, ...log });
    if (error) throw error;
}

export async function getCravingLogs(userId: number): Promise<CravingLog[]> {
    await setUserContext(userId);
    const { data, error } = await supabase
        .from('craving_logs')
        .select('*')
        .eq('user_id', userId)
        .order('timestamp', { ascending: false });
    if (error) throw error;
    return data || [];
}

export async function deleteCravingLog(userId: number, id: string) {
    await setUserContext(userId);
    const { error } = await supabase
        .from('craving_logs')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);
    if (error) throw error;
}
