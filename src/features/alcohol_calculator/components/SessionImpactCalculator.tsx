import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Slider } from "@/components/ui/slider";

type Verdict = {
  label: string;
  emoji: string;
  color: string;
  effects: string[];
};

function getVerdict(drinks: number, hours: number, blackout: boolean, poorSleep: boolean, t: any): Verdict {
  const drinksPerHour = hours > 0 ? drinks / hours : drinks;
  let severity = 0;

  // Volume scoring
  if (drinks <= 3) severity += 0;
  else if (drinks <= 5) severity += 1;
  else if (drinks <= 8) severity += 2;
  else severity += 3;

  // Pace scoring
  if (drinksPerHour > 2) severity += 1;
  if (drinksPerHour > 3) severity += 1;

  // Modifiers
  if (blackout) severity += 2;
  if (poorSleep) severity += 1;

  const effects: string[] = [];
  if (drinks > 3) effects.push(t("session.effects.dehydration"));
  if (drinks > 5) effects.push(t("session.effects.fatigue"));
  if (drinksPerHour > 2) effects.push(t("session.effects.pace"));
  if (poorSleep) effects.push(t("session.effects.sleep"));
  if (blackout) effects.push(t("session.effects.blackout"));
  if (drinks > 8) effects.push(t("session.effects.liver"));

  if (severity <= 1) return {
    label: t("session.verdicts.low_risk"),
    emoji: "✅",
    color: "text-bac-accent",
    effects: effects.length ? effects : [t("session.effects.minimal")],
  };
  if (severity <= 3) return {
    label: t("session.verdicts.heavy"),
    emoji: "⚠️",
    color: "text-cost-accent",
    effects,
  };
  return {
    label: t("session.verdicts.high_risk"),
    emoji: "🚨",
    color: "text-destructive",
    effects,
  };
}

export default function SessionImpactCalculator() {
  const { t } = useTranslation();
  const [drinks, setDrinks] = useState(4);
  const [hours, setHours] = useState([3]);
  const [blackout, setBlackout] = useState(false);
  const [poorSleep, setPoorSleep] = useState(false);

  const PRESETS = [
    { id: "casual", label: t("session.presets.casual"), drinks: 3, hours: 3 },
    { id: "friday", label: t("session.presets.friday"), drinks: 5, hours: 4 },
    { id: "big", label: t("session.presets.big"), drinks: 8, hours: 5 },
    { id: "party", label: t("session.presets.party"), drinks: 12, hours: 6 },
  ];

  const applyPreset = (p: typeof PRESETS[0]) => {
    setDrinks(p.drinks);
    setHours([p.hours]);
  };

  const verdict = useMemo(
    () => getVerdict(drinks, hours[0], blackout, poorSleep, t),
    [drinks, hours, blackout, poorSleep, t]
  );

  return (
    <div className="space-y-5">
      {/* Presets */}
      <div>
        <p className="text-[11px] font-medium text-muted-foreground mb-2">{t("session.last_session_label")}</p>
        <div className="flex gap-2 flex-wrap">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => applyPreset(p)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                drinks === p.drinks && hours[0] === p.hours
                  ? "bg-health-accent text-primary-foreground shadow-sm"
                  : "bg-health-bg text-foreground/60 hover:bg-health-accent/10"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Drinks */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-[11px] font-medium text-muted-foreground">{t("session.drinks_consumed")}</p>
          <span className="text-sm font-semibold text-foreground">{drinks}</span>
        </div>
        <Slider value={[drinks]} onValueChange={([v]) => setDrinks(v)} max={20} step={1} />
      </div>

      {/* Duration */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-[11px] font-medium text-muted-foreground">{t("session.duration")}</p>
          <span className="text-sm font-semibold text-foreground">{hours[0]}{t("bac.hours_unit")}</span>
        </div>
        <Slider value={hours} onValueChange={setHours} max={12} step={0.5} />
      </div>

      {/* Toggle questions */}
      <div className="space-y-2">
        {[
          { id: "blackout", label: t("session.questions.blackout"), checked: blackout, onChange: setBlackout },
          { id: "poor_sleep", label: t("session.questions.poor_sleep"), checked: poorSleep, onChange: setPoorSleep },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => item.onChange(!item.checked)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
              item.checked
                ? "bg-health-accent/10 text-foreground border border-health-accent/30"
                : "bg-muted/40 text-muted-foreground border border-transparent hover:bg-muted/60"
            }`}
          >
            <span>{item.label}</span>
            <span className={`text-sm ${item.checked ? "text-health-accent" : "text-muted-foreground/40"}`}>
              {item.checked ? t("session.questions.yes") : t("session.questions.no")}
            </span>
          </button>
        ))}
      </div>

      {/* Verdict */}
      <div className="rounded-2xl bg-health-bg border border-health-accent/10 p-5 space-y-4">
        <div className="flex items-center gap-3 bg-card rounded-xl p-4">
          <span className="text-2xl">{verdict.emoji}</span>
          <div>
            <p className={`font-display text-base font-bold ${verdict.color}`}>{verdict.label}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              {t("session.stats", { drinks, hours: hours[0], rate: (hours[0] > 0 ? drinks / hours[0] : drinks).toFixed(1) })}
            </p>
          </div>
        </div>

        {verdict.effects.length > 0 && (
          <div className="space-y-1.5">
            {verdict.effects.map((effect) => (
              <div key={effect} className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="text-health-accent mt-0.5">•</span>
                <span>{effect}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
