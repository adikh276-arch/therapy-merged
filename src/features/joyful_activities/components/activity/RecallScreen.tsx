import { Button } from "@/components/ui/button";
import ActivityInput from "./ActivityInput";
import type { ActivityData } from "@/pages/Index";
import { useTranslation } from "react-i18next";

interface Props {
  data: ActivityData;
  onChange: (fields: Partial<ActivityData>) => void;
  onNext: () => void;
}

const RecallScreen = ({ data, onChange, onNext }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="animate-fade-in-up space-y-8 flex flex-col items-center text-center w-full">
      <div className="space-y-2 w-full">
        <h1 className="text-[22px] font-heading font-semibold text-foreground">
          {t('recall.title')}
        </h1>
      </div>

      <p className="text-foreground font-body leading-relaxed w-full">
        {t('recall.p1')}
      </p>

      <div className="space-y-6 w-full">
        <ActivityInput
          label={t('recall.input1_label')}
          value={data.activity}
          onChange={(v) => onChange({ activity: v })}
          placeholder={t('recall.input1_placeholder')}
        />
        <ActivityInput
          label={t('recall.input2_label')}
          value={data.feeling}
          onChange={(v) => onChange({ feeling: v })}
          placeholder={t('recall.input2_placeholder')}
        />
      </div>

      <Button variant="calm" size="lg" onClick={onNext} className="w-full max-w-sm">
        {t('recall.button')}
      </Button>
    </div>
  );
};

export default RecallScreen;
