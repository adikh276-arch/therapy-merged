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

      // 2. Token Extraction from URL
      if (!token) {
        console.error("Auth Handshake: No token in URL and no active session.");
        window.location.href = "/token"; // Hard redirect
        return;
      }

      try {
        // 3. Official Validation Handshake
        const response = await axios.post("https://api.mantracare.com/user/user-info", { token });
        const { user_id } = response.data;

        if (!user_id) throw new Error("API did not return a valid user_id");

        // 4. Persistence in sessionStorage
        sessionStorage.setItem("user_id", user_id.toString());

        // 5. Database Initialization (Neon/Supabase) — non-fatal, auth proceeds regardless
        if (DATABASE_URL) {
          try {
            const sql = neon(DATABASE_URL, { disableWarningInBrowsers: true });
            
            // First, ensure the users table exists. This prevents "relation users does not exist" errors.
            await sql`
              CREATE TABLE IF NOT EXISTS users (
                id BIGINT PRIMARY KEY,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
              );
            `;

            await sql`
              INSERT INTO users (id) 
              VALUES (${user_id.toString()}) 
              ON CONFLICT (id) DO NOTHING
            `;
            console.log("Identity initialized in database.");
          } catch (dbErr) {
            // Table may not exist yet — auth continues regardless
            console.warn("DB User Upsert skipped (table may not exist):", (dbErr as Error).message);
          }
        }

        // 6. Clean URL
        urlParams.delete("token");
        const cleanSearch = urlParams.toString() ? `?${urlParams.toString()}` : "";
        window.history.replaceState({}, "", window.location.pathname + cleanSearch + window.location.hash);

        setIsAuthorized(true);
      } catch (err) {
        console.error("Handshake Verification Failed:", err);
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
