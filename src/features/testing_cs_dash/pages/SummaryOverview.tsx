import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { FUNNEL_DATA, RISKS } from '@/lib/data';
import { cn } from '@/lib/utils';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ScatterChart, Scatter, Cell, CartesianGrid } from 'recharts';

const funnelColors = ['hsl(217, 91%, 60%)', 'hsl(217, 91%, 55%)', 'hsl(217, 91%, 50%)', 'hsl(217, 91%, 45%)'];

// Mock cohort data for scatter plot
const cohortData = [
  { dept: 'Engineering', engagement: 72, stress: 45, size: 45 },
  { dept: 'Marketing', engagement: 35, stress: 78, size: 28 },
  { dept: 'Sales', engagement: 82, stress: 85, size: 42 },
  { dept: 'HR', engagement: 68, stress: 32, size: 15 },
  { dept: 'Finance', engagement: 55, stress: 58, size: 22 },
  { dept: 'Operations', engagement: 48, stress: 42, size: 35 },
];

const getQuadrantColor = (engagement: number, stress: number) => {
  if (engagement < 50 && stress > 60) return 'hsl(0, 84%, 60%)'; // Silent Sufferers - Red
  if (engagement >= 50 && stress > 60) return 'hsl(38, 92%, 50%)'; // Active but Stressed - Amber
  if (engagement >= 50 && stress <= 60) return 'hsl(160, 84%, 39%)'; // Healthy - Green
  return 'hsl(215, 16%, 47%)'; // Low engagement, Low stress - Gray
};

const SummaryOverview = () => {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Program Overview</h1>
        <p className="text-muted-foreground mt-1">
          Primary question: <span className="font-medium text-foreground">Is the program reaching and helping employees?</span>
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Activation Funnel */}
        <div className="col-span-7 executive-card p-6">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-6">
            Activation Funnel
          </h2>
          
          <div className="space-y-4">
            {FUNNEL_DATA.map((stage, index) => {
              const width = (stage.count / FUNNEL_DATA[0].count) * 100;
              const isAboveBenchmark = stage.benchmark && stage.rate > stage.benchmark;
              
              return (
                <div key={stage.stage} className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-foreground">{stage.stage}</span>
                      {stage.benchmark && (
                        <span className={cn(
                          "text-xs px-2 py-0.5 rounded-full font-medium",
                          isAboveBenchmark ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
                        )}>
                          {isAboveBenchmark ? '✓ Above' : 'Below'} {stage.benchmark}% benchmark
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">{stage.label}</span>
                  </div>
                  <div className="h-10 bg-muted rounded-lg overflow-hidden">
                    <div 
                      className="h-full rounded-lg transition-all duration-700 ease-out"
                      style={{ 
                        width: `${width}%`,
                        backgroundColor: funnelColors[index]
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 rounded-lg bg-success/10 border border-success/20">
            <p className="text-sm text-success font-medium">
              ✓ Key Insight: Activation rate is 35% above industry benchmark
            </p>
            <p className="text-xs text-success/80 mt-1">
              Focus opportunity: Improve engaged rate from 12% to target 15%
            </p>
          </div>
        </div>

        {/* Risk Matrix */}
        <div className="col-span-5 executive-card p-6">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
            Cohort Risk Matrix
          </h2>
          <p className="text-xs text-muted-foreground mb-4">
            Engagement vs. Stress Score by Department
          </p>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
                <XAxis 
                  type="number" 
                  dataKey="engagement" 
                  name="Engagement" 
                  domain={[0, 100]}
                  tick={{ fontSize: 11, fill: 'hsl(215, 16%, 47%)' }}
                  label={{ value: 'Engagement %', position: 'bottom', offset: 0, fontSize: 11, fill: 'hsl(215, 16%, 47%)' }}
                />
                <YAxis 
                  type="number" 
                  dataKey="stress" 
                  name="Stress" 
                  domain={[0, 100]}
                  tick={{ fontSize: 11, fill: 'hsl(215, 16%, 47%)' }}
                  label={{ value: 'Stress', angle: -90, position: 'insideLeft', fontSize: 11, fill: 'hsl(215, 16%, 47%)' }}
                />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="executive-card p-3 shadow-lg">
                          <p className="font-medium text-sm">{data.dept}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Engagement: {data.engagement}% | Stress: {data.stress}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {data.size} employees
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter data={cohortData}>
                  {cohortData.map((entry, index) => (
                    <Cell 
                      key={index} 
                      fill={getQuadrantColor(entry.engagement, entry.stress)}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <span className="text-muted-foreground">Silent Sufferers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-warning" />
              <span className="text-muted-foreground">Active & Stressed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success" />
              <span className="text-muted-foreground">Healthy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-muted-foreground" />
              <span className="text-muted-foreground">Disengaged</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SummaryOverview;
