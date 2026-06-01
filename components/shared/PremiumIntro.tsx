'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface PremiumIntroProps {
  title?: string;
  description: string;
  onStart: () => void;
  icon?: React.ReactNode;
  benefits?: string[];
  duration?: string;
  children?: React.ReactNode;
}

export const PremiumIntro: React.FC<PremiumIntroProps> = ({
  description,
  onStart,
  icon,
  benefits,
  children
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center py-12 pb-32 min-h-[80vh] selection:bg-primary/20" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif' }}>
      <div className="w-full max-w-lg space-y-12">
        {/* Hero Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 0.05, type: 'spring', stiffness: 200, damping: 20 }}
          className="flex justify-center"
        >
          <div className="relative group">
            <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center text-primary shadow-2xl shadow-primary/10 border border-slate-100 transition-transform duration-500 group-hover:scale-110">
              {icon || <ArrowRight size={36} />}
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-[2rem] bg-primary -z-10 blur-xl"
            />
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-center space-y-4"
        >
          <p className="text-xl text-slate-900 font-semibold leading-relaxed tracking-tight max-w-md mx-auto">{description}</p>
        </motion.div>

        {/* Benefits */}
        {benefits && benefits.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="space-y-3"
          >
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.07 }}
                className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-primary/10 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <CheckCircle2 size={16} strokeWidth={2.5} />
                </div>
                <span className="text-sm font-semibold text-slate-700">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Extra content slot */}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {children}
          </motion.div>
        )}
      </div>

      {/* CTA Button — fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/60 backdrop-blur-md z-20 flex justify-center border-t border-slate-100/50">
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.55 }}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="w-full max-w-lg py-5 rounded-2xl bg-primary text-primary-foreground font-bold text-lg shadow-2xl shadow-primary/25 hover:bg-primary/90 hover:shadow-primary/40 transition-all flex items-center justify-center gap-3"
        >
          {t("common.get_started", "Get Started")}
          <ArrowRight size={20} strokeWidth={3} />
        </motion.button>
      </div>
    </div>
  );
};
