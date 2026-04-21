import { useState } from "react";
import { Minus, Plus } from "lucide-react";

interface StepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
}

const Stepper = ({ value, onChange, min = 0, max = 100, label }: StepperProps) => {
  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-all active:scale-95"
        aria-label="Decrease"
      >
        <Minus size={18} />
      </button>
      <div className="flex min-w-[3rem] flex-col items-center">
        <span className="font-heading text-2xl font-semibold text-foreground">{value}</span>
        {label && <span className="text-xs text-muted-foreground">{label}</span>}
      </div>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-all active:scale-95"
        aria-label="Increase"
      >
        <Plus size={18} />
      </button>
    </div>
  );
};

export default Stepper;
