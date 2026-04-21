import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Beer, Wine, Martini, Car, Clock } from "lucide-react";

type DriveStatus = {
  verdict: string;
  emoji: string;
  color: string;
  bg: string;
  message: string;
};

function getDriveStatus(bac: number, t: any): DriveStatus {
  if (bac < 0.03) return {
    verdict: t("bac.status.safe.verdict"),
    emoji: "✅",
    color: "text-bac-accent",
    bg: "bg-bac-accent",
    message: t("bac.status.safe.message"),
  };
  if (bac < 0.06) return {
    verdict: t("bac.status.borderline.verdict"),
    emoji: "⚠️",
    color: "text-cost-accent",
    bg: "bg-cost-accent",
    message: t("bac.status.borderline.message"),
  };
  return {
    verdict: t("bac.status.danger.verdict"),
    emoji: "❌",
    color: "text-destructive",
    bg: "bg-destructive",
    message: t("bac.status.danger.message"),
  };
}

export default function BACCalculator() {
  const { t } = useTranslation();
  const [drinks, setDrinks] = useState(2);
  const [type, setType] = useState("beer");
  const [weight, setWeight] = useState("70");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [hours, setHours] = useState([1]);

  const DRINK_TYPES = [
    { id: "beer", label: t("bac.drink_types.beer"), icon: Beer, grams: 14, example: "330ml · 5%" },
    { id: "wine", label: t("bac.drink_types.wine"), icon: Wine, grams: 17, example: "150ml · 12%" },
    { id: "spirits", label: t("bac.drink_types.spirits"), icon: Martini, grams: 22, example: "45ml · 40%" },
  ];

  const result = useMemo(() => {
    const w = parseFloat(weight);
    if (!drinks || !w || w < 20) return null;

    const drinkType = DRINK_TYPES.find((d) => d.id === type)!;
    const alcoholGrams = drinks * drinkType.grams;
    const r = gender === "male" ? 0.68 : 0.55;
    const bac = Math.max(0, (alcoholGrams / (w * 1000 * r)) * 100 - 0.015 * hours[0]);
    const timeToSafe = bac > 0.03 ? (bac - 0.03) / 0.015 : 0;
    const status = getDriveStatus(bac, t);

    return { bac: bac.toFixed(3), timeToSafe: Math.ceil(timeToSafe * 10) / 10, status };
  }, [drinks, type, weight, gender, hours, t]);

  return (
    <div className="space-y-5">
      {/* Drink type */}
      <div className="grid grid-cols-3 gap-2">
        {DRINK_TYPES.map((d) => {
          const Icon = d.icon;
          const active = type === d.id;
          return (
            <button
              key={d.id}
              onClick={() => setType(d.id)}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all ${
                active
                  ? "border-bac-accent bg-bac-bg"
                  : "border-transparent bg-muted/50 hover:bg-muted"
              }`}
            >
              <Icon className={`h-5 w-5 ${active ? "text-bac-accent" : "text-muted-foreground"}`} />
              <span className={`text-xs font-medium ${active ? "text-foreground" : "text-muted-foreground"}`}>{d.label}</span>
              <span className="text-[10px] text-muted-foreground">{d.example}</span>
            </button>
          );
        })}
      </div>

      {/* Drink count */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-[11px] font-medium text-muted-foreground">{t("bac.drinks_label")}</p>
          <span className="text-sm font-semibold text-foreground">{drinks}</span>
        </div>
        <Slider value={[drinks]} onValueChange={([v]) => setDrinks(v)} max={15} step={1} />
      </div>

      {/* Body details */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-[11px] font-medium text-muted-foreground">{t("bac.weight_label")}</Label>
          <Input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            min="30"
            className="bg-muted/40 border-border/50 h-9"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-[11px] font-medium text-muted-foreground">{t("bac.gender_label")}</Label>
          <div className="grid grid-cols-2 gap-1.5">
            {(["male", "female"] as const).map((g) => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className={`py-2 rounded-lg text-xs font-medium transition-all ${
                  gender === g
                    ? "bg-bac-accent text-primary-foreground"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                }`}
              >
                {g === "male" ? t("bac.male") : t("bac.female")}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Time since first drink */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-[11px] font-medium text-muted-foreground">{t("bac.time_since_label")}</p>
          <span className="text-sm font-semibold text-foreground">{hours[0]}{t("bac.hours_unit")}</span>
        </div>
        <Slider value={hours} onValueChange={setHours} max={12} step={0.5} />
      </div>

      {/* Result */}
      {result && (
        <div className="rounded-2xl bg-bac-bg border border-bac-accent/10 p-5 space-y-4">
          {/* Drive verdict — the hero */}
          <div className={`flex items-center gap-3 rounded-xl p-4 bg-card border border-border/50`}>
            <Car className={`h-6 w-6 shrink-0 ${result.status.color}`} />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-lg">{result.status.emoji}</span>
                <p className={`text-base font-display font-bold ${result.status.color}`}>{result.status.verdict}</p>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{result.status.message}</p>
            </div>
          </div>

          {/* BAC + Time to safe */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-card rounded-xl p-3 text-center">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{t("bac.results.est_bac")}</p>
              <p className="font-display text-2xl font-bold text-foreground mt-0.5">{result.bac}%</p>
            </div>
            <div className="bg-card rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-0.5">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{t("bac.results.safe_to_drive")}</p>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">
                {result.timeToSafe > 0 ? `~${result.timeToSafe}h` : t("bac.results.now")}
              </p>
            </div>
          </div>

          {/* Micro-warning */}
          <p className="text-[11px] text-muted-foreground text-center leading-relaxed whitespace-pre-line">
            {t("bac.results.warning")}
          </p>
        </div>
      )}
    </div>
  );
}
