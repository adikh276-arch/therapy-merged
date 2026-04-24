import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CheckCircle2, Sparkles, Lightbulb, MessageCircle, Loader2 } from "lucide-react";
import { tips } from "../data/tips";
import { motion } from "framer-motion";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";

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
      <PremiumLayout title="Tip Detail">
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary opacity-20" />
          <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest">{t("tipNotFound")}</p>
        </div>
      </PremiumLayout>
    );
  }

  const Icon = tip.icon;
  const k = TIP_KEY_MAP[tip.id] ?? "";

  // Build translated what-you-can-do list from translation keys
  const doKeys = tip.whatYouCanDo.map((_, i) => `${k}_do${i + 1}`);

  return (
    <PremiumLayout 
      title="Tip Detail" 
      onSecondaryBack={() => navigate("/")}
      secondaryBackLabel="Back to tips"
    >
      <div className="w-full space-y-10 pb-12">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary shrink-0 shadow-sm border-2 border-primary/5">
            <Icon className="w-10 h-10" />
          </div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-black text-slate-900 leading-tight tracking-tight"
          >
            {k ? t(`${k}_title`) : tip.title}
          </motion.h1>
        </div>

        {/* Why It Helps */}
        <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-[2.5rem] border-2 border-slate-100 p-10 shadow-sm group hover:border-primary/20 transition-all"
        >
          <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-6">{t("whyItHelps")}</h2>
          <p className="text-slate-600 text-lg font-bold leading-relaxed">
            {k ? t(`${k}_why`) : tip.whyItHelps}
          </p>
        </motion.section>

        {/* What You Can Do */}
        <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
        >
          <h2 className="text-xl font-black text-slate-800 tracking-tight px-2">{t("whatYouCanDo")}</h2>
          <div className="grid gap-4">
            {doKeys.map((key, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                className="flex items-start gap-6 p-8 bg-slate-50 rounded-[2.5rem] border-2 border-transparent hover:bg-white hover:border-primary/20 transition-all group shadow-sm hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                    <CheckCircle2 size={20} strokeWidth={3} />
                </div>
                <span className="text-slate-700 text-base font-bold leading-relaxed">{t(key)}</span>
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
            className="p-10 bg-emerald-50 rounded-[3rem] border-2 border-emerald-100 shadow-sm space-y-8 group hover:border-emerald-200 transition-all"
          >
            <div className="flex items-center gap-3 text-emerald-600 font-black text-[10px] uppercase tracking-[0.3em] mb-2">
                <Lightbulb size={16} fill="currentColor" className="group-hover:animate-pulse" />
                {t("example")}
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">{t("insteadOf")}</p>
                <p className="text-emerald-900/60 text-base font-bold leading-relaxed">
                  {k ? t(`${k}_ex_instead`) : tip.example.instead}
                </p>
              </div>
              <div className="h-0.5 w-12 bg-emerald-100 rounded-full" />
              <div className="space-y-2">
                <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">{t("try")}</p>
                <p className="text-emerald-900 text-xl font-black leading-tight tracking-tight">
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
            className="p-10 bg-slate-900 rounded-[3rem] text-white space-y-6 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 text-white/5 pointer-events-none">
              <MessageCircle size={120} strokeWidth={1} />
            </div>
            <div className="flex items-center gap-3 text-slate-400 font-black text-[10px] uppercase tracking-[0.3em] relative z-10">
                <Sparkles size={16} />
                Gentle Reminder
            </div>
            <p className="text-slate-200 text-xl font-bold italic leading-relaxed relative z-10">
              "{k ? t(`${k}_rem`) : tip.gentleReminder}"
            </p>
          </motion.section>
        )}
      </div>
    </PremiumLayout>
  );
}
