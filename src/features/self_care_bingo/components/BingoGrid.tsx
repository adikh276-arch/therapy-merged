import { useState, useCallback, useMemo, useEffect } from "react";
import { RefreshCw, Trophy, Check, Sparkles as SparklesIcon, ChevronRight } from "lucide-react";
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

  const BINGO_LETTERS = [
    { letter: "B", color: "text-rose-500 bg-rose-50" },
    { letter: "I", color: "text-blue-500 bg-blue-50" },
    { letter: "N", color: "text-amber-500 bg-amber-50" },
    { letter: "G", color: "text-emerald-500 bg-emerald-50" },
    { letter: "O", color: "text-indigo-500 bg-indigo-50" },
  ];

  const [completed, setCompleted] = useState<Set<number>>(() => new Set([12])); // FREE SPACE

  const WINNING_LINES = [
    // rows
    [0, 1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14], [15, 16, 17, 18, 19], [20, 21, 22, 23, 24],
    // cols
    [0, 5, 10, 15, 20], [1, 6, 11, 16, 21], [2, 7, 12, 17, 22], [3, 8, 13, 18, 23], [4, 9, 14, 19, 24],
    // diagonals
    [0, 6, 12, 18, 24], [4, 8, 12, 16, 20],
  ];

  const [wonLines, setWonLines] = useState<Set<number>>(() => new Set());

  const fireBigCelebration = useCallback(() => {
    const end = Date.now() + 3000;
    const frame = () => {
      confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ["#4F46E5", "#10B981", "#FBBF24"] });
      confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ["#4F46E5", "#10B981", "#FBBF24"] });
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

  const resetBoard = () => {
    setCompleted(new Set([12]));
    setWonLines(new Set());
  };

  const progress = completed.size;
  const progressPercent = (progress / 25) * 100;

  return (
    <div className="flex flex-col items-center gap-8 py-4" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif' }}>
      <header className="text-center space-y-2">
        <h2 className="text-3xl font-black text-slate-800 leading-tight">{t("app_title")}</h2>
        <p className="text-slate-500 font-medium text-base italic">{t("complete_a_line_of_self_care_to_win")}</p>
      </header>

      {/* Progress Section */}
      <div className="w-full bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-2xl shadow-slate-200/50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3 font-black text-slate-700 text-sm uppercase tracking-widest">
            <Trophy size={18} className="text-primary" />{t("activities_logged")}</div>
          <span className="text-primary font-black text-lg">{progress}<span className="text-slate-300 text-sm">/25</span></span>
        </div>
        <div className="h-2 rounded-full bg-slate-50 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            className="h-full bg-primary" 
          />
        </div>
      </div>

      <div className="w-full space-y-4">
        {/* BINGO Header */}
        <div className="grid grid-cols-5 gap-3">
          {BINGO_LETTERS.map(({ letter, color }) => (
            <div
              key={letter}
              className={`font-black text-xl py-4 rounded-3xl text-center border border-slate-50 shadow-sm ${color}`}
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
                  relative aspect-square rounded-[1.5rem] border p-2 flex flex-col items-center justify-center text-center
                  transition-all duration-500 group
                  ${isCompleted
                    ? isFreeSpace
                      ? "bg-slate-900 border-slate-900 text-white shadow-2xl shadow-slate-900/20"
                      : "bg-emerald-50 border-emerald-100 text-emerald-600 shadow-sm"
                    : "bg-white border-slate-100 text-slate-700 hover:border-primary/50 hover:bg-slate-50 shadow-xl shadow-slate-200/50"
                  }
                `}
              >
                <span className="text-2xl mb-1 group-hover:scale-110 transition-transform duration-500">{tile.emoji}</span>
                <span className={`text-[7px] font-black uppercase tracking-tighter leading-none text-center ${
                    isCompleted ? "opacity-30" : "opacity-100"
                }`}>
                  {tile.text}
                </span>
                
                <AnimatePresence>
                    {isCompleted && !isFreeSpace && (
                        <motion.div 
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-2xl flex items-center justify-center text-white border-4 border-white shadow-lg"
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
      <div className="w-full flex flex-col gap-4">
        <button
          onClick={resetBoard}
          className="w-full bg-white text-slate-400 py-5 rounded-2xl font-black text-lg border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-3 shadow-sm"
        >
          <RefreshCw size={20} strokeWidth={3} />
          {t('new_board')}
        </button>
      </div>
    </div>
  );
};

export default BingoGrid;
