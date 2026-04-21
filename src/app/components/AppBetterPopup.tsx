import { useState, useEffect } from "react";
import { X, Smartphone, Download, Zap, Heart, Brain, Calendar, Star, Sparkles, Check, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AppBetterPopupProps {
  onClose: () => void;
}

export function AppBetterPopup({ onClose }: AppBetterPopupProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 300);
  }, []);

  const handleDontShowAgain = () => {
    const userString = localStorage.getItem("mantraUser");
    if (userString) {
      const user = JSON.parse(userString);
      user.showAppPopup = false;
      localStorage.setItem("mantraUser", JSON.stringify(user));
    }
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleMaybeLater = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const features = [
    { icon: Heart, label: "Selfcare", color: "text-[#1E293B] bg-[#E8F4FD]" },
    { icon: Brain, label: "AI Coach", color: "text-[#1E293B] bg-[#E8F4FD]" },
    { icon: Calendar, label: "Booking", color: "text-[#1E293B] bg-[#E8F4FD]" },
    { icon: Zap, label: "Trackers", color: "text-[#1E293B] bg-[#E8F4FD]" },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleMaybeLater}
        >
          <motion.div
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full relative"
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleMaybeLater}
              className="absolute top-5 right-5 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg hover:shadow-xl"
            >
              <X size={20} className="text-slate-700" />
            </button>

            {/* Header with Simple Background */}
            <div className="relative bg-gradient-to-b from-[#E8F4FD] to-white p-6 text-center overflow-hidden border-b border-[#E2ECF5]">
              {/* Decorative Background Elements */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E2ECF5] rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#E8F4FD] rounded-full blur-2xl"></div>
              </div>

              <motion.div
                className="relative z-10"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <div className="w-16 h-16 bg-white backdrop-blur-sm border border-[#E2E8F0] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Smartphone className="text-[#2196F3]" size={32} />
                </div>
              </motion.div>

              <motion.h2 
                className="text-2xl font-bold text-[#020817] mb-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                App is Better! 🎉
              </motion.h2>
              <motion.p 
                className="text-[#64748B] text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Get exclusive features & better experience
              </motion.p>
            </div>

            {/* Content */}
            <div className="p-5">
              {/* Download Buttons - Side by Side */}
              <motion.div 
                className="grid grid-cols-2 gap-3 mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <motion.a
                  href="https://play.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex flex-col items-center justify-center gap-2 p-4 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-7 h-7">
                      <path fill="#34A853" d="M3.609 1.814L13.792 12 3.61 22.186A1.996 1.996 0 013 20.777V3.223c0-.516.196-.99.609-1.409z"/>
                      <path fill="#FBBC05" d="M13.792 12l5.346 5.346-8.29 4.632a2.006 2.006 0 01-1.856.035L3.61 22.186 13.792 12z"/>
                      <path fill="#EA4335" d="M3.992 1.987l5.361 10.013 4.439-4.44-8.29-4.632a2.006 2.006 0 00-1.51-.026z"/>
                      <path fill="#4285F4" d="M13.792 12l5.346-5.346 2.83 1.58c.658.367 1.032.994 1.032 1.766s-.374 1.4-1.032 1.766l-2.83 1.58L13.792 12z"/>
                    </svg>
                  </div>
                  <div className="text-center">
                    <div className="text-white font-semibold text-sm">Android</div>
                  </div>
                </motion.a>

                <motion.a
                  href="https://apps.apple.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex flex-col items-center justify-center gap-2 p-4 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-7 h-7">
                      <path fill="#000000" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                  </div>
                  <div className="text-center">
                    <div className="text-white font-semibold text-sm">iOS</div>
                  </div>
                </motion.a>
              </motion.div>

              {/* Actions */}
              <motion.div 
                className="space-y-1.5 text-center border-t border-[#E2ECF5] pt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <motion.button
                  onClick={handleMaybeLater}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-[#64748B] hover:text-[#020817] font-medium transition-colors px-4 py-2 rounded-xl hover:bg-[#E8F4FD] text-sm"
                >
                  Maybe Later
                </motion.button>
                <button
                  onClick={handleDontShowAgain}
                  className="block w-full text-xs text-[#64748B]/50 hover:text-[#64748B] transition-colors py-1"
                >
                  Don't show this again
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
