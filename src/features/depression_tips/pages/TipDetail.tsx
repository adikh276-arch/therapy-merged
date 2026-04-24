import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, CheckCircle2, Sparkles, Lightbulb, MessageCircle } from "lucide-react";
import { tips } from "../data/tips";
import { motion } from "framer-motion";

// Map tip id to translation key prefix
const TIP_KEY_MAP: Record<string, string> = {
  "enjoyable-activities": "t1",
  "challenge-negative-thoughts": "t2",
  "set-realistic-goals": "t3",
  "limit-stressors": "t4",
  "practice-self-care": "t5",
};

export default function TipDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const tip = tips.find((t) => t.id === id);

  if (!tip) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-slate-400 font-bold">{t("tipNotFound")}</p>
      </div>
    );
  }

  const Icon = tip.icon;
  const k = TIP_KEY_MAP[tip.id] ?? "";

  // Build translated what-you-can-do list from translation keys
  const doKeys = tip.whatYouCanDo.map((_, i) => `${k}_do${i + 1}`);

  return (
    <div className="flex flex-col items-center py-6 pb-24">
      <div className="w-full max-w-lg space-y-8">
        {/* Back */}
        <header className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/")}
            className="p-3 bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-colors shadow-sm"
          >
            <ArrowLeft size={20} />
          </motion.button>
          <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest">
            <Sparkles size={12} />
            Tip Detail
          </div>
        </header>

        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 shadow-inner">
            <Icon className="w-8 h-8" />
          </div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-extrabold text-slate-900 leading-tight"
          >
            {k ? t(`${k}_title`) : tip.title}
          </motion.h1>
        </div>

        {/* Why It Helps */}
        <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-[2.5rem] border-2 border-slate-100 p-8 shadow-sm"
        >
          <h2 className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-4">{t("whyItHelps")}</h2>
          <p className="text-slate-600 text-base font-medium leading-relaxed">
            {k ? t(`${k}_why`) : tip.whyItHelps}
          </p>
        </motion.section>

        {/* What You Can Do */}
        <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
        >
          <h2 className="text-lg font-black text-slate-800 uppercase tracking-wider px-2">{t("whatYouCanDo")}</h2>
          <div className="grid gap-3">
            {doKeys.map((key, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                className="flex items-start gap-4 p-6 bg-slate-50 rounded-[2rem] border-2 border-transparent hover:border-primary/20 transition-all"
              >
                <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={16} />
                </div>
                <span className="text-slate-700 text-sm font-bold leading-relaxed">{t(key)}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Example */}
        {tip.example && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-8 bg-emerald-50 rounded-[2.5rem] border-2 border-emerald-100 shadow-sm space-y-6"
          >
            <div className="flex items-center gap-3 text-emerald-600 font-black text-[10px] uppercase tracking-[0.2em] mb-2">
                <Lightbulb size={14} fill="currentColor" />
                {t("example")}
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">{t("insteadOf")}</p>
                <p className="text-emerald-900/60 text-sm font-medium leading-relaxed">
                  {k ? t(`${k}_ex_instead`) : tip.example.instead}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{t("try")}</p>
                <p className="text-emerald-900 text-base font-bold leading-relaxed">
                  {k ? t(`${k}_ex_try`) : tip.example.tryThis}
                </p>
              </div>
            </div>
          </motion.section>
        )}

        {/* Gentle Reminder */}
        {tip.gentleReminder && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-8 bg-slate-900 rounded-[2.5rem] text-white space-y-4"
          >
            <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                <MessageCircle size={14} />
                Gentle Reminder
            </div>
            <p className="text-slate-300 text-base font-medium italic leading-relaxed">
              "{k ? t(`${k}_rem`) : tip.gentleReminder}"
            </p>
          </motion.section>
        )}
      </div>
    </div>
  );
}
