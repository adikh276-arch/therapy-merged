import { Button } from "@/app/therapy/a-pause-for-appreciation/components/ui/button";
import { useTranslation } from "react-i18next";

interface IntentionScreenProps {
  value: string;
  onChange: (value: string) => void;
  onContinue: () => void;
}

const IntentionScreen = ({ value, onChange, onContinue }: IntentionScreenProps) => {
  const { t } = useTranslation();

  const options = [
    { icon: "🔒", label: t("intention.options.private"), key: "private" },
    { icon: "💬", label: t("intention.options.share_part"), key: "share_part" },
    { icon: "❤️", label: t("intention.options.share_full"), key: "share_full" },
    { icon: "📝", label: t("intention.options.save_later"), key: "save_later" },
  ];

  return (
    <div className="reflection-card space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground font-body">{t("intention.step")}</p>
        <div className="flex gap-1.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-1.5 w-6 rounded-full bg-primary" />
          ))}
        </div>
      </div>

      <h2 className="text-xl font-heading font-semibold">
        {t("intention.title")}
      </h2>

      <div className="space-y-3">
        {options.map((opt) => (
          <button
            key={opt.key}
            onClick={() => onChange(opt.label)}
            className={`w-full text-left p-4 rounded-lg text-sm font-body transition-all duration-300 ${value === opt.label
                ? "bg-primary/15 ring-1 ring-primary/40"
                : "bg-background/60 hover:bg-background/80"
              }`}
          >
            <span className="mr-2">{opt.icon}</span>
            {opt.label}
          </button>
        ))}
      </div>

      <Button onClick={onContinue} className="w-full" disabled={!value}>
        {t("intention.continue")}
      </Button>
    </div>
  );
};

export default IntentionScreen;
