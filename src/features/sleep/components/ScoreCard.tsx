import { SleepLog, getScoreBand, getScoreColor, formatMinutes, getRecentLogs } from '@/lib/sleep';

interface ScoreCardProps {
  log: SleepLog;
}

const ScoreCard = ({ log }: ScoreCardProps) => {
  const band = getScoreBand(log.score);
  const color = getScoreColor(log.score);
  const circumference = 2 * Math.PI * 70; // radius 70
  const offset = circumference - (log.score / 100) * circumference;

  // Calculate 7-day average
  const recent = getRecentLogs(7);
  const recentScores = recent.filter(l => l.date !== log.date).map(l => l.score);
  const avg = recentScores.length > 0
    ? Math.round(recentScores.reduce((a, b) => a + b, 0) / recentScores.length)
    : null;
  const diff = avg !== null ? log.score - avg : null;

  return (
    <div className="mx-4 rounded-2xl bg-card p-6 shadow-sm animate-fade-in-up">
      {/* Score Ring */}
      <div className="flex flex-col items-center">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
            <circle
              cx="80" cy="80" r="70"
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="12"
            />
            <circle
              cx="80" cy="80" r="70"
              fill="none"
              stroke={color}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{
                animation: 'score-ring 1s ease-out forwards',
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-sora text-[56px] font-bold leading-none text-foreground">
              {log.score}
            </span>
            <span className="font-sora text-lg text-muted-foreground">/100</span>
          </div>
        </div>

        {/* Band label */}
        <span className={`mt-3 font-dm text-base font-medium ${band.colorClass}`}>
          {band.label}
        </span>

        {/* Duration */}
        <span className="mt-1 font-dm text-sm text-muted-foreground">
          Last night: {formatMinutes(log.totalMinutes)}
        </span>

        {/* Comparison */}
        {diff !== null && (
          <span className={`mt-1 font-dm text-sm ${diff >= 0 ? 'text-success' : 'text-destructive'}`}>
            {diff >= 0 ? '↑' : '↓'} {Math.abs(diff)} points {diff >= 0 ? 'higher' : 'lower'} than your 7-day average
          </span>
        )}
      </div>
    </div>
  );
};

export default ScoreCard;
