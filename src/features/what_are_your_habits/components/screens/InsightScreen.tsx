import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PillOption from "../../components/PillOption";
import ActivityButton from "../../components/ActivityButton";
import { useTranslation } from "react-i18next";

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
    <div className="bg-card rounded-2xl p-6 shadow-sm border border-border flex flex-col gap-6">
      <span className="text-4xl text-center">🌟</span>
      <h2 className="text-xl font-semibold text-foreground text-center">{t('insight_title')}</h2>
      <p className="text-sm text-foreground text-justified leading-relaxed">
        {t('insight_description')}
      </p>

      {!revealed && (
        <ActivityButton label={t('show_suggestions')} onClick={() => setRevealed(true)} />
      )}

      <AnimatePresence>
        {revealed && (
          <div className="flex flex-col gap-3">
            {suggestions.map((s, i) => (
              <motion.div
                key={s}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.25, duration: 0.4, ease: "easeOut" }}
              >
                <PillOption
                  label={s}
                  selected={selected.includes(s)}
                  onToggle={() => toggle(s)}
                />
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: suggestions.length * 0.25 + 0.2, duration: 0.4 }}
            >
              <ActivityButton label={t('commit')} onClick={onNext} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InsightScreen;
