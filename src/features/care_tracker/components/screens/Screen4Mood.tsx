import React, { useState } from "react";
import MobileShell from "@/components/MobileShell";
import ContinueButton from "@/components/ContinueButton";
import { MOODS } from "@/lib/selfcare-data";
import { useTranslation } from "react-i18next";

interface Screen4Props {
  onContinue: (mood: string, emoji: string) => void;
}

const Screen4Mood = ({ onContinue }: Screen4Props) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <MobileShell step={4} totalSteps={5}>
      <h1 className="font-display text-2xl font-bold tracking-tight">
        {t('screens.mood.title')}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">{t('screens.mood.subtitle') || "Select your current mood (optional)"}</p>

      <div className="mt-8 grid grid-cols-3 gap-3">
        {MOODS.map((m, i) => (
          <button
            key={m.label}
            onClick={() => setSelected(selected === i ? null : i)}
            className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all duration-200 active:scale-95 ${selected === i
                ? "border-primary bg-primary/10 shadow-sm"
                : "border-border bg-card hover:border-primary/30"
              }`}
          >
            <span className="text-3xl">{m.emoji}</span>
            <span className="text-xs font-medium text-card-foreground">{t(`data.moods.${m.label}`)}</span>
          </button>
        ))}
      </div>

      <ContinueButton
        onClick={() => {
          if (selected !== null) {
            onContinue(MOODS[selected].label, MOODS[selected].emoji);
          } else {
            onContinue("", "");
          }
        }}
      />
    </MobileShell>
  );
};

export default Screen4Mood;
