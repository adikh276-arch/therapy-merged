import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { getAllEntries, GratitudeEntry as GEntry } from "../lib/gratitudeStore";
import { format } from "date-fns";
import { PremiumComplete } from "../../../components/shared/PremiumComplete";
import { Edit2, History as HistoryIcon, Calendar, Loader2 } from "lucide-react";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";

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
  }, [entryId, entryDate, navigate, isLoading]);

  if (isLoading) {
    return (
      <PremiumLayout title="Session Saved">
        <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary opacity-20" />
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Loading entry...</p>
        </div>
      </PremiumLayout>
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
    <PremiumLayout title="Session Saved">
      <PremiumComplete
        title={t("review.heading")}
        message="Your thoughts have been preserved. Gratitude is a powerful tool for happiness."
        onRestart={() => navigate("..")}
      >
        <div className="space-y-6 w-full max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] border-2 border-slate-100 p-8 shadow-sm text-left space-y-6"
          >
            <div className="flex items-center justify-between border-b border-slate-50 pb-6">
              <div className="flex items-center gap-3 text-slate-500">
                <div className="p-2 bg-slate-50 rounded-xl">
                  <Calendar size={18} />
                </div>
                <span className="text-xs font-black uppercase tracking-widest">{formattedDate}</span>
              </div>
              <div className="flex items-center gap-3 bg-primary/10 text-primary px-4 py-2 rounded-2xl">
                <span className="text-2xl filter drop-shadow-sm">{entry.mood.emoji}</span>
                <span className="text-xs font-black uppercase tracking-widest">{t(`mood.${entry.mood.label.toLowerCase()}`)}</span>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">{t("review.gratitude1")}</p>
                <p className="text-slate-700 font-bold text-lg leading-relaxed">{entry.gratitude1}</p>
              </div>
              {entry.gratitude2 && (
                <div>
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">{t("review.gratitude2")}</p>
                  <p className="text-slate-700 font-bold text-lg leading-relaxed">{entry.gratitude2}</p>
                </div>
              )}
            </div>
          </motion.div>

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleEdit}
              className="flex-1 py-4 bg-slate-100 text-slate-600 font-black text-xs uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-200 transition-all"
            >
              <Edit2 size={16} />
              {t("review.edit")}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("../history")}
              className="flex-1 py-4 bg-white border-2 border-slate-100 text-slate-500 font-black text-xs uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
            >
              <HistoryIcon size={16} />
              {t("review.history")}
            </motion.button>
          </div>
        </div>
      </PremiumComplete>
    </PremiumLayout>
  );
};

export default ReviewEntry;
