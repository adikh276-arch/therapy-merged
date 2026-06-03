'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSound } from '@/lib/hooks/useSound';

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
  duration,
  children,
}) => {
  const { t } = useTranslation();
  const { playStart } = useSound();

  const handleStart = () => {
    playStart();
    onStart();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="w-full max-w-lg mx-auto space-y-4 pb-8"
    >
      {/* ── Hero card ── */}
      <div className="rounded-2xl bg-white border border-slate-100 overflow-hidden">
        {/* Thin accent line — very subtle */}
        <div className="h-px w-full bg-gradient-to-r from-primary/40 via-primary/20 to-transparent" />

        <div className="p-6 space-y-4">
          {/* Icon + duration */}
          <div className="flex items-start justify-between gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-primary shrink-0"
              style={{ background: 'rgba(14,165,233,0.08)' }}
            >
              {icon || <ArrowRight size={24} />}
            </div>
            {duration && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-100 text-[11px] font-semibold text-slate-500 shrink-0">
                <Clock size={11} strokeWidth={2} />
                {duration}
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-[15px] font-semibold text-slate-700 leading-snug">
            {description}
          </p>
        </div>
      </div>

      {/* ── Benefits ── */}
      {Array.isArray(benefits) && benefits.length > 0 && (
        <div className="space-y-1.5">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-slate-100"
            >
              <CheckCircle2 size={15} className="text-primary shrink-0" strokeWidth={2} />
              <span className="text-sm text-slate-600 leading-snug">{benefit}</span>
            </div>
          ))}
        </div>
      )}

      {/* Extra content slot */}
      {children && <div>{children}</div>}

      {/* ── CTA — inline, no jump, no heavy shadow ── */}
      <button
        onClick={handleStart}
        className="w-full h-12 rounded-xl bg-primary text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 active:bg-primary/80 transition-colors duration-150"
      >
        {t('common.get_started', 'Get Started')}
        <ArrowRight size={16} strokeWidth={2.5} />
      </button>
    </motion.div>
  );
};
