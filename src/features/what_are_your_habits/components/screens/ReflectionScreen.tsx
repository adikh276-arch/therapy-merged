import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const ReflectionScreen = ({ onNext }: { onNext: () => void }) => {
  const { t } = useTranslation();
  const [stress, setStress] = useState("");
  const [calm, setCalm] = useState("");

  return (
    <div className="flex flex-col items-center py-6 pb-24">
      <div className="w-full max-w-lg space-y-8">
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
            <Sparkles size={14} />
            Deeper Reflection
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">{t('reflection_title')}</h2>
        </header>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <label className="text-sm font-black text-slate-400 uppercase tracking-widest px-2">
              {t('question_stress')}
            </label>
            <textarea
              value={stress}
              onChange={(e) => setStress(e.target.value)}
              className="w-full py-5 px-6 rounded-[2rem] bg-white border-2 border-slate-100 text-slate-700 placeholder:text-slate-300 font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-sm resize-none"
              rows={3}
              placeholder="Type your thoughts here..."
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-3"
          >
            <label className="text-sm font-black text-slate-400 uppercase tracking-widest px-2">
              {t('question_calm')}
            </label>
            <textarea
              value={calm}
              onChange={(e) => setCalm(e.target.value)}
              className="w-full py-5 px-6 rounded-[2rem] bg-white border-2 border-slate-100 text-slate-700 placeholder:text-slate-300 font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-sm resize-none"
              rows={3}
              placeholder="Type your thoughts here..."
            />
          </motion.div>
        </div>

        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-lg px-6 z-20">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNext}
            className="w-full py-5 rounded-[2rem] bg-primary text-primary-foreground font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3"
          >
            {t('see_insight')}
            <ArrowRight size={20} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ReflectionScreen;
