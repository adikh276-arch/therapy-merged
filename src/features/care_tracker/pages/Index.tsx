import React, { useState, useCallback } from "react";
import { SelfCareEntry, saveEntryToDb, toLocalIsoDate } from "../lib/selfcare-data";
import Screen1CheckIn from "../components/screens/Screen1CheckIn";
import Screen2Activities from "../components/screens/Screen2Activities";
import Screen2bDuration from "../components/screens/Screen2bDuration";
import Screen3NoSelfCare from "../components/screens/Screen3NoSelfCare";
import Screen4Mood from "../components/screens/Screen4Mood";
import Screen5Statement from "../components/screens/Screen5Statement";
import Screen6Review from "../components/screens/Screen6Review";
import Screen7History from "../components/screens/Screen7History";
import IntroScreen from "../components/screens/IntroScreen";
import { useAuth } from "../components/AuthProvider";
import { AnimatePresence, motion } from "framer-motion";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";

type Screen = "intro" | "checkin" | "activities" | "duration" | "noSelfCare" | "mood" | "statement" | "review" | "history";

const Index = () => {
  const { userId } = useAuth();
  const [screen, setScreen] = useState<Screen>("intro");

  const [date, setDate] = useState(new Date());
  const [entry, setEntry] = useState<SelfCareEntry>({
    date: toLocalIsoDate(new Date()),
    didSelfCare: null,
    activities: [],
    duration: "",
    preventionReasons: [],
    helpfulType: "",
    mood: "",
    moodEmoji: "",
  });

  const resetFlow = useCallback(() => {
    const today = new Date();
    setDate(today);
    setEntry({
      date: toLocalIsoDate(today),
      didSelfCare: null,
      activities: [],
      duration: "",
      preventionReasons: [],
      helpfulType: "",
      mood: "",
      moodEmoji: "",
    });
    setScreen("checkin");
  }, []);

  const handleDateChange = (d: Date) => {
    setDate(d);
    setEntry((prev) => ({ ...prev, date: toLocalIsoDate(d) }));
  };

  const handleCheckIn = (didSelfCare: boolean) => {
    setEntry((prev) => ({ ...prev, didSelfCare }));
    setScreen(didSelfCare ? "activities" : "noSelfCare");
  };

  const handleActivities = (activities: string[]) => {
    setEntry((prev) => ({ ...prev, activities }));
    setScreen("duration");
  };

  const handleDuration = (duration: string) => {
    setEntry((prev) => ({ ...prev, duration }));
    setScreen("mood");
  };

  const handleNoSelfCare = (reasons: string[], helpfulType: string) => {
    setEntry((prev) => ({ ...prev, preventionReasons: reasons, helpfulType }));
    setScreen("mood");
  };

  const handleMood = (mood: string, emoji: string) => {
    setEntry((prev) => ({ ...prev, mood, moodEmoji: emoji }));
    setScreen("statement");
  };

  const handleStatementContinue = async () => {
    if (userId) {
      await saveEntryToDb(userId, entry);
    }
    setScreen("review");
  };

  const getTitle = () => {
    switch(screen) {
      case 'history': return "Self-Care Journey";
      case 'review': return "Session Review";
      default: return "Self-Care Tracker";
    }
  };

  return (
    <PremiumLayout 
      title={getTitle()} 
      onBack={() => {
        if (window.parent !== window) {
          window.parent.postMessage({ action: 'exit' }, 'https://web.mantracare.com');
        } else {
          window.location.href = 'https://web.mantracare.com';
        }
      }}
      onReset={screen !== 'intro' ? resetFlow : undefined}
      onSecondaryBack={screen === 'history' ? () => setScreen('review') : undefined}
      secondaryBackLabel={screen === 'history' ? "Back to Review" : undefined}
    >
      <div className="w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {screen === "intro" && <IntroScreen onStart={() => setScreen("checkin")} />}
            {screen === "checkin" && (
              <Screen1CheckIn date={date} onDateChange={handleDateChange} onContinue={handleCheckIn} />
            )}
            {screen === "activities" && <Screen2Activities onContinue={handleActivities} />}
            {screen === "duration" && <Screen2bDuration onContinue={handleDuration} />}
            {screen === "noSelfCare" && <Screen3NoSelfCare onContinue={handleNoSelfCare} />}
            {screen === "mood" && <Screen4Mood onContinue={handleMood} />}
            {screen === "statement" && (
              <Screen5Statement didSelfCare={entry.didSelfCare!} onContinue={handleStatementContinue} />
            )}
            {screen === "review" && (
              <Screen6Review entry={entry} onEdit={resetFlow} onHistory={() => setScreen("history")} onHome={resetFlow} />
            )}
            {screen === "history" && <Screen7History onBack={() => setScreen("review")} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
};

export default Index;
