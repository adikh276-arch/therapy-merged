import { useState } from "react";
import ActivityButton from "../../components/ActivityButton";
import StepProgress from "../../components/StepProgress";
import { useTranslation } from "react-i18next";

const ReflectionScreen = ({ onNext }: { onNext: () => void }) => {
  const { t } = useTranslation();
  const [stress, setStress] = useState("");
  const [calm, setCalm] = useState("");

  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm border border-border flex flex-col gap-5">
      <StepProgress current={4} total={4} />
      <h2 className="text-xl font-semibold text-foreground">{t('reflection_title')}</h2>
      <div className="flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block text-justified">
            {t('question_stress')}
          </label>
          <textarea
            value={stress}
            onChange={(e) => setStress(e.target.value)}
            className="w-full rounded-xl border-2 border-border bg-background p-3 text-sm text-foreground resize-none focus:outline-none focus:border-primary transition-colors"
            rows={3}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block text-justified">
            {t('question_calm')}
          </label>
          <textarea
            value={calm}
            onChange={(e) => setCalm(e.target.value)}
            className="w-full rounded-xl border-2 border-border bg-background p-3 text-sm text-foreground resize-none focus:outline-none focus:border-primary transition-colors"
            rows={3}
          />
        </div>
      </div>
      <ActivityButton label={t('see_insight')} onClick={onNext} />
    </div>
  );
};

export default ReflectionScreen;
