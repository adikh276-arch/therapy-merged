import { useTranslation } from "react-i18next";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundOrbs from "@/features/redraw_your_circle/components/BackgroundOrbs";
import { PROMPTS } from "@/features/redraw_your_circle/lib/circleStore";
import { X, Users, Calendar } from "lucide-react";
import { format } from "date-fns";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { neon } from "@neondatabase/serverless";

const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

interface CircleEntry {
  id: string;
  date: string;
  names: Record<string, string>;
  reflection: string;
}

const BUBBLE_EMOJIS = ["💬", "🤗", "💪", "🎉", "🌟"];

const HistoryScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [entries, setEntries] = useState<CircleEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<CircleEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHistory = useCallback(async () => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId || !DATABASE_URL) return;

    try {
      const sql = neon(DATABASE_URL);
      const results = await sql`SELECT id, circles, created_at FROM redraw_your_circle_entries WHERE user_id = ${userId} ORDER BY created_at DESC LIMIT 50`;
      setEntries(results.map(r => ({
        id: r.id,
        date: r.created_at,
        names: r.circles.names,
        reflection: r.circles.reflection,
      })));
    } catch (error) {
      console.error("Failed to fetch history:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return (
    <PremiumLayout
      title={t("app_title")}
      subtitle={t("your_past_circles")}
      icon={<Users className="w-6 h-6 text-primary" />}
      onBack={() => navigate("../intro", { replace: true })}
    >
      <div className="flex-1 px-6 pb-8 relative z-10">
        <BackgroundOrbs />
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            <p className="text-sm text-slate-500 mt-4">{t("loading_your_history")}</p>
          </div>
        ) : entries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12 py-12 px-6 bg-white/50 backdrop-blur-sm rounded-3xl border border-slate-100"
          >
            <span className="text-4xl block mb-4">📭</span>
            <p className="text-base font-medium text-slate-600">{t("no_entries_yet")}</p>
            <p className="text-sm text-slate-500 mt-1">{t("your_saved_circles_will_appear_here")}</p>
          </motion.div>
        ) : (
          <div className="space-y-4 max-w-sm mx-auto">
            {entries.map((entry, i) => {
              const namesList = Object.values(entry.names);
              return (
                <motion.button
                  key={entry.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedEntry(entry)}
                  className="w-full bg-white/80 backdrop-blur-sm rounded-[2rem] p-6 text-left hover:shadow-lg hover:shadow-primary/5 transition-all border border-slate-100 shadow-sm"
                >
                  <div className="flex items-center gap-2 text-slate-400 mb-2">
                    <Calendar size={14} />
                    <p className="text-xs font-bold uppercase tracking-wider">
                      {format(new Date(entry.date), "MMM d, yyyy")}
                    </p>
                  </div>
                  <p className="text-base font-bold text-slate-800 line-clamp-1">
                    {namesList.length > 0
                      ? namesList.join(", ")
                      : "No names added"}
                  </p>
                  {entry.reflection && (
                    <p className="text-sm text-slate-500 mt-2 line-clamp-2 italic">
                      "{entry.reflection}"
                    </p>
                  )}
                </motion.button>
              );
            })}
          </div>
        )}
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selectedEntry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm flex items-end justify-center z-50 px-4"
            onClick={() => setSelectedEntry(null)}
          >
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-t-3xl w-full max-w-md p-6 pb-12 shadow-2xl max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6 sticky top-0 bg-white py-2 z-10">
                <h3 className="text-lg font-bold text-slate-800">
                  Circle from {format(new Date(selectedEntry.date), "MMM d, yyyy")}
                </h3>
                <button
                  onClick={() => setSelectedEntry(null)}
                  className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="space-y-4">
                {PROMPTS.map((prompt, i) => {
                  const name = selectedEntry.names[String(i)];
                  return (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <span className="text-2xl mt-0.5">{BUBBLE_EMOJIS[i]}</span>
                      <div>
                        <p className="text-base font-bold text-slate-800">
                          {name || "—"}
                        </p>
                        <p className="text-xs text-slate-500 font-medium">
                          {prompt}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {selectedEntry.reflection && (
                <div className="mt-6 p-6 bg-primary/5 rounded-3xl border border-primary/10">
                  <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
                    💭 Reflection
                  </p>
                  <p className="text-base text-slate-700 leading-relaxed italic">
                    "{selectedEntry.reflection}"
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PremiumLayout>
  );
};

export default HistoryScreen;
