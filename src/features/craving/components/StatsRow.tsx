import { getTodayCount, getResisted, getRestraintRate } from '@/lib/cravingData';
import { cn } from '@/lib/utils';

interface StatsRowProps {
  refreshKey: number;
}

const StatsRow = ({ refreshKey: _ }: StatsRowProps) => {
  return (
    <div className="flex gap-3 justify-center flex-wrap">
      <div className="px-4 py-2 rounded-xl bg-muted/50 border border-transparent text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
        Today: {getTodayCount()}
      </div>
      <div className="px-4 py-2 rounded-xl bg-muted/50 border border-transparent text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
        Resisted: {getResisted()}
      </div>
      <div className="px-4 py-2 rounded-xl bg-muted/50 border border-transparent text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
        Rate: {getRestraintRate()}%
      </div>
    </div>
  );
};

export default StatsRow;
