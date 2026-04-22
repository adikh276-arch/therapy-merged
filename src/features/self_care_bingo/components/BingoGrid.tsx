import { useState, useCallback, useMemo } from "react";
import { RefreshCw } from "lucide-react";
import confetti from "canvas-confetti";
import { useTranslation } from "react-i18next";

const BingoGrid = () => {
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
    { letter: "B", colorClass: "bg-bingo-b" },
    { letter: "I", colorClass: "bg-bingo-i" },
    { letter: "N", colorClass: "bg-bingo-n" },
    { letter: "G", colorClass: "bg-bingo-g" },
    { letter: "O", colorClass: "bg-bingo-o" },
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

  const fireLineConfetti = useCallback(() => {
    confetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#FF6B8A", "#845EC2", "#FFC75F", "#00C9A7", "#4B93FF"],
    });
  }, []);

  const fireBigCelebration = useCallback(() => {
    const end = Date.now() + 3000;
    const frame = () => {
      confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ["#FF6B8A", "#845EC2", "#FFC75F", "#00C9A7", "#4B93FF"] });
      confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ["#FF6B8A", "#845EC2", "#FFC75F", "#00C9A7", "#4B93FF"] });
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

      // Check for new completed lines
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
          if (next.size === 25) {
            fireBigCelebration();
          } else if (newLineCompleted) {
            fireLineConfetti();
          }
          return newWon;
        });
      }, 50);

      return next;
    });
  }, [fireLineConfetti, fireBigCelebration]);

  const resetBoard = () => {
    setCompleted(new Set([12]));
    setWonLines(new Set());
  };

  const progress = completed.size;
  const progressPercent = (progress / 25) * 100;

  return (
    <div className="space-y-6">
      {/* Let's Play Header */}
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-extrabold text-foreground">
          {t('lets_play')}
        </h2>
        <p className="text-muted-foreground text-sm">
          {t('instructions').split('BINGO!')[0]}
          <span className="font-bold text-primary"> BINGO!</span>
        </p>
      </div>

      {/* Progress */}
      <div className="bg-transparent rounded-2xl p-4  border border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-foreground">{t('progress_title')}</span>
          <span className="text-sm text-muted-foreground">{t('progress_count', { count: progress })}</span>
        </div>
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* BINGO Header */}
      <div className="grid grid-cols-5 gap-2 px-1">
        {BINGO_LETTERS.map(({ letter, colorClass }) => (
          <div
            key={letter}
            className={`${colorClass} text-primary-foreground font-extrabold text-xl py-2 rounded-xl text-center `}
          >
            {letter}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-5 gap-2 px-1">
        {BINGO_TILES.map((tile, index) => {
          const isCompleted = completed.has(index);
          const isFreeSpace = index === 12;

          return (
            <button
              key={index}
              onClick={() => toggleTile(index)}
              className={`
                aspect-square rounded-xl border-2 p-1.5 flex flex-col items-center justify-center text-center
                transition-all duration-200 text-xs font-medium leading-tight
                ${isCompleted
                  ? isFreeSpace
                    ? "bg-primary/20 border-primary text-primary "
                    : "bg-success/15 border-success text-success  scale-[0.97]"
                  : "bg-transparent border-border text-foreground hover:border-primary/40 hover:"
                }
              `}
            >
              <span className="text-xl mb-0.5">{tile.emoji}</span>
              {isCompleted && !isFreeSpace && (
                <span className="text-[10px] mb-0.5">✅</span>
              )}
              <span className={`text-[10px] leading-tight ${isCompleted && !isFreeSpace ? "line-through opacity-70" : ""}`}>
                {tile.text}
              </span>
            </button>
          );
        })}
      </div>

      {/* New Board Button */}
      <div className="flex justify-center pt-2">
        <button
          onClick={resetBoard}
          className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity "
        >
          <RefreshCw className="w-4 h-4" />
          {t('new_board')}
        </button>
      </div>
    </div>
  );
};

export default BingoGrid;
