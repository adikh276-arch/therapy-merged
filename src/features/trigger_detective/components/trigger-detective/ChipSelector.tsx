import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface ChipSelectorProps {
  options: string[];
  selected: string[];
  onToggle: (option: string) => void;
  allowCustom?: boolean;
  onAddCustom?: (value: string) => void;
}

const ChipSelector = ({ options, selected, onToggle, allowCustom, onAddCustom }: ChipSelectorProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((option) => {
        const isSelected = selected.includes(option);
        return (
          <motion.button
            key={option}
            whileTap={{ scale: 0.95 }}
            onClick={() => onToggle(option)}
            className={`px-4 py-2.5 rounded-chip text-sm font-body font-medium border-2 transition-colors
              ${isSelected
                ? "bg-secondary border-secondary text-secondary-foreground shadow-sm"
                : "bg-card border-primary/30 text-foreground hover:bg-accent"
              }`}
          >
            {option}
          </motion.button>
        );
      })}
      {allowCustom && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const custom = prompt(t("chip_custom_prompt"));
            if (custom && onAddCustom) onAddCustom(custom);
          }}
          className="px-4 py-2.5 rounded-chip text-sm font-body font-medium border-2 border-dashed border-muted-foreground/40 text-muted-foreground hover:border-primary/50 transition-colors"
        >
          {t("chip_add_custom")}
        </motion.button>
      )}
    </div>
  );
};

export default ChipSelector;
