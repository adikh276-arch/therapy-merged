import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

interface OptionChipProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
  emoji?: string;
}

const OptionChip = ({ label, selected, onToggle, emoji }: OptionChipProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onToggle}
      className={`relative rounded-2xl border-2 px-6 py-4 text-sm font-bold transition-all duration-300 flex items-center gap-3 ${selected
          ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20"
          : "border-slate-100 bg-white text-slate-600 hover:border-primary/50 hover:bg-slate-50 shadow-sm"
        }`}
    >
      {emoji && <span className="text-lg">{emoji}</span>}
      <span className="flex-1 text-left">{label}</span>
      <AnimatePresence>
        {selected && (
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0"
            >
                <Check size={12} strokeWidth={4} />
            </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default OptionChip;
