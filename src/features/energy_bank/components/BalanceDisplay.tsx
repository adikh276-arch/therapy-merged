import { useAnimatedNumber } from '@/hooks/useAnimatedNumber';
import { getBalanceColor, getEnergyZone } from '@/hooks/useEnergyStore';

interface Props {
  balance: number;
  startingEnergy: number;
  isInDebt: boolean;
  compact?: boolean;
  projected?: number;
}

export function BalanceDisplay({ balance, startingEnergy, isInDebt, compact, projected }: Props) {
  const animatedBalance = useAnimatedNumber(balance);
  const zone = getEnergyZone(balance, startingEnergy);
  const color = getBalanceColor(balance);

  // Calculate percentage for the bar
  // If in debt, bar is 0 (or handled distinctly)
  const percentage = Math.max(0, Math.min(100, (balance / startingEnergy) * 100));

  return (
    <div className={`transition-all duration-500 ${compact ? 'text-right' : 'text-center'}`}>
      {!compact && (
        <h2 className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-medium">
          Current Balance
        </h2>
      )}

      <div className={`font-mono font-bold tracking-tight ${color} ${compact ? 'text-2xl' : 'text-5xl'}`}>
        {isInDebt ? '-' : ''}{Math.abs(animatedBalance)}
        <span className={`text-base ml-1 font-sans font-medium text-muted-foreground`}>units</span>
      </div>

      {!compact && (
        <div className="mt-6 w-full max-w-xs mx-auto space-y-2">
          <div className="h-4 bg-muted/50 rounded-full overflow-hidden relative border border-border/50">
            {/* Background markers */}
            <div className="absolute top-0 bottom-0 left-[20%] w-px bg-border/30" />
            <div className="absolute top-0 bottom-0 left-[50%] w-px bg-border/30" />

            {/* Main Bar */}
            <div
              className={`h-full transition-all duration-700 ease-out ${isInDebt ? 'bg-debt' :
                  zone === 'high' ? 'bg-surplus' :
                    zone === 'medium' ? 'bg-energy-medium' :
                      zone === 'low' ? 'bg-energy-low' : 'bg-energy-critical'
                }`}
              style={{ width: `${isInDebt ? 100 : percentage}%` }}
            />
          </div>

          <div className="flex justify-between text-[10px] text-muted-foreground uppercase font-medium px-1">
            <span>Critical</span>
            <span>Safe</span>
            <span>Rich</span>
          </div>
        </div>
      )}
    </div>
  );
}
