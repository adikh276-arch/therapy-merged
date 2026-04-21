import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import SparkleDecoration from "@/components/SparkleDecoration";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface IntroScreenProps {
  onLogWin: () => void;
  onViewPast: () => void;
}

const stagger = {
  animate: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const IntroScreen: React.FC<IntroScreenProps> = ({ onLogWin, onViewPast }) => {
  const { t } = useTranslation();
  return (
    <motion.div
      className="flex flex-col min-h-screen px-5 py-6"
      variants={stagger}
      initial="initial"
      animate="animate"
    >
      <button className="flex items-center gap-1 text-muted-foreground mb-4 w-fit" onClick={onViewPast}>
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-body">{t('intro_back')}</span>
      </button>

      <motion.h1 variants={fadeUp} className="text-2xl font-heading mb-2">
        {t('intro_title')}
      </motion.h1>

      <motion.div variants={fadeUp}>
        <SparkleDecoration />
      </motion.div>

      <div className="flex-1 space-y-4 mt-4">
        <motion.p variants={fadeUp} className="text-justified text-foreground leading-relaxed">
          {t('intro_p1')}
        </motion.p>
        <motion.p variants={fadeUp} className="text-justified text-foreground leading-relaxed">
          {t('intro_p2')}
        </motion.p>
        <motion.p variants={fadeUp} className="text-justified text-foreground leading-relaxed">
          {t('intro_p3')}
        </motion.p>
      </div>

      <motion.div variants={fadeUp} className="space-y-3 pb-6 mt-8">
        <Button size="lg" className="w-full" onClick={onLogWin}>
          {t('intro_btn_log')}
        </Button>
        <Button size="lg" variant="secondary" className="w-full" onClick={onViewPast}>
          {t('intro_btn_past')}
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default IntroScreen;
