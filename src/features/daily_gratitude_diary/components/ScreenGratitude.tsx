import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Plus, ArrowRight, Heart, Sparkles, ArrowLeft, Trash2 } from "lucide-react";

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

  const removeEntry = (index: number) => {
    if (entries.length === 1) return;
    setEntries(entries.filter((_, i) => i !== index));
  };

  const canContinue = entries.some((e) => e.grateful.trim().length > 0);

  return (
    <div className="flex flex-col items-center py-6 pb-40">
      <div className="w-full max-w-lg space-y-10">
        
        {/* Step Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[#3B82F6] font-black text-[10px] uppercase tracking-widest">
            <Sparkles size={12} />
            Step 1: Daily Appreciation
          </div>
          <h1 className="text-4xl font-black text-[#0F172A] tracking-tight leading-tight">
            {t('grateful_title')}
          </h1>
          <p className="text-[#64748B] text-lg font-medium leading-relaxed">
            {t('grateful_step_1')}
          </p>
        </div>

        <div className="space-y-6">
          <AnimatePresence initial={false}>
            {entries.map((entry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="p-8 bg-white rounded-[2rem] border-2 border-slate-100 shadow-sm space-y-6 group hover:border-[#3B82F6]/20 transition-all relative"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[#3B82F6] font-black text-[10px] uppercase tracking-[0.2em]">
                      <Heart size={14} fill="currentColor" />
                      Entry #{i + 1}
                  </div>
                  {entries.length > 1 && (
                    <button 
                      onClick={() => removeEntry(i)}
                      className="p-2 text-slate-300 hover:text-[#EF4444] transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest px-1">I am grateful for...</label>
                    <input
                      type="text"
                      placeholder={t('placeholder_grateful')}
                      value={entry.grateful}
                      onChange={(e) => updateEntry(i, "grateful", e.target.value)}
                      className="w-full py-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-[#3B82F6]/50 focus:bg-white transition-all outline-none px-5 font-bold text-[#334155] placeholder:text-[#CBD5E1]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest px-1">Because...</label>
                    <input
                      type="text"
                      placeholder={t('placeholder_reason')}
                      value={entry.reason}
                      onChange={(e) => updateEntry(i, "reason", e.target.value)}
                      className="w-full py-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-[#3B82F6]/50 focus:bg-white transition-all outline-none px-5 font-bold text-[#334155] placeholder:text-[#CBD5E1]"
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
            className="w-full py-5 rounded-[2rem] bg-white text-[#64748B] font-bold border-2 border-dashed border-slate-200 hover:border-[#3B82F6]/30 hover:text-[#3B82F6] transition-all flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            {t('add_another')}
          </motion.button>
        </div>
      </div>

      {/* Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#F6F8FB] via-[#F6F8FB] to-transparent pt-12 flex justify-center z-50">
        <motion.button
          whileHover={canContinue ? { scale: 1.05 } : {}}
          whileTap={canContinue ? { scale: 0.95 } : {}}
          onClick={() => canContinue && onContinue(entries)}
          disabled={!canContinue}
          className="w-full max-w-lg py-5 rounded-[2rem] bg-gradient-to-br from-[#3B82F6] to-[#2563EB] text-white font-black text-lg shadow-xl shadow-blue-200/50 hover:shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-40 disabled:shadow-none"
        >
          {t('continue')}
          <ArrowRight size={20} />
        </motion.button>
      </div>
    </div>
  );
};

export default ScreenGratitude;
