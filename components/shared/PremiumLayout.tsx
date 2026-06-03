'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    if (onBack) { onBack(); return; }
    handlePlatformExit();
  };

  return (
    <div
      className="min-h-screen flex flex-col overflow-x-hidden relative"
      style={{ background: '#F0F7FF', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
    >
      {/* ── Calming ambient orbs — very slow, very soft ── */}
      <motion.div
        animate={{ x: [0, 18, 0], y: [0, -12, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="fixed top-[-80px] right-[-80px] w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0 }}
      />
      <motion.div
        animate={{ x: [0, -14, 0], y: [0, 16, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="fixed bottom-[-60px] left-[-60px] w-[360px] h-[360px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,179,237,0.1) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0 }}
      />
      <motion.div
        animate={{ x: [0, 10, -10, 0], y: [0, -8, 8, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
        className="fixed top-[40%] left-[10%] w-[280px] h-[280px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(147,210,248,0.07) 0%, transparent 70%)', filter: 'blur(50px)', zIndex: 0 }}
      />

      {/* ── Header ── */}
      <header
        className="w-full sticky top-0 z-50"
        style={{
          background: 'rgba(240,247,255,0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(14,165,233,0.1)',
        }}
      >
        <div className="max-w-xl mx-auto px-5 h-[68px] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            {showBack && (
              <button
                onClick={handleBack}
                className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-sky-600 hover:bg-white/70 transition-all duration-200"
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
              <h1 className="text-[15.5px] font-bold text-slate-800 truncate leading-tight" style={{ letterSpacing: '-0.015em' }}>
                {title}
              </h1>
              {subtitle && (
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest leading-none mt-0.5 truncate">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {onReset && (
            <button
              onClick={onReset}
              className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-sky-600 hover:bg-white/70 transition-all duration-200"
              title="Reset"
              aria-label="Reset"
            >
              <RotateCcw size={17} strokeWidth={2.5} />
            </button>
          )}
        </div>
      </header>

      {/* ── Content ── */}
      <main className="flex-1 w-full max-w-xl mx-auto px-5 py-10 pb-16 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="w-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};
