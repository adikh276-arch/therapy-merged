import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Slider } from "@/components/ui/slider";

export default function ReductionCalculator() {
  const { t } = useTranslation();
  const [current, setCurrent] = useState([14]);
  const [change, setChange] = useState("remove2");
  const [costPerDrink] = useState(200);

  const CHANGES = [
    { id: "remove2", label: t("reduction.changes.remove2"), reduction: 2 },
    { id: "skip1day", label: t("reduction.changes.skip1day"), reduction: 3 },
    { id: "halve", label: t("reduction.changes.halve"), reduction: 0 },
    { id: "lowabv", label: t("reduction.changes.lowabv"), reduction: 0 },
  ];

  const result = useMemo(() => {
    const c = current[0];
    if (c <= 0) return null;

    let newWeekly = c;
    const selected = CHANGES.find((ch) => ch.id === change)!;

    switch (change) {
      case "remove2":
        newWeekly = Math.max(0, c - 2);
        break;
      case "skip1day":
        // Assume drinks spread evenly over ~4 days, removing one day
        newWeekly = Math.max(0, Math.round(c * 0.75));
        break;
      case "halve":
        // Halve the biggest session (assume it's ~40% of weekly)
        newWeekly = Math.max(0, Math.round(c * 0.8));
        break;
      case "lowabv":
        // ~30% less alcohol per drink
        newWeekly = Math.max(0, Math.round(c * 0.7));
        break;
    }

    const saved = c - newWeekly;
    const monthlySaved = Math.round(saved * 4.33 * costPerDrink);
    const yearlySaved = saved * 52 * costPerDrink;

    // Rough health risk reduction
    const riskReduction = Math.round((saved / c) * 100);

    return { newWeekly, saved, monthlySaved, yearlySaved, riskReduction, changeName: selected.label };
  }, [current, change, costPerDrink, t]);

  return (
    <div className="space-y-5">
      {/* Current intake */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-[11px] font-medium text-muted-foreground">{t("reduction.current_intake")}</p>
          <span className="text-sm font-semibold text-foreground">{current[0]}</span>
        </div>
        <Slider value={current} onValueChange={setCurrent} max={40} step={1} />
      </div>

      {/* One small change */}
      <div>
        <p className="text-[11px] font-medium text-muted-foreground mb-2">{t("reduction.pick_change")}</p>
        <div className="grid grid-cols-2 gap-2">
          {CHANGES.map((ch) => (
            <button
              key={ch.id}
              onClick={() => setChange(ch.id)}
              className={`px-3 py-2.5 rounded-xl text-xs font-medium text-left transition-all ${
                change === ch.id
                  ? "bg-reduce-accent/10 text-foreground border border-reduce-accent/30"
                  : "bg-muted/40 text-muted-foreground border border-transparent hover:bg-muted/60"
              }`}
            >
              {ch.label}
            </button>
          ))}
        </div>
      </div>

      {/* Impact */}
      {result && result.saved > 0 && (
        <div className="rounded-2xl bg-reduce-bg border border-reduce-accent/10 p-5 space-y-4">
          <div className="text-center">
            <p className="text-[11px] text-muted-foreground mb-1">
              {t("reduction.impact.by_change", { change: result.changeName.toLowerCase() })}
            </p>
            <p className="font-display text-3xl font-bold text-foreground">
              {current[0]} → {result.newWeekly}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">{t("reduction.impact.unit")}</p>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-card rounded-xl p-3">
              <p className="text-[10px] text-muted-foreground uppercase">{t("reduction.impact.fewer")}</p>
              <p className="font-display text-lg font-bold text-reduce-accent">−{result.saved}</p>
            </div>
            <div className="bg-card rounded-xl p-3">
              <p className="text-[10px] text-muted-foreground uppercase">{t("reduction.impact.saved")}</p>
              <p className="font-display text-lg font-bold text-foreground">{t("cost.currency")}{result.monthlySaved.toLocaleString()}</p>
            </div>
            <div className="bg-card rounded-xl p-3">
              <p className="text-[10px] text-muted-foreground uppercase">{t("reduction.impact.risk_reduced")}</p>
              <p className="font-display text-lg font-bold text-bac-accent">~{result.riskReduction}%</p>
            </div>
          </div>

          <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
            {t("reduction.impact.compounding")}
          </p>
        </div>
      )}

      {result && result.saved === 0 && (
        <div className="rounded-xl bg-muted/30 p-4 text-center">
          <p className="text-xs text-muted-foreground">{t("reduction.impact.adjust_hint")}</p>
        </div>
      )}
    </div>
  );
}
