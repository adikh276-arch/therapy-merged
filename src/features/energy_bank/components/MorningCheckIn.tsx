import { useState } from 'react';
import { EnergyTag } from '@/lib/types';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

interface Props {
  onComplete: (energy: number, tags: EnergyTag[]) => void;
}

const TAGS: { id: EnergyTag; label: string; emoji: string }[] = [
  { id: 'slept-poorly', label: 'Slept poorly', emoji: '😴' },
  { id: 'high-pain', label: 'High pain', emoji: '🔥' },
  { id: 'flare-up', label: 'Flare-up', emoji: '⚡' },
  { id: 'feeling-good', label: 'Feeling good', emoji: '✨' },
  { id: 'stressed', label: 'Stressed', emoji: '😰' },
  { id: 'medicated', label: 'Medicated', emoji: '💊' },
];

function getZone(val: number) {
  if (val >= 80) return { label: "You're rich today!", emoji: '🟢', color: 'text-surplus', bg: 'bg-surplus/10' };
  if (val >= 40) return { label: 'Budget carefully', emoji: '🟡', color: 'text-energy-medium', bg: 'bg-energy-medium/10' };
  if (val >= 20) return { label: 'Survival mode', emoji: '🟠', color: 'text-energy-low', bg: 'bg-energy-low/10' };
  return { label: 'Emergency reserves only', emoji: '🔴', color: 'text-energy-critical', bg: 'bg-energy-critical/10' };
}

export function MorningCheckIn({ onComplete }: Props) {
  const [energy, setEnergy] = useState(50);
  const [selectedTags, setSelectedTags] = useState<EnergyTag[]>([]);
  const zone = getZone(energy);

  const toggleTag = (tag: EnergyTag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md flex flex-col items-center gap-8">
        <div className="text-center space-y-2">
          <p className="text-muted-foreground text-sm">Good morning</p>
          <h1 className="text-2xl font-semibold text-foreground">How much energy do you have today?</h1>
        </div>

        {/* Battery visual */}
        <div className="w-full relative">
          <div className="w-32 h-56 mx-auto rounded-2xl border-4 border-foreground/20 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-3 rounded-t-lg bg-foreground/20" />
            <div
              className={`absolute bottom-0 left-0 right-0 transition-all duration-500 ease-out ${
                energy >= 80 ? 'bg-surplus' :
                energy >= 40 ? 'bg-energy-medium' :
                energy >= 20 ? 'bg-energy-low' :
                'bg-energy-critical'
              }`}
              style={{ height: `${energy}%`, opacity: 0.85 }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono font-bold text-4xl text-foreground drop-shadow-sm">{energy}</span>
            </div>
          </div>
        </div>

        {/* Zone indicator */}
        <div className={`px-4 py-2 rounded-full ${zone.bg}`}>
          <span className={`font-medium ${zone.color}`}>{zone.emoji} {zone.label}</span>
        </div>

        {/* Slider */}
        <div className="w-full px-4">
          <Slider
            value={[energy]}
            onValueChange={([v]) => setEnergy(v)}
            min={0}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>0</span>
            <span>100</span>
          </div>
        </div>

        {/* Pattern comparison */}
        <p className="text-sm text-muted-foreground text-center">
          Based on patterns, we expected <strong className="text-foreground">60 units</strong>.
          {energy < 60 ? " Consider adjusting plans." : " Looking good!"}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 justify-center">
          {TAGS.map(tag => (
            <button
              key={tag.id}
              onClick={() => toggleTag(tag.id)}
              className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                selectedTags.includes(tag.id)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {tag.emoji} {tag.label}
            </button>
          ))}
        </div>

        <Button
          onClick={() => onComplete(energy, selectedTags)}
          className="w-full max-w-xs h-12 text-lg font-semibold"
          size="lg"
        >
          Start My Day
        </Button>
      </div>
    </div>
  );
}
