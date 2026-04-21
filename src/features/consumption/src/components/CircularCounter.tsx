import { useEffect, useState } from "react";

interface CircularCounterProps {
  count: number;
  maxCount?: number;
}

export default function CircularCounter({ count, maxCount = 20 }: CircularCounterProps) {
  const [animating, setAnimating] = useState(false);
  const [prevCount, setPrevCount] = useState(count);

  const radius = 100;
  const stroke = 8;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(count / maxCount, 1);
  const dashoffset = circumference * (1 - progress);

  useEffect(() => {
    if (count !== prevCount) {
      setAnimating(true);
      setPrevCount(count);
      const t = setTimeout(() => setAnimating(false), 350);
      return () => clearTimeout(t);
    }
  }, [count, prevCount]);

  return (
    <div className="relative flex items-center justify-center">
      <svg width="240" height="240" viewBox="0 0 240 240" className="animate-pulse-gentle">
        <circle
          cx="120"
          cy="120"
          r={radius}
          className="counter-ring-track"
          strokeWidth={stroke}
        />
        <circle
          cx="120"
          cy="120"
          r={radius}
          className="counter-ring-fill"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          transform="rotate(-90 120 120)"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span
          className={`stat-number text-6xl text-foreground transition-transform ${
            animating ? "animate-count-bump" : ""
          }`}
        >
          {count}
        </span>
        <span className="text-xs text-muted-foreground mt-1 font-medium tracking-wide uppercase">
          today
        </span>
      </div>
    </div>
  );
}
