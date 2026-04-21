import { motion } from "framer-motion";

interface PillOptionProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
}

const PillOption = ({ label, selected, onToggle }: PillOptionProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onToggle}
      className={`px-5 py-2.5 rounded-full border-2 text-sm font-medium transition-colors duration-200 ${
        selected
          ? "bg-primary/10 border-primary text-foreground"
          : "bg-card border-border text-foreground"
      }`}
    >
      {label}
    </motion.button>
  );
};

export default PillOption;
