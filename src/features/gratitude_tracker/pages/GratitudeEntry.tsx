import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { todayISO } from "../lib/gratitudeStore";
import IntroScreen from "../components/IntroScreen";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";

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

  return (
    <PremiumLayout 
      title="Gratitude Journal" 
      onReset={!showIntro ? () => setShowIntro(true) : undefined}
    >
      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <IntroScreen onStart={() => setShowIntro(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="entry"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="flex flex-col items-center"
          >
            <div className="w-full space-y-8">
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">
                    {t("gratitude.item1.label")} <span className="text-primary">*</span>
                  </label>
                  <textarea
                    value={gratitude1}
                    onChange={(e) => setGratitude1(e.target.value)}
                    placeholder={t("gratitude.item1.placeholder")}
                    rows={4}
                    className="w-full bg-slate-50 border-2 border-transparent rounded-[2rem] px-6 py-5 text-base focus:bg-white focus:border-primary/20 outline-none transition-all resize-none shadow-sm font-medium text-slate-700"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">
                    {t("gratitude.item2.label")} <span className="text-slate-300 text-[10px] font-normal">({t("gratitude.optional")})</span>
                  </label>
                  <textarea
                    value={gratitude2}
                    onChange={(e) => setGratitude2(e.target.value)}
                    placeholder={t("gratitude.item2.placeholder")}
                    rows={4}
                    className="w-full bg-slate-50 border-2 border-transparent rounded-[2rem] px-6 py-5 text-base focus:bg-white focus:border-primary/20 outline-none transition-all resize-none shadow-sm font-medium text-slate-700"
                  />
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleContinue}
                  disabled={!canContinue}
                  className="w-full py-5 rounded-[2rem] bg-primary text-primary-foreground font-black text-lg shadow-xl shadow-primary/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-40 disabled:shadow-none"
                >
                  {t("common.continue")}
                  <Send size={20} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PremiumLayout>
  );
};

export default GratitudeEntry;
