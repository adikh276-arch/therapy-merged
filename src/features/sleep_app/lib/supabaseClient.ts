import { supabase } from "@/integrations/supabase/client";

export async function setCurrentUser(userId: number) {
  await supabase.rpc('set_config', {
    setting_name: 'app.current_user_id',
    setting_value: String(userId),
    is_local: true,
  });
}

export async function upsertUser(userId: number) {
  await setCurrentUser(userId);
  const { error } = await supabase
    .from('users')
    .upsert({ id: userId }, { onConflict: 'id' });
  if (error) console.error('Upsert user error:', error);
}

export async function fetchSleepLogs(userId: number, limit = 30) {
  await setCurrentUser(userId);
  const { data, error } = await supabase
    .from('sleep_logs')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .limit(limit);
  if (error) { console.error(error); return []; }
  return data || [];
}

export async function fetchTodayLog(userId: number) {
  const today = new Date().toISOString().split('T')[0];
  await setCurrentUser(userId);
  const { data, error } = await supabase
    .from('sleep_logs')
    .select('*')
    .eq('user_id', userId)
    .eq('date', today)
    .maybeSingle();
  if (error) { console.error(error); return null; }
  return data;
}

export async function upsertSleepLog(userId: number, log: {
  date: string;
  bedtime: string;
  wake_time: string;
  total_minutes: number;
  quality: number;
  score: number;
  wake_ups?: number;
  symptoms?: any;
  wake_feeling?: string;
}) {
  await setCurrentUser(userId);
  const { data, error } = await supabase
    .from('sleep_logs')
    .upsert({
      user_id: userId,
    ...log,
    }, { onConflict: 'user_id,date' })
    .select()
    .single();
  if (error) { console.error(error); throw error; }
  return data;
}

export async function fetchWeeklyLogs(userId: number) {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  await setCurrentUser(userId);
  const { data, error } = await supabase
    .from('sleep_logs')
    .select('*')
    .eq('user_id', userId)
    .gte('date', sevenDaysAgo.toISOString().split('T')[0])
    .order('date', { ascending: true });
  if (error) { console.error(error); return []; }
  return data || [];
}

export { supabase };
