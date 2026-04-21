import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActionCategoryProps {
  title: string;
  options: string[];
  selectedAction: string | null;
  onSelect: (action: string) => void;
}

const ActionCategory = ({ title, options, selectedAction, onSelect }: ActionCategoryProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl border border-border overflow-hidden bg-card">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3.5 text-left font-heading font-semibold text-sm"
      >
        {title}
        <ChevronDown
          size={18}
          className={cn("text-muted-foreground transition-transform", expanded && "rotate-180")}
        />
      </button>
      {expanded && (
        <div className="px-4 pb-3 flex flex-wrap gap-2">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => onSelect(opt)}
              className={cn(
                "px-3 py-2 rounded-full text-xs font-body transition-all active:scale-95 border",
                selectedAction === opt
                  ? "bg-secondary border-secondary text-secondary-foreground"
                  : "bg-background border-primary/20 text-foreground"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActionCategory;
