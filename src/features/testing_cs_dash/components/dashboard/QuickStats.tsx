import { Users, Activity, Heart, TrendingUp } from 'lucide-react';
import { FUNNEL_DATA, ROI_METRICS } from '@/lib/data';
import { cn } from '@/lib/utils';

const stats = [
  {
    label: 'Activation Rate',
    value: `${FUNNEL_DATA[2].rate}%`,
    benchmark: `${FUNNEL_DATA[2].benchmark}% benchmark`,
    trend: '+4.2%',
    isAboveBenchmark: FUNNEL_DATA[2].rate > (FUNNEL_DATA[2].benchmark || 0),
    icon: Users,
  },
  {
    label: 'Monthly Engagement',
    value: `${FUNNEL_DATA[3].rate}%`,
    benchmark: `${FUNNEL_DATA[3].benchmark}% benchmark`,
    trend: '+2.1%',
    isAboveBenchmark: FUNNEL_DATA[3].rate > (FUNNEL_DATA[3].benchmark || 0),
    icon: Activity,
  },
  {
    label: 'Satisfaction Score',
    value: '4.5/5',
    benchmark: 'Top 10% industry',
    trend: '+0.2',
    isAboveBenchmark: true,
    icon: Heart,
  },
  {
    label: 'Days Saved',
    value: ROI_METRICS.daysSaved.toString(),
    benchmark: `$${(ROI_METRICS.estValue / 1000).toFixed(0)}K value`,
    trend: '+12%',
    isAboveBenchmark: true,
    icon: TrendingUp,
  },
];

export function QuickStats() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="executive-card p-5">
          <div className="flex items-start justify-between">
            <div className="p-2 rounded-lg bg-primary/10">
              <stat.icon className="w-4 h-4 text-primary" />
            </div>
            <span className={cn(
              "text-xs font-medium px-2 py-0.5 rounded-full",
              stat.isAboveBenchmark 
                ? "bg-success/10 text-success" 
                : "bg-warning/10 text-warning"
            )}>
              {stat.trend}
            </span>
          </div>
          
          <div className="mt-4">
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
          
          <p className={cn(
            "text-xs mt-3 font-medium",
            stat.isAboveBenchmark ? "text-success" : "text-muted-foreground"
          )}>
            {stat.isAboveBenchmark && "✓ "}
            {stat.benchmark}
          </p>
        </div>
      ))}
    </div>
  );
}
