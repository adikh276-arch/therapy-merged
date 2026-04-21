import { Transaction } from '@/lib/types';
import { X } from 'lucide-react';

interface Props {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export function TransactionLog({ transactions, onDelete }: Props) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground text-sm">
        No transactions yet. Tap an activity to start tracking.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-1">
        Transaction Log
      </h3>
      <div className="space-y-1">
        {[...transactions].reverse().map((tx, i) => {
          const isDeposit = tx.cost < 0;
          const isDebt = tx.balanceAfter < 0;
          return (
            <div
              key={tx.id}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg bg-card border border-border/50 group ${i === 0 ? 'transaction-slide-in' : ''}`}
            >
              <span className="text-lg">{tx.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground truncate">{tx.activityName}</span>
                  <span className="text-xs text-muted-foreground">{tx.time}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className={`font-mono font-semibold text-sm ${isDeposit ? 'text-surplus' : 'text-debt'}`}>
                    {isDeposit ? '+' : '−'}{Math.abs(tx.cost)}
                  </span>
                  <div className={`text-xs font-mono ${isDebt ? 'text-debt' : 'text-muted-foreground'}`}>
                    → {tx.balanceAfter < 0 && '−'}{Math.abs(tx.balanceAfter)}
                  </div>
                </div>
                <button
                  onClick={() => onDelete(tx.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-muted"
                  aria-label="Delete transaction"
                >
                  <X className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
