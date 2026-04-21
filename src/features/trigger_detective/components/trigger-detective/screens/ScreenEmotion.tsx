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

const EMOTION_KEYS = [
  "emotion_stressed", "emotion_bored", "emotion_tired", "emotion_anxious",
  "emotion_frustrated", "emotion_lonely", "emotion_restless", "emotion_happy",
];

const ScreenEmotion = ({ data, updateData, onNext, onBack }: Props) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string[]>(data.emotions);
  const [customMood, setCustomMood] = useState("");

  const toggle = (option: string) => {
    setSelected((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  const handleNext = () => {
    updateData({ emotions: selected });
    onNext();
  };

  return (
    <ScreenLayout onBack={onBack} title={t("emotion_title")}>
      <div className="text-justified text-foreground font-body text-[15px] leading-relaxed space-y-2 mb-6">
        <p>{t("emotion_para1")}</p>
        <p>{t("emotion_para2")}</p>
      </div>

      <ChipSelector
        options={EMOTION_KEYS.map(key => t(key))}
        selected={selected}
        onToggle={toggle}
      />

      <input
        type="text"
        placeholder={t("emotion_placeholder")}
        value={customMood}
        onChange={(e) => setCustomMood(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && customMood.trim()) {
            if (!selected.includes(customMood.trim())) {
              setSelected((prev) => [...prev, customMood.trim()]);
            }
            setCustomMood("");
          }
        }}
        className="mt-4 w-full px-4 py-3.5 rounded-lg border border-input bg-card text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
      />

      <div className="mt-auto pb-6 pt-6">
        <PrimaryButton onClick={handleNext}>{t("emotion_log_btn")}</PrimaryButton>
      </div>
    </ScreenLayout>
  );
};

export default ScreenEmotion;
