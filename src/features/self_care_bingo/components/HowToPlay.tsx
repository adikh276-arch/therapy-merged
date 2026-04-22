import { BookOpen, CheckCircle, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

const HowToPlay = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-transparent rounded-2xl p-6  border border-border">
      <h2 className="text-xl font-bold text-foreground flex items-center gap-2 mb-4">
        <span className="text-2xl">📋</span> {t('how_to_play')}
      </h2>
      <p className="text-slate-600 mb-4 font-medium">
        {t('intro')}
      </p>
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <span className="bg-info-bg text-primary rounded-full p-1.5 mt-0.5">
            <BookOpen className="w-4 h-4" />
          </span>
          <p className="text-slate-600 font-medium">
            <span className="font-bold text-foreground">{t('step1_title')}</span> {t('step1_desc')}
          </p>
        </div>
        <div className="flex items-start gap-3">
          <span className="bg-info-bg text-primary rounded-full p-1.5 mt-0.5">
            <CheckCircle className="w-4 h-4" />
          </span>
          <p className="text-slate-600 font-medium">
            <span className="font-bold text-foreground">{t('step2_title')}</span> {t('step2_desc')}
          </p>
        </div>
        <div className="flex items-start gap-3">
          <span className="bg-info-bg text-primary rounded-full p-1.5 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </span>
          <p className="text-slate-600 font-medium">
            {t('step3_desc')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowToPlay;
