import React, { useEffect, useState } from "react";
import MobileShell from "../../components/MobileShell";
import { fetchLast7Days, formatDateShort, SelfCareEntry } from "../../lib/selfcare-data";
import { ArrowLeft, Loader2, Calendar, History, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../components/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";

interface Screen7Props {
  onBack: () => void;
}

const Screen7History = ({ onBack }: Screen7Props) => {
  const { t } = useTranslation();
  const { userId } = useAuth();
  const [entries, setEntries] = useState<SelfCareEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (userId) {
        const data = await fetchLast7Days(userId);
        setEntries(data);
      }
      setLoading(false);
    };
    loadData();
  }, [userId]);

  return (
    <MobileShell>
      <header className="flex items-center justify-between mb-8">
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
            Self-Care History
          </div>
      </header>

      <div className="text-left mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-1">{t('screens.history.title')}</h1>
        <p className="text-slate-500 text-sm font-medium">Your progress over the last 7 days</p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Fetching your data...</p>
        </div>
      ) : (entries && entries.length) === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
          <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mx-auto mb-4 text-slate-200 shadow-sm">
              <History size={32} />
          </div>
          <p className="text-slate-400 font-bold mb-6">{t('screens.history.subtitle') || "No entries yet"}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-2xl shadow-lg shadow-primary/20"
          >
            Start Check-in
          </motion.button>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {entries.map((entry, i) => (
                <motion.div
                    key={entry.date}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                >
                    <DayCard entry={entry} />
                </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </MobileShell>
  );
};
 
const DayCard = ({ entry }: { entry: SelfCareEntry }) => {
  const { t } = useTranslation();
 
  const keyInfo = entry.didSelfCare
    ? (entry.activities && entry.activities[0] ? t(`data.activities.${entry.activities[0]}`) : t('common.yes'))
    : (entry.preventionReasons && entry.preventionReasons[0] ? t(`data.reasons.${entry.preventionReasons[0]}`) : t('common.no'));

  return (
    <div className="group bg-white rounded-[2rem] border-2 border-slate-100 p-6 flex items-center justify-between transition-all hover:border-primary/20 hover:shadow-md">
      <div className="flex items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-2xl group-hover:bg-primary/10 transition-colors">
            {entry.moodEmoji || <Calendar size={24} className="text-slate-300" />}
        </div>
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            {formatDateShort(entry.date)}
          </p>
          <p className="text-base font-bold text-slate-800 mt-0.5 line-clamp-1">
            {keyInfo}
          </p>
        </div>
      </div>
      <div
        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${entry.didSelfCare
          ? "bg-primary/10 text-primary"
          : "bg-slate-100 text-slate-400"
          }`}
      >
        {entry.didSelfCare ? t('common.yes') : t('common.no')}
      </div>
    </div>
  );
};

export default Screen7History;
