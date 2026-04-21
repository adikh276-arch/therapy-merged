import { useState } from "react";
import SelectableTile from "../../components/SelectableTile";
import ActivityButton from "../../components/ActivityButton";
import StepProgress from "../../components/StepProgress";
import { useTranslation } from "react-i18next";

const MindHabitsScreen = ({ onNext }: { onNext: () => void }) => {
  const { t } = useTranslation();
  const options = t('mind_options', { returnObjects: true }) as string[];
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (item: string) =>
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );

  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm border border-border flex flex-col gap-5">
      <StepProgress current={2} total={4} />
      <h2 className="text-xl font-semibold text-foreground">{t('mind_title')}</h2>
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

export default MindHabitsScreen;
