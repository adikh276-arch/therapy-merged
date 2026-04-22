import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEnergy, EnergyLevel } from "../context/EnergyContext";
import { useTranslation } from "react-i18next";
import TopBar from "../components/TopBar";

const EnergyCheckIn = () => {
  const { currentLevel, setCurrentLevel } = useEnergy();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const energyOptions: { level: EnergyLevel; emoji: string; label: string }[] = [
    { level: "very-low", emoji: "😴", label: t("very_low") },
    { level: "low", emoji: "😔", label: t("low") },
    { level: "okay", emoji: "😐", label: t("okay") },
    { level: "good", emoji: "🙂", label: t("good") },
    { level: "high", emoji: "⚡", label: t("high") },
  ];

  return (
    <div className="flex min-h-[100dvh] flex-col bg-transparent">
      <TopBar title={t("app_title")} showCalendar />

      <main className="flex flex-1 flex-col items-center px-6 pt-6 max-w-xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center text-2xl font-bold text-slate-900"
        >
          {t("how_is_energy")}
        </motion.h2>

        <div className="flex w-full justify-between gap-2">
          {energyOptions.map((opt, i) => {
            const isSelected = currentLevel === opt.level;
            return (
              <motion.button
                key={opt.level}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setCurrentLevel(opt.level)}
                className={`flex flex-col items-center gap-2 rounded-2xl border p-3 transition-all ${isSelected
                    ? "energy-glow scale-110 border-primary/30 bg-transparent"
                    : "border-border bg-card hover:border-primary/20 hover:bg-secondary"
                  }`}
              >
                <span className="text-4xl">{opt.emoji}</span>
                {isSelected && (
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs font-semibold text-primary"
                  >
                    {opt.label}
                  </motion.span>
                )}
              </motion.button>
            );
          })}
        </div>
      </main>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-xl px-6 pb-8 pt-4 bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <button
          disabled={!currentLevel}
          onClick={() => navigate("factors")}
          className="w-full rounded-pill bg-[#1e88e5] py-4 text-base font-bold text-white transition-all disabled:opacity-40"
        >
          {t("continue")}
        </button>
      </div>
    </div>
  );
};

export default EnergyCheckIn;
