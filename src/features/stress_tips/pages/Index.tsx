import MoodSelector from "../components/MoodSelector";
import TipCard from "../components/TipCard";
import { tips } from "../data/tips";

import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen gradient-main">
      <div className="max-w-md mx-auto px-5 py-10 pb-16">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm text-muted-foreground mb-2">{t('index.tagline')}</p>
          <h1 className="text-2xl font-bold text-foreground leading-tight">
            {t('index.title')}
          </h1>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            {t('index.description')}
          </p>
        </div>

        {/* Tips */}
        <div>
          <h2 className="text-base font-semibold text-foreground mb-4">
            {t('index.sectionTitle')}
          </h2>
          <div className="flex flex-col gap-3">
            {tips.map((tip, i) => (
              <TipCard
                key={tip.slug}
                icon={tip.icon}
                iconClass={tip.iconClass}
                title={t(`tip.${tip.slug}.title`)}
                description={t(`tip.${tip.slug}.description`)}
                slug={tip.slug}
                delay={i * 80}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
