import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PremiumIntro } from "../../../components/shared/PremiumIntro";
import { PremiumComplete } from "../../../components/shared/PremiumComplete";
import ScreenGratitude from "../components/ScreenGratitude";
import ScreenReflection from "../components/ScreenReflection";
import ScreenPastEntries from "../components/ScreenPastEntries";
import { dbRequest } from "../lib/db";
import { Heart, Sparkles, Book } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";

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
          const formatted = rows.map((row: any) => ({
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

  const resetFlow = () => {
    setScreen("intro");
    setCurrentGratitudes([]);
  };

  const screenOrder: Screen[] = ["intro", "gratitude", "reflection", "closing"];
  const currentIdx = screenOrder.indexOf(screen);

  return (
    <PremiumLayout 
      title="Gratitude Diary" 
      subtitle={t(`screen.${screen}.title`, { defaultValue: "Journaling" })}
      icon={<Heart className="w-6 h-6 text-primary" />}
      onBack={currentIdx > 0 && screen !== 'closing' ? () => setScreen(screenOrder[currentIdx - 1]) : undefined}
      onReset={currentIdx > 0 && screen !== 'closing' ? resetFlow : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[70vh]" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif' }}>
        {screen !== 'closing' && screen !== 'past' && (
          <div className="flex justify-center gap-2 mb-10">
            {screenOrder.slice(0, 3).map((s, i) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-500 ${i <= currentIdx ? "w-8 bg-primary" : "w-2 bg-slate-100"}`}
              />
            ))}
          </div>
        )}

        <div className="relative flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            {screen === "intro" && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full flex-1 flex flex-col"
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
                >
                  <div className="mt-10 flex justify-center">
                      <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setScreen("past")}
                          className="flex items-center gap-3 text-slate-400 hover:text-primary font-black text-xs uppercase tracking-[0.2em] transition-all bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100 shadow-sm"
                      >
                          <Book size={18} />
                          View Past Entries
                      </motion.button>
                  </div>
                </PremiumIntro>
              </motion.div>
            )}
            {screen === "gratitude" && (
              <motion.div
                key="gratitude"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full flex-1 flex flex-col"
              >
                <ScreenGratitude
                  onContinue={(entries) => {
                    setCurrentGratitudes(entries);
                    setScreen("reflection");
                  }}
                  onBack={() => setScreen("intro")}
                />
              </motion.div>
            )}
            {screen === "reflection" && (
              <motion.div
                key="reflection"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full flex-1 flex flex-col"
              >
                <ScreenReflection
                  onSave={saveEntry}
                  onBack={() => setScreen("gratitude")}
                />
              </motion.div>
            )}
            {screen === "closing" && (
              <motion.div
                key="closing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full flex-1 flex flex-col"
              >
                <PremiumComplete
                  title="Gratitude Saved"
                  message="Reflecting on what you're thankful for is a powerful way to shift your focus to the positive."
                  onRestart={resetFlow}
                  icon={<Sparkles size={48} />}
                >
                    <div className="flex justify-center mt-10">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setScreen("past")}
                            className="px-10 py-5 bg-white border-2 border-slate-100 text-slate-400 font-black text-sm uppercase tracking-widest rounded-[2rem] shadow-xl shadow-slate-200/50 hover:text-slate-900 hover:border-slate-200 transition-all flex items-center gap-3"
                        >
                            <Book size={18} />
                            View History
                        </motion.button>
                    </div>
                </PremiumComplete>
              </motion.div>
            )}
            {screen === "past" && (
              <motion.div
                key="past"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full flex-1 flex flex-col"
              >
                <ScreenPastEntries
                  entries={pastEntries}
                  onBack={() => setScreen(currentGratitudes.length > 0 ? "closing" : "intro")}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PremiumLayout>
  );
};

export default Index;
