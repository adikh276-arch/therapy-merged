'use client';

import React from 'react';
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
      className="min-h-screen flex flex-col overflow-x-hidden bg-[#F8FAFB]"
      style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
    >

      {/* ── Header ── */}
      <header className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
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
            <button
              onClick={onReset}
              className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-primary hover:bg-slate-50 transition-colors duration-150"
              title="Reset Activity"
              aria-label="Reset"
            >
              <RotateCcw size={17} strokeWidth={2.5} />
            </button>
          )}
        </div>
      </header>

      {/* ── Content ── */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-5 py-8">
        {children}
      </main>
    </div>
  );
};
