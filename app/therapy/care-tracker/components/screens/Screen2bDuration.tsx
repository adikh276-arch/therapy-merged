"use client";
import React, { useState } from "react";
import MobileShell from "@/app/therapy/care-tracker/components/MobileShell";
import OptionChip from "@/app/therapy/care-tracker/components/OptionChip";
import ContinueButton from "@/app/therapy/care-tracker/components/ContinueButton";
import { DURATIONS } from "@/app/therapy/care-tracker/lib/selfcare-data";
import { useTranslation } from "react-i18next";

interface Screen2bProps {
  onContinue: (duration: string) => void;
}

const Screen2bDuration = ({ onContinue }: Screen2bProps) => {
  const { t } = useTranslation();
  const [duration, setDuration] = useState("");

  return (
    <MobileShell step={3} totalSteps={5}>
      <h1 className="font-display text-2xl font-bold tracking-tight">
        {t('screens.duration.title')}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">{t('screens.duration.subtitle') || "How long for?"}</p>

      <div className="mt-8 flex flex-wrap gap-2">
        {DURATIONS.map((d) => (
          <OptionChip key={d} label={t(`data.durations.${d}`)} selected={duration === d} onToggle={() => setDuration(duration === d ? "" : d)} />
        ))}
      </div>

      <ContinueButton onClick={() => onContinue(duration)} />
    </MobileShell>
  );
};

export default Screen2bDuration;
