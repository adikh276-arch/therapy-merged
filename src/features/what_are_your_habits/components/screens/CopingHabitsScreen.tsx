import { useState } from "react";
import SelectableTile from "../../components/SelectableTile";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const CopingHabitsScreen = ({ onNext }: { onNext: () => void }) => {
  const { t } = useTranslation();
  const options = t('coping_options', { returnObjects: true }) as string[];
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
            <Sparkles size={14} />
            Coping Mechanisms
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">{t('coping_title')}</h2>
        </header>

        <div className="grid gap-3">
          {options.map((opt) => (
            <SelectableTile
              key={opt}
              label={opt}
              selected={selected.includes(opt)}
              onToggle={() => toggle(opt)}
            />
          ))}
        </div>

        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-lg px-6 z-20">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNext}
            className="w-full py-5 rounded-[2rem] bg-primary text-primary-foreground font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3"
          >
            {t('continue')}
            <ArrowRight size={20} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default CopingHabitsScreen;
