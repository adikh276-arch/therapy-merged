import MoodSelector from "../components/MoodSelector";
import TipCard from "../components/TipCard";
import { tips } from "../data/tips";
import { useTranslation } from "react-i18next";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";
import { Sparkles } from "lucide-react";

const Index = () => {
  const { t } = useTranslation();
  return (
    <PremiumLayout title="Stress Tips">
      <div className="w-full space-y-10">
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.2em]">
            <Sparkles size={14} />
            {t('index.tagline')}
          </div>
          <h1 className="text-4xl font-black text-slate-900 leading-tight tracking-tight">
            {t('index.title')}
          </h1>
          <p className="text-slate-500 text-base font-bold leading-relaxed max-w-md">
            {t('index.description')}
          </p>
        </header>

        <div className="space-y-6">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-2">
            {t('index.sectionTitle')}
          </h2>
          <div className="grid gap-4">
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
    </PremiumLayout>
  );
};

export default Index;
