import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

interface ReflectionPromptProps {
  step: number;
  total: number;
  prompt: string;
  example: string;
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
}

const ReflectionPrompt = ({ step, total, prompt, example, value, onChange, onNext }: ReflectionPromptProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center py-6">
      <div className="w-full max-w-lg space-y-8">
        <header className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {t("reflection.step", { step, total })}
            </span>
            <div className="flex gap-1.5">
              {Array.from({ length: total }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 w-8 rounded-full transition-all duration-500 ${i < step ? "bg-primary" : "bg-slate-100"
                    }`}
                />
              ))}
            </div>
          </div>
          
          <div className="text-left space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900 leading-tight">
                {prompt}
            </h2>
            <div className="flex items-center gap-2 text-slate-400 text-xs font-medium italic">
                <Sparkles size={14} className="text-primary/40" />
                {example}
            </div>
          </div>
        </header>

        <div className="space-y-6">
            <textarea
                placeholder={t("reflection.placeholder")}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full min-h-[160px] p-6 rounded-[2rem] bg-white border-2 border-slate-100 text-slate-700 placeholder:text-slate-300 font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-sm resize-none"
            />
            
            <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onNext} 
                disabled={!value.trim()}
                className="w-full py-5 rounded-[2rem] bg-primary text-primary-foreground font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-40 disabled:shadow-none"
            >
                {step === total ? t("reflection.finish") : t("reflection.next")}
                <ArrowRight size={20} />
            </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ReflectionPrompt;
