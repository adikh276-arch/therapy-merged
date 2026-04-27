import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Plus, ArrowRight, Heart, Sparkles, ArrowLeft } from "lucide-react";

interface GratitudeEntry {
  grateful: string;
  reason: string;
}

interface ScreenGratitudeProps {
  onContinue: (entries: GratitudeEntry[]) => void;
  onBack: () => void;
}

const ScreenGratitude = ({ onContinue, onBack }: ScreenGratitudeProps) => {
  const { t } = useTranslation();
  const [entries, setEntries] = useState<GratitudeEntry[]>([{ grateful: "", reason: "" }]);

  const updateEntry = (index: number, field: keyof GratitudeEntry, value: string) => {
    const updated = [...entries];
    updated[index] = { ...updated[index], [field]: value };
    setEntries(updated);
  };

  const addAnother = () => {
    setEntries([...entries, { grateful: "", reason: "" }]);
  };

  const canContinue = entries.some((e) => e.grateful.trim().length > 0);

  return (
    <div className="flex flex-col items-center py-6 pb-40">
      <div className="w-full max-w-lg space-y-8">
        <header className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="p-3 bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-colors shadow-sm"
          >
            <ArrowLeft size={20} />
          </motion.button>
          <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest">
            <Sparkles size={12} />
            Daily Gratitude
          </div>
        </header>

        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">
            {t('grateful_title')}
          </h1>
          <p className="text-slate-500 text-base font-medium leading-relaxed">
            {t('grateful_step_1')}
          </p>
        </div>

        <div className="space-y-6">
          <AnimatePresence initial={false}>
            {entries.map((entry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-sm space-y-4 hover:border-primary/20 transition-all"
              >
                <div className="flex items-center gap-3 text-primary font-black text-[10px] uppercase tracking-[0.2em] mb-2">
                    <Heart size={14} fill="currentColor" />
                    Entry #{i + 1}
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">I am grateful for...</label>
                    <input
                      type="text"
                      placeholder={t('placeholder_grateful')}
                      value={entry.grateful}
                      onChange={(e) => updateEntry(i, "grateful", e.target.value)}
                      className="w-full py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/50 focus:bg-white transition-all outline-none px-6 font-bold text-slate-700 placeholder:text-slate-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Because...</label>
                    <input
                      type="text"
                      placeholder={t('placeholder_reason')}
                      value={entry.reason}
                      onChange={(e) => updateEntry(i, "reason", e.target.value)}
                      className="w-full py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/50 focus:bg-white transition-all outline-none px-6 font-bold text-slate-700 placeholder:text-slate-300"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={addAnother}
            className="w-full py-5 rounded-[2rem] bg-slate-50 text-slate-400 font-bold border-2 border-dashed border-slate-200 hover:border-primary/30 hover:text-primary transition-all flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            {t('add_another')}
          </motion.button>
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent pt-12 flex justify-center z-50">
        <motion.button
          whileHover={canContinue ? { scale: 1.02 } : {}}
          whileTap={canContinue ? { scale: 0.98 } : {}}
          onClick={() => canContinue && onContinue(entries)}
          disabled={!canContinue}
          className="w-full max-w-lg py-5 rounded-[2rem] bg-primary text-primary-foreground font-black text-lg shadow-xl shadow-primary/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-40 disabled:shadow-none"
        >
          {t('continue')}
          <ArrowRight size={20} />
        </motion.button>
      </div>
    </div>
  );
};

export default ScreenGratitude;
