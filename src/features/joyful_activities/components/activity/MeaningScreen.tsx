import { Button } from "@/components/ui/button";
import ActivityInput from "./ActivityInput";
import type { ActivityData } from "@/pages/Index";
import { useTranslation } from "react-i18next";

interface Props {
  data: ActivityData;
  onChange: (fields: Partial<ActivityData>) => void;
  onNext: () => void;
}

const MeaningScreen = ({ data, onChange, onNext }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="animate-fade-in-up space-y-8 flex flex-col items-center text-center w-full">
      <div className="space-y-2 w-full">
        <h1 className="text-[22px] font-heading font-semibold text-foreground">
          {t('meaning.title')}
        </h1>
      </div>

      <p className="text-foreground font-body leading-relaxed w-full">
        {t('meaning.p1')}
      </p>

      <div className="space-y-6 w-full">
        <ActivityInput
          label={t('meaning.input1_label')}
          value={data.enjoyBecause}
          onChange={(v) => onChange({ enjoyBecause: v })}
          placeholder={t('meaning.input1_placeholder')}
        />
        <ActivityInput
          label={t('meaning.input2_label')}
          value={data.feelsMore}
          onChange={(v) => onChange({ feelsMore: v })}
          placeholder={t('meaning.input2_placeholder')}
        />
        <ActivityInput
          label={t('meaning.input3_label')}
          value={data.remindsOf}
          onChange={(v) => onChange({ remindsOf: v })}
          placeholder={t('meaning.input3_placeholder')}
        />
      </div>

      <Button variant="calm" size="lg" onClick={onNext} className="w-full max-w-sm">
        {t('meaning.button')}
      </Button>
    </div>
  );
};

export default MeaningScreen;
