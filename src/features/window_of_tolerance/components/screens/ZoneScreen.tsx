import { useTranslation } from "react-i18next";
import type { ZoneType } from "../WindowApp";

interface Props {
  zone: ZoneType;
  onContinue: () => void;
  onBack: () => void;
}

export default function ZoneScreen({ zone, onContinue, onBack }: Props) {
  const { t } = useTranslation();
  if (!zone) return null;

  const data = t(`screens.zone.${zone}`, { returnObjects: true }) as any;
  const colors: Record<string, string> = {
    hyper: "hsl(var(--hyper))",
    safe: "hsl(var(--safe))",
    hypo: "hsl(var(--hypo))",
  };
  const emojis: Record<string, string> = {
    hyper: "🔴",
    safe: "🟢",
    hypo: "🔵",
  };
  const toolIcons: Record<string, string> = {
    "Box Breathing": "🌬️",
    "5-4-3-2-1 Grounding": "🖐️",
    "Feet on Floor": "🦶",
    "Gentle Movement": "🚶",
    "Rhythmic Sound": "🎵",
    "Speak Out Loud": "💬",
    "Keep Breathing Slowly": "🧘",
    "Reflect": "📝",
    "Self-Compassion": "💛",
  };

  return (
    <section className="space-y-6" aria-label={data.title}>
      <button
        onClick={onBack}
        className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors"
        aria-label={t("common.back")}
      >
        ← Back
      </button>

      <div className="text-center space-y-2">
        <h2 className="font-display text-2xl font-bold" style={{ color: colors[zone] }}>
          {emojis[zone]} {data.title}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{data.subtitle}</p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {data.feelings && data.feelings.map((f: string) => (
          <span key={f} className="pill-tag text-xs">{f}</span>
        ))}
      </div>

      <div className="space-y-3">
        {data.tools && data.tools.map((tool: any) => (
          <div key={tool.name} className="tool-card">
            <div className="flex gap-3 items-start">
              <span className="text-xl mt-0.5">{toolIcons[tool.name] || "✨"}</span>
              <div>
                <p className="font-semibold text-sm text-foreground">{tool.name}</p>
                <p className="text-sm text-muted-foreground mt-1">{tool.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <button
          onClick={onContinue}
          className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all duration-300 hover:-translate-y-0.5"
        >
          {data.button}
        </button>
      </div>

      <p className="text-xs text-muted-foreground text-center">{data.footer}</p>
    </section>
  );
}
