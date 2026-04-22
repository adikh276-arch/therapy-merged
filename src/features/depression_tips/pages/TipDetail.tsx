import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { tips } from "../data/tips";

const bgMap: Record<string, string> = {
  "pastel-pink": "bg-pastel-pink",
  "pastel-purple": "bg-pastel-purple",
  "pastel-blue": "bg-pastel-blue",
  "pastel-green": "bg-pastel-green",
  "pastel-beige": "bg-pastel-beige",
};
const iconColorMap: Record<string, string> = {
  "pastel-pink": "text-pink-500",
  "pastel-purple": "text-purple-500",
  "pastel-blue": "text-blue-500",
  "pastel-green": "text-emerald-500",
  "pastel-beige": "text-amber-500",
};

// Map tip id to translation key prefix
const TIP_KEY_MAP: Record<string, string> = {
  "enjoyable-activities": "t1",
  "challenge-negative-thoughts": "t2",
  "set-realistic-goals": "t3",
  "limit-stressors": "t4",
  "practice-self-care": "t5",
};

export default function TipDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const tip = tips.find((t) => t.id === id);

  if (!tip) {
    return (
      <div className=" gradient-bg flex items-center justify-center">
        <p className="text-muted-foreground">{t("tipNotFound")}</p>
      </div>
    );
  }

  const Icon = tip.icon;
  const k = TIP_KEY_MAP[tip.id] ?? "";

  // Build translated what-you-can-do list from translation keys
  const doKeys = tip.whatYouCanDo.map((_, i) => `${k}_do${i + 1}`);

  return (
    <div className=" gradient-bg">
      <div className="mx-auto w-full px-5 py-8 pb-16">
        {/* Back button */}
        <button
          onClick={() => navigate(".")}
          className="flex items-center gap-1 text-sm text-muted-foreground mb-6 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("back")}
        </button>

        {/* Icon + Title */}
        <div className="flex items-center gap-3 mb-6 animate-fade-in-up" style={{ opacity: 0, animationDelay: "0ms" }}>
          <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${bgMap[tip.iconBg]}`}>
            <Icon className={`h-6 w-6 ${iconColorMap[tip.iconBg]}`} />
          </div>
          <h1 className="text-xl font-extrabold text-foreground leading-tight">
            {k ? t(`${k}_title`) : tip.title}
          </h1>
        </div>

        {/* Why It Helps */}
        <section className="mb-6 animate-fade-in-up" style={{ opacity: 0, animationDelay: "80ms" }}>
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
            {t("whyItHelps")}
          </h2>
          <p className="text-sm text-foreground leading-relaxed">
            {k ? t(`${k}_why`) : tip.whyItHelps}
          </p>
        </section>

        {/* What You Can Do */}
        <section className="mb-6 animate-fade-in-up" style={{ opacity: 0, animationDelay: "160ms" }}>
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
            {t("whatYouCanDo")}
          </h2>
          <div className="flex flex-col gap-2.5">
            {doKeys.map((key, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 rounded-lg bg-transparent p-3 "
              >
                <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                <span className="text-sm text-foreground">{t(key)}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Example */}
        {tip.example && (
          <section className="mb-6 animate-fade-in-up" style={{ opacity: 0, animationDelay: "240ms" }}>
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
              {t("example")}
            </h2>
            <div className="rounded-lg bg-transparent p-4  space-y-2">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold">{t("insteadOf")}</span>{" "}
                {k ? t(`${k}_ex_instead`) : tip.example.instead}
              </p>
              <p className="text-sm text-foreground">
                <span className="font-semibold">{t("try")}</span>{" "}
                {k ? t(`${k}_ex_try`) : tip.example.tryThis}
              </p>
            </div>
          </section>
        )}

        {/* Gentle Reminder */}
        {tip.gentleReminder && (
          <section className="mb-8 animate-fade-in-up" style={{ opacity: 0, animationDelay: "240ms" }}>
            <div className="rounded-lg bg-accent/60 p-4 border border-border">
              <p className="text-sm text-accent-foreground italic text-center leading-relaxed">
                "{k ? t(`${k}_rem`) : tip.gentleReminder}"
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
