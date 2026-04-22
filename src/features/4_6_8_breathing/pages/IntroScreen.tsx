import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const IntroScreen = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12 animate-fade-in">
      <div className="w-full w-full flex flex-col items-center text-center gap-6 px-2">
        <h1 className="font-display text-4xl font-bold text-foreground leading-tight">
          {t('app_title')}
        </h1>

        <p className="font-subtitle text-lg text-foreground/80 italic">
          {t('app_subtitle')}
        </p>

        <div className="w-full bg-card rounded-lg p-6 glow-soft">
          <p className="text-justified text-foreground/90 text-base leading-relaxed">
            {t('intro_description')}
          </p>
        </div>

        <button
          onClick={() => navigate("./breathe")}
          className="w-full mt-4 py-4 px-8 bg-primary text-primary-foreground font-semibold text-lg rounded-full glow-soft hover:opacity-90 transition-opacity duration-200"
        >
          {t('begin_button')}
        </button>
      </div>
    </div>
  );
};

export default IntroScreen;
