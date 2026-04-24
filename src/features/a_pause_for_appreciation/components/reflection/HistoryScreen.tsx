import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getReflections, deleteReflection, ReflectionEntry } from "../../lib/reflections";
import { format } from "date-fns";
import { ChevronDown, Trash2, ArrowLeft, History, Calendar, Check } from "lucide-react";
import { useTranslation } from "react-i18next";

interface HistoryScreenProps {
  onBack: () => void;
}

const HistoryScreen = ({ onBack }: HistoryScreenProps) => {
  const { t } = useTranslation();
  const [entries, setEntries] = useState<ReflectionEntry[]>(getReflections());
  const [expanded, setExpanded] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    deleteReflection(id);
    setEntries(getReflections());
    setConfirmDelete(null);
  };

  const prompts = [
    t("history.prompts.0"),
    t("history.prompts.1"),
    t("history.prompts.2"),
  ];

  return (
    <div className="flex flex-col items-center py-6 pb-24">
      <div className="w-full max-w-lg space-y-8">
        <header className="flex items-center justify-between">
          <div className="text-left">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-1">{t("history.title")}</h1>
            <p className="text-slate-500 text-sm">
                Your past reflections & appreciations
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

        {entries.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
            <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mx-auto mb-4 text-slate-200 shadow-sm">
                <History size={32} />
            </div>
            <p className="text-slate-400 font-bold mb-6">{t("history.noReflections")}</p>
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
          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {entries.map((entry, i) => {
                const isExpanded = expanded === entry.id;
                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white rounded-[2rem] border-2 border-slate-100 shadow-sm overflow-hidden"
                  >
                    <button
                      onClick={() => setExpanded(isExpanded ? null : entry.id)}
                      className="w-full text-left p-6 flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                            <Calendar size={20} />
                        </div>
                        <div>
                          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                            {format(new Date(entry.timestamp), "MMM d, yyyy")}
                          </p>
                          <p className="text-base font-bold text-slate-800 line-clamp-1 mt-1">
                            {entry.checkIn}
                          </p>
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-300 transition-transform duration-500 ${isExpanded ? "rotate-180 text-primary" : ""}`}
                      />
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-6 pb-6 space-y-6"
                        >
                          <div className="grid gap-4">
                            {entry.responses?.map((r, idx) => (
                              <div key={idx} className="space-y-1">
                                <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{prompts[idx]}</p>
                                <p className="text-sm text-slate-600 font-medium leading-relaxed">{r}</p>
                              </div>
                            ))}
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{t("history.prompts.3")}</p>
                                <p className="text-sm text-slate-600 font-medium leading-relaxed">{entry.intention}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold text-primary uppercase tracking-widest">
                                    <span className="flex items-center gap-1">
                                        <Check size={12} />
                                        Feeling
                                    </span>
                                </p>
                                <p className="text-sm text-slate-600 font-bold">{entry.checkIn}</p>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-slate-50">
                            {confirmDelete === entry.id ? (
                                <div className="flex items-center gap-3 bg-rose-50 p-3 rounded-2xl">
                                    <p className="text-xs font-bold text-rose-600 flex-1 ml-2">Delete this entry?</p>
                                    <button onClick={() => setConfirmDelete(null)} className="px-4 py-2 bg-white text-slate-400 text-[10px] font-bold rounded-xl border border-slate-100">Cancel</button>
                                    <button onClick={() => handleDelete(entry.id)} className="px-4 py-2 bg-rose-500 text-white text-[10px] font-bold rounded-xl">Delete</button>
                                </div>
                            ) : (
                              <button
                                onClick={() => setConfirmDelete(entry.id)}
                                className="flex items-center gap-2 text-[10px] font-black text-slate-300 hover:text-rose-500 uppercase tracking-widest transition-colors"
                              >
                                <Trash2 size={14} />
                                {t("history.delete")}
                              </button>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryScreen;
