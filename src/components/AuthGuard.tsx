import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { neon } from '@neondatabase/serverless';

const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

export const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const storedUserId = sessionStorage.getItem('user_id');
      if (storedUserId) {
        setIsAuthorized(true);
        
        // Stale Token Cleanup Logic
        const urlParams = new URLSearchParams(location.search);
        if (urlParams.has('token')) {
          urlParams.delete('token');
          const cleanSearch = urlParams.toString() ? `?${urlParams.toString()}` : "";
          navigate(location.pathname + cleanSearch, { replace: true });
        }
      } else {
        // If session is lost during active usage, wait for root App to handle or reload
        const timer = setTimeout(checkAuth, 100);
        return () => clearTimeout(timer);
      }
    };

    checkAuth();
  }, [location, navigate]);

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
