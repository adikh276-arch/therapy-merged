import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PremiumComplete } from "../../../components/shared/PremiumComplete";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

interface Props {
  onComplete: (reflection: string) => void;
  onBack: () => void;
}

const feelings = [
  { label: "Slightly lighter", emoji: "🌤" },
  { label: "More focused", emoji: "🎯" },
  { label: "About the same", emoji: "🌊" },
  { label: "Still overwhelmed", emoji: "💙" },
];

export const Reflection = ({ onComplete, onBack }: Props) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <PremiumComplete
      title={t("reflection_title")}
      message={t("reflection_desc")}
      onRestart={() => onComplete(selected || "Finished")}
    >
       <div className="space-y-6 w-full max-w-md mx-auto mt-8">
        <div className="grid gap-3">
          {feelings.map((f, i) => (
            <motion.button
              key={f.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelected(f.label)}
              className={`flex items-center justify-between p-5 rounded-[2rem] border-2 transition-all duration-300 ${
                selected === f.label
                  ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-white border-slate-100 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{f.emoji}</span>
                <span className="text-sm font-bold">{f.label}</span>
              </div>
              <AnimatePresence>
                {selected === f.label && (
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
          ))}
        </div>

        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center p-4"
          >
            <p className="text-slate-500 text-sm font-medium leading-relaxed italic">
              "Even small steps reduce mental weight. You don't have to carry everything at once."
            </p>
          </motion.div>
        )}
      </div>
    </PremiumComplete>
  );
};
