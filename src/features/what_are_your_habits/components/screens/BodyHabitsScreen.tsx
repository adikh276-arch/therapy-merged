import { useState } from "react";
import SelectableTile from "../../components/SelectableTile";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const BodyHabitsScreen = ({ onNext }: { onNext: () => void }) => {
  const { t } = useTranslation();
  const options = t('body_options', { returnObjects: true }) as string[];
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (item: string) =>
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );

  return (
    <div className="flex flex-col items-center py-6 pb-40">
      <div className="w-full max-w-lg space-y-10">
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-[#3B82F6] font-black text-[10px] uppercase tracking-widest">
            <Sparkles size={12} />
            Physical Health
          </div>
          <h2 className="text-4xl font-black text-[#0F172A] tracking-tight leading-tight">{t('body_title')}</h2>
          <p className="text-[#64748B] text-lg font-medium leading-relaxed">{t('body_subtitle')}</p>
        </header>

        <div className="grid gap-4">
          {options.map((opt) => (
            <SelectableTile
              key={opt}
              label={opt}
              selected={selected.includes(opt)}
              onToggle={() => toggle(opt)}
            />
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#F6F8FB] via-[#F6F8FB] to-transparent pt-12 flex justify-center z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="w-full max-w-lg py-5 rounded-[2rem] bg-gradient-to-br from-[#3B82F6] to-[#2563EB] text-white font-black text-lg shadow-xl shadow-blue-200/50 hover:shadow-2xl transition-all flex items-center justify-center gap-3"
        >
          {t('continue')}
          <ArrowRight size={20} />
        </motion.button>
      </div>
    </div>
  );
};

export default BodyHabitsScreen;
