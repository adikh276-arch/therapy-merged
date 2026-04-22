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
      // 1. Session Isolation: Check sessionStorage (Tab-specific)
      const storedUserId = sessionStorage.getItem("user_id");
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      if (storedUserId) {
        setIsAuthorized(true);
        // Clean URL if token still present
        if (token) {
          urlParams.delete("token");
          const cleanSearch = urlParams.toString() ? `?${urlParams.toString()}` : "";
          window.history.replaceState({}, "", window.location.pathname + cleanSearch + window.location.hash);
        }
        return;
      }

      // 2. Token Extraction from URL - If no token and no session, redirect to MantraCare Auth
      if (!token) {
        console.warn("Auth Handshake: No token found. Redirecting to token entry portal...");
        window.location.href = "/token";
        return;
      }

      try {
        // 3. Official Validation Handshake
        const response = await axios.post("https://api.mantracare.com/user/user-info", { token });
        const { user_id } = response.data;

        if (!user_id) throw new Error("API did not return a valid user_id");

        // 4. Persistence in sessionStorage
        sessionStorage.setItem("user_id", user_id.toString());

        // 5. Database Initialization (Neon/Supabase)
        if (DATABASE_URL) {
          try {
            const sql = neon(DATABASE_URL, { disableWarningInBrowsers: true });
            
            // All tables initialization logic remains here...
            await sql`CREATE TABLE IF NOT EXISTS users (id BIGINT PRIMARY KEY, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(), updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW());`;
            await sql`CREATE TABLE IF NOT EXISTS energy_logs (id SERIAL PRIMARY KEY, user_id BIGINT REFERENCES users(id), date DATE NOT NULL, level TEXT NOT NULL, factors TEXT[], note TEXT, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(), UNIQUE(user_id, date));`;
            await sql`CREATE TABLE IF NOT EXISTS doodle_logs (id SERIAL PRIMARY KEY, user_id BIGINT REFERENCES users(id), image_url TEXT NOT NULL, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW());`;
            await sql`CREATE TABLE IF NOT EXISTS activities (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE, date DATE NOT NULL, emoji TEXT, name TEXT NOT NULL, duration INTEGER NOT NULL, notes TEXT, created_at TIMESTAMP DEFAULT NOW());`;
            await sql`CREATE TABLE IF NOT EXISTS letters (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id BIGINT REFERENCES users(id) ON DELETE CASCADE, content TEXT NOT NULL, emotional_state TEXT, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(), updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW());`;
            await sql`CREATE TABLE IF NOT EXISTS gratitude_diary_entries (id SERIAL PRIMARY KEY, user_id BIGINT REFERENCES users(id) ON DELETE CASCADE, date TEXT NOT NULL, feeling TEXT, gratitudes JSONB NOT NULL, created_at TIMESTAMP DEFAULT NOW());`;
            await sql`CREATE TABLE IF NOT EXISTS gratitude_tracker_entries (id UUID PRIMARY KEY, user_id BIGINT REFERENCES users(id) ON DELETE CASCADE, date DATE NOT NULL, gratitude1 TEXT NOT NULL, gratitude2 TEXT, mood_emoji TEXT, mood_label TEXT, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW());`;

            await sql`
              INSERT INTO users (id) 
              VALUES (${user_id.toString()}) 
              ON CONFLICT (id) DO NOTHING
            `;
            console.log("All database tables and identity initialized.");
          } catch (dbErr) {
            console.warn("DB User Upsert skipped:", (dbErr as Error).message);
          }
        }

        // 6. Clean URL
        urlParams.delete("token");
        const cleanSearch = urlParams.toString() ? `?${urlParams.toString()}` : "";
        window.history.replaceState({}, "", window.location.pathname + cleanSearch + window.location.hash);

        setIsAuthorized(true);
      } catch (err) {
        console.error("Handshake Verification Failed:", err);
        // If verification fails, retry redirect to auth
        window.location.href = "/token";
      }
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
