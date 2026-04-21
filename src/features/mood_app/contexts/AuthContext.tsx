import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { supabase } from '@/lib/supabase';

interface AuthContextType {
  userId: number | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  userId: null,
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      // Check sessionStorage first
      const stored = sessionStorage.getItem('eap_user_id');
      if (stored) {
        setUserId(Number(stored));
        setIsLoading(false);
        return;
      }

      // Check URL for token
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');

      if (!token) {
        window.location.href = '/token';
        return;
      }

      try {
        const res = await fetch(
          'https://api.mantracare.com/user/user-info',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
          }
        );

        if (!res.ok) throw new Error('Auth failed');

        const data = await res.json();
        const id = data.user_id;

        sessionStorage.setItem('eap_user_id', String(id));

        // Clean token from URL but preserve other params like lang
        const url = new URL(window.location.href);
        url.searchParams.delete('token');
        window.history.replaceState(
          {},
          '',
          url.pathname + (url.search || '')
        );

        // Upsert user record
        try {
          await supabase.rpc('set_config', {
            setting_name: 'app.current_user_id',
            setting_value: String(id),
            is_local: true,
          });
          await supabase
            .from('users')
            .upsert({ id }, { onConflict: 'id' });
        } catch (e) {
          console.warn('User upsert failed (Supabase may not be configured):', e);
        }

        setUserId(id);
      } catch {
        window.location.href = '/token';
        return;
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground font-semibold text-sm">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (!userId) return null;

  return (
    <AuthContext.Provider value={{ userId, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
