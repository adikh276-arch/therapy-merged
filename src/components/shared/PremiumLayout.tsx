import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, RotateCcw } from 'lucide-react';

interface PremiumLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  onBack?: () => void;
  onReset?: () => void;
  icon?: React.ReactNode;
}

/* ─── Exit Logic ─── */
const handleExit = (onBack?: () => void) => {
  if (onBack) {
    onBack();
    return;
  }

  const targetOrigin = "https://web.mantracare.com";
  const exitAction = "exit";

  if (typeof window !== 'undefined') {
    if (window.parent !== window) {
      window.parent.postMessage({ action: exitAction }, targetOrigin);
      return;
    }
    window.location.href = targetOrigin;
  }
};

export const PremiumLayout: React.FC<PremiumLayoutProps> = ({
  children,
  title,
  subtitle,
  onBack,
  onReset,
  icon
}) => {
  return (
    <div className="min-h-screen bg-[#F6F8FB] font-sans antialiased">
      {/* ─── Header ─── */}
      <header className="w-full">
        <div className="max-w-[1000px] mx-auto px-6 py-8 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <button
              onClick={() => handleExit(onBack)}
              className="w-11 h-11 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#3B82F6] hover:border-[#3B82F6]/20 hover:shadow-lg transition-all"
            >
              <ChevronLeft size={22} strokeWidth={2.5} />
            </button>
            
            <div className="flex items-center gap-4">
              {icon && (
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-[#3B82F6] flex-shrink-0">
                  {icon}
                </div>
              )}
              <div className="flex flex-col">
                <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">{title}</h1>
                {subtitle && <p className="text-[#64748B] text-sm font-medium">{subtitle}</p>}
              </div>
            </div>
          </div>
          
          {onReset && (
            <button
              onClick={onReset}
              className="w-11 h-11 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#3B82F6] hover:border-[#3B82F6]/20 hover:shadow-lg transition-all"
              title="Reset"
            >
              <RotateCcw size={18} strokeWidth={2.5} />
            </button>
          )}
        </div>
      </header>

      {/* ─── Main Content ─── */}
      <main className="max-w-[1000px] mx-auto px-6 pb-24">
        {children}
      </main>
    </div>
  );
};
