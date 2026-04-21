import { useState } from "react";
import { Check } from "lucide-react";
import { ENERGY_LEVELS, FACTORS } from "@/types/energy";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Props {
  onLog: (level: number, factors: string[]) => void;
}

export default function EnergyLogCard({ onLog }: Props) {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [selectedFactors, setSelectedFactors] = useState<string[]>([]);
  const [justLogged, setJustLogged] = useState(false);
  const { toast } = useToast();

  const toggleFactor = (id: string) => {
    setSelectedFactors((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleLog = () => {
    if (!selectedLevel) return;
    onLog(selectedLevel, selectedFactors);
    setJustLogged(true);
    toast({ title: "Energy logged ✓" });
    setTimeout(() => {
      setJustLogged(false);
      setSelectedLevel(null);
      setSelectedFactors([]);
    }, 1500);
  };

  return (
    <div className="bg-card rounded-lg shadow-card p-4 space-y-3">
      <h2 className="font-sora text-base font-bold text-foreground text-center">
        How's your energy?
      </h2>

      <div className="flex flex-col gap-1.5">
        {ENERGY_LEVELS.map((lvl) => {
          const isSelected = selectedLevel === lvl.value;
          const showCheck = justLogged && isSelected;
          return (
            <button
              key={lvl.value}
              onClick={() => setSelectedLevel(lvl.value)}
              style={
                isSelected
                  ? {
                      backgroundColor: lvl.bgColor,
                      borderLeftColor: lvl.borderColor,
                      color: lvl.color,
                    }
                  : {}
              }
              className={cn(
                "flex items-center h-14 px-3 rounded-md border transition-all duration-200 text-left",
                isSelected
                  ? "border-l-4 font-semibold"
                  : "bg-muted border border-border text-muted-foreground hover:bg-secondary"
              )}
            >
              <span className="text-xl w-8 shrink-0">{lvl.emoji}</span>
              <span className="font-dm text-sm flex-1">{lvl.label}</span>
              <div className="flex items-center gap-2">
                {showCheck && (
                  <Check
                    size={16}
                    className="animate-check-pulse"
                    style={{ color: lvl.color }}
                  />
                )}
                <span className="font-dm text-[11px] opacity-60">Level {lvl.value}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Factor section revealed after selecting level */}
      {selectedLevel !== null && (
        <div className="animate-fade-in space-y-2">
          <div className="pt-1">
            <p className="font-dm text-sm text-muted-foreground">
              What might be affecting it?
            </p>
            <p className="font-dm text-[11px] text-muted-foreground">
              Pick what feels relevant — we'll find patterns
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {FACTORS.map((f) => {
              const active = selectedFactors.includes(f.id);
              return (
                <button
                  key={f.id}
                  onClick={() => toggleFactor(f.id)}
                  className={cn(
                    "flex items-center gap-1 px-2.5 py-1 rounded-full text-[12px] font-dm border transition-all duration-150",
                    active
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted border-border text-muted-foreground hover:bg-secondary"
                  )}
                >
                  <span>{f.emoji}</span>
                  <span>{f.label}</span>
                </button>
              );
            })}
          </div>
          <Button
            className="w-full font-dm font-semibold"
            onClick={handleLog}
            disabled={justLogged}
          >
            {justLogged ? "Logged ✓" : "Log"}
          </Button>
        </div>
      )}
    </div>
  );
}
