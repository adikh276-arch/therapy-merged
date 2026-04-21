import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let _supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!_supabase) {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn('Supabase credentials not configured. Database features disabled.');
      // Create a dummy client that won't crash — use a placeholder URL
      _supabase = createClient('https://placeholder.supabase.co', 'placeholder');
    } else {
      _supabase = createClient(supabaseUrl, supabaseAnonKey);
    }
  }
  return _supabase;
}

/** @deprecated Use getSupabase() */
export const supabase = {
  get from() { return getSupabase().from.bind(getSupabase()); },
  get rpc() { return getSupabase().rpc.bind(getSupabase()); },
};

export async function setCurrentUser(userId: number) {
  try {
    await getSupabase().rpc('set_config', {
      setting_name: 'app.current_user_id',
      setting_value: String(userId),
      is_local: true,
    });
  } catch {
    // silently fail if Supabase not configured
  }
}

export interface CravingLog {
  id?: number;
  user_id: number;
  timestamp: string;
  intensity: number;
  intensity_label: string;
  outcome: 'resisted' | 'smoked';
  trigger?: string;
  location?: string;
  quantity?: number;
  notes?: string;
}

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
