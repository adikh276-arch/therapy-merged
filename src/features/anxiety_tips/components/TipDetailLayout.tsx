import React from 'react';
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { PremiumLayout } from "../../components/shared/PremiumLayout";

interface TipDetailLayoutProps {
  title: string;
  whyItHelps: string;
  whatYouCanDo: string[];
  extra?: React.ReactNode;
}

const TipDetailLayout = ({ title, whyItHelps, whatYouCanDo, extra }: TipDetailLayoutProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <PremiumLayout 
      title="Tip Detail" 
      onSecondaryBack={() => navigate("/")}
      secondaryBackLabel="Back to tips"
    >
      <div className="w-full space-y-10 pb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.2em]">
            <Sparkles size={14} />
            Daily Guide
          </div>
          <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-black text-slate-900 leading-tight tracking-tight"
          >
              {title}
          </motion.h1>
        </div>

        {/* Why It Helps */}
        <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-[2.5rem] border-2 border-slate-100 p-10 shadow-sm group hover:border-primary/20 transition-all"
        >
          <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-6">{t("why_it_helps")}</h2>
          <p className="text-slate-600 text-lg font-bold leading-relaxed">{whyItHelps}</p>
        </motion.section>

        {/* What You Can Do */}
        <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
        >
          <h2 className="text-xl font-black text-slate-800 tracking-tight px-2">{t("what_you_can_do")}</h2>
          <div className="grid gap-4">
            {whatYouCanDo.map((item, i) => (
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
                <span className="text-slate-700 text-base font-bold leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {extra && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="pt-4"
            >
                {extra}
            </motion.div>
        )}
      </div>
    </PremiumLayout>
  );
};

export default TipDetailLayout;
