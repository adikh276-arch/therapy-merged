import { useState } from "react";
import { useTranslation } from "react-i18next";
import ScreenLayout from "../ScreenLayout";
import PrimaryButton from "../PrimaryButton";
import ChipSelector from "../ChipSelector";
import { TriggerData } from "../TriggerDetective";

interface Props {
  data: TriggerData;
  updateData: (d: Partial<TriggerData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const TRIGGER_KEYS = [
  "trigger_option_stress", "trigger_option_boredom", "trigger_option_loneliness", 
  "trigger_option_anxiety", "trigger_option_social_pressure",
  "trigger_option_routine", "trigger_option_celebration", "trigger_option_seeing_someone",
  "trigger_option_place", "trigger_option_time",
];

const ScreenTriggers = ({ data, updateData, onNext, onBack }: Props) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string[]>(data.triggers);

  const toggle = (option: string) => {
    setSelected((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  const addCustom = (value: string) => {
    if (value.trim() && !selected.includes(value.trim())) {
      setSelected((prev) => [...prev, value.trim()]);
    }
  };

  const handleNext = () => {
    updateData({ triggers: selected });
    onNext();
  };

  return (
    <ScreenLayout onBack={onBack} title={t("triggers_title")}>
      <div className="text-justified text-foreground font-body text-[15px] leading-relaxed space-y-2 mb-6">
        <p>{t("triggers_para1")}</p>
        <p>{t("triggers_para2")}</p>
      </div>

      <ChipSelector
        options={TRIGGER_KEYS.map(key => t(key))}
        selected={selected}
        onToggle={toggle}
        allowCustom
        onAddCustom={addCustom}
      />

      <div className="mt-auto pb-6 pt-6">
        <PrimaryButton onClick={handleNext}>{t("common_next")}</PrimaryButton>
      </div>
    </ScreenLayout>
  );
};

export default ScreenTriggers;
