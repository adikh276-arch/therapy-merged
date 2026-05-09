import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, RotateCcw } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  exitOnBack
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleExit = () => {
    handlePlatformExit();
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }

    // Default behavior if no custom onBack is provided
    const isHub = location.pathname === "/" || location.pathname === "/therapy" || location.pathname === "/therapy/";
    
    if (exitOnBack || isHub) {
      handleExit();
    } else {
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans overflow-x-hidden selection:bg-primary/20" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif' }}>
      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <header className="w-full bg-white/70 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100/50">
        <div className="max-w-[1000px] mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {showBack && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBack}
                className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-500 hover:text-primary hover:border-primary/30 hover:shadow-md transition-all"
              >
                <ChevronLeft size={20} strokeWidth={2.5} />
              </motion.button>
            )}
            <div className="flex items-center gap-4">
              {icon && (
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner border border-primary/5">
                  {icon}
                </div>
              )}
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight leading-none mb-1">{title}</h1>
                {subtitle && <p className="text-slate-500 text-xs font-bold uppercase tracking-widest opacity-70">{subtitle}</p>}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {onReset && (
              <motion.button
                whileHover={{ rotate: -180 }}
                transition={{ duration: 0.4 }}
                onClick={onReset}
                className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/30 hover:shadow-md transition-all"
                title="Reset Activity"
              >
                <RotateCcw size={18} strokeWidth={2.5} />
              </motion.button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-[1000px] mx-auto px-6 py-10 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          {children}
        </motion.div>
      </main>

      {/* Subtle bottom gradient for mobile */}
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F8FAFC] to-transparent pointer-events-none z-10" />
    </div>
  );
};




