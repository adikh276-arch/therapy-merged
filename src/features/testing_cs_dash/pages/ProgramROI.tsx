import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ROI_METRICS } from '@/lib/data';
import { cn } from '@/lib/utils';
import { DollarSign, Clock, Users, TrendingUp, Info, ArrowRight } from 'lucide-react';

const ProgramROI = () => {
  const [mode, setMode] = useState<'conservative' | 'holistic'>('conservative');

  const conservativeMetrics = {
    daysSaved: ROI_METRICS.daysSaved,
    dollarValue: ROI_METRICS.estValue,
    primaryLabel: 'Productive Days Saved',
    secondaryLabel: 'Direct Cost Savings',
  };

  const holisticMetrics = {
    daysSaved: Math.round(ROI_METRICS.daysSaved * 1.4),
    dollarValue: Math.round(ROI_METRICS.estValue * 1.8),
    primaryLabel: 'Total Productive Days',
    secondaryLabel: 'Full Program Value',
  };

  const metrics = mode === 'conservative' ? conservativeMetrics : holisticMetrics;

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Program ROI</h1>
        <p className="text-muted-foreground mt-1">
          Primary question: <span className="font-medium text-foreground">What measurable value has the program delivered?</span>
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Mode Toggle */}
        <div className="col-span-12">
          <div className="executive-card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-foreground">Calculation Mode:</span>
                <div className="flex rounded-lg bg-muted p-1">
                  <button
                    onClick={() => setMode('conservative')}
                    className={cn(
                      "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                      mode === 'conservative' 
                        ? "bg-card text-foreground shadow-sm" 
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Conservative
                  </button>
                  <button
                    onClick={() => setMode('holistic')}
                    className={cn(
                      "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                      mode === 'holistic' 
                        ? "bg-card text-foreground shadow-sm" 
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Holistic
                  </button>
                </div>
              </div>
              <button className="text-sm text-primary flex items-center gap-1 hover:underline">
                <Info className="w-4 h-4" />
                How we calculate this
              </button>
            </div>
          </div>
        </div>

        {/* Primary Value Card */}
        <div className="col-span-6">
          <div className="executive-card p-8 gradient-primary text-white">
            <p className="text-sm font-medium text-white/80 uppercase tracking-wide">
              {metrics.secondaryLabel}
            </p>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-5xl font-bold">
                ${(metrics.dollarValue / 1000).toFixed(0)}K
              </span>
            </div>
            <p className="text-sm text-white/80 mt-4">
              Based on {mode === 'conservative' ? 'direct cost savings only' : 'productivity + retention impact'}
            </p>
            
            <div className="mt-6 pt-6 border-t border-white/20">
              <div className="flex items-center gap-2 text-white/90">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {mode === 'conservative' ? '12x' : '22x'} return on program investment
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Metrics */}
        <div className="col-span-6 space-y-4">
          <div className="executive-card p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{metrics.primaryLabel}</p>
                <p className="text-3xl font-bold text-foreground mt-1">{metrics.daysSaved}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  ~${Math.round(metrics.dollarValue / metrics.daysSaved)}/day average value
                </p>
              </div>
            </div>
          </div>

          <div className="executive-card p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-success/10">
                <Users className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Retention Impact</p>
                <p className="text-3xl font-bold text-foreground mt-1">{ROI_METRICS.retentionBoost}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {ROI_METRICS.retentionDetail}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Breakdown Table */}
        <div className="col-span-12">
          <div className="executive-card p-6">
            <h3 className="font-semibold text-foreground mb-4">Value Breakdown</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Category</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Metric</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Value</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Methodology</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="py-4 px-4 text-sm font-medium text-foreground">Absenteeism Reduction</td>
                    <td className="py-4 px-4 text-sm text-muted-foreground text-right">-{ROI_METRICS.absenteeismReduction}%</td>
                    <td className="py-4 px-4 text-sm font-medium text-success text-right">$98,000</td>
                    <td className="py-4 px-4 text-xs text-muted-foreground">Program users vs. baseline</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-sm font-medium text-foreground">Productivity Gain</td>
                    <td className="py-4 px-4 text-sm text-muted-foreground text-right">+{ROI_METRICS.productivityGain}%</td>
                    <td className="py-4 px-4 text-sm font-medium text-success text-right">$87,000</td>
                    <td className="py-4 px-4 text-xs text-muted-foreground">Self-reported productivity survey</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-sm font-medium text-foreground">Attrition Prevention</td>
                    <td className="py-4 px-4 text-sm text-muted-foreground text-right">~4 employees</td>
                    <td className="py-4 px-4 text-sm font-medium text-success text-right">$64,000</td>
                    <td className="py-4 px-4 text-xs text-muted-foreground">Based on coaching user retention</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Need a custom report?</span> Generate a QBR-ready PDF with these metrics
              </p>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg gradient-primary text-white text-sm font-medium hover:opacity-90 transition-opacity">
                Export Report
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProgramROI;
