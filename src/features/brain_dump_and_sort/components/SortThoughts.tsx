import { useState } from "react";
import { ArrowLeft, CheckCircle2, ListFilter, Sparkles, MoveRight, Inbox, Clock, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ThoughtItem } from "./types";

interface Props {
  thoughts: ThoughtItem[];
  onComplete: (sorted: ThoughtItem[]) => void;
  onBack: () => void;
}

type Bucket = "action" | "later" | "letgo";

export const SortThoughts = ({ thoughts: initial, onComplete, onBack }: Props) => {
  const { t } = useTranslation();
  const [items, setItems] = useState<ThoughtItem[]>(initial);

  const buckets: { key: Bucket; icon: React.ReactNode; label: string; desc: string; color: string }[] = [
    { key: "action", icon: <Inbox size={20} />, label: t("action_needed"), desc: t("action_desc"), color: "#61DAFB" },
    { key: "later", icon: <Clock size={20} />, label: t("do_later"), desc: t("later_desc"), color: "#FBBF24" },
    { key: "letgo", icon: <Trash2 size={20} />, label: t("let_it_go"), desc: t("letgo_desc"), color: "#94A3B8" },
  ];

  const sorted = items.filter((i) => i.bucket);
  const unsorted = items.filter((i) => !i.bucket);
  const progress = items.length > 0 ? sorted.length / items.length : 0;
  const allSorted = unsorted.length === 0 && items.length > 0;

  const assignBucket = (id: string, bucket: Bucket) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, bucket } : i)));
  };

  return (
    <div className="flex flex-col items-center py-6 pb-24">
      <div className="w-full max-w-lg space-y-8">
        <header className="flex items-center gap-4">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBack} 
            className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:text-slate-600 transition-colors"
          >
            <ArrowLeft size={20} />
          </motion.button>
          <div className="text-left">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-1">{t("sort_title")}</h1>
            <p className="text-slate-500 text-sm leading-tight">{t("sort_desc")}</p>
          </div>
        </header>

        {/* Progress Section */}
        <div className="bg-white rounded-[2rem] border-2 border-slate-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 font-bold text-slate-700 text-sm">
              <ListFilter size={18} className="text-primary" />
              Clarity Progress
            </div>
            <span className="text-primary font-black text-sm">{Math.round(progress * 100)}%</span>
          </div>
          <div className="h-3 rounded-full bg-slate-50 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress * 100}%` }}
              className="h-full bg-primary shadow-[0_0_12px_rgba(97,218,251,0.5)]" 
            />
          </div>
        </div>

        {/* Current Thought to Sort */}
        <AnimatePresence mode="wait">
          {unsorted.length > 0 ? (
            <motion.div
              key={unsorted[0].id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="bg-white rounded-[2.5rem] border-2 border-primary/20 p-8 shadow-xl shadow-primary/5 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 text-primary/10">
                <Sparkles size={48} />
              </div>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-4">Sorting Thought</p>
              <h2 className="text-2xl font-bold text-slate-800 leading-relaxed">
                {unsorted[0].text}
              </h2>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-50 rounded-[2.5rem] border-2 border-emerald-100 p-8 text-center"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-500 shadow-sm">
                <CheckCircle2 size={32} />
              </div>
              <h2 className="text-xl font-bold text-emerald-900 mb-2">All Sorted!</h2>
              <p className="text-emerald-600 font-medium">Your mind is clear and ready for the next step.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bucket Selection */}
        <div className="grid gap-4">
          {buckets.map((b) => {
            const bucketItems = items.filter((i) => i.bucket === b.key);
            const isClickable = unsorted.length > 0;
            
            return (
              <motion.button
                key={b.key}
                whileHover={isClickable ? { scale: 1.02, x: 5 } : {}}
                whileTap={isClickable ? { scale: 0.98 } : {}}
                onClick={() => isClickable && assignBucket(unsorted[0].id, b.key)}
                className={`w-full text-left rounded-[2rem] border-2 p-6 transition-all group ${
                  isClickable 
                    ? "bg-white border-slate-100 hover:border-primary/50 shadow-sm" 
                    : "bg-slate-50 border-transparent opacity-60"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      {b.icon}
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-800">{b.label}</h3>
                        <p className="text-xs text-slate-400 font-medium">{b.desc}</p>
                    </div>
                  </div>
                  {bucketItems.length > 0 && (
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-black">
                      {bucketItems.length}
                    </span>
                  )}
                </div>
                
                {bucketItems.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {bucketItems.map((item) => (
                      <motion.span 
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="px-3 py-1.5 rounded-xl bg-slate-50 text-slate-600 text-xs font-bold"
                      >
                        {item.text}
                      </motion.span>
                    ))}
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Complete Action */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-lg px-6 z-20">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onComplete(items)}
            disabled={!allSorted}
            className="w-full py-5 rounded-[2rem] bg-primary text-primary-foreground font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-40 disabled:shadow-none"
          >
            {t("continue")}
            <MoveRight size={20} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};
