import { useTranslation } from "react-i18next";
import { useState, useCallback, useEffect } from "react";
import { Welcome } from "./Welcome";
import { BrainDump } from "./BrainDump";
import { SortThoughts } from "./SortThoughts";
import { OneSmallStep } from "./OneSmallStep";
import { Reflection } from "./Reflection";
import { SavedThoughts, type SavedSession } from "./SavedThoughts";
import { History, Loader2, Brain, Sparkles } from "lucide-react";
import { initializeUser, fetchUserSessions, saveSession, deleteSession } from "../lib/db-service";
import { LanguageSelector } from "./LanguageSelector";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { PremiumComplete } from "@/components/shared/PremiumComplete";
import { motion, AnimatePresence } from "framer-motion";

import { ThoughtItem } from "./types";

const BrainDumpApp = () => {
  const { t } = useTranslation();
  const [screen, setScreen] = useState(0);
  const [thoughts, setThoughts] = useState<ThoughtItem[]>([]);
  const [transitioning, setTransitioning] = useState(false);
  const [savedSessions, setSavedSessions] = useState<SavedSession[]>([]);
  const [showSaved, setShowSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const userId = sessionStorage.getItem("user_id");

  // Load and initialize user
  useEffect(() => {
    const init = async () => {
      if (!userId) return;

      try {
        setIsLoading(true);
        await initializeUser(userId);
        const sessions = await fetchUserSessions(userId);
        setSavedSessions(sessions);
      } catch (e) {
        console.error("Failed to initialize user session", e);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, [userId]);

  const goTo = useCallback((next: number) => {
    setTransitioning(true);
    setTimeout(() => {
      setScreen(next);
      setTransitioning(false);
    }, 400);
  }, []);

  const handleDumpComplete = (text: string) => {
  const { t } = useTranslation();
    const lines = text
      .split(/[\n,.;]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    const items: ThoughtItem[] = lines.map((t, i) => ({
      id: `t-${i}`,
      text: t,
    }));
    setThoughts(items);
    goTo(2);
  };

  const handleSortComplete = (sorted: ThoughtItem[]) => {
  const { t } = useTranslation();
    setThoughts(sorted);
    goTo(3);
  };

  const handleReflectionComplete = async (reflection: string) => {
    if (!userId) return;

    const newSession: SavedSession = {
      id: `session-${Date.now()}`,
      date: new Date().toISOString(),
      thoughts: thoughts,
      reflection: reflection,
    };

    try {
      await saveSession(userId, newSession);
      setSavedSessions([newSession, ...savedSessions]);
    } catch (e) {
      console.error("Failed to save session to DB", e);
    }

    // Reset for new session
    setThoughts([]);
    goTo(5); // Completion Screen
  };

  const handleDeleteSession = async (id: string) => {
    if (!userId) return;

    try {
      await deleteSession(userId, id);
      setSavedSessions(savedSessions.filter((s) => s.id !== id));
    } catch (e) {
      console.error("Failed to delete session from DB", e);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (showSaved) {
    return (
      <PremiumLayout
        title={t("app_title")}
        subtitle={t("your_mental_clarity_journey")}
        icon={<History className="w-6 h-6 text-primary" />}
        onBack={() => setShowSaved(false)}
      >
        <div className="w-full max-w-md mx-auto px-6 py-4">
          <SavedThoughts
            sessions={savedSessions}
            onBack={() => setShowSaved(false)}
            onDelete={handleDeleteSession}
          />
        </div>
      </PremiumLayout>
    );
  }

  if (screen === 5) {
    return (
      <PremiumComplete
        title={t("app_title")}
        message="You've successfully sorted your thoughts and identified actionable steps. A clearer mind leads to a calmer heart."
        onRestart={() => goTo(0)}
      />
    );
  }

  const screens = [
    <Welcome key="welcome" onStart={() => goTo(1)} />,
    <BrainDump key="dump" onComplete={handleDumpComplete} />,
    <SortThoughts key="sort" thoughts={thoughts} onComplete={handleSortComplete} onBack={() => goTo(1)} />,
    <OneSmallStep key="step" thoughts={thoughts.filter((t) => t.bucket === "action")} onComplete={() => goTo(4)} onBack={() => goTo(2)} />,
    <Reflection key="reflect" onComplete={handleReflectionComplete} onBack={() => goTo(0)} />,
  ];

  const subtitles = [
    "Welcome",
    "Mental Clearing",
    "Sorting",
    "Action Steps",
    "Reflection"
  ];

  return (
    <PremiumLayout
      title={t("app_title")}
      subtitle={subtitles[screen]}
      icon={<Brain className="w-6 h-6 text-primary" />}
      onBack={screen > 0 ? () => goTo(screen - 1) : undefined}
      actions={screen === 0 && savedSessions.length > 0 ? (
        <button onClick={() => setShowSaved(true)} className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-600">
          <History size={20} />
        </button>
      ) : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[70vh]" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif' }}>
        <div className="flex justify-center gap-2 mb-10">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${i <= screen ? "w-8 bg-primary" : "w-2 bg-slate-100"}`}
            />
          ))}
        </div>

        <div
          className={`transition-all duration-500 ease-in-out flex-1 flex flex-col ${
            transitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
        >
          {screens[screen]}
        </div>
      </div>
    </PremiumLayout>
  );
};

export default BrainDumpApp;
