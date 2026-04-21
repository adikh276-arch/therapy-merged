import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { neon } from '@neondatabase/serverless';

const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

export const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleHandshake = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      const storedUserId = sessionStorage.getItem('user_id');

      // 1. Check if we have an active session in sessionStorage
      if (storedUserId) {
        setIsAuthorized(true);
        // If token is in URL but we already have session, clean it up
        if (token) {
          const params = new URLSearchParams(window.location.search);
          params.delete('token');
          const cleanSearch = params.toString() ? `?${params.toString()}` : '';
          window.history.replaceState({}, '', window.location.pathname + cleanSearch + window.location.hash);
        }
        return;
      }

      // 2. No session, must have token in URL
      if (!token) {
        console.error('Handshake error: No token and no active session.');
        window.location.href = '/token'; // Hard redirect to token entry portal
        return;
      }

      try {
        // 3. Validate Token via API
        const response = await axios.post('https://api.mantracare.com/user/user-info', { token });
        const { user_id } = response.data;

        if (!user_id || user_id === 'null') {
          throw new Error('Invalid user identity received from API');
        }

        // 4. Persistence: Store user_id in sessionStorage for the duration of the tab session
        sessionStorage.setItem('user_id', user_id.toString());

        // 5. Cleanup: Remove token and auth-related params from address bar immediately
        const params = new URLSearchParams(window.location.search);
        params.delete('token');
        const cleanSearch = params.toString() ? `?${params.toString()}` : '';
        window.history.replaceState({}, '', window.location.pathname + cleanSearch + window.location.hash);

        // 6. DB Initialization: Ensure user exists in Suprabase/Neon via upsert
        if (DATABASE_URL) {
          try {
            const sql = neon(DATABASE_URL, { disableWarningInBrowsers: true });
            
            // First, ensure the users table exists.
            await sql`
              CREATE TABLE IF NOT EXISTS users (
                id BIGINT PRIMARY KEY,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
              );
            `;

            await sql`
              INSERT INTO users (id) 
              VALUES (${user_id}) 
              ON CONFLICT (id) DO NOTHING
            `;
          } catch (dbErr) {
            console.error('User identity initialization failed in database:', dbErr);
          }
        }

        setIsAuthorized(true);
      } catch (err) {
        console.error('Handshake verification failed:', err);
        window.location.href = '/token';
      }
    };

    handleHandshake();
  }, [location.pathname]);

  // Full-screen blocking UI until handshake state is resolved
  if (!isAuthorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-sm font-medium text-slate-600">Securely initializing session...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
