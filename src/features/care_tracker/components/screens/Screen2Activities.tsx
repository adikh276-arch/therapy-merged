import React, { useState } from "react";
import MobileShell from "@/components/MobileShell";
import OptionChip from "@/components/OptionChip";
import ContinueButton from "@/components/ContinueButton";
import { Input } from "@/components/ui/input";
import { ACTIVITIES } from "@/lib/selfcare-data";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Screen2Props {
  onContinue: (activities: string[]) => void;
}

const Screen2Activities = ({ onContinue }: Screen2Props) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string[]>([]);
  const [customActivity, setCustomActivity] = useState("");
  const [customList, setCustomList] = useState<string[]>([]);

  const toggle = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((s) => s !== item) : [...prev, item]
    );
  };

  const addCustom = () => {
    const trimmed = customActivity.trim();
    if (trimmed && !customList.includes(trimmed) && !ACTIVITIES.includes(trimmed)) {
      setCustomList((prev) => [...prev, trimmed]);
      setSelected((prev) => [...prev, trimmed]);
      setCustomActivity("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addCustom();
    }
  };

  return (
    <MobileShell step={2} totalSteps={5}>
      <h1 className="font-display text-2xl font-bold tracking-tight">
        {t('screens.activities.title')}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">{t('screens.activities.subtitle')}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {ACTIVITIES.map((a) => (
          <OptionChip key={a} label={t(`data.activities.${a}`)} selected={selected.includes(a)} onToggle={() => toggle(a)} />
        ))}
        {customList.map((a) => (
          <OptionChip key={a} label={a} selected={selected.includes(a)} onToggle={() => toggle(a)} />
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <Input
          value={customActivity}
          onChange={(e) => setCustomActivity(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('common.continue')}
          className="rounded-xl"
        />
        <button
          onClick={addCustom}
          disabled={!customActivity.trim()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 border-primary bg-primary text-primary-foreground transition-all disabled:opacity-40"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <ContinueButton
        onClick={() => onContinue(selected)}
        disabled={selected.length === 0}
      />
    </MobileShell>
  );
};

export default Screen2Activities;
