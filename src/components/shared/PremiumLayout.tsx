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
    if (onBack) {
      onBack();
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F8FB] flex flex-col font-sans overflow-x-hidden">
      <header className="w-full max-w-2xl mx-auto px-4 pt-8 pb-4 flex items-start justify-between">
        <div className="flex items-start gap-3">
          {showBack && (
            <motion.button
              whileHover={{ x: -2 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleBack}
              className="flex items-center justify-center text-[#64748B] hover:text-[#043570] transition-colors mt-1.5"
              aria-label="Go back"
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </motion.button>
          )}
          {icon && (
            <div className="w-10 h-10 bg-[#F1F5F9] rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm border border-slate-100">
              {icon}
            </div>
          )}
          <div>
            <h1 className="text-2xl text-[#0f172b] font-medium leading-tight">{title}</h1>
            {subtitle && <p className="text-sm text-[#62748e] font-normal mt-1">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center gap-2 mt-1">
          {onReset && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onReset}
              className="text-xs font-semibold text-slate-500 hover:text-primary px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-sm transition-colors"
            >
              Start Over
            </motion.button>
          )}
        </div>
      </header>

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



