import { TrendingUp, ArrowRight } from 'lucide-react';
import { PROGRAM_HEALTH } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export function HealthScore() {
  const { score, status, trend, subscores } = PROGRAM_HEALTH;
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-primary';
    return 'text-warning';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Good':
        return 'status-success';
      case 'Warning':
        return 'status-warning';
      case 'Critical':
        return 'status-critical';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="executive-card p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Program Health Score
          </h2>
          <div className="flex items-baseline gap-3 mt-2">
            <span className={cn("text-5xl font-bold tracking-tight", getScoreColor(score))}>
              {score}
            </span>
            <span className="text-2xl text-muted-foreground font-light">/100</span>
          </div>
        </div>
        <span className={cn("px-3 py-1 rounded-full text-sm font-medium border", getStatusBadge(status))}>
          {status}
        </span>
      </div>

      <div className="flex items-center gap-2 text-sm text-success mb-6">
        <TrendingUp className="w-4 h-4" />
        <span className="font-medium">{trend}</span>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
        {Object.entries(subscores).map(([key, value]) => (
          <div key={key}>
            <p className="text-xs text-muted-foreground capitalize">
              {key.replace('_', ' ')}
            </p>
            <p className={cn("text-lg font-semibold mt-1", getScoreColor(value))}>
              {value}%
            </p>
          </div>
        ))}
      </div>

      <Link 
        to="/optimization"
        className="mt-6 flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg gradient-primary text-white font-medium text-sm transition-all hover:opacity-90 hover:gap-3"
      >
        View Optimization Opportunities
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
