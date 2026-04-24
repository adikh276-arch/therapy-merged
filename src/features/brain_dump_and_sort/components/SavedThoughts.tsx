import { ArrowLeft, Trash2, Calendar, History, Inbox, Clock, Trash } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ThoughtItem } from "./types";
import { motion, AnimatePresence } from "framer-motion";

interface SavedSession {
  id: string;
  date: string;
  thoughts: ThoughtItem[];
  reflection?: string;
}

interface Props {
  sessions: SavedSession[];
  onBack: () => void;
  onDelete: (id: string) => void;
}

export const SavedThoughts = ({ sessions, onBack, onDelete }: Props) => {
  const { t } = useTranslation();

  const bucketLabels: Record<string, { icon: React.ReactNode; label: string; color: string }> = {
    action: { icon: <Inbox size={14} />, label: t("action_needed"), color: "#61DAFB" },
    later: { icon: <Clock size={14} />, label: t("do_later"), color: "#FBBF24" },
    letgo: { icon: <Trash size={14} />, label: t("let_it_go"), color: "#94A3B8" },
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col items-center py-6 pb-24">
      <div className="w-full max-w-lg space-y-8">
        <header className="flex items-center justify-between">
          <div className="text-left">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-1">{t("history")}</h1>
            <p className="text-slate-500 text-sm">
                Your past mental clarity sessions
            </p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBack} 
            className="p-3 bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-colors shadow-sm"
          >
            <ArrowLeft size={20} />
          </motion.button>
        </header>

        {sessions.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
            <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mx-auto mb-4 text-slate-200 shadow-sm">
                <History size={32} />
            </div>
            <p className="text-slate-400 font-bold mb-6">{t("no_sessions")}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-2xl shadow-lg shadow-primary/20"
            >
              Start New Session
            </motion.button>
          </div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence initial={false}>
              {sessions.map((session, i) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-[2.5rem] border-2 border-slate-100 p-6 shadow-sm group"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full">
                        <Calendar size={14} className="text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {formatDate(session.date)}
                        </span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1, color: "#EF4444" }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onDelete(session.id)}
                      className="p-2 rounded-xl bg-slate-50 text-slate-300 hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </div>

                  <div className="space-y-4">
                    {(["action", "later", "letgo"] as const).map((bucket) => {
                      const items = session.thoughts.filter((t) => t.bucket === bucket);
                      if (items.length === 0) return null;
                      const config = bucketLabels[bucket];
                      return (
                        <div key={bucket} className="space-y-2">
                          <div className="flex items-center gap-2 text-slate-400">
                             {config.icon}
                             <span className="text-[10px] font-bold uppercase tracking-widest">{config.label}</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {items.map((item) => (
                              <span
                                key={item.id}
                                className="px-3 py-1.5 rounded-xl bg-slate-50 text-slate-600 text-xs font-bold border border-slate-100"
                              >
                                {item.text}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {session.reflection && (
                    <div className="mt-6 pt-6 border-t border-slate-50">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                            <Check size={14} className="text-emerald-500" />
                            Feelings
                        </p>
                        <p className="text-sm font-bold text-slate-700">{session.reflection}</p>
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

export type { SavedSession };
