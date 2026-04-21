import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface ReinforcementScreenProps {
  win: string;
  reflection: string;
  onDone: () => void;
  onLogAnother: () => void;
}

const CelebrationSparkles: React.FC = () => (
  <div className="relative w-full h-24 flex items-center justify-center">
    {[0, 0.3, 0.6, 0.9, 1.2].map((delay, i) => {
      const positions = [
        "top-0 left-1/4",
        "top-2 right-1/4",
        "bottom-0 left-1/3",
        "top-4 right-1/3",
        "bottom-2 left-1/2",
      ];
      return (
        <motion.div
          key={i}
          className={`absolute ${positions[i]}`}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 2, delay: delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 24 24" fill="none" className={`${i % 2 === 0 ? 'w-5 h-5 text-primary' : 'w-4 h-4 text-secondary'}`}>
            <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="currentColor" />
          </svg>
        </motion.div>
      );
    })}
  </div>
);

const fadeUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.12 } },
};

const ReinforcementScreen: React.FC<ReinforcementScreenProps> = ({
  win,
  reflection,
  onDone,
  onLogAnother,
}) => {
  const { t } = useTranslation();
  return (
    <motion.div
      className="flex flex-col min-h-screen px-5 py-6"
      variants={stagger}
      initial="initial"
      animate="animate"
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <CelebrationSparkles />
        <h1 className="text-2xl font-heading mb-3 text-center">{t('reinf_title')}</h1>
      </motion.div>

      <div className="space-y-3 mb-6">
        <motion.p variants={fadeUp} className="text-justified text-foreground leading-relaxed">
          {t('reinf_p1')}
        </motion.p>
        <motion.p variants={fadeUp} className="text-justified text-foreground leading-relaxed">
          {t('reinf_p2')}
        </motion.p>
        <motion.p variants={fadeUp} className="text-justified text-foreground leading-relaxed">
          {t('reinf_p3')}
        </motion.p>
      </div>

      <motion.div variants={fadeUp} className="bg-card rounded-xl p-4 shadow-sm border border-border mb-4">
        <p className="text-sm text-muted-foreground mb-1">{t('reinf_log_title')}</p>
        <p className="font-heading font-bold text-foreground">{win}</p>
        {reflection && (
          <>
            <p className="text-sm text-muted-foreground mt-3 mb-1">{t('reinf_refl_title')}</p>
            <p className="text-sm text-foreground italic">"{reflection}"</p>
          </>
        )}
      </motion.div>

      <div className="flex-1" />

      <motion.div variants={fadeUp} className="space-y-3 pb-6">
        <Button size="lg" className="w-full" onClick={onDone}>
          Return Home 🏠
        </Button>
        <Button size="lg" variant="secondary" className="w-full" onClick={onLogAnother}>
          {t('reinf_log_another')}
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default ReinforcementScreen;
