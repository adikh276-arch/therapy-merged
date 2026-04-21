import { motion } from 'framer-motion';
import { getScoreTier } from '@/lib/scoreCalculator';

interface ScoreRingProps {
  score: number;
  avgScore?: number;
  animate?: boolean;
}

const RADIUS = 90;
const STROKE = 14;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const tierColorMap = {
  poor: 'hsl(35, 90%, 55%)',
  fair: 'hsl(200, 70%, 60%)',
  good: 'hsl(220, 70%, 55%)',
  excellent: 'hsl(150, 60%, 45%)',
};

export default function ScoreRing({ score, avgScore, animate = true }: ScoreRingProps) {
  const { label, tier } = getScoreTier(score);
  const progress = score / 100;
  const offset = CIRCUMFERENCE * (1 - progress);
  const color = tierColorMap[tier];
  const diff = avgScore !== undefined ? score - avgScore : null;

  return (
    <div className={`flex flex-col items-center gap-3 score-ring-glow score-ring-glow-${tier}`}>
      <svg width="220" height="220" viewBox="0 0 220 220">
        {/* Background ring */}
        <circle
          cx="110" cy="110" r={RADIUS}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={STROKE}
          opacity={0.3}
        />
        {/* Score ring */}
        <motion.circle
          cx="110" cy="110" r={RADIUS}
          fill="none"
          stroke={color}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          initial={animate ? { strokeDashoffset: CIRCUMFERENCE } : { strokeDashoffset: offset }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
          transform="rotate(-90 110 110)"
        />
        {/* Center score text */}
        <motion.text
          x="110" y="100"
          textAnchor="middle"
          fill="hsl(var(--foreground))"
          fontSize="42"
          fontWeight="800"
          fontFamily="Space Grotesk, sans-serif"
          initial={animate ? { opacity: 0 } : { opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {score}
        </motion.text>
        <motion.text
          x="110" y="125"
          textAnchor="middle"
          fill="hsl(var(--muted-foreground))"
          fontSize="14"
          fontWeight="500"
          initial={animate ? { opacity: 0 } : { opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          out of 100
        </motion.text>
      </svg>

      <motion.div
        className="text-center"
        initial={animate ? { opacity: 0, y: 10 } : {}}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.4 }}
      >
        <span
          className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold"
          style={{ backgroundColor: `${color}22`, color }}
        >
          {label}
        </span>
        {diff !== null && (
          <p className="text-muted-foreground text-xs mt-2">
            {diff >= 0 ? '↑' : '↓'} {Math.abs(Math.round(diff))} points{' '}
            {diff >= 0 ? 'higher' : 'lower'} than your 7-day average
          </p>
        )}
      </motion.div>
    </div>
  );
}
