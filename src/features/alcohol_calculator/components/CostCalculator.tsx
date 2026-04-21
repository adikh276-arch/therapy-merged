import { useState, useMemo } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Plane, PiggyBank, Home, Smartphone } from "lucide-react";

export default function CostCalculator() {
  const { t } = useTranslation();
  const [drinksPerSession, setDrinksPerSession] = useState(3);
  const [sessionsPerWeek, setSessionsPerWeek] = useState([2]);
  const [costPerDrink, setCostPerDrink] = useState("200");

  const EQUIVALENTS = [
    { id: "phone", icon: Smartphone, threshold: 15000, text: t("cost.equivalents.phone") },
    { id: "savings", icon: PiggyBank, threshold: 40000, text: t("cost.equivalents.savings") },
    { id: "vacation", icon: Plane, threshold: 80000, text: t("cost.equivalents.vacation") },
    { id: "rent", icon: Home, threshold: 150000, text: t("cost.equivalents.rent") },
  ];

  const SESSION_PRESETS = [
    { id: "casual", label: t("cost.presets.casual"), drinks: 2, sessions: 2 },
    { id: "weekend", label: t("cost.presets.weekend"), drinks: 4, sessions: 2 },
    { id: "regular", label: t("cost.presets.regular"), drinks: 3, sessions: 4 },
    { id: "heavy", label: t("cost.presets.heavy"), drinks: 6, sessions: 4 },
  ];

  const applyPreset = (p: typeof SESSION_PRESETS[0]) => {
    setDrinksPerSession(p.drinks);
    setSessionsPerWeek([p.sessions]);
  };

  const result = useMemo(() => {
    const c = parseFloat(costPerDrink);
    if (!drinksPerSession || !c) return null;

    const weekly = drinksPerSession * sessionsPerWeek[0] * c;
    const monthly = Math.round(weekly * 4.33);
    const yearly = Math.round(weekly * 52);
    const equivalent = [...EQUIVALENTS].reverse().find((e) => yearly >= e.threshold);

    return { weekly: Math.round(weekly), monthly, yearly, equivalent };
  }, [drinksPerSession, sessionsPerWeek, costPerDrink, t]);

  return (
    <div className="space-y-5">
      {/* Presets */}
      <div>
        <p className="text-[11px] font-medium text-muted-foreground mb-2">{t("cost.pattern_label")}</p>
        <div className="flex gap-2 flex-wrap">
          {SESSION_PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => applyPreset(p)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                drinksPerSession === p.drinks && sessionsPerWeek[0] === p.sessions
                  ? "bg-cost-accent text-primary-foreground shadow-sm"
                  : "bg-cost-bg text-foreground/60 hover:bg-cost-accent/10"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Drinks per session */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-[11px] font-medium text-muted-foreground">{t("cost.drinks_per_session")}</p>
          <span className="text-sm font-semibold text-foreground">{drinksPerSession}</span>
        </div>
        <Slider value={[drinksPerSession]} onValueChange={([v]) => setDrinksPerSession(v)} max={15} step={1} />
      </div>

      {/* Sessions per week */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-[11px] font-medium text-muted-foreground">{t("cost.sessions_per_week")}</p>
          <span className="text-sm font-semibold text-foreground">{sessionsPerWeek[0]}</span>
        </div>
        <Slider value={sessionsPerWeek} onValueChange={setSessionsPerWeek} max={7} step={1} />
      </div>

      {/* Cost per drink */}
      <div className="space-y-1.5">
        <Label className="text-[11px] font-medium text-muted-foreground">{t("cost.cost_per_drink")} ({t("cost.currency")})</Label>
        <Input
          type="number"
          value={costPerDrink}
          onChange={(e) => setCostPerDrink(e.target.value)}
          min="0"
          className="bg-muted/40 border-border/50 h-9"
        />
        <div className="flex gap-2 mt-1">
          {[100, 200, 400, 600].map((v) => (
            <button
              key={v}
              onClick={() => setCostPerDrink(String(v))}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                costPerDrink === String(v)
                  ? "bg-cost-accent text-primary-foreground"
                  : "bg-cost-bg text-foreground/60 hover:bg-cost-accent/10"
              }`}
            >
              {t("cost.currency")}{v}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="rounded-2xl bg-cost-bg border border-cost-accent/10 p-5 space-y-4">
          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              { label: t("cost.labels.weekly"), value: result.weekly },
              { label: t("cost.labels.monthly"), value: result.monthly },
              { label: t("cost.labels.yearly"), value: result.yearly },
            ].map((item) => (
              <div key={item.label} className="bg-card rounded-xl p-3">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{item.label}</p>
                <p className="font-display text-lg font-bold text-foreground mt-0.5">
                  <span className="text-xs font-normal">{t("cost.currency")}</span>{item.value.toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          {result.equivalent && (
            <div className="flex items-center gap-3 bg-card rounded-xl p-3">
              <result.equivalent.icon className="h-5 w-5 text-cost-accent shrink-0" />
              <div className="text-xs text-muted-foreground leading-relaxed">
                <Trans i18nKey="cost.impact_message">
                  That's <span className="font-semibold text-foreground">{t("cost.currency")}{result.yearly.toLocaleString()}/year</span> — enough for{" "}
                  <span className="font-semibold text-cost-accent">{result.equivalent.text}</span>
                </Trans>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
