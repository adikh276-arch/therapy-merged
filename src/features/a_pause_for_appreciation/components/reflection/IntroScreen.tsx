import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface IntroScreenProps {
  onBegin: () => void;
  onHistory: () => void;
}

const IntroScreen = ({ onBegin, onHistory }: IntroScreenProps) => {
  const { t } = useTranslation();

  return (
    <div className="reflection-card text-center space-y-6">
      <div className="space-y-2">
        <p className="text-2xl">🤍</p>
        <h1 className="text-3xl font-heading font-semibold tracking-tight">
          {t("title")}
        </h1>
        <p className="text-muted-foreground font-body text-sm">
          {t("subtitle")}
        </p>
      </div>

      <div className="text-left space-y-4 text-sm leading-relaxed text-foreground/85" style={{ textAlign: "justify" }}>
        <p>{t("intro.text1")}</p>
        <p>{t("intro.text2")}</p>
      </div>

      <div className="flex flex-col gap-3 pt-2">
        <Button onClick={onBegin} className="w-full">
          {t("intro.begin")}
        </Button>
        <Button variant="outline" onClick={onHistory} className="w-full">
          {t("intro.viewHistory")}
        </Button>
      </div>
    </div>
  );
};

export default IntroScreen;
