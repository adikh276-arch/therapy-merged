import { getDaysSinceQuit, formatDuration, calculateLifeRegained } from '@/lib/milestones';
import { getAvgPerDay } from '@/lib/storage';

interface DayCounterBannerProps {
  quitDate: string;
  onEditDate: () => void;
}

const DayCounterBanner = ({ quitDate, onEditDate }: DayCounterBannerProps) => {
  const days = getDaysSinceQuit(quitDate);
  const duration = formatDuration(quitDate);
  const avgPerDay = getAvgPerDay();
  const life = calculateLifeRegained(quitDate, avgPerDay);

  return (
    <div className="mx-4 rounded-2xl gradient-hero p-6 relative">
      <div className="flex gap-4">
        <div className="flex-[3]">
          <div className="font-heading text-5xl font-bold text-health-blue">Day {days}</div>
          <div className="font-body text-sm text-health-muted mt-1">tobacco-free</div>
          <div className="font-body text-[11px] text-health-muted mt-0.5">{duration}</div>
        </div>
        <div className="flex-[2] flex items-center justify-center">
          <div className="bg-card/60 rounded-xl p-3 text-center w-full">
            <div className="font-body text-[11px] text-health-muted">Life regained</div>
            <div className="font-heading text-xl font-bold text-accent mt-1">
              {life.hours} hr {life.minutes} min
            </div>
            <div className="font-body text-[10px] text-health-muted mt-0.5">est. 11 min/cig</div>
          </div>
        </div>
      </div>
      <button
        onClick={onEditDate}
        className="absolute bottom-3 right-4 text-[12px] text-primary font-body hover:underline"
      >
        Edit date
      </button>
    </div>
  );
};

export default DayCounterBanner;
