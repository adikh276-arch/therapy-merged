import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Lock, MessageSquare, Heart, Bookmark, Check } from "lucide-react";

interface IntentionScreenProps {
  value: string;
  onChange: (value: string) => void;
  onContinue: () => void;
}

const IntentionScreen = ({ value, onChange, onContinue }: IntentionScreenProps) => {
  const { t } = useTranslation();

  const options = [
    { icon: <Lock size={20} />, label: t("intention.options.private"), key: "private" },
    { icon: <MessageSquare size={20} />, label: t("intention.options.share_part"), key: "share_part" },
    { icon: <Heart size={20} />, label: t("intention.options.share_full"), key: "share_full" },
    { icon: <Bookmark size={20} />, label: t("intention.options.save_later"), key: "save_later" },
  ];

  return (
    <div className="flex flex-col items-center py-6">
      <div className="w-full max-w-lg space-y-8">
        <header className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {t("intention.step")}
            </span>
            <div className="flex gap-1.5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-1.5 w-8 rounded-full bg-primary" />
              ))}
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
            {t("intention.title")}
          </h2>
        </header>

        <div className="space-y-4">
          {options.map((opt, i) => {
            const isSelected = value === opt.label;
            return (
              <motion.button
                key={opt.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onChange(opt.label)}
                className={`w-full text-left p-6 rounded-[2rem] border-2 transition-all duration-300 flex items-center justify-between ${
                    isSelected 
                    ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20" 
                    : "bg-white border-slate-100 text-slate-700 hover:bg-slate-50 shadow-sm"
                }`}
              >
                <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${
                        isSelected ? "bg-white/20" : "bg-slate-50 text-slate-400"
                    }`}>
                        {opt.icon}
                    </div>
                    <span className="text-base font-bold">{opt.label}</span>
                </div>
                <AnimatePresence>
                    {isSelected && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"
                        >
                            <Check size={16} />
                        </motion.div>
                    )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>

        <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onContinue} 
            disabled={!value}
            className="w-full py-5 rounded-[2rem] bg-primary text-primary-foreground font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-40 disabled:shadow-none"
        >
            {t("intention.continue")}
            <ArrowRight size={20} />
        </motion.button>
      </div>
    </div>
  );
};

export default IntentionScreen;
