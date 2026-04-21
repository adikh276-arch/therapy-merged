import { useNavigate } from "react-router-dom";
import { Mail, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const IntroScreen = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 fade-enter">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center gentle-pulse">
            <Mail className="w-10 h-10 text-accent-foreground" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-heading">{t("title")}</h1>
          <p className="text-muted-foreground text-lg">
            {t("subtitle")}
          </p>
        </div>

        <p className="text-justified text-foreground/80 leading-relaxed px-2">
          {t("intro_text")}
        </p>

        <div className="space-y-3 pt-2">
          <Button
            onClick={() => navigate("/write")}
            className="w-full rounded-2xl h-12 text-base font-medium"
          >
            {t("start_writing")}
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/letters")}
            className="w-full rounded-2xl h-12 text-base font-medium"
          >
            {t("view_past_letters")}
          </Button>
        </div>

        <p className="text-muted-foreground text-sm pt-4 flex items-center justify-center gap-1.5">
          {t("no_judgments")} <Leaf className="w-4 h-4 text-accent-foreground" />
        </p>
      </div>
    </div>
  );
};

export default IntroScreen;
