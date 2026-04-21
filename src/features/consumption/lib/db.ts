import { supabase, setUserContext } from './supabase';

interface SmokingProfile {
    start_month: number;
    start_year: number;
    avg_per_day: number;
    per_pack: number;
    cost_per_cig: number;
}

interface SmokeLog {
    id?: string;
    timestamp: string;
    count: number;
    location?: string;
    trigger?: string;
    mood?: string;
    notes?: string;
}

export async function upsertUser(userId: number): Promise<void> {
    await setUserContext(userId);
    await supabase.from('users').upsert({ id: userId }, { onConflict: 'id' });
}

export async function saveSmokingProfile(userId: number, profile: SmokingProfile) {
    await setUserContext(userId);
    const { error } = await supabase
        .from('smoking_profiles')
        .upsert({ user_id: userId, ...profile }, { onConflict: 'user_id' });
    if (error) throw error;
}

export async function getSmokingProfile(userId: number): Promise<SmokingProfile | null> {
    await setUserContext(userId);
    const { data, error } = await supabase
        .from('smoking_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();
    if (error && error.code !== 'PGRST116') throw error;
    return data;
}

export async function saveSmokeLog(userId: number, log: SmokeLog) {
    await setUserContext(userId);
    const { error } = await supabase
        .from('smoke_logs')
        .insert({ user_id: userId, ...log });
    if (error) throw error;
}

export async function getSmokeLogs(userId: number): Promise<SmokeLog[]> {
    await setUserContext(userId);
    const { data, error } = await supabase
        .from('smoke_logs')
        .select('*')
        .eq('user_id', userId)
        .order('timestamp', { ascending: false });
    if (error) throw error;
    return data || [];
}

export async function deleteSmokeLog(userId: number, id: string) {
    await setUserContext(userId);
    const { error } = await supabase
        .from('smoke_logs')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);
    if (error) throw error;
}
