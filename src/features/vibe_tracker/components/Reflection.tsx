import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const promptKeys = [
  "needing",
  "happened",
  "speak",
  "notice",
  "sitOrShift",
  "ease",
  "kindness",
  "supported",
];

interface Props {
  onComplete: (reflections: string[]) => void;
}

const Reflection = ({ onComplete }: Props) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [shuffledKeys] = useState(() =>
    [...promptKeys].sort(() => Math.random() - 0.5).slice(0, 3)
  );

  const isLast = currentIndex >= shuffledKeys.length - 1;

  const handleNext = () => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (isLast) {
      onComplete(newAnswers);
      return;
    }

    setAnswer("");
    setCurrentIndex((i) => i + 1);
  };

  return (
    <div className="space-y-10">
      <header className="space-y-4 text-center">
        <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">
          {t("pauseAndReflect")}
        </h1>
        <div className="flex gap-2 justify-center">
          {shuffledKeys.map((_, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{ 
                width: i === currentIndex ? 32 : 8,
                backgroundColor: i <= currentIndex ? "var(--color-primary)" : "#E2E8F0"
              }}
              className="h-2 rounded-full transition-all duration-300"
            />
          ))}
        </div>
      </header>

      <AnimatePresence mode="wait">
        <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
        >
            <p className="text-xl font-bold text-slate-700 text-center leading-relaxed px-4">
                {t(`prompts.${shuffledKeys[currentIndex]}`)}
            </p>

            <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4 block">
                    {t("typeThoughts")}
                </label>
                <textarea
                    className="w-full py-8 rounded-[2.5rem] bg-slate-50 border-2 border-transparent focus:border-primary/50 focus:bg-white transition-all outline-none px-8 font-bold text-slate-700 placeholder:text-slate-300 shadow-inner min-h-[200px] resize-none leading-relaxed"
                    placeholder="Type your reflection here..."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                />
            </div>
        </motion.div>
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={!answer.trim()}
        onClick={handleNext}
        className="w-full py-5 rounded-[2rem] bg-primary text-primary-foreground font-black text-lg shadow-xl shadow-primary/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-40"
      >
        {isLast ? t("submitReflection") : t("next")}
        {isLast ? <Check size={20} /> : <ArrowRight size={20} />}
      </motion.button>
    </div>
  );
};

export default Reflection;

