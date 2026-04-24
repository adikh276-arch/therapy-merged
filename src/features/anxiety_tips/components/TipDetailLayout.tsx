import React from 'react';
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

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

        <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-extrabold text-slate-900 leading-tight"
        >
            {title}
        </motion.h1>

        {/* Why It Helps */}
        <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-[2.5rem] border-2 border-slate-100 p-8 shadow-sm"
        >
          <h2 className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-4">{t("why_it_helps")}</h2>
          <p className="text-slate-600 text-base font-medium leading-relaxed">{whyItHelps}</p>
        </motion.section>

        {/* What You Can Do */}
        <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
        >
          <h2 className="text-lg font-black text-slate-800 uppercase tracking-wider px-2">{t("what_you_can_do")}</h2>
          <div className="grid gap-3">
            {whatYouCanDo.map((item, i) => (
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
                <span className="text-slate-700 text-sm font-bold leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {extra && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                {extra}
            </motion.div>
        )}
      </div>
    </div>
  );
};

export default TipDetailLayout;
