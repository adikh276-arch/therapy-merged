import React, { useState, useEffect, Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import axios from "axios";
import { neon } from "@neondatabase/serverless";
import Loader from "../components/Loader";
import { COLORS } from "../misc/Colors";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { useTranslation } from "react-i18next";

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

      const devUserId = import.meta.env.VITE_DEV_USER_ID;
      if (devUserId && !storedUserId) {
        console.info(`[DEV] Seeding mock user_id: ${devUserId}`);
        sessionStorage.setItem("user_id", devUserId);
        setIsAuthorized(true);
        return;
      }
      if (storedUserId) {
        setIsAuthorized(true);
        if (token) {
          urlParams.delete("token");
          const cleanSearch = urlParams.toString() ? `?${urlParams.toString()}` : "";
          window.history.replaceState(null, "", window.location.pathname + cleanSearch + window.location.hash);
        }
        return;
      }

      if (token) {
        try {
          const response = await axios.post("https://api.mantracare.com/user/user-info", { token });
          const { user_id } = response.data;

          if (!user_id) throw new Error("API did not return a valid user_id");

          sessionStorage.setItem("user_id", user_id.toString());
          setIsAuthorized(true);

          if (DATABASE_URL) {
            initDatabase(user_id.toString()).catch(err => 
              console.warn("DB Initialization skipped:", err.message)
            );
          }

          const savedRedirectPath = localStorage.getItem("APP_REDIRECT_PATH");
          localStorage.removeItem("APP_REDIRECT_PATH");

          urlParams.delete("token");
          const cleanSearch = urlParams.toString() ? `?${urlParams.toString()}` : "";
          const cleanPath = window.location.pathname + cleanSearch + window.location.hash;

          const targetPath = savedRedirectPath || cleanPath;
          if (targetPath === window.location.pathname + window.location.search + window.location.hash) {
            window.history.replaceState(null, "", targetPath);
          } else if (targetPath === cleanPath) {
            window.history.replaceState(null, "", cleanPath);
          } else {
            window.location.replace(targetPath);
          }
        } catch (err) {
          console.error("Token Validation Failed:", err);
          redirectToAuth();
        }
      } else {
        redirectToAuth();
      }
    };

    const initDatabase = async (userId: string) => {
      const sql = neon(DATABASE_URL!, { disableWarningInBrowsers: true });
      
      const tables = [
        sql`CREATE TABLE IF NOT EXISTS users (id BIGINT PRIMARY KEY, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(), updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW())`,
        sql`CREATE TABLE IF NOT EXISTS energy_logs (id SERIAL PRIMARY KEY, user_id BIGINT REFERENCES users(id), date DATE NOT NULL, level TEXT NOT NULL, factors TEXT[], note TEXT, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(), UNIQUE(user_id, date))`,
        sql`CREATE TABLE IF NOT EXISTS doodle_logs (id SERIAL PRIMARY KEY, user_id BIGINT REFERENCES users(id), image_url TEXT NOT NULL, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW())`,
        sql`CREATE TABLE IF NOT EXISTS activities (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE, date DATE NOT NULL, emoji TEXT, name TEXT NOT NULL, duration INTEGER NOT NULL, notes TEXT, created_at TIMESTAMP DEFAULT NOW())`,
        sql`CREATE TABLE IF NOT EXISTS letters (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id BIGINT REFERENCES users(id) ON DELETE CASCADE, content TEXT NOT NULL, emotional_state TEXT, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(), updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW())`,
        sql`CREATE TABLE IF NOT EXISTS gratitude_diary_entries (id SERIAL PRIMARY KEY, user_id BIGINT REFERENCES users(id) ON DELETE CASCADE, date TEXT NOT NULL, feeling TEXT, gratitudes JSONB NOT NULL, created_at TIMESTAMP DEFAULT NOW())`,
        sql`CREATE TABLE IF NOT EXISTS gratitude_tracker_entries (id UUID PRIMARY KEY, user_id BIGINT REFERENCES users(id) ON DELETE CASCADE, date DATE NOT NULL, gratitude1 TEXT NOT NULL, gratitude2 TEXT, mood_emoji TEXT, mood_label TEXT, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW())`,
        sql`CREATE TABLE IF NOT EXISTS unsent_letters (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id BIGINT REFERENCES users(id) ON DELETE CASCADE, content TEXT NOT NULL, recipient TEXT, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW())`,
        sql`CREATE TABLE IF NOT EXISTS what_do_i_need_entries (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id BIGINT REFERENCES users(id) ON DELETE CASCADE, needs JSONB NOT NULL, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW())`,
        sql`CREATE TABLE IF NOT EXISTS redraw_your_circle_entries (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id BIGINT REFERENCES users(id) ON DELETE CASCADE, circles JSONB NOT NULL, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW())`,
        sql`CREATE TABLE IF NOT EXISTS sleep_audit_logs (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id BIGINT REFERENCES users(id) ON DELETE CASCADE, date DATE NOT NULL, quality INTEGER, duration DECIMAL, factors TEXT[], created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW())`,
        sql`CREATE TABLE IF NOT EXISTS sleep_window_planner_entries (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id BIGINT REFERENCES users(id) ON DELETE CASCADE, bedtime TIME, wake_time TIME, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW())`,
        sql`CREATE TABLE IF NOT EXISTS repair_reconnect_entries (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id BIGINT REFERENCES users(id) ON DELETE CASCADE, step TEXT, reflection TEXT, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW())`,
        sql`CREATE TABLE IF NOT EXISTS memory_box_entries (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id BIGINT REFERENCES users(id) ON DELETE CASCADE, memory_data JSONB NOT NULL, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW())`,
        sql`CREATE TABLE IF NOT EXISTS continuing_bonds_entries (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id BIGINT REFERENCES users(id) ON DELETE CASCADE, bond_data JSONB NOT NULL, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW())`,
        sql`CREATE TABLE IF NOT EXISTS gentle_wishes (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id BIGINT REFERENCES users(id) ON DELETE CASCADE, wish TEXT NOT NULL, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW())`,
        sql`CREATE TABLE IF NOT EXISTS window_of_tolerance_logs (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id BIGINT REFERENCES users(id) ON DELETE CASCADE, state TEXT, factors TEXT[], created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW())`,
        sql`CREATE TABLE IF NOT EXISTS narrative_entries (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id BIGINT REFERENCES users(id) ON DELETE CASCADE, title TEXT, content TEXT NOT NULL, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW())`,
        sql`CREATE TABLE IF NOT EXISTS food_emotion_logs (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id BIGINT REFERENCES users(id) ON DELETE CASCADE, food TEXT, emotion TEXT, situation TEXT, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW())`,
        sql`CREATE TABLE IF NOT EXISTS food_rules_challenges (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id BIGINT REFERENCES users(id) ON DELETE CASCADE, rule TEXT, challenge TEXT, outcome TEXT, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW())`,
        sql`CREATE TABLE IF NOT EXISTS compassion_break_entries (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id BIGINT REFERENCES users(id) ON DELETE CASCADE, break_data JSONB NOT NULL, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW())`,
        sql`CREATE TABLE IF NOT EXISTS name_your_mind_entries (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id BIGINT REFERENCES users(id) ON DELETE CASCADE, thought TEXT NOT NULL, mind_name TEXT, reflection TEXT, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW())`,
        sql`CREATE TABLE IF NOT EXISTS prediction_vs_reality_entries (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id BIGINT REFERENCES users(id) ON DELETE CASCADE, situation TEXT, prediction TEXT, emotions TEXT[], intensity INTEGER, reality TEXT, comparison TEXT, reflection TEXT, reframe TEXT, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW())`,
        sql`CREATE TABLE IF NOT EXISTS mind_reading_check_entries (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id BIGINT REFERENCES users(id) ON DELETE CASCADE, situation TEXT, thought TEXT, evidence TEXT, alternatives JSONB, belief_level INTEGER, balanced_thought TEXT, action_step TEXT, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW())`,
        sql`CREATE TABLE IF NOT EXISTS my_safe_space_canvas_entries (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id BIGINT REFERENCES users(id) ON DELETE CASCADE, name TEXT, reflection TEXT, image_data_url TEXT, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW())`,
        sql`CREATE TABLE IF NOT EXISTS guided_series_logs (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id BIGINT REFERENCES users(id) ON DELETE CASCADE, concern TEXT NOT NULL, activity_name TEXT NOT NULL, entry_data JSONB NOT NULL, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW())`,
      ];

      await Promise.allSettled(tables);

      try { await sql`ALTER TABLE memory_box_entries ADD COLUMN IF NOT EXISTS memory_data JSONB`; } catch(e) {}
      try { await sql`ALTER TABLE continuing_bonds_entries ADD COLUMN IF NOT EXISTS bond_data JSONB`; } catch(e) {}
      try { await sql`ALTER TABLE compassion_break_entries ADD COLUMN IF NOT EXISTS break_data JSONB`; } catch(e) {}
      await sql`INSERT INTO users (id) VALUES (${userId}) ON CONFLICT (id) DO NOTHING`;
    };

    const redirectToAuth = () => {
  const { t } = useTranslation();
      const currentPath = window.location.pathname + window.location.search + window.location.hash;
      if (!currentPath.includes("token=")) {
        localStorage.setItem("APP_REDIRECT_PATH", currentPath);
      }
      const appRoot = window.location.origin + "/therapy/";
      window.location.replace(`https://web.mantracare.com/app/therapy?redirect_url=${encodeURIComponent(appRoot)}`);
    };

    performHandshake();
  }, []);

  if (!isAuthorized) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8FAFC] font-sans">
        <Loader size={45} color={COLORS.blueDark} />
      </div>
    );
  }

  return (
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={<Loader size={45} color={COLORS.blueDark} />}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <RouterProvider router={router} />
          </TooltipProvider>
        </QueryClientProvider>
      </Suspense>
    </I18nextProvider>
  );
}

export default App;
