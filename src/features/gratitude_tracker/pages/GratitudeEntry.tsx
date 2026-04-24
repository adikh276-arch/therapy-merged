import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Send, ArrowLeft } from "lucide-react";
import { todayISO } from "../lib/gratitudeStore";
import IntroScreen from "../components/IntroScreen";

const GratitudeEntry = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const editState = location.state as any;
  
  const [showIntro, setShowIntro] = useState(!editState);
  const [gratitude1, setGratitude1] = useState(editState?.gratitude1 || "");
  const [gratitude2, setGratitude2] = useState(editState?.gratitude2 || "");

  const canContinue = gratitude1.trim().length > 0;

  const handleContinue = () => {
    if (!canContinue) return;
    navigate("mood", {
      state: {
        gratitude1: gratitude1.trim(),
        gratitude2: gratitude2.trim() || undefined,
        date: todayISO(),
        editId: editState?.editId,
      },
    });
  };

  if (showIntro) {
    return <IntroScreen onStart={() => setShowIntro(false)} />;
  }

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center py-6 pb-24"
      >
        <div className="w-full max-w-lg space-y-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowIntro(true)}
            className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-2"
          >
            <ArrowLeft size={14} />
            Back to intro
          </motion.button>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <label className="text-sm font-bold text-slate-700 ml-1">
                {t("gratitude.item1.label")} <span className="text-primary">*</span>
              </label>
              <textarea
                value={gratitude1}
                onChange={(e) => setGratitude1(e.target.value)}
                placeholder={t("gratitude.item1.placeholder")}
                rows={4}
                className="w-full bg-white border border-slate-200 rounded-[2rem] px-6 py-5 text-base focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all resize-none shadow-sm"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-3"
            >
              <label className="text-sm font-bold text-slate-700 ml-1">
                {t("gratitude.item2.label")} <span className="text-slate-400 text-xs font-normal">({t("gratitude.optional")})</span>
              </label>
              <textarea
                value={gratitude2}
                onChange={(e) => setGratitude2(e.target.value)}
                placeholder={t("gratitude.item2.placeholder")}
                rows={4}
                className="w-full bg-white border border-slate-200 rounded-[2rem] px-6 py-5 text-base focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all resize-none shadow-sm"
              />
            </motion.div>
          </div>

          {/* Action Button */}
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-lg px-6 z-20">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleContinue}
              disabled={!canContinue}
              className="w-full py-5 rounded-[2rem] bg-primary text-primary-foreground font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-40 disabled:shadow-none"
            >
              {t("common.continue")}
              <Send size={20} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};


export default GratitudeEntry;

