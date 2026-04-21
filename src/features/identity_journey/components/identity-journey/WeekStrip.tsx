import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface WeekStripProps {
  loggedDays: (number | null)[];
  viewingDate: Date;
  onPrevWeek: () => void;
  onNextWeek: () => void;
}

const ITEM_COLORS = [
  "bg-violet-500",
  "bg-amber-500",
  "bg-emerald-500",
  "bg-rose-500",
  "bg-sky-500",
];

const WeekStrip = ({ loggedDays, viewingDate, onPrevWeek, onNextWeek }: WeekStripProps) => {
  const { t } = useTranslation();

  const days = [
    t("mon"),
    t("tue"),
    t("wed"),
    t("thu"),
    t("fri"),
    t("sat"),
    t("sun"),
  ];

  // Get week range text
  const getWeekRange = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    const start = new Date(d.setDate(diff));
    const end = new Date(d.setDate(diff + 6));

    const formatDateShort = (dt: Date) => {
      return dt.toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
    };

    return `${formatDateShort(start)} - ${formatDateShort(end)}`;
  };

  return (
    <div className="card-base">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            {t('your_week', 'Your week')}
          </p>
          <p className="text-xs font-semibold text-foreground/80">
            {getWeekRange(viewingDate)}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onPrevWeek}
            className="p-1 rounded-full hover:bg-muted transition-colors text-muted-foreground"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={onNextWeek}
            className="p-1 rounded-full hover:bg-muted transition-colors text-muted-foreground"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex justify-between">
        {days.map((d, i) => {
          const selectedIndex = loggedDays[i];
          const isLogged = selectedIndex !== null && selectedIndex !== undefined;

          return (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div
                className={`w-8 h-8 rounded-lg transition-colors border-2 ${isLogged
                    ? `${ITEM_COLORS[selectedIndex as number]} border-transparent shadow-sm`
                    : "border-muted bg-transparent opacity-40"
                  }`}
              />
              <span className="text-[10px] text-muted-foreground font-medium uppercase">{d}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeekStrip;
