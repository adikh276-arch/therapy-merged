import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowLeft, History, Calendar, Heart, Sparkles } from "lucide-react";

interface PastEntry {
  date: string;
  gratitudes: { grateful: string; reason: string }[];
  feeling: string;
}

interface ScreenPastEntriesProps {
  entries: PastEntry[];
  onBack: () => void;
}

const ScreenPastEntries = ({ entries, onBack }: ScreenPastEntriesProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center py-6 pb-24">
      <div className="w-full max-w-lg space-y-8">
        <header className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="p-3 bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-colors shadow-sm"
          >
            <ArrowLeft size={20} />
          </motion.button>
          <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest">
            <Sparkles size={12} />
            History
          </div>
        </header>

        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">
            {t('past_entries_title')}
          </h1>
          <p className="text-slate-500 text-base font-medium leading-relaxed">
            Relive your moments of gratitude.
          </p>
        </div>

        {(!entries || entries.length === 0) ? (
          <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
            <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mx-auto mb-4 text-slate-200 shadow-sm">
                <History size={32} />
            </div>
            <p className="text-slate-400 font-bold">{t('no_entries')}</p>
          </div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence initial={false}>
              {entries.map((entry, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-sm space-y-6"
                >
                  <header className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest">
                        <Calendar size={14} />
                        {entry.date}
                    </div>
                  </header>

                  <div className="space-y-4">
                    {entry.gratitudes && Array.isArray(entry.gratitudes) && entry.gratitudes.map((g, j) => (
                      <div key={j} className="flex gap-4">
                        <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-primary shrink-0">
                            <Heart size={16} fill="currentColor" />
                        </div>
                        <div>
                          <p className="text-slate-800 font-bold text-sm leading-relaxed">
                            {g.grateful}
                          </p>
                          {g.reason && (
                            <p className="text-slate-400 text-xs font-medium mt-1 leading-relaxed">
                              {g.reason}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {entry.feeling && (
                    <div className="pt-4 border-t border-slate-50">
                        <p className="text-slate-400 text-xs font-medium italic">
                          "{entry.feeling}"
                        </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScreenPastEntries;
