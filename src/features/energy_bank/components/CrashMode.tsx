import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface Props {
  onExit: () => void;
}

const ESSENTIAL = [
  { emoji: '💊', name: 'Take medication', id: 'meds' },
  { emoji: '🚽', name: 'Bathroom', id: 'bathroom' },
  { emoji: '💧', name: 'Drink water', id: 'water' },
];

const AFFIRMATIONS = [
  "Rest is not weakness. Your body needs this.",
  "You are not lazy. You are conserving energy.",
  "This crash is temporary. It will pass.",
  "You don't need to earn rest.",
  "Your body is healing. Let it.",
];

export function CrashMode({ onExit }: Props) {
  const affirmation = AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)];

  return (
    <div className="fixed inset-0 z-50 bg-foreground/80 crash-fade flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-8 text-center">
        <button
          onClick={onExit}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white/60 hover:text-white/90 hover:bg-white/20 transition-colors"
          aria-label="Exit crash mode"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2">
          <div className="text-4xl">🛑</div>
          <h2 className="text-xl font-semibold text-white">Survival Mode</h2>
          <p className="text-white/50 text-sm">Only essentials. Everything else can wait.</p>
        </div>

        <div className="space-y-3">
          {ESSENTIAL.map(item => (
            <div
              key={item.id}
              className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-4 text-white"
            >
              <span className="text-2xl">{item.emoji}</span>
              <span className="text-base font-medium">{item.name}</span>
            </div>
          ))}
        </div>

        <div className="bg-white/5 rounded-xl px-6 py-5 border border-white/10">
          <p className="text-white/90 text-base italic leading-relaxed">
            "{affirmation}"
          </p>
        </div>

        <p className="text-white/30 text-xs">
          Tomorrow's planned activities have been marked for rescheduling.
        </p>
      </div>
    </div>
  );
}
