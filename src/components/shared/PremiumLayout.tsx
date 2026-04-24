import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
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
}

export const PremiumLayout: React.FC<PremiumLayoutProps> = ({ 
  children, 
  title, 
  subtitle, 
  onBack,
  onReset,
  onSecondaryBack,
  secondaryBackLabel,
  showBack = true 
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      if (window.parent !== window) {
        window.parent.postMessage({ action: 'exit' }, 'https://web.mantracare.com');
      } else {
        navigate('/');
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans overflow-x-hidden">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <motion.button
              whileHover={{ x: -2 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleBack}
              className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400 hover:text-slate-800"
              aria-label="Go back"
            >
              <ChevronLeft size={22} strokeWidth={2.5} />
            </motion.button>
          )}
          <div>
            <h1 className="text-sm font-bold text-slate-900 leading-none tracking-tight">{title}</h1>
            {subtitle && <p className="text-[10px] text-slate-400 mt-1 font-medium">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onReset && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onReset}
              className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary px-3 py-1.5 rounded-lg border border-slate-100 transition-colors"
            >
              Start Over
            </motion.button>
          )}
          {/* Cyan accent dot */}
          <div className="w-2 h-2 rounded-full bg-primary opacity-60" />
        </div>
      </header>

      {/* Cyan accent line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-primary/30 via-primary to-primary/30 opacity-40" />

      <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-6">
        {onSecondaryBack && secondaryBackLabel && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onSecondaryBack}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-800 transition-colors mb-6 group"
          >
            <div className="p-1.5 rounded-lg bg-slate-50 group-hover:bg-slate-100 transition-colors">
              <ChevronLeft size={16} strokeWidth={3} />
            </div>
            <span className="text-xs font-black uppercase tracking-widest">{secondaryBackLabel}</span>
          </motion.button>
        )}

        <div className="w-full">
          {children}
        </div>
      </main>
    </div>
  );
};



