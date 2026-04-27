import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

interface SelectableTileProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
}

const SelectableTile = ({ label, selected, onToggle }: SelectableTileProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onToggle}
      className={`w-full text-left p-6 rounded-[2rem] border-2 transition-all duration-300 flex items-center justify-between ${
        selected
          ? "bg-[#0F172A] border-[#0F172A] text-white shadow-xl shadow-slate-200"
          : "bg-white border-slate-100 text-[#334155] hover:border-[#3B82F6]/20 shadow-sm"
      }`}
    >
      <span className="text-sm font-black uppercase tracking-tight">{label}</span>
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="w-6 h-6 rounded-full bg-[#3B82F6] flex items-center justify-center text-white"
          >
            <Check size={14} strokeWidth={4} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default SelectableTile;
