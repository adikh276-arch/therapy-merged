import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SelectableTile from "../../components/SelectableTile";
import { useTranslation } from "react-i18next";
import { ArrowRight, Sparkles, Lightbulb } from "lucide-react";

const InsightScreen = ({ onNext }: { onNext: () => void }) => {
  const { t } = useTranslation();
  const suggestions = t('suggestions', { returnObjects: true }) as string[];
  const [revealed, setRevealed] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (item: string) =>
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );

  return (
    <div className="flex flex-col items-center py-6 pb-24">
      <div className="w-full max-w-lg space-y-8">
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
            <Lightbulb size={14} />
            Insight & Growth
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">{t('insight_title')}</h2>
          <p className="text-slate-500 text-base font-medium leading-relaxed">{t('insight_description')}</p>
        </header>

        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.button
              key="reveal-btn"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setRevealed(true)}
              className="w-full py-5 rounded-[2rem] bg-white border-2 border-slate-100 text-slate-600 font-bold text-lg shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-3"
            >
              <Sparkles size={20} className="text-primary" />
              {t('show_suggestions')}
            </motion.button>
          ) : (
            <div className="grid gap-3">
              {suggestions.map((s, i) => (
                <motion.div
                  key={s}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <SelectableTile
                    label={s}
                    selected={selected.includes(s)}
                    onToggle={() => toggle(s)}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        {revealed && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-lg px-6 z-20">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onNext}
              className="w-full py-5 rounded-[2rem] bg-primary text-primary-foreground font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3"
            >
              {t('commit')}
              <ArrowRight size={20} />
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InsightScreen;
