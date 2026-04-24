import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PremiumLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  onBack?: () => void;
  showBack?: boolean;
}

export const PremiumLayout: React.FC<PremiumLayoutProps> = ({ 
  children, 
  title, 
  subtitle, 
  onBack,
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
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 h-16 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          {showBack && (
            <motion.button
              whileHover={{ x: -2 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleBack}
              className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-500 hover:text-slate-800"
              aria-label="Go back"
            >
              <ChevronLeft size={22} strokeWidth={2.5} />
            </motion.button>
          )}
          <div>
            <h1 className="text-base font-bold text-slate-900 leading-none tracking-tight">{title}</h1>
            {subtitle && <p className="text-xs text-slate-400 mt-0.5 font-medium">{subtitle}</p>}
          </div>
        </div>
        {/* Cyan accent dot */}
        <div className="w-2 h-2 rounded-full bg-primary opacity-60" />
      </header>

      {/* Cyan accent line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-primary/40 via-primary to-primary/40" />

      <main className="flex-1 max-w-2xl w-full mx-auto p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="h-full"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};

