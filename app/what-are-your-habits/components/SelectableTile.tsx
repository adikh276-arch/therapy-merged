import { motion } from "framer-motion";

interface SelectableTileProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
}

const SelectableTile = ({ label, selected, onToggle }: SelectableTileProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onToggle}
      className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-colors duration-200 ${
        selected
          ? "bg-primary/10 border-primary text-foreground"
          : "bg-card border-border text-foreground"
      }`}
    >
      {label}
    </motion.button>
  );
};

export default SelectableTile;
