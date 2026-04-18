import { Button } from "@/app/a-pause-for-appreciation/components/ui/button";
import { useTranslation } from "react-i18next";

interface ClosingScreenProps {
  onSave: () => void;
  onHistory: () => void;
  onExit: () => void;
}

const ClosingScreen = ({ onSave, onHistory, onExit }: ClosingScreenProps) => {
  const { t } = useTranslation();

  return (
    <div className="reflection-card text-center space-y-6">
      <div className="space-y-2">
        <p className="text-2xl">🤍</p>
        <h2 className="text-2xl font-heading font-semibold">{t("closing.title")}</h2>
      </div>

      <div className="text-sm leading-relaxed text-foreground/85 space-y-4" style={{ textAlign: "justify" }}>
        <p>{t("closing.text1")}</p>
        <p>{t("closing.text2")}</p>
      </div>

      <div className="flex flex-col gap-3 pt-2">
        <Button onClick={onSave} className="w-full">
          {t("closing.save")}
        </Button>
        <Button variant="outline" onClick={onHistory} className="w-full">
          {t("closing.viewHistory")}
        </Button>
        <Button variant="ghost" onClick={onExit} className="w-full text-muted-foreground">
          {t("closing.exit")}
        </Button>
      </div>
    </div>
  );
};

export default ClosingScreen;
