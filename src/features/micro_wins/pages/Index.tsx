import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import IntroScreen from "@/components/micro-wins/IntroScreen";
import ChooseScreen from "@/components/micro-wins/ChooseScreen";
import ReflectScreen from "@/components/micro-wins/ReflectScreen";
import ReinforcementScreen from "@/components/micro-wins/ReinforcementScreen";
import HistoryScreen, { type MicroWinEntry } from "@/components/micro-wins/HistoryScreen";
import { LanguageSelector } from "@/components/LanguageSelector";


type Screen = "intro" | "choose" | "reflect" | "reinforcement" | "history";

const STORAGE_KEY = "micro-wins-entries"; // fallback, mainly using api now

const loadEntries = async (): Promise<MicroWinEntry[]> => {
  try {
    const userId = sessionStorage.getItem("user_id");
    if (!userId) return [];
    const response = await fetch(`http://localhost:3001/api/wins?user_id=${userId}`);
    if (response.ok) {
      return await response.json();
    }
  } catch {}
  return [];
};

const saveEntryToDB = async (entry: MicroWinEntry) => {
  const userId = sessionStorage.getItem("user_id");
  if (!userId) return;
  
  await fetch(`http://localhost:3001/api/wins`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...entry, user_id: userId })
  });
};


const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const pageTransition = {
  duration: 0.5,
  ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
};

const Index = () => {
  const [screen, setScreen] = useState<Screen>("intro");
  const [selectedWin, setSelectedWin] = useState("");
  const [reflection, setReflection] = useState("");
  const [entries, setEntries] = useState<MicroWinEntry[]>([]);

  useEffect(() => {
    loadEntries().then(setEntries);
  }, []);

  const handleChoose = (win: string) => {
    setSelectedWin(win);
    setScreen("reflect");
  };

  const handleReflect = (ref: string) => {
    setReflection(ref);
    const newEntry: MicroWinEntry = {
      id: crypto.randomUUID(),
      win: selectedWin,
      reflection: ref,
      date: new Date().toISOString(),
    };
    
    setEntries((prev) => [newEntry, ...prev]);
    saveEntryToDB(newEntry);
    
    setScreen("reinforcement");
  };

  const handleDone = () => {
    setScreen("intro");
  };

  const handleLogAnother = () => {
    setSelectedWin("");
    setReflection("");
    setScreen("choose");
  };

  const renderScreen = () => {
    switch (screen) {
      case "intro":
        return <IntroScreen onLogWin={() => setScreen("choose")} onViewPast={() => setScreen("history")} />;
      case "choose":
        return <ChooseScreen onNext={handleChoose} />;
      case "reflect":
        return <ReflectScreen onSave={handleReflect} />;
      case "reinforcement":
        return <ReinforcementScreen win={selectedWin} reflection={reflection} onDone={handleDone} onLogAnother={handleLogAnother} />;
      case "history":
        return <HistoryScreen entries={entries} onLogNew={handleLogAnother} onBack={() => setScreen("intro")} />;
    }
  };

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto overflow-hidden relative">
      <LanguageSelector />
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
          className="min-h-screen"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Index;
