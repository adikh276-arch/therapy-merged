import { X, TrendingUp, TrendingDown, Download } from "lucide-react";
import { Discovery, FACTORS } from "@/types/energy";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EnergyLog } from "@/types/energy";

interface Props {
  discoveries: Discovery[];
  logs: EnergyLog[];
  onClose: () => void;
}

function buildSuggestions(discoveries: Discovery[]): string[] {
  const suggestions: string[] = [];
  const todayHour = new Date().getHours();
  if (todayHour >= 12 && todayHour <= 16) {
    suggestions.push("Notice low energy in afternoons? Try a 10-minute walk at 2pm for 3 days and see if your pattern changes.");
  }
  const exercise = discoveries.find((d) => d.factor === "Exercise" && d.direction === "positive");
  if (exercise) {
    suggestions.push(`Exercise shows +${exercise.impact}% impact. Consider making it a daily habit.`);
  }
  const poorSleep = discoveries.find((d) => d.factor === "Poor sleep" && d.direction === "negative");
  if (poorSleep) {
    suggestions.push(`Poor sleep reduces energy by ${Math.abs(poorSleep.impact)}%. Try setting a consistent bedtime for 7 days.`);
  }
  if (suggestions.length === 0) {
    suggestions.push("Keep logging to unlock personalised experiment suggestions.");
  }
  return suggestions;
}

export default function DiscoveriesView({ discoveries, logs, onClose }: Props) {
  const suggestions = buildSuggestions(discoveries);

  const exportData = () => {
    const json = JSON.stringify(logs, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "energy-logs.json";
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-card shadow-sm">
        <h2 className="font-sora text-base font-bold text-foreground">Your Energy Patterns</h2>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors p-1">
          <X size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-hide">
        {discoveries.length === 0 ? (
          <p className="font-dm text-sm text-muted-foreground text-center py-8">
            Log 10+ entries with varied factors to unlock your patterns.
          </p>
        ) : (
          <div className="space-y-2">
            {discoveries.map((d) => (
              <div key={d.factor} className="bg-card rounded-lg border p-3 space-y-1">
                <div className="flex items-center gap-2">
                  {d.direction === "positive" ? (
                    <TrendingUp size={15} className="text-energy-5 shrink-0" />
                  ) : (
                    <TrendingDown size={15} className="text-energy-1 shrink-0" />
                  )}
                  <span className="font-sora text-sm font-semibold text-foreground">{d.factor}</span>
                  <span
                    className={cn(
                      "ml-auto font-dm text-xs font-semibold",
                      d.direction === "positive" ? "text-energy-5" : "text-energy-1"
                    )}
                  >
                    {d.direction === "positive" ? "+" : ""}{d.impact}%
                  </span>
                </div>
                <p className="font-dm text-[11px] text-muted-foreground">
                  Based on {d.sampleSize} entries
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Suggested experiments */}
        <div className="space-y-2">
          <h3 className="font-sora text-sm font-bold text-foreground">Suggested experiments</h3>
          {suggestions.map((s, i) => (
            <div key={i} className="bg-energy-4-bg border border-primary/20 rounded-lg p-3">
              <p className="font-dm text-sm text-foreground">{s}</p>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full font-dm" onClick={exportData}>
          <Download size={14} className="mr-1.5" />
          Export data
        </Button>
      </div>
    </div>
  );
}
