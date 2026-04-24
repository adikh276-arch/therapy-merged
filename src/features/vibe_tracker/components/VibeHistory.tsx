import { useMemo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getVibeEntries, VibeEntry } from "../types/vibe";
import { ArrowLeft, Calendar, Clock, Heart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  onBack: () => void;
}

const vibeEmojiMap: Record<string, string> = {
  Calm: "🌷",
  Light: "🌤",
  Driven: "🔥",
  Content: "🌸",
  Steady: "🌊",
  Tender: "🤍",
  Heavy: "🌧",
  Thoughtful: "🌫",
  Restless: "⚡",
  Drained: "💔",
};

const VibeHistory = ({ onBack }: Props) => {
  const { t, i18n } = useTranslation();
  const [entries, setEntries] = useState<VibeEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVibeEntries().then(res => {
      setEntries(res);
      setLoading(false);
    });
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return t("today", "Today");
    if (date.toDateString() === yesterday.toDateString()) return t("yesterday", "Yesterday");

    return date.toLocaleDateString(i18n.language, {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString(i18n.language, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Group entries by date
  const grouped = useMemo(() => {
    const groups: Record<string, VibeEntry[]> = {};
    if (entries && Array.isArray(entries)) {
      entries.forEach((entry) => {
        const key = new Date(entry.timestamp).toDateString();
        if (!groups[key]) groups[key] = [];
        groups[key].push(entry);
      });
    }
    return Object.entries(groups).sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime());
  }, [entries]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Rewinding your journey...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
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
          Your Journey
        </div>
      </header>

      <div className="space-y-4">
        <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">
          {t("yourJourney")}
        </h1>
      </div>

      {(entries && entries.length) === 0 ? (
        <div className="p-12 bg-white rounded-[3rem] border-2 border-slate-50 text-center space-y-6">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                <Calendar size={40} />
            </div>
            <p className="text-slate-400 font-bold">{t("noVibes")}</p>
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onBack}
                className="w-full py-4 rounded-[2rem] bg-primary text-primary-foreground font-black shadow-lg"
            >
                {t("startFirstCheckIn")}
            </motion.button>
        </div>
      ) : (
        <div className="space-y-10">
          {grouped.map(([dateKey, dayEntries], groupIdx) => (
            <div key={dateKey} className="space-y-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4">
                {formatDate(dayEntries[0].timestamp)}
              </p>
 
              <div className="space-y-4">
                {dayEntries.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).map((entry, i) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (groupIdx * 2 + i) * 0.05 }}
                    className="p-8 bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-sm space-y-4 relative overflow-hidden group hover:border-primary/20 transition-all"
                  >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-2xl group-hover:bg-primary group-hover:text-white transition-colors">
                                {vibeEmojiMap[entry.vibe] || "✨"}
                            </div>
                            <div>
                                <h4 className="font-black text-slate-800 text-sm uppercase tracking-wider">
                                    {i18n.exists(`vibes.${entry.vibe}`) ? t(`vibes.${entry.vibe}`) : entry.vibe}
                                </h4>
                                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                    <Clock size={10} />
                                    {formatTime(entry.timestamp)}
                                </div>
                            </div>
                        </div>
                        <Heart size={16} className="text-slate-100 group-hover:text-primary transition-colors" fill="currentColor" />
                    </div>
 
                    {entry.reflections && entry.reflections.length > 0 && entry.reflections.some(r => r && r.trim()) && (
                      <div className="space-y-3 pt-2">
                        {entry.reflections
                          .filter((r) => r.trim())
                          .map((reflection, idx) => (
                            <p
                              key={idx}
                              className="text-slate-600 text-sm font-bold leading-relaxed line-clamp-3 italic"
                            >
                              "{reflection}"
                            </p>
                          ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VibeHistory;
