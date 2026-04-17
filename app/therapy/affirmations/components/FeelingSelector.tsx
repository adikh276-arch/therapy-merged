import React from "react";
import { feelings } from "@/app/therapy/affirmations/data/affirmations";
import { useTranslation } from "react-i18next";

interface FeelingSelectorProps {
  onSelect: (feelingId: string, colorIndex: number) => void;
}

const pastelColors = [
  "bg-pastel-peach",
  "bg-pastel-lavender",
  "bg-pastel-mint",
  "bg-pastel-sky",
  "bg-pastel-rose",
  "bg-pastel-butter",
];

const FeelingSelector: React.FC<FeelingSelectorProps> = ({ onSelect }) => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col px-6 py-12">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <span className="mb-4 inline-block text-3xl">🌿</span>
          <h1 className="font-serif text-2xl font-medium tracking-tight text-foreground">
            {t("common.howFeeling")}
          </h1>
        </div>

        <div className="space-y-3 text-center text-sm leading-relaxed text-muted-foreground">
          <p>{t("common.noExplanation")}</p>
          <p>{t("common.justNotice")}</p>
          <p>{t("common.chooseOne")}</p>
        </div>

        <div className="space-y-3 pt-2">
          {feelings.map((feeling, index) => (
            <button
              key={feeling.id}
              onClick={() => onSelect(feeling.id, index % pastelColors.length)}
              className={`w-full rounded-2xl border border-border/50 px-5 py-4 text-left text-[15px] font-medium text-foreground shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-md active:scale-[0.98] ${pastelColors[index % pastelColors.length]}`}
            >
              {t(`feelings.${feeling.id}.label`)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeelingSelector;
