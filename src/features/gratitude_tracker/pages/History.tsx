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
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Loader2, Sparkles } from "lucide-react";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const History = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedEntry, setSelectedEntry] = useState<GratitudeEntry | null>(null);
  const [entries, setEntries] = useState<GratitudeEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  useEffect(() => {
    const fetchEntries = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getEntriesForMonth(year, month);
        setEntries(data);
      } catch (error) {
        console.error("Fetch history error:", error);
        setError("Failed to load history. Please try again.");
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
    <PremiumLayout 
      title="Gratitude History" 
      onSecondaryBack={() => navigate("..")}
      secondaryBackLabel="Back to Journal"
    >
      <div className="w-full space-y-8">
        {error && (
          <div className="text-center py-20">
            <p className="text-red-500 font-medium">{error}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-3 bg-primary text-primary-foreground font-black rounded-2xl shadow-xl shadow-primary/20"
            >
              Retry
            </motion.button>
          </div>
        )}

        {!error && (
          <>
        <header className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">{t("history.heading")}</h2>
            <div className="flex items-center gap-2 text-primary">
              <Sparkles size={12} />
              <p className="text-[10px] font-black uppercase tracking-widest">Relive your moments</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 p-1.5 rounded-2xl border border-slate-100 shadow-sm">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              className="p-2 bg-white text-slate-400 rounded-xl hover:text-slate-800 transition-all border border-slate-100"
            >
              <ChevronLeft size={16} strokeWidth={3} />
            </motion.button>
            <span className="text-sm font-black text-slate-700 min-w-[120px] text-center">
              {format(currentMonth, "MMM yyyy")}
            </span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="p-2 bg-white text-slate-400 rounded-xl hover:text-slate-800 transition-all border border-slate-100"
            >
              <ChevronRight size={16} strokeWidth={3} />
            </motion.button>
          </div>
        </header>

        {/* Calendar grid */}
        <div className="bg-white rounded-[2.5rem] border-2 border-slate-100 p-8 shadow-sm min-h-[380px] flex flex-col relative overflow-hidden group hover:border-primary/20 transition-all">
          {isLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <Loader2 className="w-10 h-10 animate-spin text-primary opacity-20" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-7 gap-3 mb-6">
                {WEEKDAYS.map((d) => (
                  <div key={d} className="text-center text-[10px] font-black text-slate-300 uppercase tracking-widest">
                    {t(`history.${d.toLowerCase()}`).substring(0, 3)}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-3">
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
                      whileHover={hasEntry ? { scale: 1.1, y: -2 } : {}}
                      whileTap={hasEntry ? { scale: 0.95 } : {}}
                      onClick={() => handleDateTap(day)}
                      className={`relative aspect-square flex flex-col items-center justify-center rounded-2xl text-sm font-black transition-all ${
                        isSelected
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                          : isToday
                            ? "bg-primary/10 text-primary"
                            : hasEntry
                              ? "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-100"
                              : "text-slate-200 pointer-events-none"
                      }`}
                    >
                      {day.getDate()}
                      {hasEntry && !isSelected && (
                        <div className="absolute bottom-2.5 w-1.5 h-1.5 rounded-full bg-primary shadow-sm" />
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
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="bg-white rounded-[2.5rem] border-2 border-slate-100 p-8 shadow-sm space-y-6 text-left"
            >
              <div className="flex items-center justify-between border-b border-slate-50 pb-6">
                <div className="flex items-center gap-3 text-slate-400">
                   <div className="p-2 bg-slate-50 rounded-xl">
                    <CalendarIcon size={18} />
                   </div>
                   <span className="text-xs font-black uppercase tracking-widest">
                     {format(new Date(selectedEntry.date + "T00:00:00"), "MMMM d, yyyy")}
                   </span>
                </div>
                <div className="flex items-center gap-3 bg-primary/10 text-primary px-4 py-2 rounded-2xl">
                   <span className="text-2xl filter drop-shadow-sm">{selectedEntry.mood.emoji}</span>
                   <span className="text-xs font-black uppercase tracking-widest">{t(`mood.${selectedEntry.mood.label.toLowerCase()}`)}</span>
                </div>
              </div>
              
              <div className="space-y-6">
                 <div>
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">{t("review.gratitude1")}</p>
                    <p className="text-slate-700 font-bold text-lg leading-relaxed">{selectedEntry.gratitude1}</p>
                 </div>
                 {selectedEntry.gratitude2 && (
                   <div>
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">{t("review.gratitude2")}</p>
                      <p className="text-slate-700 font-bold text-lg leading-relaxed">{selectedEntry.gratitude2}</p>
                   </div>
                 )}
              </div>
            </motion.div>
          ) : (
             <div className="py-16 text-center bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-100">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-100 shadow-sm">
                   <CalendarIcon size={36} />
                </div>
                <p className="text-slate-400 font-black text-xs uppercase tracking-widest">Select a date to relive gratitude</p>
             </div>
          )}
        </AnimatePresence>

        <div className="pt-8 pb-12">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("..")}
            className="w-full py-5 rounded-[2rem] bg-primary text-primary-foreground font-black text-lg shadow-xl shadow-primary/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3"
          >
            Create New Entry
            <Sparkles size={20} />
          </motion.button>
        </div>
          </>
        )}
      </div>
    </PremiumLayout>
  );
};

export default History;
