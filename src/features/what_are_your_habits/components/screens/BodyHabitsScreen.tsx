import { useState } from "react";
import SelectableTile from "../../components/SelectableTile";
import ActivityButton from "../../components/ActivityButton";
import StepProgress from "../../components/StepProgress";
import { useTranslation } from "react-i18next";

const BodyHabitsScreen = ({ onNext }: { onNext: () => void }) => {
  const { t } = useTranslation();
  const options = t('body_options', { returnObjects: true }) as string[];
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (item: string) =>
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );

  return (
    <div className="bg-transparent rounded-2xl p-6  border border-border flex flex-col gap-5">
      <StepProgress current={1} total={4} />
      <h2 className="text-xl font-semibold text-foreground">{t('body_title')}</h2>
      <p className="text-sm text-muted-foreground text-justified">{t('body_subtitle')}</p>
      <div className="flex flex-col gap-3">
        {options.map((opt) => (
          <SelectableTile
            key={opt}
            label={opt}
            selected={selected.includes(opt)}
            onToggle={() => toggle(opt)}
          />
        ))}
      </div>
      <ActivityButton label={t('continue')} onClick={onNext} />
    </div>
  );
};

export default BodyHabitsScreen;
