import React, { useState, useCallback } from "react";
import { SelfCareEntry, saveEntryToDb, toLocalIsoDate } from "@/lib/selfcare-data";
import Screen1CheckIn from "@/components/screens/Screen1CheckIn";
import Screen2Activities from "@/components/screens/Screen2Activities";
import Screen2bDuration from "@/components/screens/Screen2bDuration";
import Screen3NoSelfCare from "@/components/screens/Screen3NoSelfCare";
import Screen4Mood from "@/components/screens/Screen4Mood";
import Screen5Statement from "@/components/screens/Screen5Statement";
import Screen6Review from "@/components/screens/Screen6Review";
import Screen7History from "@/components/screens/Screen7History";
import { useAuth } from "@/components/AuthProvider";

type Screen = "checkin" | "activities" | "duration" | "noSelfCare" | "mood" | "statement" | "review" | "history";

const Index = () => {
  const { userId } = useAuth();
  const [screen, setScreen] = useState<Screen>("checkin");
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

  switch (screen) {
    case "checkin":
      return <Screen1CheckIn date={date} onDateChange={handleDateChange} onContinue={handleCheckIn} />;
    case "activities":
      return <Screen2Activities onContinue={handleActivities} />;
    case "duration":
      return <Screen2bDuration onContinue={handleDuration} />;
    case "noSelfCare":
      return <Screen3NoSelfCare onContinue={handleNoSelfCare} />;
    case "mood":
      return <Screen4Mood onContinue={handleMood} />;
    case "statement":
      return <Screen5Statement didSelfCare={entry.didSelfCare!} onContinue={handleStatementContinue} />;
    case "review":
      return <Screen6Review entry={entry} onEdit={resetFlow} onHistory={() => setScreen("history")} onHome={resetFlow} />;
    case "history":
      return <Screen7History onBack={() => setScreen("review")} />;
  }
};

export default Index;
