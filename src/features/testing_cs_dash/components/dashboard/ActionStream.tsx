import { AlertTriangle, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { ACTION_ITEMS } from '@/lib/data';
import { cn } from '@/lib/utils';

const typeConfig = {
  critical: {
    icon: AlertTriangle,
    classes: 'border-l-destructive bg-destructive/5',
    iconClass: 'text-destructive',
    buttonClass: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  },
  warning: {
    icon: TrendingUp,
    classes: 'border-l-warning bg-warning/5',
    iconClass: 'text-warning',
    buttonClass: 'bg-warning text-warning-foreground hover:bg-warning/90',
  },
  success: {
    icon: CheckCircle,
    classes: 'border-l-success bg-success/5',
    iconClass: 'text-success',
    buttonClass: 'bg-success text-success-foreground hover:bg-success/90',
  },
};

export function ActionStream() {
  return (
    <div className="executive-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Action Required
        </h2>
        <span className="text-xs text-muted-foreground">
          {ACTION_ITEMS.filter(i => i.type !== 'success').length} pending
        </span>
      </div>

      <div className="space-y-3">
        {ACTION_ITEMS.map((item) => {
          const config = typeConfig[item.type];
          const Icon = config.icon;
          
          return (
            <div 
              key={item.id}
              className={cn(
                "p-4 rounded-lg border-l-4 transition-all animate-fade-in",
                config.classes
              )}
            >
              <div className="flex items-start gap-3">
                <Icon className={cn("w-5 h-5 mt-0.5 flex-shrink-0", config.iconClass)} />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.detail}
                  </p>
                </div>
                <button 
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex-shrink-0",
                    config.buttonClass
                  )}
                >
                  {item.action}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
