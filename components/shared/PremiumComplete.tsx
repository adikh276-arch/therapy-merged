'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Home, RotateCcw, Sparkles, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import ShareModal from './ShareModal';
import { useSound } from '@/lib/hooks/useSound';

interface PremiumCompleteProps {
  title?: string;
  message?: string;
  onRestart?: () => void;
  onHome?: () => void;
  children?: React.ReactNode;
  icon?: React.ReactNode;
}

export const PremiumComplete: React.FC<PremiumCompleteProps> = ({
  title,
  message,
  onRestart,
  onHome,
  children,
  icon
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const { playComplete } = useSound();

  useEffect(() => {
    playComplete();
  }, [playComplete]);

  const displayTitle = title || t("common.well_done", "Well Done!");
  const displayMessage = message || t("common.completion_message", "You've successfully completed this activity. Take a moment to appreciate your progress.");

  const handleHome = () => {
    if (onHome) {
      onHome();
    } else {
      if (typeof window !== 'undefined' && window.parent !== window) {
        window.parent.postMessage({ action: 'exit' }, 'https://web.mantracare.com');
      }
      if (typeof window !== 'undefined') {
        window.location.href = 'https://web.mantracare.com';
      }
    }
  };

  return (
    <div className="flex flex-col items-center py-12 pb-40 selection:bg-primary/20" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif' }}>
      <div className="w-full max-w-lg space-y-12">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 12, stiffness: 200 }}
          className="flex justify-center"
        >
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full bg-primary -z-10 blur-2xl scale-150"
            />
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-primary border border-slate-100 shadow-2xl shadow-primary/20">
              {icon || <CheckCircle2 size={64} strokeWidth={2.5} />}
            </div>
          </div>
        </motion.div>

        {/* Sparkle decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-4"
        >
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={{ y: [-4, 4, -4], opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }}
              transition={{ duration: 2 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
            >
              <Sparkles size={20} className="text-primary/60" />
            </motion.div>
          ))}
        </motion.div>

        {/* Title & Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center space-y-4"
        >
          <h2 className="text-4xl font-black text-slate-900 leading-[1.1] tracking-tight">{displayTitle}</h2>
          <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-md mx-auto">{displayMessage}</p>
        </motion.div>

        {/* Children slot */}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="w-full"
          >
            {children}
          </motion.div>
        )}
      </div>

      {/* Action Buttons — fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/60 backdrop-blur-md z-20 flex justify-center border-t border-slate-100/50">
        <div className="w-full max-w-lg flex flex-col gap-4">
          <div className="flex gap-4">
            {onRestart && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={onRestart}
                className="flex-1 py-4.5 rounded-2xl bg-white border border-slate-200 text-slate-600 font-bold flex items-center justify-center gap-3 hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm"
              >
                <RotateCcw size={18} strokeWidth={2.5} />
                {t("common.start_over", "Start Over")}
              </motion.button>
            )}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsShareOpen(true)}
              className="flex-1 py-4.5 rounded-2xl bg-primary/10 border border-primary/20 text-primary font-bold flex items-center justify-center gap-3 hover:bg-primary/20 transition-all shadow-sm"
            >
              <Share2 size={18} strokeWidth={2.5} />
              {t("common.share", "Share")}
            </motion.button>
          </div>
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleHome}
            className="w-full py-5 rounded-2xl bg-primary text-primary-foreground font-black text-lg shadow-2xl shadow-primary/25 hover:bg-primary/90 hover:shadow-primary/40 transition-all flex items-center justify-center gap-3"
          >
            <Home size={20} strokeWidth={2.5} />
            {t("common.finish_exit", "Finish & Exit")}
          </motion.button>
        </div>
      </div>
      
      <ShareModal 
        isOpen={isShareOpen} 
        onClose={() => setIsShareOpen(false)} 
        activityName={displayTitle} 
      />
    </div>
  );
};
