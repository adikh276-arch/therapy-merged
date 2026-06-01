'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, RotateCcw } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
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
  const router = useRouter();
  const pathname = usePathname();

  const handleExit = () => {
    handlePlatformExit();
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }

    // Exit if we are at the hub root
    const isHub = pathname === "/" || pathname === "/therapy" || pathname === "/therapy/";

    if (exitOnBack || isHub) {
      handleExit();
      return;
    }

    // Guard: check if there is actual in-app history to go back to.
    const hasHistory = typeof window !== 'undefined' && window.history.state && typeof window.history.state.idx === 'number' && window.history.state.idx > 0;

    if (!hasHistory || (typeof window !== 'undefined' && window.history.length <= 1)) {
      handleExit();
      return;
    }

    router.back();
  };

  return (
    <div className="min-h-screen bg-[#fafcff] flex flex-col font-sans overflow-x-hidden selection:bg-primary/20" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif' }}>
      {/* Elegant mesh background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-gradient-to-br from-[#fafcff] via-white to-[#f0f7ff]">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] mix-blend-multiply opacity-70" />
        <div className="absolute top-[20%] right-[-5%] w-[40%] h-[40%] bg-indigo-300/10 rounded-full blur-[100px] mix-blend-multiply opacity-70" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-sky-200/20 rounded-full blur-[120px] mix-blend-multiply opacity-60" />
      </div>

      {/* Header */}
      <header className="w-full bg-white/60 backdrop-blur-xl sticky top-0 z-50 border-b border-white/80 shadow-[0_4px_30px_rgb(0,0,0,0.02)]">
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
                <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none mb-1">{title}</h1>
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
      <div className="fixed bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#F8FAFC] to-transparent pointer-events-none z-10 opacity-10" />
    </div>
  );
};
