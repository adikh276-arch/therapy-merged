import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  getEntriesForMonth,
  GratitudeEntry,
} from "../lib/gratitudeStore";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  addMonths,
  subMonths,
  isSameDay,
} from "date-fns";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Heart, ArrowLeft, Home } from "lucide-react";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const History = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedEntry, setSelectedEntry] = useState<GratitudeEntry | null>(null);
  const [entries, setEntries] = useState<GratitudeEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  useEffect(() => {
    const fetchEntries = async () => {
      setIsLoading(true);
      try {
        const data = await getEntriesForMonth(year, month);
        setEntries(data);
      } catch (error) {
        console.error("Fetch history error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEntries();
  }, [year, month]);

  const entryDates = useMemo(() => {
    const map = new Map<string, GratitudeEntry>();
    entries.forEach((e) => {
      if (!map.has(e.date)) {
        map.set(e.date, e);
      }
    });
    return map;
  }, [entries]);

  const days = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const startDayOfWeek = getDay(days[0]);

  const handleDateTap = (day: Date) => {
    const iso = format(day, "yyyy-MM-dd");
    const entry = entryDates.get(iso);
    if (entry) {
      setSelectedEntry(entry);
    } else {
        setSelectedEntry(null);
    }
  };

  return (
    <div className="flex flex-col items-center py-6 pb-24">
      <div className="w-full max-w-lg space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
            {t("history.heading")}
          </h1>
          <p className="text-slate-500 text-sm">
            Relive your moments of gratitude
          </p>
        </header>

        {/* Month navigation */}
        <div className="bg-white rounded-3xl border-2 border-slate-100 p-2 flex items-center justify-between shadow-sm">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-3 bg-slate-50 text-slate-600 rounded-2xl hover:bg-slate-100 transition-all"
          >
            <ChevronLeft size={20} />
          </motion.button>
          <h2 className="text-lg font-bold text-slate-800">
            {format(currentMonth, "MMMM yyyy")}
          </h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-3 bg-slate-50 text-slate-600 rounded-2xl hover:bg-slate-100 transition-all"
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>

        {/* Calendar grid */}
        <div className="bg-white rounded-[2.5rem] border-2 border-slate-100 p-6 shadow-sm min-h-[360px] flex flex-col">
          {isLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {WEEKDAYS.map((d) => (
                  <div key={d} className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {t(`history.${d.toLowerCase()}`).substring(0, 3)}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: startDayOfWeek }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {days.map((day) => {
                  const iso = format(day, "yyyy-MM-dd");
                  const hasEntry = entryDates.has(iso);
                  const isToday = isSameDay(day, new Date());
                  const isSelected = selectedEntry?.date === iso;

                  return (
                    <motion.button
                      key={iso}
                      whileHover={hasEntry ? { scale: 1.1 } : {}}
                      whileTap={hasEntry ? { scale: 0.9 } : {}}
                      onClick={() => handleDateTap(day)}
                      className={`relative aspect-square flex flex-col items-center justify-center rounded-2xl text-sm font-bold transition-all ${
                        isSelected
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                          : isToday
                            ? "bg-primary/10 text-primary"
                            : hasEntry
                              ? "bg-slate-50 text-slate-700 hover:bg-slate-100"
                              : "text-slate-300 pointer-events-none"
                      }`}
                    >
                      {day.getDate()}
                      {hasEntry && !isSelected && (
                        <div className="absolute bottom-2 w-1 h-1 rounded-full bg-primary" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Selected entry detail */}
        <AnimatePresence mode="wait">
          {selectedEntry ? (
            <motion.div
              key={selectedEntry.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-[2.5rem] border-2 border-slate-100 p-8 shadow-sm space-y-6 text-left"
            >
              <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                <div className="flex items-center gap-2 text-slate-500">
                   <CalendarIcon size={16} />
                   <span className="text-xs font-bold uppercase tracking-wider">
                     {format(new Date(selectedEntry.date + "T00:00:00"), "MMMM d, yyyy")}
                   </span>
                </div>
                <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full">
                   <span className="text-lg">{selectedEntry.mood.emoji}</span>
                   <span className="text-xs font-bold">{t(`mood.${selectedEntry.mood.label.toLowerCase()}`)}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                 <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t("review.gratitude1")}</p>
                    <p className="text-slate-700 font-medium leading-relaxed">{selectedEntry.gratitude1}</p>
                 </div>
                 {selectedEntry.gratitude2 && (
                   <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t("review.gratitude2")}</p>
                      <p className="text-slate-700 font-medium leading-relaxed">{selectedEntry.gratitude2}</p>
                   </div>
                 )}
              </div>
            </motion.div>
          ) : (
             <div className="py-12 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-200">
                   <CalendarIcon size={32} />
                </div>
                <p className="text-slate-400 font-medium">Select a marked date to view entry</p>
             </div>
          )}
        </AnimatePresence>

        {/* Bottom Actions */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-lg px-6 z-20">
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(-1)}
              className="flex-1 py-4 rounded-[2rem] bg-white border-2 border-slate-100 text-slate-600 font-bold shadow-sm flex items-center justify-center gap-2"
            >
              <ArrowLeft size={20} />
              {t("history.back")}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("..")}
              className="flex-1 py-4 rounded-[2rem] bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
            >
              <Home size={20} />
              {t("history.home")}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
