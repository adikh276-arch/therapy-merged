import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { SERVICE_DEMAND } from '@/lib/data';
import { cn } from '@/lib/utils';
import { AlertTriangle, TrendingUp, Lightbulb, ArrowRight } from 'lucide-react';

const statusConfig = {
  critical: {
    label: 'Critical Demand',
    color: 'bg-destructive',
    bgColor: 'bg-destructive/10',
    textColor: 'text-destructive',
    icon: AlertTriangle,
  },
  warning: {
    label: 'Approaching Limit',
    color: 'bg-warning',
    bgColor: 'bg-warning/10',
    textColor: 'text-warning',
    icon: TrendingUp,
  },
  stable: {
    label: 'Stable',
    color: 'bg-success',
    bgColor: 'bg-success/10',
    textColor: 'text-success',
    icon: TrendingUp,
  },
  opportunity: {
    label: 'Opportunity',
    color: 'bg-primary',
    bgColor: 'bg-primary/10',
    textColor: 'text-primary',
    icon: Lightbulb,
  },
};

const SummaryService = () => {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Service Utilization</h1>
        <p className="text-muted-foreground mt-1">
          Primary question: <span className="font-medium text-foreground">Where is capacity constrained or opportunity emerging?</span>
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Service Cards */}
        <div className="col-span-8">
          <div className="grid grid-cols-2 gap-4">
            {SERVICE_DEMAND.map((service) => {
              const config = statusConfig[service.status];
              const Icon = config.icon;
              const utilizationPercent = service.capacity > 0 
                ? Math.round((service.used / service.capacity) * 100) 
                : 0;

              return (
                <div 
                  key={service.service}
                  className={cn(
                    "executive-card p-5 border-l-4",
                    service.status === 'critical' && 'border-l-destructive',
                    service.status === 'warning' && 'border-l-warning',
                    service.status === 'stable' && 'border-l-success',
                    service.status === 'opportunity' && 'border-l-primary',
                  )}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-foreground">{service.service}</h3>
                      <span className={cn(
                        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium mt-2",
                        config.bgColor,
                        config.textColor
                      )}>
                        <Icon className="w-3 h-3" />
                        {config.label}
                      </span>
                    </div>
                    {service.capacity > 0 && (
                      <span className={cn(
                        "text-2xl font-bold",
                        utilizationPercent >= 90 ? 'text-destructive' : 
                        utilizationPercent >= 70 ? 'text-warning' : 'text-success'
                      )}>
                        {utilizationPercent}%
                      </span>
                    )}
                  </div>

                  {service.capacity > 0 ? (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{service.used} used</span>
                        <span>{service.capacity} capacity</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full transition-all duration-500",
                            config.color
                          )}
                          style={{ width: `${utilizationPercent}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Not currently offered
                    </p>
                  )}

                  <p className="text-sm text-muted-foreground mt-4">
                    {service.insight}
                  </p>

                  {service.action && (
                    <button className={cn(
                      "mt-4 w-full py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors",
                      service.status === 'critical' && 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                      service.status === 'warning' && 'bg-warning text-warning-foreground hover:bg-warning/90',
                      service.status === 'opportunity' && 'gradient-primary text-white hover:opacity-90',
                    )}>
                      {service.action}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Insights Panel */}
        <div className="col-span-4 space-y-4">
          <div className="executive-card p-5 border-l-4 border-l-destructive">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              Critical Alert
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              Therapy utilization at 95% has resulted in <span className="font-medium text-foreground">3 service denials</span> this month.
            </p>
            <p className="text-sm text-destructive font-medium mt-3">
              Recommended: Add 10 therapy seats immediately
            </p>
          </div>

          <div className="executive-card p-5 border-l-4 border-l-primary">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-primary" />
              Growth Opportunity
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              35% of employees cite financial concerns as their top stressor, but Financial Wellbeing module is not offered.
            </p>
            <p className="text-sm text-primary font-medium mt-3">
              Potential impact: Address root cause for 175 employees
            </p>
          </div>

          <div className="executive-card p-5">
            <h3 className="font-semibold text-foreground mb-3">Service Awareness</h3>
            <div className="space-y-2">
              {[
                { service: 'Therapy', awareness: 95 },
                { service: 'Yoga', awareness: 72 },
                { service: 'Coaching', awareness: 68 },
                { service: 'Nutrition', awareness: 34 },
              ].map((item) => (
                <div key={item.service} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{item.service}</span>
                  <span className={cn(
                    "text-sm font-medium",
                    item.awareness >= 70 ? 'text-success' : 
                    item.awareness >= 50 ? 'text-warning' : 'text-muted-foreground'
                  )}>
                    {item.awareness}%
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Low awareness for Nutrition suggests marketing opportunity
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SummaryService;
