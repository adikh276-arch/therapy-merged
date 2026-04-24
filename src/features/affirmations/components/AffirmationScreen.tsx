import React, { useState, useEffect } from "react";
import { feelings } from "../data/affirmations";
import { ChevronLeft, ChevronRight, Check, RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

const premiumTints = [
  "bg-primary/5 border-primary/20",
  "bg-cyan-50 border-cyan-100",
  "bg-blue-50 border-blue-100",
  "bg-emerald-50 border-emerald-100",
  "bg-sky-50 border-sky-100",
  "bg-teal-50 border-teal-100",
];

interface AffirmationScreenProps {
  feelingId: string;
  colorIndex: number;
  onChooseAnother: () => void;
  onFinish: () => void;
}

const AffirmationScreen: React.FC<AffirmationScreenProps> = ({
  feelingId,
  colorIndex,
  onChooseAnother,
  onFinish
}) => {
  const { t } = useTranslation();
  const tintClass = premiumTints[colorIndex % premiumTints.length];
  const feeling = feelings.find((f) => f.id === feelingId);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [feelingId]);

  if (!feeling) return null;

  const total = feeling.affirmations.length;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === total - 1;

  const goNext = () => {
    if (!isLast) {
      setCurrentIndex((i) => i + 1);
    } else {
      onFinish();
    }
  };

  const goPrev = () => {
    if (!isFirst) {
      setCurrentIndex((i) => i - 1);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-[60vh]">
      <div className="w-full max-w-lg flex flex-col flex-1">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-2">
            Affirmation for
          </h2>
          <h1 className="text-3xl font-extrabold text-slate-900">
            {t(`feelings.${feelingId}.label`)}
          </h1>
        </div>

        {/* Affirmation Card */}
        <div className="flex-1 flex flex-col items-center justify-center py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`w-full aspect-[4/3] rounded-[2.5rem] border-2 ${tintClass} p-10 flex items-center justify-center text-center shadow-xl shadow-slate-200/50 relative overflow-hidden`}
            >
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/30 rounded-full -mr-16 -mt-16 blur-2xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 rounded-full -ml-12 -mb-12 blur-2xl" />
              
              <p className="text-2xl md:text-3xl font-bold text-slate-800 leading-snug relative z-10">
                {t(`feelings.${feelingId}.affirmations.${currentIndex}`)}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Progress dots */}
          <div className="mt-10 flex items-center gap-3">
            {feeling.affirmations.map((_, i) => (
              <motion.span
                key={i}
                animate={{ 
                  scale: i === currentIndex ? 1.5 : 1,
                  backgroundColor: i === currentIndex ? "var(--color-primary)" : "#E2E8F0"
                }}
                className="block h-2 w-2 rounded-full transition-all"
              />
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between px-4 mt-4 mb-8">
          <motion.button
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={goPrev}
            disabled={isFirst}
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white border-2 border-slate-100 text-slate-600 shadow-sm disabled:opacity-20 transition-all"
          >
            <ChevronLeft size={24} />
          </motion.button>

          <div className="text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Affirmation</p>
            <p className="text-lg font-extrabold text-slate-900">
              {currentIndex + 1} <span className="text-slate-300 mx-1">/</span> {total}
            </p>
          </div>

          <motion.button
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={goNext}
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-all"
          >
            {isLast ? <Check size={24} /> : <ChevronRight size={24} />}
          </motion.button>
        </div>

        {/* Bottom actions */}
        <div className="flex flex-col gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onChooseAnother}
            className="w-full py-4 rounded-2xl bg-slate-100 text-slate-600 font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-all"
          >
            <RotateCcw size={18} />
            {t("common.chooseAnother")}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default AffirmationScreen;
