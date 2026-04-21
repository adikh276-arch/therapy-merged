import React, { useState } from "react";
import MobileShell from "@/components/MobileShell";
import OptionChip from "@/components/OptionChip";
import ContinueButton from "@/components/ContinueButton";
import { PREVENTION_REASONS, HELPFUL_TYPES } from "@/lib/selfcare-data";
import { useTranslation } from "react-i18next";

interface Screen3Props {
  onContinue: (reasons: string[], helpfulType: string) => void;
}

const Screen3NoSelfCare = ({ onContinue }: Screen3Props) => {
  const { t } = useTranslation();
  const [reasons, setReasons] = useState<string[]>([]);
  const [helpfulType, setHelpfulType] = useState("");

  const toggleReason = (r: string) => {
    setReasons((prev) =>
      prev.includes(r) ? prev.filter((s) => s !== r) : [...prev, r]
    );
  };

  return (
    <MobileShell step={2} totalSteps={5}>
      <h1 className="font-display text-2xl font-bold tracking-tight">
        {t('screens.noSelfCare.title')}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">{t('screens.noSelfCare.subtitle') || "Let's understand what happened today."}</p>

      <div className="mt-6">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {t('screens.noSelfCare.question1')}
        </label>
        <div className="mt-3 flex flex-wrap gap-2">
          {PREVENTION_REASONS.map((r) => (
            <OptionChip key={r} label={t(`data.reasons.${r}`)} selected={reasons.includes(r)} onToggle={() => toggleReason(r)} />
          ))}
        </div>
      </div>

      <div className="mt-8">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {t('screens.noSelfCare.question2')}
        </label>
        <div className="mt-3 flex flex-wrap gap-2">
          {HELPFUL_TYPES.map((ht) => (
            <OptionChip key={ht} label={t(`data.helpfulTypes.${ht}`)} selected={helpfulType === ht} onToggle={() => setHelpfulType(helpfulType === ht ? "" : ht)} />
          ))}
        </div>
      </div>

      <ContinueButton onClick={() => onContinue(reasons, helpfulType)} />
    </MobileShell>
  );
};

export default Screen3NoSelfCare;
