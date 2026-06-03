'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, RotateCcw } from 'lucide-react';
import { handlePlatformExit } from '../../lib/navigation';

interface PremiumLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  onBack?: () => void;
  onReset?: () => void;
  showBack?: boolean;
  icon?: React.ReactNode;
  exitOnBack?: boolean;
}

export const PremiumLayout: React.FC<PremiumLayoutProps> = ({
  children,
  title,
  subtitle,
  onBack,
  onReset,
  showBack = true,
  icon,
}) => {
  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    handlePlatformExit();
  };

  return (
    <div
      className="min-h-screen flex flex-col overflow-x-hidden"
      style={{
        background: '#F8FAFB',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {/* Subtle static gradient orb — top right, no animation */}
      <div
        className="fixed top-0 right-0 w-[480px] h-[480px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 80% 20%, rgba(14,165,233,0.07) 0%, transparent 70%)',
        }}
      />
      <div
        className="fixed bottom-0 left-0 w-[360px] h-[360px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 20% 80%, rgba(56,189,248,0.05) 0%, transparent 70%)',
        }}
      />

      {/* ── Header ── */}
      <header
        className="w-full sticky top-0 z-50"
        style={{
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          boxShadow: '0 1px 0 0 rgba(0,0,0,0.04)',
        }}
      >
        <div className="max-w-2xl mx-auto px-5 h-16 flex items-center justify-between gap-4">
          {/* Left: back + identity */}
          <div className="flex items-center gap-3 min-w-0">
            {showBack && (
              <button
                onClick={handleBack}
                className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all duration-150"
                aria-label="Back"
              >
                <ChevronLeft size={20} strokeWidth={2.5} />
              </button>
            )}

            {icon && (
              <div
                className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-primary"
                style={{ background: 'rgba(14,165,233,0.1)' }}
              >
                {icon}
              </div>
            )}

            <div className="min-w-0">
              <h1
                className="text-[15px] font-bold text-slate-800 truncate leading-tight"
                style={{ letterSpacing: '-0.01em' }}
              >
                {title}
              </h1>
              {subtitle && (
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest leading-none mt-0.5 truncate">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Right: reset */}
          {onReset && (
            <motion.button
              whileHover={{ rotate: -180 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              onClick={onReset}
              className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/5 transition-all duration-150"
              title="Reset Activity"
              aria-label="Reset"
            >
              <RotateCcw size={17} strokeWidth={2.5} />
            </motion.button>
          )}
        </div>
      </header>

      {/* ── Content ── */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-5 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="w-full"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};
