import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthResolved, setIsAuthResolved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const authenticate = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        let token = params.get("token");

        // if there's no token in query but there's user_id in session, we skip
        if (!token && sessionStorage.getItem("user_id")) {
          setIsAuthResolved(true);
          return;
        }

        if (!token) {
          window.location.href = "/token";
          return;
        }

        const res = await fetch("https://api.mantracare.com/user/user-info", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token })
        });

        if (!res.ok) throw new Error("Authentication Failed");
        const data = await res.json();
        
        if (data && data.user_id) {
          sessionStorage.setItem("user_id", data.user_id);
          window.history.replaceState({}, "", window.location.pathname);
          
          await fetch(`http://localhost:3001/api/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: data.user_id })
          });

          setIsAuthResolved(true);
        } else {
          window.location.href = "/token";
        }
      } catch (err) {
        window.location.href = "/token";
      }
    };
    
    authenticate();
  }, []);

  if (!isAuthResolved) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4" />
        <p className="text-muted-foreground font-body">Authenticating...</p>
      </div>
    );
  }

  return <>{children}</>;
};
