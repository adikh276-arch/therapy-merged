'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, RotateCcw, Share2, Home } from 'lucide-react';
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

// Soft pastel confetti pieces
const CONFETTI = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: 10 + (i * 4.7) % 82,
  color: [
    'rgba(14,165,233,0.7)',
    'rgba(56,189,248,0.65)',
    'rgba(125,211,252,0.6)',
    'rgba(186,230,255,0.8)',
    'rgba(52,211,153,0.65)',
    'rgba(167,243,208,0.75)',
  ][i % 6],
  size: 5 + (i % 4) * 2,
  delay: i * 0.07,
  duration: 1.4 + (i % 5) * 0.2,
}));

// Sparkle ring around the icon
const RING_DOTS = Array.from({ length: 8 }, (_, i) => {
  const angle = (i / 8) * 2 * Math.PI;
  const r = 52;
  return {
    id: i,
    cx: Math.cos(angle) * r,
    cy: Math.sin(angle) * r,
    delay: i * 0.12,
  };
});

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
  const [showConfetti, setShowConfetti] = useState(true);
  const { playComplete } = useSound();

  useEffect(() => {
    playComplete();
    const timer = setTimeout(() => setShowConfetti(false), 3200);
    return () => clearTimeout(timer);
  }, [playComplete]);

  const displayTitle = title || t('common.well_done', 'Well Done!');
  const displayMessage =
    message ||
    t('common.completion_message', "You've successfully completed this activity. Take a moment to appreciate your progress.");

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
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="w-full max-w-lg mx-auto space-y-4 pb-8"
    >
      {/* ── Success card ── */}
      <div
        className="relative rounded-2xl bg-white/80 backdrop-blur-sm border border-white overflow-hidden"
        style={{ boxShadow: '0 8px 32px -4px rgba(14,165,233,0.12), 0 2px 8px rgba(0,0,0,0.04)' }}
      >
        {/* Confetti burst from bottom of card */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl" style={{ zIndex: 10 }}>
          <AnimatePresence>
            {showConfetti && CONFETTI.map(c => (
              <motion.div
                key={c.id}
                initial={{ opacity: 1, y: '90%', x: `${c.x}%`, rotate: 0, scale: 1 }}
                animate={{ opacity: 0, y: '-20%', x: `calc(${c.x}% + ${(c.id % 2 === 0 ? 1 : -1) * 15}px)`, rotate: (c.id % 2 === 0 ? 1 : -1) * 180, scale: 0.6 }}
                exit={{ opacity: 0 }}
                transition={{ duration: c.duration, delay: c.delay, ease: [0.22, 1, 0.36, 1] }}
                className="absolute rounded-sm"
                style={{ width: c.size, height: c.size, backgroundColor: c.color, bottom: 0 }}
              />
            ))}
          </AnimatePresence>
        </div>

        <div className="px-6 py-8 flex flex-col items-center text-center gap-5 relative z-20">
          {/* Icon with expanding ripple rings + orbiting sparkle dots */}
          <div className="relative flex items-center justify-center w-24 h-24">
            {/* Ripple rings */}
            {[0, 1].map(i => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.8], opacity: [0.25, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.9, ease: 'easeOut' }}
                className="absolute inset-0 rounded-full"
                style={{ border: '2px solid rgba(14,165,233,0.4)' }}
              />
            ))}

            {/* Orbiting sparkle dots */}
            {RING_DOTS.map(dot => (
              <motion.div
                key={dot.id}
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: dot.delay, ease: 'easeInOut' }}
                className="absolute w-1.5 h-1.5 rounded-full bg-sky-400"
                style={{ transform: `translate(${dot.cx}px, ${dot.cy}px)` }}
              />
            ))}

            {/* Icon */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: 'spring', damping: 14, stiffness: 220 }}
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-primary relative z-10"
              style={{ background: 'linear-gradient(135deg,rgba(224,242,255,0.9),rgba(186,230,255,0.7))' }}
            >
              {icon || <CheckCircle2 size={32} strokeWidth={1.5} />}
            </motion.div>
          </div>

          {/* Title + message */}
          <motion.div
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight" style={{ letterSpacing: '-0.02em' }}>
              {displayTitle}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
              {displayMessage}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Extra children slot ── */}
      {children && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          {children}
        </motion.div>
      )}

      {/* ── Actions ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.28 }}
        className="space-y-2"
      >
        {customActions ? customActions : (
          <>
            {(onRestart || !hideShare) && (
              <div className="flex gap-2">
                {onRestart && (
                  <button
                    onClick={onRestart}
                    className="flex-1 h-11 rounded-xl font-semibold text-sm text-slate-600 flex items-center justify-center gap-2 bg-white/80 border border-white hover:bg-white transition-colors duration-150"
                    style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
                  >
                    <RotateCcw size={14} strokeWidth={2} />
                    {t('common.start_over', 'Start Over')}
                  </button>
                )}
                {!hideShare && (
                  <button
                    onClick={() => setIsShareOpen(true)}
                    className="flex-1 h-11 rounded-xl font-semibold text-sm text-sky-600 flex items-center justify-center gap-2 bg-white/80 border border-white hover:bg-white transition-colors duration-150"
                    style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
                  >
                    <Share2 size={14} strokeWidth={2} />
                    {t('common.share', 'Share')}
                  </button>
                )}
              </div>
            )}

            <button
              onClick={handleHome}
              className="relative w-full h-[52px] rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 60%, #0284c7 100%)',
                boxShadow: '0 4px 16px -2px rgba(14,165,233,0.3), 0 1px 3px rgba(0,0,0,0.06)',
              }}
            >
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.22) 50%, transparent 80%)' }}
              />
              <Home size={15} strokeWidth={2} className="relative z-10" />
              <span className="relative z-10">{t('common.finish_exit', 'Finish & Exit')}</span>
            </button>
          </>
        )}
      </motion.div>

      <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} activityName={displayTitle} />
    </motion.div>
  );
};
