import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { query, initSchema } from "@/lib/db";

interface UserInfoResponse {
  user_id: string | number;
}

export const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthResolved, setIsAuthResolved] = useState(false);
  const { t } = useTranslation();

  const handleHandshake = async () => {
    // Ensure schema is ready first
    await initSchema();

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const storedUserId = sessionStorage.getItem("user_id");

    if (storedUserId) {
      // Re-verify user exists in DB even if in session (safety check)
      await initializeUser(storedUserId);
      setIsAuthResolved(true);
      return;
    }

    if (!token) {
      // If no token and no session, redirect to /token
      window.location.href = "/token";
      return;
    }

    try {
      const response = await fetch("https://api.mantracare.com/user/user-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) throw new Error("Authentication failed");

      const data: UserInfoResponse = await response.json();
      const userId = String(data.user_id); // Ensure it's a string for DB

      if (!userId || userId === "undefined" || userId === "null") {
        throw new Error("Invalid User ID received");
      }

      // 1. Initialize user in database FIRST
      await initializeUser(userId);

      // 2. Store in session storage
      sessionStorage.setItem("user_id", userId);

      // 3. Remove token from URL
      const url = new URL(window.location.href);
      url.searchParams.delete("token");
      window.history.replaceState({}, "", url.pathname + url.search);

      setIsAuthResolved(true);
    } catch (error) {
      console.error("Handshake error:", error);
      window.location.href = "/token";
    }
  };

  const initializeUser = async (userId: string) => {
    try {
      // UPSERT equivalent or Check and Insert
      const existingUser = await query("SELECT id FROM users WHERE id = $1", [userId]);
      if (existingUser.rows.length === 0) {
        await query("INSERT INTO users (id) VALUES ($1)", [userId]);
        console.log("New user initialized in database:", userId);
      }
    } catch (error) {
      console.error("Failed to initialize user in database:", error);
      // We don't throw here to avoid blocking current session if DB is transiently down, 
      // but the foreign key constraint will block saves later.
    }
  };

  useEffect(() => {
    handleHandshake();
  }, []);

  if (!isAuthResolved) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background p-6 text-center">
        <div className="flex flex-col items-center gap-6 max-w-xs transition-all duration-700 animate-in fade-in zoom-in-95">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-primary/20 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl">🕵️</span>
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="font-heading font-bold text-xl text-foreground">
              {t("auth_validating_session") || "Securing your investigation room..."}
            </h2>
            <p className="font-body text-muted-foreground text-sm animate-pulse">
              {t("auth_loading_message") || "Preparing your detective tools..."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
