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

const Screen7History = () => {
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
    <div className="space-y-6">
      <div className="text-left">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-1">{t('screens.history.title')}</h2>
        <p className="text-slate-500 text-sm font-medium">Your progress over the last 7 days</p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary opacity-20" />
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Fetching data...</p>
        </div>
      ) : (entries && entries.length) === 0 ? (
        <div className="text-center py-16 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-100">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-200 shadow-sm">
              <History size={32} />
          </div>
          <p className="text-slate-400 font-bold text-sm px-8">{t('screens.history.subtitle') || "No entries yet. Start your self-care journey today."}</p>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {entries.map((entry, i) => (
                <motion.div
                    key={entry.date}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                >
                    <DayCard entry={entry} />
                </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
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
