import React from "react";

interface OptionChipProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
  emoji?: string;
}

const OptionChip = ({ label, selected, onToggle, emoji }: OptionChipProps) => {
  return (
    <button
      onClick={onToggle}
      className={`rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all duration-200 active:scale-95 ${selected
          ? "border-primary bg-primary text-primary-foreground shadow-sm"
          : "border-border bg-card text-card-foreground hover:border-primary/40"
        }`}
    >
      {emoji && <span className="mr-1.5">{emoji}</span>}
      {label}
    </button>
  );
};

export default OptionChip;
