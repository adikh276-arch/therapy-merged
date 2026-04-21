import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL || '';
const key = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(url, key);

export async function withUserContext(userId: number) {
  await supabase.rpc('set_config', {
    setting_name: 'app.current_user_id',
    setting_value: String(userId),
    is_local: true,
  });
}
