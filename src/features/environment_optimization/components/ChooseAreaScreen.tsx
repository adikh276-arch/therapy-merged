import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ChooseAreaScreenProps {
  onStart: () => void;
}

const ChooseAreaScreen = ({ onStart }: ChooseAreaScreenProps) => {
  const { t } = useTranslation();

  const areas = [
    { emoji: "🖥️", label: t("one_corner_desk") },
    { emoji: "🛏️", label: t("bedside_table") },
    { emoji: "🪑", label: t("one_chair") },
    { emoji: "🧹", label: t("small_section_floor") },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 animate-fade-in">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary shadow-md" />
          <div className="w-2 h-2 rounded-full bg-primary/40" />
          <div className="w-2 h-2 rounded-full bg-primary/40" />
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-1">{t("step_1_of_3")}</p>
          <h1 className="text-3xl font-heading font-bold text-foreground tracking-tight">
            {t("app_title")}
          </h1>
        </div>

        <p className="text-lg text-muted-foreground leading-relaxed">
          {t("choose_space")}<br />
          {t("not_whole_room")}
        </p>

        <div className="space-y-3 text-left">
          {areas.map((area) => (
            <div
              key={area.label}
              className="flex items-center gap-3 bg-accent/50 rounded-xl px-4 py-3.5 border border-border/60 transition-colors hover:bg-accent/80"
            >
              <span className="text-xl">{area.emoji}</span>
              <span className="text-foreground font-body">{area.label}</span>
            </div>
          ))}
        </div>

        <p className="text-sm text-primary font-medium italic">
          {t("small_is_enough")}
        </p>

        <Button
          onClick={onStart}
          className="w-full py-6 text-lg font-heading font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all gap-2"
          size="lg"
        >
          <Sparkles className="w-5 h-5" />
          {t("start_5_min")}
        </Button>
      </div>
    </div>
  );
};

export default ChooseAreaScreen;

