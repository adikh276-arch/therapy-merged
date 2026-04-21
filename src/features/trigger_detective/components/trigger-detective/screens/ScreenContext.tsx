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

const LOCATION_KEYS = [
  "location_home", "location_work", "location_outside", 
  "location_social", "location_alone", "location_friends"
];

const ScreenContext = ({ data, updateData, onNext, onBack }: Props) => {
  const { t } = useTranslation();
  const [location, setLocation] = useState(data.location);
  const [activity, setActivity] = useState(data.activity);

  const handleNext = () => {
    updateData({ location, activity });
    onNext();
  };

  return (
    <ScreenLayout onBack={onBack} title={t("context_title")}>
      <ChipSelector
        options={LOCATION_KEYS.map(key => t(key))}
        selected={location ? [location] : []}
        onToggle={(opt) => setLocation(opt === location ? "" : opt)}
      />

      <div className="mt-6 mb-2">
        <p className="text-justified text-foreground font-body text-[15px] leading-relaxed">
          {t("context_activity_q")}
        </p>
      </div>

      <input
        type="text"
        placeholder={t("context_activity_placeholder")}
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
        className="w-full px-4 py-3.5 rounded-lg border border-input bg-card text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 mb-6"
      />

      <div className="mt-auto pb-6">
        <PrimaryButton onClick={handleNext}>{t("common_next")}</PrimaryButton>
      </div>
    </ScreenLayout>
  );
};

export default ScreenContext;
