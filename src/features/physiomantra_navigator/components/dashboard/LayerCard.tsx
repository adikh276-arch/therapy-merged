import { cn } from '@/lib/utils';
import { Check, Lock, ChevronRight, Loader2, Star, Shield, Zap, Building, Users, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface LayerCardProps {
  layerNumber: number;
  title: string;
  status: 'complete' | 'in-progress' | 'locked' | 'active';
  progress?: { completed: number; total: number };
  nextStep?: string;
  unlockCondition?: string;
  onClick?: () => void;
  customLabel?: string;
  customIcon?: LucideIcon;
}

const LayerCard = ({
  layerNumber,
  title,
  status,
  progress,
  nextStep,
  unlockCondition,
  onClick,
  customLabel,
  customIcon: CustomIcon,
}: LayerCardProps) => {
  const isLocked = status === 'locked';
  const isComplete = status === 'complete';
  const isInProgress = status === 'in-progress';

  // Layer icons mapping
  const LayerIcon = CustomIcon || [Shield, Zap, Users, Building, Star][layerNumber - 1] || Star;

  const progressPercentage = progress
    ? (progress.completed / progress.total) * 100
    : 0;

  return (
    <div
      className={cn(
        'group relative rounded-2xl border bg-card p-6 transition-all duration-300',
        'border-border/60 shadow-sm', // Default elegant border
        !isLocked && 'hover:-translate-y-1 hover:shadow-xl hover:border-primary/30 cursor-pointer',
        isInProgress && 'ring-1 ring-primary/20 border-primary/40', // Subtle highlight for active
        isLocked && 'opacity-60 grayscale bg-muted/10'
      )}
      onClick={!isLocked ? onClick : undefined}
    >
      <div className="flex gap-5">
        {/* Icon Box - Unified Theme */}
        <div className={cn(
          "flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm transition-colors",
          "bg-gradient-to-br from-primary/10 to-primary/5 text-primary border border-primary/10",
          isComplete && "from-blue-600/10 to-blue-500/5 text-blue-600 border-blue-600/10",
          isLocked && "bg-muted text-muted-foreground border-transparent"
        )}>
          {isComplete ? <Check className="w-6 h-6" /> :
            isLocked ? <Lock className="w-5 h-5" /> :
              <LayerIcon className="w-6 h-6" />
          }
        </div>

        <div className="flex-1 min-w-0 py-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
              {customLabel || `Pathway ${layerNumber}`}
            </span>

            {/* Status Chips */}
            {isInProgress && (
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold border border-primary/20">
                <Loader2 className="w-3 h-3 animate-spin" />
                IN PROGRESS
              </span>
            )}
            {isComplete && (
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-600/10 text-blue-600 text-[10px] font-bold border border-blue-600/20">
                <Check className="w-3 h-3" />
                COMPLETE
              </span>
            )}
            {status === 'active' && (
              <span className="px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-600 text-[10px] font-bold border border-sky-500/20">
                AVAILABLE
              </span>
            )}
          </div>

          <h3 className={cn(
            "text-xl font-bold transition-colors mb-4",
            isLocked ? "text-muted-foreground" : "text-foreground group-hover:text-primary"
          )}>
            {title}
          </h3>

          {/* Progress Section */}
          {!isLocked && progress && (
            <div className="space-y-3">
              <div className="h-2 w-full bg-muted/30 rounded-full overflow-hidden">
                <div
                  className={cn("h-full transition-all duration-500 rounded-full", isComplete ? "bg-blue-600" : "bg-primary")}
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground font-medium">{progress.completed} of {progress.total} steps</span>
                <span className="font-bold text-foreground">{Math.round(progressPercentage)}%</span>
              </div>
            </div>
          )}

          {/* Next Step / Status messages */}
          <div className="mt-4 flex items-center gap-3">
            {nextStep && isInProgress && (
              <div className="flex items-center gap-2 text-sm text-foreground/80 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Next: {nextStep}
              </div>
            )}

            {unlockCondition && isLocked && (
              <div className="text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded border">
                🔒 Requires: {unlockCondition}
              </div>
            )}
          </div>
        </div>

        {/* Action Arrow */}
        {!isLocked && (
          <div className="self-center hidden sm:flex">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground/30 group-hover:text-primary group-hover:bg-primary/5 transition-all">
              <ChevronRight className="w-5 h-5" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LayerCard;
