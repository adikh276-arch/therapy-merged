import HowToPlay from "@/app/therapy/self-care-bingo/components/HowToPlay";
import TipsForSuccess from "@/app/therapy/self-care-bingo/components/TipsForSuccess";
import BingoGrid from "@/app/therapy/self-care-bingo/components/BingoGrid";
import LanguageSelector from "@/app/therapy/self-care-bingo/components/LanguageSelector";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background relative">
      <div className="absolute top-4 right-4 z-50">
        <LanguageSelector />
      </div>
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-foreground">{t("self_care_bingo.title")}</h1>
          <p className="text-muted-foreground whitespace-pre-line">
            {t("self_care_bingo.description")}
          </p>
        </div>

        {/* How to Play */}
        <HowToPlay />

        {/* Tips for Success */}
        <TipsForSuccess />

        {/* Bingo Game */}
        <BingoGrid />
      </div>
    </div>
  );
};

export default Index;
