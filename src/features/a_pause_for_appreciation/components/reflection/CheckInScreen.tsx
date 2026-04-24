import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, Send } from "lucide-react";

interface CheckInScreenProps {
  value: string;
  onChange: (value: string) => void;
  onFinish: () => void;
}

const CheckInScreen = ({ value, onChange, onFinish }: CheckInScreenProps) => {
  const { t } = useTranslation();

  const statements = [
    t("checkin.statements.s1"),
    t("checkin.statements.s2"),
    t("checkin.statements.s3"),
    t("checkin.statements.s4"),
    t("checkin.statements.s5"),
    t("checkin.statements.s6"),
  ];

  return (
    <div className="flex flex-col items-center py-6">
      <div className="w-full max-w-lg space-y-8">
        <header className="text-center space-y-2">
            <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto text-primary mb-4">
                <Sparkles size={32} />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
                {t("checkin.title")}
            </h2>
            <p className="text-slate-500 text-sm font-medium">How do you feel after this reflection?</p>
        </header>

        <div className="grid gap-3">
          {statements.map((s, i) => {
            const isSelected = value === s;
            return (
              <motion.button
                key={s}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onChange(s)}
                className={`w-full text-left p-5 rounded-[2rem] border-2 transition-all duration-300 flex items-center justify-between ${
                    isSelected 
                    ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20" 
                    : "bg-white border-slate-100 text-slate-700 hover:bg-slate-50 shadow-sm"
                }`}
              >
                <span className="text-sm font-bold leading-relaxed">{s}</span>
                <AnimatePresence>
                    {isSelected && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 ml-4"
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
            onClick={onFinish} 
            disabled={!value}
            className="w-full py-5 rounded-[2rem] bg-primary text-primary-foreground font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-40 disabled:shadow-none"
        >
            {t("checkin.finish")}
            <Send size={20} />
        </motion.button>
      </div>
    </div>
  );
};

export default CheckInScreen;
