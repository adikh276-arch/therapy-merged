import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Sparkles, ArrowLeft, ArrowRight, Smile } from "lucide-react";

interface ScreenReflectionProps {
  onSave: (feeling: string) => void;
  onBack: () => void;
}

const ScreenReflection = ({ onSave, onBack }: ScreenReflectionProps) => {
  const { t } = useTranslation();
  const [feeling, setFeeling] = useState("");

  return (
    <div className="flex flex-col items-center py-6 pb-24">
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
            Reflection
          </div>
        </header>

        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">
            {t('reflection_title')}
          </h1>
          <p className="text-slate-500 text-base font-medium leading-relaxed">
            {t('reflection_text')}
          </p>
        </div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-sm space-y-6 hover:border-primary/20 transition-all"
        >
          <div className="flex items-center gap-3 text-primary font-black text-[10px] uppercase tracking-[0.2em] mb-2">
                <Smile size={14} fill="currentColor" />
                Mood Check
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">How do you feel after this?</label>
            <input
              type="text"
              placeholder={t('placeholder_feeling')}
              value={feeling}
              onChange={(e) => setFeeling(e.target.value)}
              className="w-full py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/50 focus:bg-white transition-all outline-none px-6 font-bold text-slate-700 placeholder:text-slate-300 shadow-inner"
            />
          </div>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSave(feeling)}
          className="w-full py-5 rounded-[2rem] bg-primary text-primary-foreground font-black text-lg shadow-xl shadow-primary/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3"
        >
          {t('save_entry')}
          <ArrowRight size={20} />
        </motion.button>
      </div>
    </div>
  );
};

export default ScreenReflection;
