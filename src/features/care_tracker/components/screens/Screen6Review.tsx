import React from "react";
import MobileShell from "@/components/MobileShell";
import { Button } from "@/components/ui/button";
import { SelfCareEntry, formatDateShort } from "@/lib/selfcare-data";
import { Pencil, CalendarDays, Home } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Screen6Props {
  entry: SelfCareEntry;
  onEdit: () => void;
  onHistory: () => void;
  onHome: () => void;
}

const Screen6Review = ({ entry, onEdit, onHistory, onHome }: Screen6Props) => {
  const { t } = useTranslation();

  const rows: { label: string; value: string }[] = [
    { label: t('common.date'), value: formatDateShort(entry.date) },
    { label: t('screens.review.didSelfCare'), value: entry.didSelfCare ? `${t('common.yes')} ✅` : `${t('common.no')} ❌` },
  ];

  if (entry.didSelfCare) {
    if (entry.activities.length) {
      rows.push({
        label: t('screens.review.activities'),
        value: entry.activities.map(a => t(`data.activities.${a}`)).join(", ")
      });
    }
    if (entry.duration) {
      rows.push({
        label: t('screens.review.duration'),
        value: t(`data.durations.${entry.duration}`)
      });
    }
  } else {
    if (entry.preventionReasons.length) {
      rows.push({
        label: t('screens.review.challenges'),
        value: entry.preventionReasons.map(r => t(`data.reasons.${r}`)).join(", ")
      });
    }
    if (entry.helpfulType) {
      rows.push({
        label: t('screens.review.whatHelps'),
        value: t(`data.helpfulTypes.${entry.helpfulType}`)
      });
    }
  }

  if (entry.mood) {
    rows.push({
      label: t('screens.review.mood'),
      value: `${entry.moodEmoji} ${t(`data.moods.${entry.mood}`)}`
    });
  }

  return (
    <MobileShell step={5} totalSteps={5}>
      <h1 className="font-display text-2xl font-bold tracking-tight">
        {t('screens.review.title')}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">{t('screens.review.subtitle')}</p>

      <div className="mt-6 space-y-3">
        {rows.map((r) => (
          <div key={r.label} className="rounded-xl bg-card p-4 border border-border">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {r.label}
            </span>
            <p className="mt-1 text-sm font-medium text-card-foreground">{r.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 pb-4">
        <Button onClick={onEdit} variant="outline" className="w-full rounded-2xl py-5 gap-2">
          <Pencil className="h-4 w-4" /> {t('screens.review.editToday')}
        </Button>
        <Button onClick={onHistory} variant="outline" className="w-full rounded-2xl py-5 gap-2">
          <CalendarDays className="h-4 w-4" /> {t('screens.review.viewHistory')}
        </Button>
        <Button onClick={onHome} className="w-full rounded-2xl py-5 gap-2">
          <Home className="h-4 w-4" /> {t('common.home')}
        </Button>
      </div>
    </MobileShell>
  );
};

export default Screen6Review;
