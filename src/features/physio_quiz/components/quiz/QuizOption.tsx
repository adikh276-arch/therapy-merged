import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizOptionProps {
  label: string;
  description?: string;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}

export const QuizOptionCard = ({ label, description, isSelected, onClick, index }: QuizOptionProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={onClick}
      className={cn("quiz-option w-full text-left", isSelected && "selected")}
    >
      <div
        className={cn(
          "flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200",
          isSelected
            ? "bg-primary border-primary"
            : "border-border"
        )}
      >
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <Check className="w-3.5 h-3.5 text-primary-foreground" />
          </motion.div>
        )}
      </div>
      <div className="flex-1">
        <span className="font-medium text-foreground">{label}</span>
        {description && (
          <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
    </motion.button>
  );
};

interface MultiSelectOptionProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}

export const MultiSelectOption = ({ label, isSelected, onClick, index }: MultiSelectOptionProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={onClick}
      className={cn(
        "quiz-option w-full text-left",
        isSelected && "selected"
      )}
    >
      <div
        className={cn(
          "flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200",
          isSelected
            ? "bg-primary border-primary"
            : "border-border"
        )}
      >
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <Check className="w-3 h-3 text-primary-foreground" />
          </motion.div>
        )}
      </div>
      <span className="font-medium text-foreground">{label}</span>
    </motion.button>
  );
};
