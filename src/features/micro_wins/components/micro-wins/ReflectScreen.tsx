import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface ReflectScreenProps {
  onSave: (reflection: string) => void;
}

const fadeUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.12 } },
};

const ReflectScreen: React.FC<ReflectScreenProps> = ({ onSave }) => {
  const { t } = useTranslation();
  const [reflection, setReflection] = useState("");

  return (
    <motion.div
      className="flex flex-col min-h-screen px-5 py-6"
      variants={stagger}
      initial="initial"
      animate="animate"
    >
      <motion.h1 variants={fadeUp} className="text-2xl font-heading mb-3">
        {t('reflect_title')}
      </motion.h1>

      <div className="space-y-3 mb-6">
        <motion.p variants={fadeUp} className="text-justified text-foreground leading-relaxed">
          {t('reflect_p1')}
        </motion.p>
        <motion.p variants={fadeUp} className="text-justified text-foreground leading-relaxed">
          {t('reflect_p2')}
        </motion.p>
      </div>

      <motion.div variants={fadeUp} className="flex-1">
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder={t('reflect_placeholder')}
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-input bg-card text-foreground text-sm font-body resize-none focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
        />
      </motion.div>

      <motion.div variants={fadeUp} className="pb-6 mt-6">
        <Button size="lg" className="w-full" onClick={() => onSave(reflection)}>
          {t('reflect_save')}
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default ReflectScreen;
