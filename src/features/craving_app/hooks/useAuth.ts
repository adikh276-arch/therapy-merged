import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface AuthState {
  loading: boolean;
  userId: number | null;
  error: string | null;
}

export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({ loading: true, userId: null, error: null });

  useEffect(() => {
    const existing = sessionStorage.getItem('eap_user_id');
    if (existing) {
      setState({ loading: false, userId: Number(existing), error: null });
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (!token) {
      window.location.href = '/token';
      return;
    }

    (async () => {
      try {
        const res = await fetch('https://api.mantracare.com/user/user-info', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        if (!res.ok) throw new Error('Auth failed');

        const data = await res.json();
        const userId = data.user_id;

        sessionStorage.setItem('eap_user_id', String(userId));

        // Clean URL
        const url = new URL(window.location.href);
        url.searchParams.delete('token');
        window.history.replaceState({}, '', url.pathname + url.search);

        // Upsert user
        await supabase.from('users').upsert({ id: userId }, { onConflict: 'id' });

        setState({ loading: false, userId, error: null });
      } catch {
        window.location.href = '/token';
      }
    })();
  }, []);

  return state;
}
