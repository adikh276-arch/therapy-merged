import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PremiumLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  onBack?: () => void;
  onReset?: () => void;
  onSecondaryBack?: () => void;
  secondaryBackLabel?: string;
  showBack?: boolean;
  icon?: React.ReactNode;
}

export const PremiumLayout: React.FC<PremiumLayoutProps> = ({
  children,
  title,
  subtitle,
  onBack,
  onReset,
  onSecondaryBack,
  secondaryBackLabel,
  showBack = true,
  icon
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    // Strict enforcement: Top-left chevron always exits to parent dashboard
    if (window.parent !== window) {
      window.parent.postMessage({ action: 'exit' }, 'https://web.mantracare.com');
    } else {
      window.location.href = 'https://web.mantracare.com';
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F8FB] flex flex-col font-sans overflow-x-hidden">
      {/* Header */}
      <header className="w-full bg-[#F6F8FB] z-50">
        <div className="max-w-[1000px] mx-auto px-6 py-8 flex items-center justify-between">
          <div className="flex items-center gap-5">
            {showBack && (
              <button
                onClick={handleBack}
                className="w-11 h-11 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center text-slate-500 hover:text-primary hover:border-primary/20 hover:shadow-lg transition-all"
              >
                <ChevronLeft size={22} strokeWidth={2.5} />
              </button>
            )}
            <div className="flex items-center gap-4">
              {icon && (
                <div className="w-12 h-12 rounded-2xl bg-[#F1F5F9] flex items-center justify-center text-slate-600 shadow-sm">
                  {icon}
                </div>
              )}
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-[#0f172b] tracking-tight">{title}</h1>
                {subtitle && <p className="text-slate-400 text-sm font-medium">{subtitle}</p>}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {onReset && (
              <button
                onClick={onReset}
                className="w-11 h-11 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/20 hover:shadow-lg transition-all"
                title="Reset"
              >
                <RotateCcw size={18} strokeWidth={2.5} />
              </button>
            )}
            {secondaryBackLabel && onSecondaryBack && (
              <button
                onClick={onSecondaryBack}
                className="px-5 py-2.5 rounded-2xl bg-white border-2 border-slate-100 text-slate-500 text-xs font-black uppercase tracking-widest hover:text-primary hover:border-primary/20 hover:shadow-lg transition-all"
              >
                {secondaryBackLabel}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-[1000px] mx-auto px-6 pb-24">
        <div className="w-full">
          {children}
        </div>
      </main>
    </div>
  );
};



