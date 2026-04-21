import { useState, useRef } from 'react';
import { Transaction, ShareStyle } from '@/lib/types';
import { DUMMY_INSIGHTS } from '@/lib/dummy-data';

interface Props {
  transactions: Transaction[];
  startingEnergy: number;
  balance: number;
}

export function ShowMyDay({ transactions, startingEnergy, balance }: Props) {
  const [style, setStyle] = useState<ShareStyle>('bold');
  const cardRef = useRef<HTMLDivElement>(null);
  const isInDebt = balance < 0;

  const totalSpent = transactions.filter(t => t.cost > 0).reduce((s, t) => s + t.cost, 0);
  const totalRecovered = transactions.filter(t => t.cost < 0).reduce((s, t) => s + Math.abs(t.cost), 0);

  const styles: Record<ShareStyle, { card: string; header: string; accent: string }> = {
    minimal: {
      card: 'bg-card border border-border text-foreground',
      header: 'text-foreground',
      accent: 'text-primary',
    },
    illustrated: {
      card: 'bg-gradient-to-br from-primary/5 via-card to-surplus/5 border border-primary/20 text-foreground',
      header: 'text-primary',
      accent: 'text-surplus',
    },
    bold: {
      card: 'bg-gradient-to-br from-foreground to-foreground/90 text-background',
      header: 'text-background',
      accent: 'text-primary',
    },
  };

  const s = styles[style];

  const topActivities = [...transactions]
    .filter(t => t.cost > 0)
    .sort((a, b) => b.cost - a.cost)
    .slice(0, 5);

  return (
    <div className="space-y-5 pb-24">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Show My Day</h2>
        <p className="text-sm text-muted-foreground">Share what invisible disability looks like</p>
      </div>

      {/* Style selector */}
      <div className="flex gap-2">
        {(['minimal', 'illustrated', 'bold'] as ShareStyle[]).map(st => (
          <button
            key={st}
            onClick={() => setStyle(st)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
              style === st
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Shareable card */}
      <div ref={cardRef} className={`rounded-2xl p-6 space-y-5 ${s.card}`}>
        {/* Header */}
        <div className="text-center space-y-1">
          <p className="text-xs uppercase tracking-widest opacity-60">A Day in My Life</p>
          <h3 className={`text-lg font-bold ${s.header}`}>with Chronic Illness</h3>
        </div>

        {/* Capacity comparison */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-xs opacity-60 w-24">Healthy person</span>
            <div className="flex-1 h-5 rounded-full bg-white/10 relative overflow-hidden">
              <div className="h-full bg-primary/30 rounded-full" style={{ width: '100%' }} />
              <span className="absolute right-2 top-0 h-full flex items-center text-xs font-mono font-semibold opacity-80">200 units</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs opacity-60 w-24">My energy</span>
            <div className="flex-1 h-5 rounded-full bg-white/10 relative overflow-hidden">
              <div
                className={`h-full rounded-full ${isInDebt ? 'bg-debt' : 'bg-primary'}`}
                style={{ width: `${(startingEnergy / 200) * 100}%` }}
              />
              <span className="absolute right-2 top-0 h-full flex items-center text-xs font-mono font-semibold opacity-80">
                {startingEnergy} units
              </span>
            </div>
          </div>
          <p className={`text-center text-xs font-semibold ${s.accent}`}>
            I started today with {DUMMY_INSIGHTS.capacityPercent}% of normal energy
          </p>
        </div>

        {/* Where energy went */}
        <div className="space-y-1.5">
          <p className="text-xs uppercase tracking-wider opacity-60 mb-2">Where my energy went</p>
          {topActivities.map(tx => (
            <div key={tx.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>{tx.emoji}</span>
                <span className="text-sm">{tx.activityName}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 rounded-full bg-debt/40" style={{ width: `${(tx.cost / startingEnergy) * 80}px` }} />
                <span className="text-xs font-mono font-semibold">−{tx.cost}</span>
              </div>
            </div>
          ))}
          {totalRecovered > 0 && (
            <div className="flex items-center justify-between opacity-80">
              <div className="flex items-center gap-2">
                <span>💚</span>
                <span className="text-sm">Recovery activities</span>
              </div>
              <span className={`text-xs font-mono font-semibold ${s.accent}`}>+{totalRecovered}</span>
            </div>
          )}
        </div>

        {/* Status */}
        <div className="text-center py-3 rounded-xl bg-white/5">
          <p className="text-xs opacity-60 mb-1">Current Status</p>
          <p className="font-mono font-bold text-2xl">
            {isInDebt ? (
              <span className="text-debt">{Math.abs(balance)} units in debt</span>
            ) : (
              <span className={s.accent}>{balance} units remaining</span>
            )}
          </p>
          <p className="text-xs opacity-60 mt-1">
            Spent {totalSpent} of {startingEnergy} energy units
          </p>
        </div>

        {/* Footer */}
        <div className="text-center pt-2 border-t border-white/10">
          <p className="text-xs italic opacity-60">
            This is what invisible disability looks like.
          </p>
          <p className={`text-xs font-semibold mt-1 ${s.accent}`}>Energy Economy</p>
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Tap and hold the card to save as image, or take a screenshot to share.
      </p>
    </div>
  );
}
