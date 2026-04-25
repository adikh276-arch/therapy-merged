import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEnergy, EnergyLevel } from "../context/EnergyContext";
import { useTranslation } from "react-i18next";
import IntroScreen from "../components/IntroScreen";
import { Send } from "lucide-react";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";

const EnergyCheckIn = () => {
  const { currentLevel, setCurrentLevel } = useEnergy();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showIntro, setShowIntro] = useState(true);

  const energyOptions: { level: EnergyLevel; emoji: string; label: string }[] = [
    { level: "very-low", emoji: "😴", label: t("very_low") },
    { level: "low", emoji: "😔", label: t("low") },
    { level: "okay", emoji: "😐", label: t("okay") },
    { level: "good", emoji: "🙂", label: t("good") },
    { level: "high", emoji: "⚡", label: t("high") },
  ];

  return (
    <PremiumLayout 
      title="Energy Check-in" 
      onBack={() => {
        if (window.parent !== window) {
          window.parent.postMessage({ action: 'exit' }, 'https://web.mantracare.com');
        } else {
          window.location.href = 'https://web.mantracare.com';
        }
      }}
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
            <div className="w-full space-y-10">
              <h2 className="text-center text-3xl font-black text-slate-900 leading-tight">
                {t("how_is_energy")}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 w-full">
                {energyOptions.map((opt, i) => {
                  const isSelected = currentLevel === opt.level;
                  return (
                    <motion.button
                      key={opt.level}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => setCurrentLevel(opt.level)}
                      className={`flex flex-col items-center justify-center gap-3 rounded-[2.5rem] border-2 py-8 transition-all shadow-sm ${
                        isSelected
                          ? "bg-primary border-primary text-white shadow-xl shadow-primary/20 scale-105"
                          : "bg-slate-50 border-transparent text-slate-800 hover:bg-white hover:border-primary/20"
                      }`}
                    >
                      <span className="text-4xl mb-1 filter drop-shadow-sm">{opt.emoji}</span>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${isSelected ? "text-white" : "text-slate-400"}`}>
                        {opt.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              <div className="pt-10 pb-12">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!currentLevel}
                  onClick={() => navigate("factors")}
                  className="w-full py-5 rounded-[2rem] bg-primary text-primary-foreground font-black text-lg shadow-xl shadow-primary/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-40"
                >
                  {t("continue")}
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

export default EnergyCheckIn;
