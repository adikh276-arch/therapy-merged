import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import ScreenIntro from "./screens/ScreenIntro";
import ScreenUrgeLevel from "./screens/ScreenUrgeLevel";
import ScreenTriggers from "./screens/ScreenTriggers";
import ScreenContext from "./screens/ScreenContext";
import ScreenEmotion from "./screens/ScreenEmotion";
import ScreenSummary from "./screens/ScreenSummary";
import ScreenPatterns from "./screens/ScreenPatterns";
import ScreenHistory from "./screens/ScreenHistory";
import { saveEntry } from "./triggerStorage";
import { query, initSchema } from "@/lib/db";

export interface TriggerData {
  urgeLevel: number;
  triggers: string[];
  location: string;
  activity: string;
  emotions: string[];
}

const TriggerDetective = () => {
  const [step, setStep] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [data, setData] = useState<TriggerData>({
    urgeLevel: 5,
    triggers: [],
    location: "",
    activity: "",
    emotions: [],
  });

  const next = () => setStep((s) => s + 1);
  // User requested: "the back button should take to activity home page only"
  const backToStart = () => {
    setStep(0);
    setIsSaved(false);
  };

  const updateData = (partial: Partial<TriggerData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  };

  const handleSaveEntry = async () => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId) {
      console.warn("No user_id found in session, using local storage fallback");
      saveEntry(data);
      setIsSaved(true);
      return;
    }

    try {
      // 1. Save entry to trigger_entries
      const entryRes = await query(
        "INSERT INTO trigger_entries (user_id, urge_level, location, activity) VALUES ($1, $2, $3, $4) RETURNING id",
        [userId, data.urgeLevel, data.location, data.activity]
      );
      const entryId = entryRes.rows[0].id;

      // 2. Save triggers
      for (const t of data.triggers) {
        await query("INSERT INTO entry_triggers (entry_id, trigger_name) VALUES ($1, $2)", [entryId, t]);
      }

      // 3. Save emotions
      for (const e of data.emotions) {
        await query("INSERT INTO entry_emotions (entry_id, emotion_name) VALUES ($1, $2)", [entryId, e]);
      }

      setIsSaved(true);
      // Also save to local storage as fallback/history sync if needed
      saveEntry(data);
    } catch (error) {
      console.error("Database save failed:", error);
      // Fallback to local storage
      saveEntry(data);
      setIsSaved(true);
    }
  };

  const screens = [
    <ScreenIntro key="intro" onNext={next} onBack={backToStart} />,
    <ScreenUrgeLevel key="urge" data={data} updateData={updateData} onNext={next} onBack={backToStart} />,
    <ScreenTriggers key="triggers" data={data} updateData={updateData} onNext={next} onBack={backToStart} />,
    <ScreenContext key="context" data={data} updateData={updateData} onNext={next} onBack={backToStart} />,
    <ScreenEmotion key="emotion" data={data} updateData={updateData} onNext={next} onBack={backToStart} />,
    <ScreenSummary key="summary" data={data} isSaved={isSaved} onNext={next} onBack={backToStart} onSave={handleSaveEntry} />,
    <ScreenPatterns key="patterns" data={data} onBack={backToStart} onViewHistory={() => setStep(7)} />,
    <ScreenHistory key="history" onBack={backToStart} />,
  ];

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        <div key={step}>
          {screens[step]}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default TriggerDetective;
