import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";



interface ChooseScreenProps {
  onNext: (win: string) => void;
}

const stagger = {
  animate: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const ChooseScreen: React.FC<ChooseScreenProps> = ({ onNext }) => {
  const { t } = useTranslation();
  const WIN_OPTIONS = [
    { label: t("choose_opt_1"), emoji: "💪" },
    { label: t("choose_opt_2"), emoji: "🧘" },
    { label: t("choose_opt_3"), emoji: "🚶" },
    { label: t("choose_opt_4"), emoji: "💧" },
    { label: t("choose_opt_5"), emoji: "✅" },
    { label: t("choose_opt_6"), emoji: "💬" },
    { label: t("choose_opt_7"), emoji: "🎯" },
    { label: t("choose_opt_8"), emoji: "🛡️" },
  ];

  const [selected, setSelected] = useState<string | null>(null);
  const [customWin, setCustomWin] = useState("");
  const [showCustom, setShowCustom] = useState(false);

  const handleNext = () => {
    const win = showCustom ? customWin : selected;
    if (win) onNext(win);
  };

  return (
    <motion.div
      className="flex flex-col min-h-screen px-5 py-6"
      variants={stagger}
      initial="initial"
      animate="animate"
    >
      <motion.h1 variants={fadeUp} className="text-2xl font-heading mb-3">
        {t('choose_title')}
      </motion.h1>

      <div className="space-y-3 mb-4">
        <motion.p variants={fadeUp} className="text-justified text-foreground leading-relaxed">
          {t('choose_p1')}
        </motion.p>
        <motion.p variants={fadeUp} className="text-justified text-foreground leading-relaxed">
          {t('choose_p2')}
        </motion.p>
      </div>

      <motion.div className="flex-1 space-y-2" variants={stagger}>
        {WIN_OPTIONS.map((option) => (
          <motion.button
            key={option.label}
            variants={fadeUp}
            whileTap={{ scale: 0.97 }}
            onClick={() => { setSelected(option.label); setShowCustom(false); }}
            className={`w-full text-left px-4 py-3 rounded-full border transition-all text-sm font-body
              ${selected === option.label && !showCustom
                ? "bg-secondary border-primary text-foreground shadow-sm"
                : "bg-card border-primary/30 text-foreground hover:border-primary/60"
              }`}
          >
            {option.emoji} {option.label}
          </motion.button>
        ))}

        <motion.div variants={fadeUp}>
          {!showCustom ? (
            <button
              onClick={() => { setShowCustom(true); setSelected(null); }}
              className="w-full text-left px-4 py-3 rounded-full border border-dashed border-primary/40 text-muted-foreground text-sm font-body hover:border-primary/60 transition-all"
            >
              {t('choose_add_own')}
            </button>
          ) : (
            <input
              autoFocus
              value={customWin}
              onChange={(e) => setCustomWin(e.target.value)}
              placeholder={t('choose_custom_placeholder')}
              className="w-full px-4 py-3 rounded-full border border-primary bg-card text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring"
            />
          )}
        </motion.div>
      </motion.div>

      <motion.div variants={fadeUp} className="pb-6 mt-6">
        <Button
          size="lg"
          className="w-full"
          onClick={handleNext}
          disabled={!selected && (!showCustom || !customWin.trim())}
        >
          {t('choose_next')}
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default ChooseScreen;
