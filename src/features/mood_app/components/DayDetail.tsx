import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { format } from 'date-fns';
import { type MoodEntry, MOODS } from '@/types/mood';
import { useTranslation } from '@/contexts/TranslationContext';

interface Props {
  day: Date;
  entries: MoodEntry[];
  onClose: () => void;
}

export default function DayDetail({ day, entries, onClose }: Props) {
  const { t } = useTranslation();

  const getMoodInfo = (mood: string) => MOODS.find((m) => m.type === mood);

  return (
    <Sheet open onOpenChange={onClose}>
      <SheetContent side="bottom" className="rounded-t-3xl max-h-[70vh]">
        <SheetHeader>
          <SheetTitle className="text-left">
            {format(day, 'EEEE, MMMM d')}
          </SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-3 overflow-y-auto pb-6">
          {entries.length === 0 ? (
            <p className="text-muted-foreground text-center py-8 text-sm">
              {t('No entries for this day')}
            </p>
          ) : (
            entries
              .sort(
                (a, b) =>
                  new Date(b.timestamp).getTime() -
                  new Date(a.timestamp).getTime()
              )
              .map((entry, i) => {
                const info = getMoodInfo(entry.mood);
                return (
                  <div key={i} className="bg-secondary rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{info?.emoji}</span>
                      <div>
                        <p className="font-bold text-sm">
                          {t(info?.label || entry.mood)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(entry.timestamp), 'h:mm a')}
                        </p>
                      </div>
                    </div>
                    {entry.factors &&
                      (entry.factors as string[]).length > 0 && (
                        <div className="flex gap-1.5 mb-2">
                          {(entry.factors as string[]).map((f) => (
                            <span
                              key={f}
                              className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full font-medium"
                            >
                              {t(f)}
                            </span>
                          ))}
                        </div>
                      )}
                    {entry.tobacco_urge && entry.tobacco_urge !== 'none' && (
                      <p className="text-xs text-muted-foreground mb-1">
                        {t('Tobacco urge')}: {t(entry.tobacco_urge)}
                      </p>
                    )}
                    {entry.notes && (
                      <p className="text-sm mt-2 text-muted-foreground">
                        {entry.notes}
                      </p>
                    )}
                  </div>
                );
              })
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
