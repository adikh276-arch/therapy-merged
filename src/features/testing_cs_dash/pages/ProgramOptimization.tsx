import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { OPTIMIZATION_GAPS, SERVICE_DEMAND } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { ArrowRight, Lightbulb, TrendingUp, Shield, CheckCircle } from 'lucide-react';

const recommendations = [
  {
    id: 1,
    title: 'Launch Financial Planning Module',
    reason: '35% of employees cite inflation as their primary stressor',
    impact: 'Address root cause for ~175 employees',
    risk: 'Unaddressed financial stress correlates with 2.4x higher turnover',
    priority: 'high' as const,
    category: 'Gap Analysis',
  },
  {
    id: 2,
    title: 'Expand Therapy Capacity (+10 seats)',
    reason: 'Current utilization at 95%, 3 service denials this month',
    impact: 'Eliminate service bottleneck, improve satisfaction',
    risk: 'Continued denials will impact program perception',
    priority: 'critical' as const,
    category: 'Capacity',
  },
  {
    id: 3,
    title: 'Launch Nutrition Awareness Campaign',
    reason: 'Only 34% awareness despite 45% citing diet as concern',
    impact: 'Increase service utilization by est. 20%',
    risk: 'Low awareness = underutilized investment',
    priority: 'medium' as const,
    category: 'Awareness',
  },
];

const priorityConfig = {
  critical: {
    label: 'Critical',
    color: 'bg-destructive text-destructive-foreground',
    border: 'border-l-destructive',
  },
  high: {
    label: 'High Priority',
    color: 'bg-warning text-warning-foreground',
    border: 'border-l-warning',
  },
  medium: {
    label: 'Recommended',
    color: 'bg-primary text-primary-foreground',
    border: 'border-l-primary',
  },
};

const ProgramOptimization = () => {
  const radarData = OPTIMIZATION_GAPS.map(gap => ({
    category: gap.category,
    company: gap.company,
    benchmark: gap.benchmark,
  }));

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-primary font-medium mb-2">
          <Shield className="w-4 h-4" />
          Program Optimization
        </div>
        <h1 className="text-2xl font-semibold text-foreground">Growth Opportunities</h1>
        <p className="text-muted-foreground mt-1">
          Primary question: <span className="font-medium text-foreground">Where can we improve outcomes and reduce risk?</span>
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Gap Analysis Radar */}
        <div className="col-span-5">
          <div className="executive-card p-6 h-full">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
              Coverage vs. Industry Benchmark
            </h2>
            
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(214, 32%, 91%)" />
                  <PolarAngleAxis 
                    dataKey="category" 
                    tick={{ fontSize: 11, fill: 'hsl(215, 16%, 47%)' }}
                  />
                  <Radar
                    name="Your Program"
                    dataKey="company"
                    stroke="hsl(217, 91%, 60%)"
                    fill="hsl(217, 91%, 60%)"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Industry Benchmark"
                    dataKey="benchmark"
                    stroke="hsl(215, 16%, 47%)"
                    fill="hsl(215, 16%, 47%)"
                    fillOpacity={0.1}
                    strokeWidth={2}
                    strokeDasharray="4 4"
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-center gap-6 mt-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-muted-foreground">Your Program</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted-foreground opacity-50" />
                <span className="text-muted-foreground">Industry Benchmark</span>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-warning/10 border border-warning/20">
              <p className="text-sm font-medium text-warning">
                Gap Identified: Financial Wellbeing
              </p>
              <p className="text-xs text-warning/80 mt-1">
                Your coverage is 0% vs. 55% industry average
              </p>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Recommended Actions
            </h2>
            <span className="text-xs text-muted-foreground">
              Based on observed signals, not assumptions
            </span>
          </div>

          {recommendations.map((rec) => {
            const config = priorityConfig[rec.priority];
            
            return (
              <div 
                key={rec.id}
                className={cn(
                  "executive-card p-5 border-l-4",
                  config.border
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded-full",
                        config.color
                      )}>
                        {config.label}
                      </span>
                      <span className="text-xs text-muted-foreground">{rec.category}</span>
                    </div>
                    <h3 className="font-semibold text-foreground">{rec.title}</h3>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Why:</span> {rec.reason}
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Impact:</span> {rec.impact}
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Risk of inaction:</span> {rec.risk}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg gradient-primary text-white text-sm font-medium hover:opacity-90 transition-opacity">
                    Request Proposal
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button className="text-sm text-muted-foreground hover:text-foreground">
                    Learn More
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="col-span-12">
          <div className="executive-card p-6 gradient-primary text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-white/20">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Ready to optimize your program?</h3>
                  <p className="text-white/80 text-sm mt-1">
                    Schedule a call with your dedicated Customer Success Manager
                  </p>
                </div>
              </div>
              <button className="px-6 py-3 rounded-lg bg-white text-primary font-medium hover:bg-white/90 transition-colors">
                Schedule Review Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProgramOptimization;
