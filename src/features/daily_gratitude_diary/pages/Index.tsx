import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PremiumIntro } from "../../../components/shared/PremiumIntro";
import { PremiumComplete } from "../../../components/shared/PremiumComplete";
import ScreenGratitude from "../components/ScreenGratitude";
import ScreenReflection from "../components/ScreenReflection";
import ScreenPastEntries from "../components/ScreenPastEntries";
import { dbRequest } from "../lib/db";
import { Heart, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

interface GratitudeEntry {
  grateful: string;
  reason: string;
}

interface SavedEntry {
  date: string;
  gratitudes: GratitudeEntry[];
  feeling: string;
}

type Screen = "intro" | "gratitude" | "reflection" | "closing" | "past";

const Index = () => {
  const { t } = useTranslation();
  const [screen, setScreen] = useState<Screen>("intro");
  const [currentGratitudes, setCurrentGratitudes] = useState<GratitudeEntry[]>([]);
  const [pastEntries, setPastEntries] = useState<SavedEntry[]>([]);
  const userId = sessionStorage.getItem("user_id");

  useEffect(() => {
    const fetchEntries = async () => {
      if (!userId) return;
      try {
        const rows = await dbRequest<any>(
          "SELECT date, gratitudes, feeling FROM gratitude_diary_entries WHERE user_id = $1 ORDER BY created_at DESC",
          [userId]
        );
        if (rows && Array.isArray(rows)) {
          const formatted = rows.map(row => ({
            ...row,
            gratitudes: typeof row.gratitudes === 'string' ? JSON.parse(row.gratitudes) : row.gratitudes
          }));
          setPastEntries(formatted);
        }
      } catch (err) {
        console.error("Failed to fetch entries:", err);
      }
    };
    fetchEntries();
  }, [userId]);

  const saveEntry = async (feeling: string) => {
    const validGratitudes = currentGratitudes.filter((e) => e.grateful.trim());
    const dateStr = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const entry: SavedEntry = {
      date: dateStr,
      gratitudes: validGratitudes,
      feeling,
    };

    if (userId) {
      try {
        await dbRequest(
          "INSERT INTO gratitude_diary_entries (user_id, date, feeling, gratitudes) VALUES ($1, $2, $3, $4)",
          [userId, dateStr, feeling, JSON.stringify(validGratitudes)]
        );
      } catch (err) {
        console.error("Failed to save entry:", err);
      }
    }

    setPastEntries([entry, ...pastEntries]);
    setScreen("closing");
  };

  return (
    <div className="w-full mx-auto">
      <AnimatePresence mode="wait">
        {screen === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <PremiumIntro
              title={t('app_title')}
              description={t('app_subtitle')}
              onStart={() => setScreen("gratitude")}
              icon={<Heart size={32} />}
              benefits={[
                t('intro_text_1'),
                t('intro_text_2'),
                t('intro_text_3')
              ]}
              duration="3-5 minutes"
            />
          </motion.div>
        )}
        {screen === "gratitude" && (
          <ScreenGratitude
            key="gratitude"
            onContinue={(entries) => {
              setCurrentGratitudes(entries);
              setScreen("reflection");
            }}
            onBack={() => setScreen("intro")}
          />
        )}
        {screen === "reflection" && (
          <ScreenReflection
            key="reflection"
            onSave={saveEntry}
            onBack={() => setScreen("gratitude")}
          />
        )}
        {screen === "closing" && (
          <motion.div
            key="closing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <PremiumComplete
              title="Gratitude Saved"
              message="Reflecting on what you're thankful for is a powerful way to shift your focus to the positive."
              onRestart={() => setScreen("intro")}
              icon={<Sparkles size={48} />}
            >
                <div className="flex justify-center mt-8">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setScreen("past")}
                        className="px-8 py-4 bg-white border-2 border-slate-100 text-slate-600 font-bold rounded-[2rem] shadow-sm"
                    >
                        View Past Entries
                    </motion.button>
                </div>
            </PremiumComplete>
          </motion.div>
        )}
        {screen === "past" && (
          <ScreenPastEntries
            key="past"
            entries={pastEntries}
            onBack={() => setScreen("closing")}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
