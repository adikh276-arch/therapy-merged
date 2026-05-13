import { useTranslation } from "react-i18next";
import type { ZoneType } from "../WindowApp";

interface Props {
  selected: ZoneType;
  onSelect: (zone: ZoneType) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function CheckInScreen({ selected, onSelect, onBack, onNext }: Props) {
  const { t } = useTranslation();

  const zones = [
    {
      id: "hyper" as const,
      emoji: "🔴",
      label: t("screens.checkin.zones.hyper.label"),
      desc: t("screens.checkin.zones.hyper.desc"),
    },
    {
      id: "safe" as const,
      emoji: "🟢",
      label: t("screens.checkin.zones.safe.label"),
      desc: t("screens.checkin.zones.safe.desc"),
    },
    {
      id: "hypo" as const,
      emoji: "🔵",
      label: t("screens.checkin.zones.hypo.label"),
      desc: t("screens.checkin.zones.hypo.desc"),
    },
  ];

  return (
    <section className="space-y-6" aria-label={t("check_in")}>
      <div className="text-center space-y-2">
        <h2 className="font-display text-2xl font-bold text-foreground">{t("screens.checkin.title")}</h2>
        <p className="text-sm text-muted-foreground">{t("screens.checkin.subtitle")}</p>
      </div>

      <div className="space-y-3">
        {zones.map((z) => (
          <button
            key={z.id}
            onClick={() => onSelect(z.id)}
            className="zone-card w-full text-left flex gap-4 items-start"
            style={{
              borderWidth: 2,
              borderStyle: "solid",
              borderColor: selected === z.id ? "hsl(var(--safe))" : "hsl(var(--border))",
              background: selected === z.id ? "hsl(var(--safe) / 0.06)" : undefined,
            }}
            aria-pressed={selected === z.id}
          >
            <span className="text-2xl mt-0.5">{z.emoji}</span>
            <div>
              <p className="font-semibold text-foreground">{z.label}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{z.desc}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3.5 rounded-2xl border border-border text-foreground font-medium hover:bg-muted transition-all duration-300 hover:-translate-y-0.5"
        >
          {t("screens.checkin.back")}
        </button>
        <button
          onClick={onNext}
          disabled={!selected}
          className="flex-1 py-3.5 rounded-2xl bg-primary text-primary-foreground font-medium transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {t("screens.checkin.next")}
        </button>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        {t("screens.checkin.footer")}
      </p>
    </section>
  );
}
