import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MOODS, MoodOption, saveEntry, todayISO } from "../lib/gratitudeStore";
import { v4 } from "../lib/uid";
import { Check, Loader2 } from "lucide-react";

const premiumTints = [
  "bg-emerald-50 border-emerald-100 text-emerald-700",
  "bg-cyan-50 border-cyan-100 text-cyan-700",
  "bg-slate-50 border-slate-100 text-slate-700",
  "bg-blue-50 border-blue-100 text-blue-700",
  "bg-rose-50 border-rose-100 text-rose-700",
];

const MoodSelection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { gratitude1, gratitude2, date, editId } = (location.state as any) || {};
  const [selected, setSelected] = useState<MoodOption | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  if (!gratitude1) {
    navigate("..");
    return null;
  }

  const handleSave = async () => {
    if (!selected || isSaving) return;
    setIsSaving(true);
    try {
      const entry = {
        id: editId || v4(),
        date: date || todayISO(),
        gratitude1,
        gratitude2: gratitude2 || undefined,
        mood: selected,
      };
      await saveEntry(entry);
      navigate("../review", { state: { entryId: entry.id, entryDate: entry.date } });
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col items-center py-6 pb-24">
      <div className="w-full max-w-lg space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
            {t("mood.heading")}
          </h1>
          <p className="text-slate-500 text-sm">
            {t("mood.subheading")}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4">
          {MOODS.map((mood, i) => {
            const isSelected = selected?.label === mood.label;
            return (
              <motion.button
                key={mood.label}
                onClick={() => setSelected(mood)}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`w-full flex items-center justify-between px-6 py-5 rounded-[2rem] border-2 transition-all duration-300 group ${
                  isSelected 
                    ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20" 
                    : `${premiumTints[i]} border-transparent`
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl filter drop-shadow-sm group-hover:scale-110 transition-transform">{mood.emoji}</span>
                  <span className={`text-lg font-bold ${isSelected ? "text-primary-foreground" : "text-slate-800"}`}>
                    {t(`mood.${mood.label.toLowerCase()}`)}
                  </span>
                </div>
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
                    >
                      <Check size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-lg px-6 z-20">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={!selected || isSaving}
            className="w-full py-5 rounded-[2rem] bg-primary text-primary-foreground font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-40 disabled:shadow-none"
          >
            {isSaving ? (
              <>
                <Loader2 size={24} className="animate-spin" />
                {t("mood.saving", "Saving...")}
              </>
            ) : (
              <>
                {t("mood.save")}
                <Check size={20} />
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default MoodSelection;
