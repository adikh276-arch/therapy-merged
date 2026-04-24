import React, { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import axios from "axios";
import { neon } from "@neondatabase/serverless";

const queryClient = new QueryClient();
const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const performHandshake = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      const storedUserId = sessionStorage.getItem("user_id");

      // 0. DEV ONLY: Mock user bypass via VITE_DEV_USER_ID env var
      const devUserId = import.meta.env.VITE_DEV_USER_ID;
      if (devUserId && !storedUserId) {
        console.info(`[DEV] Seeding mock user_id: ${devUserId}`);
        sessionStorage.setItem("user_id", devUserId);
        setIsAuthorized(true);
        return;
      }
      if (storedUserId) {
        setIsAuthorized(true);
        // Clean URL if token is present (stale token cleanup)
        if (token) {
          urlParams.delete("token");
          const cleanSearch = urlParams.toString() ? `?${urlParams.toString()}` : "";
          window.location.href = window.location.pathname + cleanSearch + window.location.hash;
        }
        return;
      }

      // 2. If token present in URL, validate it
      if (token) {
        try {
          const response = await axios.post("https://api.mantracare.com/user/user-info", { token });
          const { user_id } = response.data;

          if (!user_id) throw new Error("API did not return a valid user_id");

          // Save to session
          sessionStorage.setItem("user_id", user_id.toString());

          // Database Initialization
          if (DATABASE_URL) {
            try {
              const sql = neon(DATABASE_URL, { disableWarningInBrowsers: true });
              await sql`CREATE TABLE IF NOT EXISTS users (id BIGINT PRIMARY KEY, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(), updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW());`;
              await sql`CREATE TABLE IF NOT EXISTS energy_logs (id SERIAL PRIMARY KEY, user_id BIGINT REFERENCES users(id), date DATE NOT NULL, level TEXT NOT NULL, factors TEXT[], note TEXT, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(), UNIQUE(user_id, date));`;
              await sql`CREATE TABLE IF NOT EXISTS doodle_logs (id SERIAL PRIMARY KEY, user_id BIGINT REFERENCES users(id), image_url TEXT NOT NULL, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW());`;
              await sql`CREATE TABLE IF NOT EXISTS activities (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE, date DATE NOT NULL, emoji TEXT, name TEXT NOT NULL, duration INTEGER NOT NULL, notes TEXT, created_at TIMESTAMP DEFAULT NOW());`;
              await sql`CREATE TABLE IF NOT EXISTS letters (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id BIGINT REFERENCES users(id) ON DELETE CASCADE, content TEXT NOT NULL, emotional_state TEXT, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(), updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW());`;
              await sql`CREATE TABLE IF NOT EXISTS gratitude_diary_entries (id SERIAL PRIMARY KEY, user_id BIGINT REFERENCES users(id) ON DELETE CASCADE, date TEXT NOT NULL, feeling TEXT, gratitudes JSONB NOT NULL, created_at TIMESTAMP DEFAULT NOW());`;
              await sql`CREATE TABLE IF NOT EXISTS gratitude_tracker_entries (id UUID PRIMARY KEY, user_id BIGINT REFERENCES users(id) ON DELETE CASCADE, date DATE NOT NULL, gratitude1 TEXT NOT NULL, gratitude2 TEXT, mood_emoji TEXT, mood_label TEXT, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW());`;

              await sql`INSERT INTO users (id) VALUES (${user_id.toString()}) ON CONFLICT (id) DO NOTHING`;
            } catch (dbErr) {
              console.warn("DB Initialization skipped:", (dbErr as Error).message);
            }
          }

          // Smart Restore & Navigate Logic
          const savedRedirectPath = localStorage.getItem("APP_REDIRECT_PATH");
          localStorage.removeItem("APP_REDIRECT_PATH");

          // Remove token from URL bar instantly
          urlParams.delete("token");
          const cleanSearch = urlParams.toString() ? `?${urlParams.toString()}` : "";
          
          // If we have a saved path, go there. Otherwise stay on current path (without token).
          const targetPath = savedRedirectPath || (window.location.pathname + cleanSearch + window.location.hash);
          window.location.href = targetPath;

          setIsAuthorized(true);
        } catch (err) {
          console.error("Token Validation Failed:", err);
          redirectToAuth();
        }
      } else {
        // 3. No session and no token - Intercept and Redirect
        redirectToAuth();
      }
    };

    const redirectToAuth = () => {
      // Save current path for later restoration
      const currentPath = window.location.pathname + window.location.search + window.location.hash;
      if (!currentPath.includes("token=")) {
        localStorage.setItem("APP_REDIRECT_PATH", currentPath);
      }
      
      // Hard redirect to Auth Portal
      const appRoot = window.location.origin + "/therapy/";
      window.location.href = `https://web.mantracare.com/app/therapy?redirect_url=${encodeURIComponent(appRoot)}`;
    };

    performHandshake();
  }, []);

  if (!isAuthorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white font-sans">
        <div className="flex flex-col items-center gap-6">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent shadow-sm"></div>
          <p className="text-lg font-semibold text-slate-800 tracking-tight">Initializing Secure Session...</p>
          <p className="text-sm text-slate-500">Wait while we verify your credentials.</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
