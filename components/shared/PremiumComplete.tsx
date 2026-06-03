'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, RotateCcw, Share2, Home, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSound } from '@/lib/hooks/useSound';
import ShareModal from './ShareModal';

interface PremiumCompleteProps {
  title?: string;
  message?: string;
  onRestart?: () => void;
  onHome?: () => void;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  customActions?: React.ReactNode;
  hideShare?: boolean;
}

export const PremiumComplete: React.FC<PremiumCompleteProps> = ({
  title,
  message,
  onRestart,
  onHome,
  children,
  icon,
  customActions,
  hideShare,
}) => {
  const { t } = useTranslation();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [confetti, setConfetti] = useState<{ id: number; x: number; color: string; delay: number }[]>([]);
  const { playComplete } = useSound();

  useEffect(() => {
    playComplete();
    // Spawn micro confetti particles
    const items = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: 20 + Math.random() * 60,
      color: ['#0ea5e9', '#38bdf8', '#7dd3fc', '#bae6fd', '#0284c7', '#34d399'][i % 6],
      delay: i * 0.06,
    }));
    setConfetti(items);
    const t2 = setTimeout(() => setConfetti([]), 2500);
    return () => clearTimeout(t2);
  }, [playComplete]);

  const displayTitle = title || t('common.well_done', 'Well Done!');
  const displayMessage = message || t('common.completion_message', "You've successfully completed this activity. Take a moment to appreciate your progress.");

  const handleHome = () => {
    if (onHome) { onHome(); return; }
    if (typeof window !== 'undefined') {
      if (window.parent !== window) {
        window.parent.postMessage({ action: 'exit' }, 'https://web.mantracare.com');
      } else {
        window.location.href = 'https://web.mantracare.com';
      }
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto space-y-5 pb-8">
      {/* ── Success card ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.34, 1.2, 0.64, 1] }}
        className="relative overflow-hidden rounded-3xl bg-white border border-black/[0.06]"
        style={{ boxShadow: '0 4px 24px rgba(14,165,233,0.1), 0 1px 4px rgba(0,0,0,0.04)' }}
      >
        {/* Gradient strip */}
        <div
          className="h-1.5 w-full"
          style={{ background: 'linear-gradient(90deg, #0ea5e9 0%, #38bdf8 50%, #34d399 100%)' }}
        />

        {/* Confetti burst */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <AnimatePresence>
            {confetti.map(c => (
              <motion.div
                key={c.id}
                initial={{ opacity: 1, y: 60, x: `${c.x}%`, scale: 1 }}
                animate={{ opacity: 0, y: -20, scale: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, delay: c.delay, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-0 w-2 h-2 rounded-sm"
                style={{ backgroundColor: c.color }}
              />
            ))}
          </AnimatePresence>
        </div>

        <div className="px-7 py-8 space-y-5">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: 'spring', damping: 14, stiffness: 220 }}
            className="flex justify-center"
          >
            <div
              className="w-20 h-20 rounded-[1.75rem] flex items-center justify-center text-primary"
              style={{
                background: 'rgba(14,165,233,0.1)',
                boxShadow: '0 0 0 8px rgba(14,165,233,0.06), 0 0 0 16px rgba(14,165,233,0.03)',
              }}
            >
              {icon || <CheckCircle2 size={40} strokeWidth={2} />}
            </div>
          </motion.div>

          {/* Sparkle row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center gap-3"
          >
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{ y: [-3, 3, -3], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
              >
                <Sparkles size={16} className="text-primary/50" />
              </motion.div>
            ))}
          </motion.div>

          {/* Title + message */}
          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center space-y-2"
          >
            <h2
              className="text-[28px] font-black text-slate-900 leading-tight"
              style={{ letterSpacing: '-0.02em' }}
            >
              {displayTitle}
            </h2>
            <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-sm mx-auto">
              {displayMessage}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Extra children slot ── */}
      {children && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          {children}
        </motion.div>
      )}

      {/* ── Actions — inline, not fixed ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-3"
      >
        {customActions ? (
          customActions
        ) : (
          <>
            {/* Secondary row: Restart + Share */}
            {(onRestart || !hideShare) && (
              <div className="flex gap-3">
                {onRestart && (
                  <button
                    onClick={onRestart}
                    className="flex-1 h-12 rounded-2xl font-semibold text-sm text-slate-600 flex items-center justify-center gap-2 bg-white border border-black/[0.08] hover:border-primary/20 hover:text-primary transition-all duration-150"
                    style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
                  >
                    <RotateCcw size={15} strokeWidth={2.5} />
                    {t('common.start_over', 'Start Over')}
                  </button>
                )}
                {!hideShare && (
                  <button
                    onClick={() => setIsShareOpen(true)}
                    className="flex-1 h-12 rounded-2xl font-semibold text-sm text-primary flex items-center justify-center gap-2 bg-white border border-primary/15 hover:bg-primary/5 transition-all duration-150"
                    style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
                  >
                    <Share2 size={15} strokeWidth={2.5} />
                    {t('common.share', 'Share')}
                  </button>
                )}
              </div>
            )}

            {/* Primary: Done */}
            <button
              onClick={handleHome}
              className="w-full h-14 rounded-2xl font-bold text-base text-white flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                boxShadow: '0 4px 20px rgba(14,165,233,0.35), 0 1px 4px rgba(0,0,0,0.08)',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 28px rgba(14,165,233,0.45), 0 2px 8px rgba(0,0,0,0.1)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(14,165,233,0.35), 0 1px 4px rgba(0,0,0,0.08)'; }}
            >
              <Home size={18} strokeWidth={2.5} />
              {t('common.finish_exit', 'Finish & Exit')}
            </button>
          </>
        )}
      </motion.div>

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        activityName={displayTitle}
      />
    </div>
  );
};
