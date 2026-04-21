import { useTranslation } from "react-i18next";
import { tips } from "@/data/tips";
import TipCard from "@/components/TipCard";
import LanguageSelector from "@/components/LanguageSelector";

export default function Index() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen gradient-bg">
      <div className="mx-auto max-w-md px-5 py-10 pb-16">
        {/* Header row */}
        <div className="flex items-start justify-between mb-8 gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground mb-1">{t("notAlone")}</p>
            <h1 className="text-2xl font-extrabold text-foreground leading-tight">
              {t("supportForLowMood")}
            </h1>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              {t("gentleSteps")}
            </p>
          </div>
          <div className="shrink-0 pt-1">
            <LanguageSelector />
          </div>
        </div>

        {/* Section title */}
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
          {t("dailySupportTips")}
        </h2>

        {/* Tip cards */}
        <div className="flex flex-col gap-3">
          {tips.map((tip, i) => (
            <TipCard key={tip.id} tip={tip} index={i} />
          ))}
        </div>

        {/* Bottom support message */}
        <p className="mt-10 text-center text-xs text-muted-foreground leading-relaxed px-2">
          {t("strugglingMessage")}
        </p>
      </div>
    </div>
  );
}
