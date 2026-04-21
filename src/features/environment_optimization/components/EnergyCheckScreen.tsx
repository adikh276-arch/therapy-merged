import { Button } from "../components/ui/button";
import { Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

interface EnergyCheckScreenProps {
  onFinish: () => void;
}

const EnergyCheckScreen = ({ onFinish }: EnergyCheckScreenProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 animate-fade-in">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary/40" />
          <div className="w-2 h-2 rounded-full bg-primary/40" />
          <div className="w-3 h-3 rounded-full bg-primary shadow-md" />
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-1">{t("step_3_of_3")}</p>
          <h1 className="text-3xl font-heading font-bold text-foreground">
            {t("pause_and_notice")}
          </h1>
        </div>

        <div className="space-y-6 text-left">
          <p className="text-lg text-foreground leading-relaxed">
            {t("look_again")}
          </p>

          <p className="text-lg text-muted-foreground leading-relaxed">
            {t("feel_lighter")}
          </p>

          <p className="text-foreground leading-relaxed">
            {t("draining_item")}
          </p>

          <p className="text-primary font-medium italic">
            {t("slow_breath")}
          </p>

          <div className="bg-accent/50 rounded-xl p-5 border border-border">
            <p className="text-foreground font-medium leading-relaxed text-center">
              {t("reduced_load")}<br />
              <span className="text-primary font-semibold">{t("that_matters")}</span>
            </p>
          </div>
        </div>

        <Button
          onClick={onFinish}
          className="w-full py-6 text-lg font-heading font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all gap-2"
          size="lg"
        >
          <Heart className="w-5 h-5" />
          {t("finish")}
        </Button>
      </div>
    </div>
  );
};

export default EnergyCheckScreen;

