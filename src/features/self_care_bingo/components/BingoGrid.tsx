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

  const BINGO_LETTERS = [
    { letter: "B", color: "#61DAFB" },
    { letter: "I", color: "#61DAFB" },
    { letter: "N", color: "#61DAFB" },
    { letter: "G", color: "#61DAFB" },
    { letter: "O", color: "#61DAFB" },
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
      confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ["#61DAFB", "#FBBF24", "#94A3B8"] });
      confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ["#61DAFB", "#FBBF24", "#94A3B8"] });
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
    <div className="flex flex-col items-center space-y-8">
      <header className="text-center">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-1">Self-Care Bingo</h2>
        <p className="text-slate-500 text-sm font-medium">
            Complete a line of self-care activities to win!
        </p>
      </header>

      {/* Progress Section */}
      <div className="w-full bg-white rounded-[2rem] border-2 border-slate-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 font-bold text-slate-700 text-sm">
            <Trophy size={18} className="text-primary" />
            Activities Completed
          </div>
          <span className="text-primary font-black text-sm">{progress}/25</span>
        </div>
        <div className="h-3 rounded-full bg-slate-50 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            className="h-full bg-primary shadow-[0_0_12px_rgba(97,218,251,0.5)]" 
          />
        </div>
      </div>

      <div className="w-full space-y-4">
        {/* BINGO Header */}
        <div className="grid grid-cols-5 gap-3">
          {BINGO_LETTERS.map(({ letter }) => (
            <div
              key={letter}
              className="bg-slate-50 text-slate-300 font-black text-xl py-3 rounded-2xl text-center border-2 border-transparent"
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
                      ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "bg-emerald-50 border-emerald-100 text-emerald-600 scale-[0.98]"
                    : "bg-white border-slate-100 text-slate-700 hover:border-primary/50 hover:bg-slate-50 shadow-sm"
                  }
                `}
              >
                <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">{tile.emoji}</span>
                <span className={`text-[8px] font-black uppercase tracking-tighter leading-none text-center ${
                    isCompleted ? "opacity-40" : "opacity-100"
                }`}>
                  {tile.text}
                </span>
                
                <AnimatePresence>
                    {isCompleted && !isFreeSpace && (
                        <motion.div 
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white border-2 border-white"
                        >
                            <Check size={10} strokeWidth={4} />
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
        onClick={resetBoard}
        className="px-8 py-4 bg-slate-50 text-slate-400 font-bold rounded-2xl flex items-center gap-2 hover:bg-slate-100 transition-colors"
      >
        <RefreshCw size={18} />
        {t('new_board')}
      </motion.button>
    </div>
  );
};

export default BingoGrid;
