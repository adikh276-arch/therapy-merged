import { useParams, useNavigate } from "react-router-dom";
import { Check, Sparkles, Loader2, Wind } from "lucide-react";
import { tips } from "../data/tips";
import BreathingExercise from "../components/BreathingExercise";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";

const TipDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const tip = tips.find((t) => t.slug === id);

  if (!tip) {
    return (
      <PremiumLayout title="Tip Detail">
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary opacity-20" />
          <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest">{t('detail.notFound')}</p>
        </div>
      </PremiumLayout>
    );
  }

  return (
    <PremiumLayout 
      title="Tip Detail" 
      onSecondaryBack={() => navigate("/")}
      secondaryBackLabel="Back to tips"
    >
      <div className="w-full space-y-10 pb-12">
        <div className="flex items-center gap-6">
          <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center shrink-0 shadow-sm border-2 border-primary/5 bg-slate-50 text-slate-400`}>
            {tip.icon}
          </div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-black text-slate-900 leading-tight tracking-tight"
          >
            {t(`tip.${tip.slug}.title`)}
          </motion.h1>
        </div>

        {/* Breathing animation */}
        {tip.hasBreathing && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-10 bg-primary/5 rounded-[3rem] border-2 border-primary/10 shadow-sm space-y-6"
          >
            <div className="flex items-center gap-3 text-primary font-black text-[10px] uppercase tracking-[0.3em] mb-2">
                <Wind size={16} />
                Breathing Guide
            </div>
            <BreathingExercise />
          </motion.section>
        )}

        {/* Why It Helps */}
        <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-[2.5rem] border-2 border-slate-100 p-10 shadow-sm group hover:border-primary/20 transition-all"
        >
          <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-6">{t('detail.whyTitle')}</h2>
          <p className="text-slate-600 text-lg font-bold leading-relaxed">
            {t(`tip.${tip.slug}.why`)}
          </p>
        </motion.section>

        {/* What You Can Do */}
        <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
        >
          <h2 className="text-xl font-black text-slate-800 tracking-tight px-2">{t('detail.doTitle')}</h2>
          <div className="grid gap-4">
            {(t(`tip.${tip.slug}.do`, { returnObjects: true }) as string[])?.map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                className="flex items-start gap-6 p-8 bg-slate-50 rounded-[2.5rem] border-2 border-transparent hover:bg-white hover:border-primary/20 transition-all group shadow-sm hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                    <Check size={20} strokeWidth={3} />
                </div>
                <span className="text-slate-700 text-base font-bold leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Button */}
        {t(`tip.${tip.slug}.button`) && (
          <div className="pt-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {}}
              className="w-full py-5 rounded-[2rem] bg-primary text-primary-foreground font-black text-lg shadow-xl shadow-primary/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3"
            >
              {t(`tip.${tip.slug}.button`)}
              <Sparkles size={20} />
            </motion.button>
          </div>
        )}
      </div>
    </PremiumLayout>
  );
};

export default TipDetail;
