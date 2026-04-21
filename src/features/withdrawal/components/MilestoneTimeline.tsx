import { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import { MILESTONES, getMinutesSinceQuit, formatTimeUntil, formatDateReached } from '@/lib/milestones';

interface MilestoneTimelineProps {
  quitDate: string;
}

const MilestoneTimeline = ({ quitDate }: MilestoneTimelineProps) => {
  const mins = getMinutesSinceQuit(quitDate);
  const currentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentRef.current) {
      currentRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  const nextIndex = MILESTONES.findIndex(m => mins < m.minutes);

  return (
    <div className="mx-4 bg-card rounded-2xl p-5 mt-4">
      <h3 className="font-heading text-base font-bold text-foreground">Your milestones</h3>
      <p className="font-body text-xs text-health-muted mt-1 mb-4">Health improvements backed by research</p>

      <div className="relative pl-6">
        {/* Vertical line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-health-line" />

        {MILESTONES.map((m, i) => {
          const reached = mins >= m.minutes;
          const isCurrent = i === nextIndex;

          return (
            <div
              key={m.id}
              ref={isCurrent ? currentRef : undefined}
              className="relative flex items-start gap-3 pb-5 last:pb-0"
            >
              {/* Dot */}
              <div className="absolute -left-6 top-1 flex items-center justify-center">
                {reached ? (
                  <div className="w-3 h-3 rounded-full bg-accent flex items-center justify-center">
                    <Check size={8} className="text-accent-foreground" strokeWidth={3} />
                  </div>
                ) : isCurrent ? (
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-primary bg-health-light-blue animate-pulse-dot" />
                ) : (
                  <div className="w-2.5 h-2.5 rounded-full border-2 border-health-line bg-card" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className={`font-heading text-[13px] ${reached ? 'text-primary font-bold' : 'text-health-muted'}`}>
                  {m.label}
                </div>
                <div className={`font-body text-sm ${reached ? 'text-foreground' : 'text-health-muted'}`}>
                  {m.description}
                </div>
              </div>

              {/* Badge */}
              <div className="flex-shrink-0 mt-0.5">
                {reached ? (
                  <span className="flex items-center gap-1 text-[11px] font-body text-accent">
                    <Check size={10} /> {formatDateReached(m.minutes, quitDate)}
                  </span>
                ) : (
                  <span className={`text-[11px] font-body ${isCurrent ? 'text-primary' : 'text-health-muted'}`}>
                    {formatTimeUntil(m.minutes, quitDate)}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="font-body text-[10px] text-health-muted mt-4 pt-3 border-t border-health-line">
        Source: NHS Stop Smoking, ICMR
      </p>
    </div>
  );
};

export default MilestoneTimeline;
