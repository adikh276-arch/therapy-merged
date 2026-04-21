import { useState } from 'react';
import { INTENSITY_LEVELS, TRIGGERS, LOCATIONS, generateId, addLog } from '@/lib/cravingData';
import type { CravingLog } from '@/lib/cravingData';
import { toast } from 'sonner';
import { ChevronDown, ChevronUp, Minus, Plus, Shield, Cigarette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LoggingCardProps {
  onLogged: (log: CravingLog) => void;
}

const LoggingCard = ({ onLogged }: LoggingCardProps) => {
  const [selectedIntensity, setSelectedIntensity] = useState<number | null>(null);
  const [outcome, setOutcome] = useState<'resisted' | 'smoked' | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [trigger, setTrigger] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  const canLog = selectedIntensity !== null && outcome !== null;

  const handleLog = async () => {
    if (!canLog) return;
    const level = INTENSITY_LEVELS[selectedIntensity!];
    const log: CravingLog = {
      id: generateId(),
      timestamp: new Date().toISOString(),
      intensity: level.range[1],
      intensityLabel: level.label,
      outcome: outcome!,
      trigger,
      location,
      quantity: outcome === 'smoked' ? quantity : null,
      notes: notes || null,
    };

    await addLog(log);

    if (outcome === 'resisted') {
      toast.success('Craving resisted! Well done. 🎉');
    } else {
      toast('Logged. Try to resist the next one!');
    }

    onLogged(log);

    // Reset
    setSelectedIntensity(null);
    setOutcome(null);
    setShowDetails(false);
    setTrigger(null);
    setLocation(null);
    setQuantity(1);
    setNotes('');
  };

  const getIntensityStyles = (key: string, isSelected: boolean) => {
    switch (key) {
      case 'minimal': return cn("bg-teal/10 border-teal/20 text-teal", isSelected && "border-teal border-2");
      case 'mild': return cn("bg-lavender/10 border-lavender/20 text-lavender", isSelected && "border-lavender border-2");
      case 'moderate': return cn("bg-blue-100 border-blue-200 text-blue-600", isSelected && "border-blue-500 border-2");
      case 'high': return cn("bg-sunshine/10 border-sunshine/20 text-sunshine", isSelected && "border-sunshine border-2");
      case 'severe': return cn("bg-coral/10 border-coral/20 text-coral", isSelected && "border-coral border-2");
      default: return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-sm font-medium text-muted-foreground mb-4">How intense is this craving?</p>
        <div className="space-y-2.5">
          {INTENSITY_LEVELS.map((level, idx) => (
            <button
              key={level.key}
              onClick={() => setSelectedIntensity(idx)}
              className={cn(
                "w-full flex items-center justify-between px-6 py-4 rounded-2xl border transition-all duration-200",
                getIntensityStyles(level.key, selectedIntensity === idx)
              )}
            >
              <span className="font-bold text-base">{level.label}</span>
              <span className="text-sm opacity-60 font-medium">{level.range[0]}-{level.range[1]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground text-center">Did you act on it?</p>
        <div className="flex gap-4">
          <button
            onClick={() => setOutcome('resisted')}
            className={cn(
              "flex-1 flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border transition-all duration-200",
              outcome === 'resisted'
                ? "bg-teal/10 border-teal text-teal"
                : "bg-background border-border text-muted-foreground hover:bg-muted"
            )}
          >
            <Shield className={cn("w-7 h-7", outcome === 'resisted' ? "text-teal" : "text-muted-foreground")} />
            <span className="font-semibold text-sm">I resisted</span>
          </button>
          <button
            onClick={() => setOutcome('smoked')}
            className={cn(
              "flex-1 flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border transition-all duration-200",
              outcome === 'smoked'
                ? "bg-accent/10 border-accent text-accent"
                : "bg-background border-border text-muted-foreground hover:bg-muted"
            )}
          >
            <Cigarette className={cn("w-7 h-7", outcome === 'smoked' ? "text-muted-foreground" : "text-muted-foreground")} />
            <span className="font-semibold text-sm">I smoked</span>
          </button>
        </div>
      </div>

      <Button
        disabled={!canLog}
        onClick={handleLog}
        className="w-full h-14 rounded-2xl text-base font-bold shadow-lg transition-transform active:scale-[0.98]"
      >
        Log Craving
      </Button>

      <button
        className="w-full text-xs text-muted-foreground font-medium flex items-center justify-center gap-1.5 hover:text-foreground transition-colors"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? "Hide details" : "Add details"} {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {showDetails && (
        <div className="animate-slide-up space-y-6 pt-2">
          <div>
            <p className="text-xs uppercase tracking-wider font-bold text-muted-foreground mb-3">What triggered it?</p>
            <div className="flex flex-wrap gap-2">
              {TRIGGERS.map(t => (
                <button
                  key={t}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-semibold border transition-colors",
                    trigger === t ? "bg-primary text-primary-foreground border-primary" : "bg-muted/50 text-muted-foreground border-transparent hover:border-border"
                  )}
                  onClick={() => setTrigger(trigger === t ? null : t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider font-bold text-muted-foreground mb-3">Where were you?</p>
            <div className="flex flex-wrap gap-2">
              {LOCATIONS.map(l => (
                <button
                  key={l}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-semibold border transition-colors",
                    location === l ? "bg-primary text-primary-foreground border-primary" : "bg-muted/50 text-muted-foreground border-transparent hover:border-border"
                  )}
                  onClick={() => setLocation(location === l ? null : l)}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
          {outcome === 'smoked' && (
            <div>
              <p className="text-xs uppercase tracking-wider font-bold text-muted-foreground mb-3">How many?</p>
              <div className="flex items-center gap-4">
                <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-border transition-colors" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus size={16} />
                </button>
                <span className="font-bold text-xl text-foreground w-6 text-center">{quantity}</span>
                <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-border transition-colors" onClick={() => setQuantity(Math.min(10, quantity + 1))}>
                  <Plus size={16} />
                </button>
              </div>
            </div>
          )}
          <div>
            <p className="text-xs uppercase tracking-wider font-bold text-muted-foreground mb-3">Notes</p>
            <input
              type="text"
              className="w-full h-12 px-4 rounded-xl border bg-muted/30 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              placeholder="How are you feeling?"
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoggingCard;
