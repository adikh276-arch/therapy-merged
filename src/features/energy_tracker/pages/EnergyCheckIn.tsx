import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEnergy, EnergyLevel } from "../context/EnergyContext";
import { useTranslation } from "react-i18next";
import IntroScreen from "../components/IntroScreen";
import { ArrowLeft, Send } from "lucide-react";

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

          <h2 className="mb-10 text-center text-3xl font-extrabold text-slate-900 leading-tight">
            {t("how_is_energy")}
          </h2>

          <div className="grid grid-cols-5 gap-3 w-full">
            {energyOptions.map((opt, i) => {
              const isSelected = currentLevel === opt.level;
              return (
                <motion.button
                  key={opt.level}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setCurrentLevel(opt.level)}
                  className={`flex flex-col items-center justify-center gap-2 rounded-[2rem] border-2 py-6 transition-all shadow-sm ${
                    isSelected
                      ? "bg-primary border-primary text-white shadow-xl shadow-primary/20 scale-105"
                      : "bg-white border-slate-50 text-slate-800 hover:border-primary/20"
                  }`}
                >
                  <span className="text-3xl mb-1">{opt.emoji}</span>
                  <span className={`text-[10px] font-black uppercase tracking-wider opacity-80 ${isSelected ? "text-white" : "text-slate-500"}`}>
                    {opt.label}
                  </span>
                </motion.button>
              );
            })}
          </div>

          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-lg px-6 z-20">
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
    </div>
  );
};


export default EnergyCheckIn;

