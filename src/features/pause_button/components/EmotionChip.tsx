import { cn } from "@/lib/utils";

interface EmotionChipProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
}

const EmotionChip = ({ label, selected, onToggle }: EmotionChipProps) => {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "px-4 py-2.5 rounded-full border-2 text-sm font-medium font-body transition-all active:scale-95",
        selected
          ? "bg-secondary border-secondary text-secondary-foreground"
          : "bg-card border-primary/30 text-foreground"
      )}
    >
      {label}
    </button>
  );
};

export default EmotionChip;
