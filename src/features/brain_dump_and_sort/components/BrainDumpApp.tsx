import { useState, useCallback, useEffect } from "react";
import { Welcome } from "./Welcome";
import { BrainDump } from "./BrainDump";
import { SortThoughts } from "./SortThoughts";
import { OneSmallStep } from "./OneSmallStep";
import { Reflection } from "./Reflection";
import { SavedThoughts, type SavedSession } from "./SavedThoughts";
import { History, Loader2 } from "lucide-react";
import { initializeUser, fetchUserSessions, saveSession, deleteSession } from "../lib/db-service";
import { LanguageSelector } from "./LanguageSelector";

import { ThoughtItem } from "./types";

const BrainDumpApp = () => {
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
    goTo(0);
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
      <div className="relative">
        <SavedThoughts
          sessions={savedSessions}
          onBack={() => setShowSaved(false)}
          onDelete={handleDeleteSession}
        />
      </div>
    );
  }

  const screens = [
    <Welcome key="welcome" onStart={() => goTo(1)} />,
    <BrainDump key="dump" onComplete={handleDumpComplete} />,
    <SortThoughts key="sort" thoughts={thoughts} onComplete={handleSortComplete} onBack={() => goTo(1)} />,
    <OneSmallStep key="step" thoughts={thoughts.filter((t) => t.bucket === "action")} onComplete={() => goTo(4)} onBack={() => goTo(2)} />,
    <Reflection key="reflect" onComplete={handleReflectionComplete} onBack={() => goTo(0)} />,
  ];

  return (
    <div className="relative w-full">
      {screen === 0 && savedSessions.length > 0 && (
        <div className="flex justify-center mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSaved(true)}
            className="flex items-center gap-2 text-slate-500 hover:text-primary font-bold text-xs uppercase tracking-widest transition-colors"
          >
            <History size={16} />
            View Past Sessions
          </motion.button>
        </div>
      )}

      <div
        className={`transition-all duration-500 ease-in-out ${
          transitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
        }`}
      >
        {screens[screen]}
      </div>
    </div>
  );
};

export default BrainDumpApp;

