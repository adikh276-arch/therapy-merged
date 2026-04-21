import { getDaysSinceQuit, calculateLifeRegained, getReachedMilestones, MILESTONES } from '@/lib/milestones';
import { getAvgPerDay } from '@/lib/storage';

interface StatsRowProps {
  quitDate: string;
}

const StatsRow = ({ quitDate }: StatsRowProps) => {
  const days = getDaysSinceQuit(quitDate);
  const life = calculateLifeRegained(quitDate, getAvgPerDay());
  const reached = getReachedMilestones(quitDate).length;

  const stats = [
    { label: 'Day', value: days.toString() },
    { label: 'Life regained', value: `${life.hours} hr` },
    { label: 'Milestones', value: `${reached} of ${MILESTONES.length}` },
  ];

  return (
    <div className="mx-4 mt-4 grid grid-cols-3 gap-3">
      {stats.map(s => (
        <div key={s.label} className="bg-card rounded-xl p-3 text-center">
          <div className="font-heading text-lg font-bold text-foreground">{s.value}</div>
          <div className="font-body text-[11px] text-health-muted">{s.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsRow;
