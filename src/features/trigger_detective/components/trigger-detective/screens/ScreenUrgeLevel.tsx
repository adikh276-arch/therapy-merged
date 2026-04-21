import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ScreenLayout from "../ScreenLayout";
import PrimaryButton from "../PrimaryButton";
import { TriggerData } from "../TriggerDetective";

interface Props {
  data: TriggerData;
  updateData: (d: Partial<TriggerData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const ScreenUrgeLevel = ({ data, updateData, onNext, onBack }: Props) => {
  const { t } = useTranslation();
  const [level, setLevel] = useState(data.urgeLevel);

  const handleNext = () => {
    updateData({ urgeLevel: level });
    onNext();
  };

  return (
    <ScreenLayout onBack={onBack} title={t("urge_title")}>
      <div className="text-justified text-foreground font-body text-[15px] leading-relaxed space-y-2 mb-8">
        <p>{t("urge_para1")}</p>
        <p>{t("urge_para2")}</p>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mb-4">
        {Array.from({ length: 10 }, (_, i) => (
          <motion.div
            key={i}
            animate={{ scale: i < level ? 1.1 : 0.9 }}
            className={`w-3.5 h-3.5 rounded-full transition-colors duration-200 ${
              i < level ? "bg-primary" : "bg-accent"
            }`}
          />
        ))}
      </div>

      {/* Slider */}
      <div className="px-2 mb-6">
        <input
          type="range"
          min={1}
          max={10}
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, hsl(28 100% 86%) 0%, hsl(16 100% 66%) ${(level - 1) * 11.1}%, hsl(28 40% 88%) ${(level - 1) * 11.1}%, hsl(28 40% 88%) 100%)`,
          }}
        />
      </div>

      <p className="text-center text-muted-foreground font-body text-sm mb-8">
        {t("urge_clue")}
      </p>

      <div className="mt-auto pb-6">
        <PrimaryButton onClick={handleNext}>{t("common_next")}</PrimaryButton>
      </div>
    </ScreenLayout>
  );
};

export default ScreenUrgeLevel;
