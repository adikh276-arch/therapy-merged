import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface ChipSelectProps {
  options: string[];
  selected: string | null;
  onSelect: (value: string) => void;
  multi?: boolean;
  selectedMulti?: string[];
  onSelectMulti?: (values: string[]) => void;
}

const ChipSelect = ({ options, selected, onSelect, multi, selectedMulti = [], onSelectMulti }: ChipSelectProps) => {
  const { t } = useTranslation();
  const handleClick = (opt: string) => {
    if (multi && onSelectMulti) {
      const next = selectedMulti.includes(opt)
        ? selectedMulti.filter(v => v !== opt)
        : [...selectedMulti, opt];
      onSelectMulti(next);
    } else {
      onSelect(opt);
    }
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {options.map((opt, i) => {
        const isSelected = multi ? selectedMulti.includes(opt) : selected === opt;
        return (
          <motion.button
            key={opt}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            onClick={() => handleClick(opt)}
            className={`chip ${isSelected ? "chip-selected" : ""}`}
          >
            {opt}
          </motion.button>
        );
      })}
    </div>
  );
};

export default ChipSelect;
