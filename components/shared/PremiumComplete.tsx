'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  const { playComplete } = useSound();

  useEffect(() => {
    playComplete();
  }, [playComplete]);

  const displayTitle = title || t('common.well_done', 'Well Done!');
  const displayMessage =
    message ||
    t(
      'common.completion_message',
      "You've successfully completed this activity. Take a moment to appreciate your progress."
    );

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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="w-full max-w-lg mx-auto space-y-4 pb-8"
    >
      {/* ── Success card ── */}
      <div className="rounded-2xl bg-white border border-slate-100 overflow-hidden">
        <div className="h-px w-full bg-gradient-to-r from-primary/40 via-primary/20 to-transparent" />

        <div className="px-6 py-8 flex flex-col items-center text-center gap-4">
          {/* Icon */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-primary"
            style={{ background: 'rgba(14,165,233,0.08)' }}
          >
            {icon || <CheckCircle2 size={32} strokeWidth={1.5} />}
          </div>

          {/* Title + message */}
          <div className="space-y-1.5">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              {displayTitle}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
              {displayMessage}
            </p>
          </div>
        </div>
      </div>

      {/* ── Extra children slot ── */}
      {children && <div>{children}</div>}

      {/* ── Actions — inline, no animation jump ── */}
      <div className="space-y-2">
        {customActions ? (
          customActions
        ) : (
          <>
            {/* Secondary row: Restart + Share */}
            {(onRestart || !hideShare) && (
              <div className="flex gap-2">
                {onRestart && (
                  <button
                    onClick={onRestart}
                    className="flex-1 h-11 rounded-xl font-semibold text-sm text-slate-600 flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-colors duration-150"
                  >
                    <RotateCcw size={14} strokeWidth={2} />
                    {t('common.start_over', 'Start Over')}
                  </button>
                )}
                {!hideShare && (
                  <button
                    onClick={() => setIsShareOpen(true)}
                    className="flex-1 h-11 rounded-xl font-semibold text-sm text-primary flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-primary/5 hover:border-primary/20 transition-colors duration-150"
                  >
                    <Share2 size={14} strokeWidth={2} />
                    {t('common.share', 'Share')}
                  </button>
                )}
              </div>
            )}

            {/* Primary: Done */}
            <button
              onClick={handleHome}
              className="w-full h-12 rounded-xl bg-primary text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 active:bg-primary/80 transition-colors duration-150"
            >
              <Home size={15} strokeWidth={2} />
              {t('common.finish_exit', 'Finish & Exit')}
            </button>
          </>
        )}
      </div>

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        activityName={displayTitle}
      />
    </motion.div>
  );
};
