import { Button } from "@/components/ui/button";
import ActivityInput from "./ActivityInput";
import type { ActivityData } from "@/pages/Index";
import { useTranslation } from "react-i18next";

interface Props {
  data: ActivityData;
  onChange: (fields: Partial<ActivityData>) => void;
  onGoHome: () => void;
  onSave: () => void;
}

const SmallStepScreen = ({ data, onChange, onGoHome, onSave }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="animate-fade-in-up space-y-8 flex flex-col items-center text-center w-full">
      <div className="space-y-2 w-full">
        <h1 className="text-[22px] font-heading font-semibold text-foreground">
          {t('smallStep.title')}
        </h1>
      </div>

      <div className="space-y-5 text-foreground font-body leading-relaxed w-full">
        <p>{t('smallStep.p1')}</p>
        <p>{t('smallStep.p2')}</p>
      </div>

      <div className="w-full">
        <ActivityInput
          label={t('smallStep.input1_label')}
          value={data.smallStep}
          onChange={(v) => onChange({ smallStep: v })}
          placeholder={t('smallStep.input1_placeholder')}
        />
      </div>

      <div className="space-y-3 w-full flex flex-col items-center">
        <Button variant="calmOutline" size="lg" onClick={onGoHome} className="w-full max-w-sm">
          {t('smallStep.button_home')}
        </Button>
      </div>
    </div>
  );
};

export default SmallStepScreen;
