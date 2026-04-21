import { useState } from "react";
import { X, TrendingUp, Calendar, Hash } from "lucide-react";

interface StatsEntry {
  date: string;
  cigarettes: number;
  type: string;
  duration: number;
  durationUnit: string;
}

interface StatsPanelProps {
  open: boolean;
  onClose: () => void;
  entries: StatsEntry[];
  smokingYears: number;
  avgPerDay: number;
}

const StatsPanel = ({ open, onClose, entries, smokingYears, avgPerDay }: StatsPanelProps) => {
  if (!open) return null;

  const totalEstimated = Math.round(smokingYears * 365 * avgPerDay);
  const packsEstimated = Math.round(totalEstimated / 20);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-[430px] animate-slide-up rounded-t-card-lg bg-card px-5 pb-8 pt-4 shadow-card">
        {/* Handle */}
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border" />

        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold text-foreground">Your Overview</h2>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-all active:scale-95"
          >
            <X size={18} />
          </button>
        </div>

        {/* Summary cards */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <div className="rounded-card bg-accent p-4">
            <div className="mb-1 flex items-center gap-2 text-accent-foreground">
              <Calendar size={14} />
              <span className="text-xs font-medium">Duration</span>
            </div>
            <p className="font-heading text-xl font-semibold text-foreground">
              {smokingYears > 0 ? `${smokingYears} yr${smokingYears !== 1 ? 's' : ''}` : '—'}
            </p>
          </div>
          <div className="rounded-card bg-accent p-4">
            <div className="mb-1 flex items-center gap-2 text-accent-foreground">
              <Hash size={14} />
              <span className="text-xs font-medium">Daily avg</span>
            </div>
            <p className="font-heading text-xl font-semibold text-foreground">
              {avgPerDay > 0 ? avgPerDay : '—'}
            </p>
          </div>
          <div className="col-span-2 rounded-card bg-accent p-4">
            <div className="mb-1 flex items-center gap-2 text-accent-foreground">
              <TrendingUp size={14} />
              <span className="text-xs font-medium">Estimated lifetime total</span>
            </div>
            <p className="font-heading text-xl font-semibold text-foreground">
              {totalEstimated > 0
                ? `~${totalEstimated.toLocaleString()} cigarettes (~${packsEstimated.toLocaleString()} packs)`
                : '—'}
            </p>
          </div>
        </div>

        {/* Recent entries */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">Recent check-ins</h3>
          {entries.length === 0 ? (
            <p className="text-sm text-muted-foreground">No entries yet. Your logs will appear here.</p>
          ) : (
            <div className="space-y-2">
              {entries.slice(-5).reverse().map((entry, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
                  <span className="text-sm text-foreground">{entry.date}</span>
                  <span className="text-sm text-muted-foreground">
                    {entry.cigarettes}/day · {entry.type} · {entry.duration} {entry.durationUnit}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
