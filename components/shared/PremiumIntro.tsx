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
    <div className="w-full max-w-lg mx-auto space-y-6 pb-8">
      {/* ── Hero card ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="relative overflow-hidden rounded-3xl bg-white border border-black/[0.06] shadow-sm"
        style={{ boxShadow: '0 2px 16px 0 rgba(14,165,233,0.07), 0 1px 4px 0 rgba(0,0,0,0.04)' }}
      >
        {/* Top gradient strip */}
        <div
          className="h-1.5 w-full"
          style={{ background: 'linear-gradient(90deg, #0ea5e9 0%, #38bdf8 50%, #7dd3fc 100%)' }}
        />

        <div className="p-7 space-y-5">
          {/* Icon + duration row */}
          <div className="flex items-center justify-between">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-primary shadow-inner"
              style={{ background: 'rgba(14,165,233,0.1)', boxShadow: 'inset 0 1px 3px rgba(14,165,233,0.15)' }}
            >
              {icon || <ArrowRight size={28} />}
            </div>
            {duration && (
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-sky-600"
                style={{ background: 'rgba(14,165,233,0.08)' }}
              >
                <Clock size={12} strokeWidth={2.5} />
                {duration}
              </div>
            )}
          </div>

          {/* Description */}
          <p
            className="text-[17px] font-semibold text-slate-700 leading-snug"
            style={{ letterSpacing: '-0.01em' }}
          >
            {description}
          </p>
        </div>
      </motion.div>

      {/* ── Benefits ── */}
      {Array.isArray(benefits) && benefits.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="space-y-2"
        >
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">
            What you'll gain
          </p>
          <div className="space-y-2">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.15 + idx * 0.06 }}
                className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-black/[0.05]"
                style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}
              >
                <div
                  className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-primary"
                  style={{ background: 'rgba(14,165,233,0.1)' }}
                >
                  <CheckCircle2 size={14} strokeWidth={2.5} />
                </div>
                <span className="text-sm font-medium text-slate-600 leading-snug">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Extra content slot */}
      {children && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          {children}
        </motion.div>
      )}

      {/* ── CTA — inline, not fixed ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.25 }}
      >
        <button
          onClick={handleStart}
          className="w-full h-14 rounded-2xl font-bold text-base text-white flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-[0.98]"
          style={{
            background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
            boxShadow: '0 4px 20px rgba(14,165,233,0.35), 0 1px 4px rgba(0,0,0,0.08)',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 28px rgba(14,165,233,0.45), 0 2px 8px rgba(0,0,0,0.1)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(14,165,233,0.35), 0 1px 4px rgba(0,0,0,0.08)'; }}
        >
          {t('common.get_started', 'Get Started')}
          <ArrowRight size={18} strokeWidth={2.5} />
        </button>
      </motion.div>
    </div>
  );
};
