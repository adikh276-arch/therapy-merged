import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { getAllEntries, GratitudeEntry as GEntry } from "../lib/gratitudeStore";
import { format } from "date-fns";
import { PremiumComplete } from "../../../components/shared/PremiumComplete";
import { Edit2, History as HistoryIcon, Calendar, Heart } from "lucide-react";

const ReviewEntry = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { entryId, entryDate } = (location.state as any) || {};
  const [entry, setEntry] = useState<GEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEntry = async () => {
      const entries = await getAllEntries();
      const found = entryId 
        ? entries.find((e) => e.id === entryId) || entries.find((e) => e.date === entryDate)
        : entries.find((e) => e.date === entryDate);
      setEntry(found || null);
      setIsLoading(false);
      if (!found && !isLoading) {
        navigate("..");
      }
    };
    fetchEntry();
  }, [entryId, entryDate, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!entry) return null;

  const formattedDate = format(new Date(entry.date + "T00:00:00"), "MMMM d, yyyy");

  const handleEdit = () => {
    navigate("..", {
      state: {
        editId: entry.id,
        gratitude1: entry.gratitude1,
        gratitude2: entry.gratitude2,
      },
    });
  };

  return (
    <PremiumComplete
      title={t("review.heading")}
      message="Your thoughts have been preserved. Gratitude is a powerful tool for happiness."
      onRestart={() => navigate("..")}
    >
      <div className="space-y-4 w-full max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border-2 border-slate-100 p-6 shadow-sm text-left space-y-4"
        >
          <div className="flex items-center justify-between border-b border-slate-50 pb-4">
            <div className="flex items-center gap-2 text-slate-500">
               <Calendar size={16} />
               <span className="text-xs font-bold uppercase tracking-wider">{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full">
               <span className="text-lg">{entry.mood.emoji}</span>
               <span className="text-xs font-bold">{t(`mood.${entry.mood.label.toLowerCase()}`)}</span>
            </div>
          </div>

          <div className="space-y-4">
             <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t("review.gratitude1")}</p>
                <p className="text-slate-700 font-medium leading-relaxed">{entry.gratitude1}</p>
             </div>
             {entry.gratitude2 && (
               <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t("review.gratitude2")}</p>
                  <p className="text-slate-700 font-medium leading-relaxed">{entry.gratitude2}</p>
               </div>
             )}
          </div>
        </motion.div>

        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleEdit}
            className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-200 transition-all"
          >
            <Edit2 size={18} />
            {t("review.edit")}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("../history")}
            className="flex-1 py-4 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
          >
            <HistoryIcon size={18} />
            {t("review.history")}
          </motion.button>
        </div>
      </div>
    </PremiumComplete>
  );
};

export default ReviewEntry;
