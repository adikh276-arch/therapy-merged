import { useNavigate } from "react-router-dom";
import { getCheckIns, groupByDate, type CheckInEntry } from "@/lib/checkInStorage";
import { ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";


const EntryCard = ({ entry }: { entry: CheckInEntry }) => {
  const { t } = useTranslation();

  const intensityLabel = (v: number) => {
    if (v <= 3) return t('mild');
    if (v <= 6) return t('moderate');
    if (v <= 8) return t('strong');
    return t('very_strong');
  };

  const choiceLabel: Record<string, string> = {
    didnt: t('didnt_act'),
    acted: t('acted'),
    deciding: t('still_deciding'),
  };

  const time = new Date(entry.date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="bg-card rounded-xl p-4 border border-border animate-soft-fade">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground">{time}</span>
        {entry.craving ? (
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-accent-amber/20 text-foreground">
            {t('craving')}
          </span>
        ) : (
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-accent-sage/20 text-foreground">
            {t('no_craving')}
          </span>
        )}

      </div>

      {entry.craving && (
        <div className="flex flex-col gap-1.5 mt-2">
          {entry.intensity && (
            <div className="flex items-center gap-2">
              <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(entry.intensity / 10) * 100}%`,
                    backgroundColor: "hsl(var(--slider-fill))",
                  }}
                />
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {entry.intensity}/10 · {intensityLabel(entry.intensity)}
              </span>
            </div>
          )}
          {entry.trigger && (
            <p className="text-sm text-muted-foreground">
              {t('trigger')} <span className="text-foreground">{entry.trigger}</span>
            </p>
          )}

          {entry.choice && (
            <p className="text-sm text-muted-foreground">
              {t('outcome')} <span className="text-foreground">{choiceLabel[entry.choice] || entry.choice}</span>
            </p>
          )}

        </div>
      )}
    </div>
  );
};

import { useState, useEffect } from "react";

const History = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [entries, setEntries] = useState<CheckInEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      const data = await getCheckIns();
      setEntries(data);
      setLoading(false);
    };
    fetchEntries();
  }, []);

  const grouped = groupByDate(entries);
  const dates = Object.keys(grouped);


  return (
    <div className="min-h-dvh bg-app-gradient flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-safe-top py-4">
        <button
          onClick={() => navigate("/")}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-card border border-border active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="font-heading font-semibold text-xl text-foreground">{t('history')}</h1>
      </div>


      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center flex-1 min-h-[60vh]">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : dates.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 min-h-[60vh] animate-soft-fade">

            <p className="text-muted-foreground text-center text-lg font-heading">{t('no_checkins')}</p>
            <p className="text-muted-foreground text-center text-sm mt-1">
              {t('complete_checkin_hint')}
            </p>
          </div>
        ) : (

          <div className="flex flex-col gap-6">
            {dates.map((date) => (
              <div key={date}>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3 font-semibold">
                  {date}
                </p>
                <div className="flex flex-col gap-3">
                  {grouped[date].map((entry) => (
                    <EntryCard key={entry.id} entry={entry} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
