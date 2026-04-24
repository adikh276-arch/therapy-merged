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
      whileHover={{ scale: 1.01, x: 4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onToggle}
      className={`w-full text-left p-5 rounded-[2rem] border-2 transition-all duration-300 flex items-center justify-between ${
        selected
          ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20"
          : "bg-white border-slate-100 text-slate-700 hover:bg-slate-50 shadow-sm"
      }`}
    >
      <span className="text-sm font-bold">{label}</span>
      <AnimatePresence>
        {selected && (
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
};

export default SelectableTile;
