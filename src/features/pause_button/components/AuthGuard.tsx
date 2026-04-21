import React, { useEffect, useState } from "react";
import { query, initSchema } from "@/lib/db";
import { useTranslation } from "react-i18next";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const [isAuthResolved, setIsAuthResolved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const existingUserId = sessionStorage.getItem("user_id");

        if (!existingUserId && !token) {
          window.location.href = "/token";
          return;
        }

        let userId = existingUserId;

        if (token) {
          // Perform handshake
          const response = await fetch("https://api.mantracare.com/user/user-info", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          });

          if (!response.ok) {
            window.location.href = "/token";
            return;
          }

          const data = await response.json();
          userId = data.user_id;

          if (!userId) {
            window.location.href = "/token";
            return;
          }

          // Store in sessionStorage
          sessionStorage.setItem("user_id", userId.toString());

          // Clean URL
          const newUrl = window.location.pathname + window.location.search.replace(/[?&]token=[^&]+/, "").replace(/^&/, "?");
          window.history.replaceState({}, "", newUrl);
        }

        // Initialize schema (Phase 5 requirement)
        await initSchema();

        // Ensure user exists in DB (Phase 12)
        if (userId) {
          const { rows } = await query("SELECT id FROM users WHERE id = $1", [userId]);
          if (rows.length === 0) {
            await query("INSERT INTO users (id) VALUES ($1)", [userId]);
          }
        }

        setIsAuthResolved(true);
      } catch (err) {
        console.error("Auth error:", err);
        setError(t('auth_failed'));
      }
    };

    handleAuth();
  }, [t]);

  if (!isAuthResolved) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground font-body">{t('authenticating')}</p>
          {error && <p className="text-destructive text-sm mt-2">{error}</p>}
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
