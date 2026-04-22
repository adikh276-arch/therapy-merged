import HowToPlay from "../components/HowToPlay";
import TipsForSuccess from "../components/TipsForSuccess";
import BingoGrid from "../components/BingoGrid";
import LanguageSelector from "../components/LanguageSelector";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();

  return (
    <div className=" bg-transparent relative">
      <div className="absolute top-4 right-4 z-50">
        <LanguageSelector />
      </div>
      <div className="max-w-xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-foreground">{t('title')}</h1>
          <p className="text-slate-600 font-medium whitespace-pre-line">
            {t('description')}
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
