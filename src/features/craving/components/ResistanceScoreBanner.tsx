import { getResisted, getTotal, getRestraintRate } from '@/lib/cravingData';
import { cn } from '@/lib/utils';

interface ResistanceScoreBannerProps {
  refreshKey: number;
}

const ResistanceScoreBanner = ({ refreshKey: _ }: ResistanceScoreBannerProps) => {
  const resisted = getResisted();
  const total = getTotal();
  const rate = getRestraintRate();

  if (total === 0) {
    return (
      <div className="w-full rounded-3xl bg-teal/5 border border-teal/10 p-10 text-center animate-slide-up">
        <h2 className="text-xl font-bold text-foreground mb-2">Your journey starts here</h2>
        <p className="text-sm text-muted-foreground">
          Log your first craving to start tracking your wins
        </p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-3xl bg-gradient-to-br from-teal/10 via-background to-lavender/10 border border-teal/10 p-8 text-center animate-slide-up">
      <div className="text-4xl font-black text-teal mb-1">{resisted}</div>
      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
        Cigarettes not smoked
      </p>

      <div className="mt-6 flex items-center justify-between text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
        <span>Restraint Rate</span>
        <span>{rate}%</span>
      </div>
      <div className="mt-2 w-full h-2 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-teal transition-all duration-700 ease-out"
          style={{ width: `${rate}%` }}
        />
      </div>
    </div>
  );
};

export default ResistanceScoreBanner;
