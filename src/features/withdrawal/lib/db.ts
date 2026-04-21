import { supabase, setUserContext } from './supabase';

interface WithdrawalLog {
    id?: string;
    date: string;
    symptoms?: string[];
    severity_score: number;
    notes?: string;
}

export async function upsertUser(userId: number): Promise<void> {
    await setUserContext(userId);
    await supabase.from('users').upsert({ id: userId }, { onConflict: 'id' });
}

export async function saveWithdrawalLog(userId: number, log: WithdrawalLog) {
    await setUserContext(userId);
    const { error } = await supabase
        .from('withdrawal_logs')
        .insert({ user_id: userId, ...log });
    if (error) throw error;
}

export async function getWithdrawalLogs(userId: number): Promise<WithdrawalLog[]> {
    await setUserContext(userId);
    const { data, error } = await supabase
        .from('withdrawal_logs')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false });
    if (error) throw error;
    return data || [];
}

export async function deleteWithdrawalLog(userId: number, id: string) {
    await setUserContext(userId);
    const { error } = await supabase
        .from('withdrawal_logs')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);
    if (error) throw error;
}
