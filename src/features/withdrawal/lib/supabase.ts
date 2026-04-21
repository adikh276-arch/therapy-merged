import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase credentials missing! Check your environment variables.');
}

export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseKey || 'placeholder');

export async function setUserContext(userId: number): Promise<void> {
    // Calls the set_app_user() Postgres function which wraps set_config
    // This sets app.current_user_id session variable for RLS policies
    const { error } = await supabase.rpc('set_app_user', { user_id: userId });
    if (error) {
        console.warn('setUserContext failed (non-blocking):', error.message);
    }
}
