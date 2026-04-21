import { useState, useEffect } from 'react';
import { upsertUser } from '@/lib/supabaseClient';

interface AuthState {
  loading: boolean;
  userId: number | null;
  error: string | null;
}

export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({
    loading: true,
    userId: null,
    error: null,
  });

  useEffect(() => {
    async function authenticate() {
      // Check sessionStorage first
      const stored = sessionStorage.getItem('eap_user_id');
      if (stored) {
        const uid = Number(stored);
        setState({ loading: false, userId: uid, error: null });
        return;
      }

      // Check URL for ?token=UUID
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');

      if (!token) {
        window.location.href = '/token';
        return;
      }

      try {
        const res = await fetch('https://api.mantracare.com/user/user-info', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        if (!res.ok) throw new Error('Auth failed');

        const data = await res.json();
        const userId = data.user_id;

        if (!userId) throw new Error('No user_id');

        sessionStorage.setItem('eap_user_id', String(userId));

        // Clean URL
        const url = new URL(window.location.href);
        url.searchParams.delete('token');
        window.history.replaceState({}, '', url.pathname + url.search);

        // Upsert user in DB
        await upsertUser(userId);

        setState({ loading: false, userId, error: null });
      } catch (err) {
        console.error('Auth error:', err);
        window.location.href = '/token';
      }
    }

    authenticate();
  }, []);

  return state;
}
