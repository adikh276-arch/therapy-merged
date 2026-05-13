import { ArrowLeft, ClipboardList } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  onBegin: () => void;
  onHistory: () => void;
  onBack: () => void;
}

export default function WelcomeScreen({ onBegin, onHistory, onBack }: Props) {
  const { t } = useTranslation();
  return (
    <section className="space-y-6" aria-label={t("welcome")}>
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors" aria-label={t("common.back")}>
          <ArrowLeft size={22} />
        </button>
        <button onClick={onHistory} className="p-2 -mr-2 rounded-full hover:bg-muted transition-colors" aria-label={t("view_history")}>
          <ClipboardList size={22} />
        </button>
      </div>

      <div className="text-center space-y-3">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground">{t("screens.welcome.title")}</h1>
        <p className="text-muted-foreground text-base leading-relaxed whitespace-pre-line">
          {t("screens.welcome.subtitle")}
        </p>
      </div>

      <p className="text-foreground/80 text-sm leading-relaxed text-center">
        {t("screens.welcome.description")}
      </p>

      <div className="callout-box">
        <p className="text-sm font-medium text-foreground">{t("screens.welcome.callout")}</p>
      </div>

      <button
        onClick={onBegin}
        className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-all duration-300 hover:-translate-y-0.5"
        style={{ minHeight: 48 }}
      >
        {t("screens.welcome.button")}
      </button>

      <p className="text-xs text-muted-foreground text-center leading-relaxed">
        {t("screens.welcome.disclaimer")}
      </p>
    </section>
  );
}
