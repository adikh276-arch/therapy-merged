import { useState, useCallback, useMemo, useEffect } from "react";
import { RefreshCw, Trophy, Check, Sparkles as SparklesIcon } from "lucide-react";
import confetti from "canvas-confetti";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

interface BingoGridProps {
    onWin: () => void;
}

const BingoGrid = ({ onWin }: BingoGridProps) => {
  const { t } = useTranslation();

  const BINGO_TILES = useMemo(() => [
    { emoji: "🚶", text: t('tiles.walk') },
    { emoji: "💧", text: t('tiles.water') },
    { emoji: "📞", text: t('tiles.friend') },
    { emoji: "📝", text: t('tiles.gratitudes') },
    { emoji: "😴", text: t('tiles.nap') },
    { emoji: "🧘", text: t('tiles.stretch') },
    { emoji: "🥗", text: t('tiles.cook') },
    { emoji: "🎵", text: t('tiles.music') },
    { emoji: "🌬️", text: t('tiles.breathing') },
    { emoji: "📖", text: t('tiles.read') },
    { emoji: "🛁", text: t('tiles.bath') },
    { emoji: "🌳", text: t('tiles.journal') },
    { emoji: "⭐", text: t('tiles.free_space') },
    { emoji: "🧹", text: t('tiles.declutter') },
    { emoji: "🎨", text: t('tiles.recipe') },
    { emoji: "🧘‍♀️", text: t('tiles.meditation') },
    { emoji: "😌", text: t('tiles.mask') },
    { emoji: "📵", text: t('tiles.unplug') },
    { emoji: "💬", text: t('tiles.compliment') },
    { emoji: "💊", text: t('tiles.sunset') },
    { emoji: "🐱", text: t('tiles.smile') },
    { emoji: "☕", text: t('tiles.kindness') },
    { emoji: "📓", text: t('tiles.sleep') },
    { emoji: "❤️", text: t('tiles.yoga') },
    { emoji: "💃", text: t('tiles.dance') },
  ], [t]);

  const [completed, setCompleted] = useState<Set<number>>(() => new Set([12])); // FREE SPACE
  const [wonLines, setWonLines] = useState<Set<number>>(() => new Set());

  const WINNING_LINES = [
    [0, 1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14], [15, 16, 17, 18, 19], [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20], [1, 6, 11, 16, 21], [2, 7, 12, 17, 22], [3, 8, 13, 18, 23], [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24], [4, 8, 12, 16, 20],
  ];

  const fireBigCelebration = useCallback(() => {
    const end = Date.now() + 3000;
    const frame = () => {
      confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ["#3B82F6", "#F59E0B", "#10B981"] });
      confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ["#3B82F6", "#F59E0B", "#10B981"] });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  const toggleTile = useCallback((index: number) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        if (index === 12) return next;
        next.delete(index);
      } else {
        next.add(index);
      }

      setTimeout(() => {
        setWonLines((prevWon) => {
          const newWon = new Set(prevWon);
          let newLineCompleted = false;
          WINNING_LINES.forEach((line, i) => {
            if (!prevWon.has(i) && line.every((idx) => next.has(idx))) {
              newWon.add(i);
              newLineCompleted = true;
            }
          });
          if (newLineCompleted) {
            fireBigCelebration();
            setTimeout(onWin, 2000);
          }
          return newWon;
        });
      }, 50);

      return next;
    });
  }, [fireBigCelebration, onWin]);

  const progress = completed.size;
  const progressPercent = (progress / 25) * 100;

  return (
    <div className="flex flex-col items-center space-y-10">
      <header className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-[#3B82F6] font-black text-[10px] uppercase tracking-widest">
            <SparklesIcon size={12} />
            Wellness Challenge
        </div>
        <h2 className="text-3xl font-black text-[#0F172A] tracking-tight mb-1">{t('app_title')}</h2>
        <p className="text-[#64748B] text-sm font-medium">
            {t('app_subtitle')}
        </p>
      </header>

      {/* Progress Section */}
      <div className="w-full bg-white rounded-[2rem] border-2 border-slate-100 p-8 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3 font-black text-[#334155] text-xs uppercase tracking-tight">
            <Trophy size={16} className="text-[#F59E0B]" />
            Activities Logged
          </div>
          <span className="text-[#3B82F6] font-black text-sm">{progress} / 25</span>
        </div>
        <div className="h-3 rounded-full bg-slate-50 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            className="h-full bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] shadow-lg shadow-blue-100" 
          />
        </div>
      </div>

      <div className="w-full space-y-4">
        {/* BINGO Header */}
        <div className="grid grid-cols-5 gap-3">
          {["B", "I", "N", "G", "O"].map((letter) => (
            <div
              key={letter}
              className="bg-white text-[#94A3B8] font-black text-xl py-4 rounded-2xl text-center border-2 border-slate-100 shadow-sm"
            >
              {letter}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-5 gap-3">
          {BINGO_TILES.map((tile, index) => {
            const isCompleted = completed.has(index);
            const isFreeSpace = index === 12;

            return (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleTile(index)}
                className={`
                  relative aspect-square rounded-2xl border-2 p-2 flex flex-col items-center justify-center text-center
                  transition-all duration-300 group
                  ${isCompleted
                    ? isFreeSpace
                      ? "bg-[#0F172A] border-[#0F172A] text-white shadow-xl shadow-slate-200"
                      : "bg-[#EFF6FF] border-[#BFDBFE] text-[#3B82F6]"
                    : "bg-white border-slate-100 text-[#334155] hover:border-[#3B82F6]/50 hover:bg-slate-50 shadow-sm"
                  }
                `}
              >
                <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">{tile.emoji}</span>
                <span className={`text-[8px] font-black uppercase tracking-tighter leading-none text-center ${
                    isCompleted ? "opacity-60" : "opacity-100"
                }`}>
                  {tile.text}
                </span>
                
                <AnimatePresence>
                    {isCompleted && !isFreeSpace && (
                        <motion.div 
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="absolute -top-1 -right-1 w-6 h-6 bg-[#10B981] rounded-full flex items-center justify-center text-white border-2 border-white shadow-sm"
                        >
                            <Check size={12} strokeWidth={4} />
                        </motion.div>
                    )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* New Board Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setCompleted(new Set([12]))}
        className="px-8 py-5 bg-white border-2 border-slate-100 text-[#64748B] font-bold rounded-[2rem] flex items-center gap-3 hover:text-[#0F172A] hover:border-[#0F172A]/20 transition-all shadow-sm"
      >
        <RefreshCw size={18} />
        New Assessment
      </motion.button>
    </div>
  );
};

export default BingoGrid;
