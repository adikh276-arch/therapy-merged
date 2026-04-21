import { supabase, setUserContext } from './supabase';

interface EnergyLog {
    id?: string;
    date: string;
    energy_level: number;
    focus_level: number;
    stress_level: number;
    notes?: string;
}

export async function upsertUser(userId: number): Promise<void> {
    await setUserContext(userId);
    await supabase.from('users').upsert({ id: userId }, { onConflict: 'id' });
}

export async function saveEnergyLog(userId: number, log: EnergyLog) {
    await setUserContext(userId);
    const { error } = await supabase
        .from('energy_logs')
        .insert({ user_id: userId, ...log });
    if (error) throw error;
}

export async function getEnergyLogs(userId: number): Promise<EnergyLog[]> {
    await setUserContext(userId);
    const { data, error } = await supabase
        .from('energy_logs')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false });
    if (error) throw error;
    return data || [];
}

export async function deleteEnergyLog(userId: number, id: string) {
    await setUserContext(userId);
    const { error } = await supabase
        .from('energy_logs')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);
    if (error) throw error;
}
