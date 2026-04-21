import { useState } from "react";
import { Lightbulb, TrendingUp, TrendingDown, ChevronRight } from "lucide-react";
import { Discovery } from "@/types/energy";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface Props {
  totalEntries: number;
  discoveries: Discovery[];
  onViewAll: () => void;
}

const MIN_ENTRIES = 10;

export default function DiscoveriesCard({ totalEntries, discoveries, onViewAll }: Props) {
  const [selected, setSelected] = useState<Discovery | null>(null);

  const progress = Math.min((totalEntries / MIN_ENTRIES) * 100, 100);
  const hasEnough = totalEntries >= MIN_ENTRIES;
  const shown = discoveries.slice(0, 4);

  return (
    <div
      className="rounded-lg shadow-card p-4 space-y-3"
      style={{ background: "var(--gradient-discoveries, hsl(var(--card)))", border: "1px solid hsl(var(--border))", backgroundColor: "hsl(var(--card))" }}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-sora text-[15px] font-bold text-foreground">Your discoveries</h3>
        {hasEnough && (
          <button onClick={onViewAll} className="flex items-center gap-0.5 text-primary font-dm text-xs">
            View all <ChevronRight size={13} />
          </button>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        <Lightbulb size={16} className="text-primary shrink-0" />
        <span className="font-dm text-xs text-muted-foreground">Patterns from your data</span>
      </div>

      {!hasEnough ? (
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="font-dm text-xs text-muted-foreground">
            Log 10 entries to discover your energy patterns
          </p>
          <p className="font-dm text-sm font-semibold text-foreground">
            {totalEntries}/{MIN_ENTRIES} entries
          </p>
        </div>
      ) : discoveries.length === 0 ? (
        <p className="font-dm text-xs text-muted-foreground">
          Keep logging! We need more varied factor data to find patterns.
        </p>
      ) : (
        <div className="space-y-2">
          {shown.map((d) => (
            <button
              key={d.factor}
              onClick={() => setSelected(selected?.factor === d.factor ? null : d)}
              className="w-full flex items-center gap-2 p-2.5 rounded-md bg-muted hover:bg-secondary transition-colors text-left"
            >
              {d.direction === "positive" ? (
                <TrendingUp size={15} className="text-energy-5 shrink-0" />
              ) : (
                <TrendingDown size={15} className="text-energy-1 shrink-0" />
              )}
              <span className="font-dm text-sm flex-1">
                You feel{" "}
                <span
                  className={cn("font-semibold", d.direction === "positive" ? "text-energy-5" : "text-energy-1")}
                >
                  {Math.abs(d.impact)}% {d.direction === "positive" ? "better" : "worse"}
                </span>{" "}
                when: {d.factor}
              </span>
            </button>
          ))}

          {/* Detail modal */}
          {selected && (
            <div className="animate-fade-in p-3 rounded-md border border-border bg-card shadow-card space-y-1.5">
              <p className="font-sora text-sm font-bold text-foreground">{selected.factor}</p>
              <div className="font-dm text-xs text-muted-foreground space-y-0.5">
                <p>Based on {selected.sampleSize} entries with this factor</p>
                <p>
                  Impact:{" "}
                  <span
                    className={cn("font-semibold", selected.direction === "positive" ? "text-energy-5" : "text-energy-1")}
                  >
                    {selected.direction === "positive" ? "+" : ""}{selected.impact}%
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
