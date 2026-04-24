import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

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
          window.history.replaceState(null, "", location.pathname + cleanSearch + location.hash);
        }
      } else {
        // If session is lost during active usage, wait for root App to handle or reload
        const timer = setTimeout(checkAuth, 100);
        return () => clearTimeout(timer);
      }
    };

    checkAuth();
  }, [location]);

  if (!isAuthorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" aria-hidden="true"></div>
        <span className="sr-only">Loading</span>
      </div>
    );
  }

  return <>{children}</>;
};
