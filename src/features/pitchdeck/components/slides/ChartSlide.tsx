import { ArrowRight, Lightbulb, TrendingUp, TrendingDown } from 'lucide-react';
import type { SlideData } from '@/data/slides';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  LabelList,
  LineChart,
  Line,
  Legend,
  Cell,
} from 'recharts';

interface ChartSlideProps {
  slide: SlideData;
}

const COLORS = {
  primary: 'hsl(174, 62%, 40%)',
  secondary: 'hsl(16, 85%, 60%)',
  accent: 'hsl(45, 93%, 47%)',
  muted: 'hsl(215, 14%, 60%)',
  success: 'hsl(142, 76%, 36%)',
  warning: 'hsl(38, 92%, 50%)',
  danger: 'hsl(0, 72%, 51%)',
};

const ChartSlide = ({ slide }: ChartSlideProps) => {
  const renderChart = () => {
    if (!slide.chart) return null;

    switch (slide.chart.type) {
      case 'bar':
        return renderBarChart();
      case 'funnel':
        return renderFunnelChart();
      case 'line':
        return renderLineChart();
      case 'waterfall':
        return renderWaterfallChart();
      case 'comparison':
        return renderComparisonVisual();
      case 'matrix':
        return renderMatrixVisual();
      case 'heatmap':
        return renderHeatmap();
      case 'timeline':
        return renderTimelineChart();
      default:
        return renderComparisonVisual();
    }
  };

  const renderBarChart = () => {
    const data = slide.chart?.data;
    
    // Handle search volume data
    if (data?.searches) {
      const chartData = data.searches.map((s: any) => ({
        name: s.term.replace(/"/g, ''),
        volume: s.volume,
        intent: s.intent,
      }));

      return (
        <div className="h-80 w-full animate-fade-up" style={{ animationDelay: '200ms' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ left: 120, right: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
              <YAxis 
                dataKey="name" 
                type="category" 
                stroke="hsl(var(--muted-foreground))"
                width={120}
                tick={{ fontSize: 11 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="volume" fill={COLORS.primary} radius={[0, 4, 4, 0]}>
                {chartData.map((entry: any, index: number) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.intent?.includes('High') ? COLORS.success : COLORS.muted} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    }

    // Handle payment methods data (India)
    if (data?.methods) {
      const chartData = data.methods.map((m: any) => ({
        name: m.method || m.language,
        conversion: m.conversion || m.addressableMarket,
        dropOff: m.dropOff,
      }));

      return (
        <div className="h-72 w-full animate-fade-up" style={{ animationDelay: '200ms' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ left: 20, right: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 11 }} />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="conversion" name="Conversion %" fill={COLORS.success} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    }

    // Handle language data
    if (data?.languages) {
      const chartData = data.languages.map((l: any) => ({
        name: l.language,
        market: l.addressableMarket,
        penetration: l.penetration,
      }));

      return (
        <div className="h-72 w-full animate-fade-up" style={{ animationDelay: '200ms' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ left: 20, right: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 10 }} />
              <YAxis stroke="hsl(var(--muted-foreground))" label={{ value: 'Market Size (M)', angle: -90, position: 'insideLeft' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="market" name="Addressable Market (M)" fill={COLORS.secondary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    }

    return null;
  };

  const renderFunnelChart = () => {
    const data = slide.chart?.data;
    
    // Handle PT activation funnel
    if (data?.stages) {
      const funnelData = data.stages.map((s: any, i: number) => ({
        name: s.stage,
        value: s.count,
        conversion: s.conversion,
        fill: i === 0 ? COLORS.primary : i < 3 ? COLORS.secondary : COLORS.accent,
      }));

      return (
        <div className="space-y-6 animate-fade-up" style={{ animationDelay: '200ms' }}>
          <div className="grid gap-2">
            {funnelData.map((stage: any, index: number) => (
              <div key={index} className="flex items-center gap-4">
                <div 
                  className="h-10 rounded-lg flex items-center justify-end px-4 text-white font-semibold text-sm transition-all"
                  style={{ 
                    width: `${(stage.value / funnelData[0].value) * 100}%`,
                    minWidth: '120px',
                    backgroundColor: index === 0 ? COLORS.primary : 
                                     index < 3 ? COLORS.secondary : 
                                     index < 5 ? COLORS.accent : COLORS.success,
                  }}
                >
                  {stage.value}
                </div>
                <div className="flex-1 text-sm">
                  <span className="font-medium">{stage.name}</span>
                  <span className="text-muted-foreground ml-2">({stage.conversion})</span>
                </div>
              </div>
            ))}
          </div>
          {data.bottlenecks && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="font-semibold text-destructive mb-2">⚠️ Key Bottlenecks:</p>
              <ul className="space-y-1 text-sm">
                {data.bottlenecks.map((b: string, i: number) => (
                  <li key={i} className="text-muted-foreground">{b}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
    }

    // Handle cohort analysis funnel
    if (data?.cohortAnalysis) {
      return (
        <div className="space-y-4 animate-fade-up" style={{ animationDelay: '200ms' }}>
          <div className="grid gap-2">
            {data.cohortAnalysis.map((stage: any, index: number) => (
              <div key={index} className="flex items-center gap-4">
                <div 
                  className="h-12 rounded-lg flex items-center justify-between px-4 text-white font-semibold text-sm"
                  style={{ 
                    width: `${(stage.patients / data.cohortAnalysis[0].patients) * 100}%`,
                    minWidth: '160px',
                    backgroundColor: index === 0 ? COLORS.primary : 
                                     index < 2 ? COLORS.secondary : COLORS.success,
                  }}
                >
                  <span>{stage.patients} patients</span>
                  <span className="text-xs opacity-80">{stage.revenue}</span>
                </div>
                <span className="text-sm font-medium">{stage.stage}</span>
              </div>
            ))}
          </div>
          {data.LTVbreakdown && (
            <div className="grid grid-cols-3 gap-4 mt-6">
              {Object.entries(data.LTVbreakdown).map(([key, value]: [string, any], i) => (
                <div key={i} className="slide-card text-center">
                  <p className="text-lg font-bold text-primary">{value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    // Handle WhatsApp funnel
    if (data?.whatsappFlow) {
      return (
        <div className="space-y-4 animate-fade-up" style={{ animationDelay: '200ms' }}>
          <div className="grid gap-2">
            {data.whatsappFlow.map((stage: any, index: number) => (
              <div key={index} className="flex items-center gap-4">
                <div 
                  className="h-10 rounded-lg flex items-center justify-end px-4 text-white font-semibold text-sm"
                  style={{ 
                    width: `${stage.conversion}%`,
                    minWidth: '80px',
                    backgroundColor: COLORS.success,
                  }}
                >
                  {stage.conversion}%
                </div>
                <div className="flex-1 text-sm">
                  <span className="font-medium">{stage.stage}</span>
                  <span className="text-muted-foreground ml-2 text-xs">({stage.note})</span>
                </div>
              </div>
            ))}
          </div>
          {data.overallConversion && (
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="slide-card text-center bg-success/10 border-success/20">
                <p className="text-lg font-bold text-success">{data.overallConversion.whatsApp}</p>
                <p className="text-xs text-muted-foreground">WhatsApp</p>
              </div>
              <div className="slide-card text-center">
                <p className="text-lg font-bold text-muted-foreground">{data.overallConversion.webOnly}</p>
                <p className="text-xs text-muted-foreground">Web Only</p>
              </div>
              <div className="slide-card text-center bg-primary/10 border-primary/20">
                <p className="text-lg font-bold text-primary">{data.overallConversion.lift}</p>
                <p className="text-xs text-muted-foreground">Improvement</p>
              </div>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  const renderLineChart = () => {
    const data = slide.chart?.data;
    
    if (data?.scenarios) {
      const chartData = [
        { month: 'Month 3', conservative: 35, base: 54, optimistic: 78 },
        { month: 'Month 6', conservative: 90, base: 153, optimistic: 234 },
        { month: 'Month 12', conservative: 230, base: 384, optimistic: 636 },
      ];

      return (
        <div className="space-y-6 animate-fade-up" style={{ animationDelay: '200ms' }}>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ left: 20, right: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" label={{ value: 'Revenue ($K)', angle: -90, position: 'insideLeft' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="conservative" stroke={COLORS.muted} strokeWidth={2} dot={{ r: 4 }} name="Conservative" />
                <Line type="monotone" dataKey="base" stroke={COLORS.primary} strokeWidth={3} dot={{ r: 5 }} name="Base Case" />
                <Line type="monotone" dataKey="optimistic" stroke={COLORS.success} strokeWidth={2} dot={{ r: 4 }} name="Optimistic" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(data.breakEven).map(([scenario, month]: [string, any], i) => (
              <div key={i} className="slide-card text-center">
                <p className="text-sm text-muted-foreground capitalize">{scenario}</p>
                <p className="text-xl font-bold text-primary">{month}</p>
                <p className="text-xs text-muted-foreground">Break-even</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  const renderWaterfallChart = () => {
    const data = slide.chart?.data;

    // Handle channel data
    if (data?.channels) {
      return (
        <div className="space-y-4 animate-fade-up" style={{ animationDelay: '200ms' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 font-semibold">Channel</th>
                  <th className="text-right py-3 px-2 font-semibold">Spend</th>
                  <th className="text-right py-3 px-2 font-semibold">Bookings</th>
                  <th className="text-right py-3 px-2 font-semibold">CAC</th>
                  <th className="text-right py-3 px-2 font-semibold">ROI</th>
                </tr>
              </thead>
              <tbody>
                {data.channels.map((channel: any, i: number) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-2 font-medium">{channel.name || channel.channel}</td>
                    <td className="text-right py-3 px-2">{channel.monthlySpend || channel.reach}</td>
                    <td className="text-right py-3 px-2">{channel.bookings || channel.signups}</td>
                    <td className="text-right py-3 px-2 font-semibold text-secondary">{channel.CAC}</td>
                    <td className="text-right py-3 px-2">
                      {channel.ROI && (
                        <span className={`font-bold ${parseInt(channel.ROI) > 50 ? 'text-success' : 'text-primary'}`}>
                          {channel.ROI}
                        </span>
                      )}
                      {channel.quality && (
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          channel.quality.includes('High') ? 'bg-success/20 text-success' : 
                          channel.quality.includes('Medium') ? 'bg-warning/20 text-warning' : 'bg-muted'
                        }`}>
                          {channel.quality}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    // Handle unit economics data
    if (data?.US_ARPU) {
      const items = [
        { label: 'US ARPU', value: data.US_ARPU, isPositive: true },
        { label: 'US CAC', value: data.US_CAC, isPositive: false },
        { label: 'US Margin', value: data.US_Margin, isPositive: true, isTotal: true },
        { label: 'India ARPU', value: data.India_ARPU, isPositive: true },
        { label: 'India CAC', value: data.India_CAC, isPositive: false },
        { label: 'India Margin', value: data.India_Margin, isPositive: true, isTotal: true },
      ];

      return (
        <div className="grid grid-cols-2 gap-8 animate-fade-up" style={{ animationDelay: '200ms' }}>
          <div className="space-y-3">
            <h4 className="font-semibold text-market-us flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-market-us" /> US Unit Economics
            </h4>
            {items.slice(0, 3).map((item, i) => (
              <div key={i} className={`flex justify-between items-center p-3 rounded-lg ${item.isTotal ? 'bg-market-us/10 border border-market-us/20' : 'bg-muted/30'}`}>
                <span className="text-sm">{item.label.replace('US ', '')}</span>
                <span className={`font-bold ${item.isPositive ? 'text-success' : 'text-destructive'}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-market-india flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-market-india" /> India Unit Economics
            </h4>
            {items.slice(3).map((item, i) => (
              <div key={i} className={`flex justify-between items-center p-3 rounded-lg ${item.isTotal ? 'bg-market-india/10 border border-market-india/20' : 'bg-muted/30'}`}>
                <span className="text-sm">{item.label.replace('India ', '')}</span>
                <span className={`font-bold ${item.isPositive ? 'text-success' : 'text-destructive'}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Handle doctor referral model
    if (data?.doctorModel) {
      return (
        <div className="grid grid-cols-2 gap-8 animate-fade-up" style={{ animationDelay: '200ms' }}>
          <div className="space-y-3">
            <h4 className="font-semibold text-primary">Doctor Referral Model</h4>
            {Object.entries(data.doctorModel).map(([key, value]: [string, any], i) => (
              <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                <span className="text-sm text-muted-foreground">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                <span className="font-semibold text-sm">{value}</span>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-success">Scale Math</h4>
            {Object.entries(data.scaleMath).map(([key, value]: [string, any], i) => (
              <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-success/10">
                <span className="text-sm text-muted-foreground">{key}</span>
                <span className="font-semibold text-sm text-success">{value}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  const renderComparisonVisual = () => {
    const data = slide.chart?.data;
    if (!data) return null;

    return (
      <div className="grid grid-cols-2 gap-8 animate-fade-up" style={{ animationDelay: '200ms' }}>
        {Object.entries(data).map(([market, details]: [string, any], i) => (
          <div 
            key={market} 
            className={`p-6 rounded-xl border-2 ${
              market === 'India' ? 'border-market-india bg-market-india/5' : 'border-market-us bg-market-us/5'
            }`}
          >
            <h4 className={`text-xl font-bold mb-4 ${market === 'India' ? 'text-market-india' : 'text-market-us'}`}>
              {market}
            </h4>
            <div className="space-y-3">
              {Object.entries(details).map(([key, value]: [string, any]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground capitalize">{key}</span>
                  <span className="font-semibold text-sm">{value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderMatrixVisual = () => {
    const data = slide.chart?.data;
    if (!data) return null;

    // Handle patient segments matrix
    if (data.segments) {
      return (
        <div className="space-y-4 animate-fade-up" style={{ animationDelay: '200ms' }}>
          <div className="grid gap-4">
            {data.segments.map((segment: any, i: number) => (
              <div key={i} className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-primary">{segment.segment}</h4>
                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                    {segment.trigger}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Pain Point</p>
                    <p>{segment.painPoint}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Objection</p>
                    <p className="text-destructive">{segment.objection}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Messaging</p>
                    <p className="text-success">{segment.messaging}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Handle marketplace balance scenarios
    if (data.scenarios) {
      const scenarioList = Object.entries(data.scenarios);
      return (
        <div className="grid grid-cols-2 gap-4 animate-fade-up" style={{ animationDelay: '200ms' }}>
          {scenarioList.map(([key, scenario]: [string, any], i) => (
            <div 
              key={key} 
              className={`p-4 rounded-xl border-2 ${
                scenario.outcome.includes('✅') ? 'border-success bg-success/5' :
                scenario.outcome.includes('⚠️') ? 'border-warning bg-warning/5' :
                'border-destructive bg-destructive/5'
              }`}
            >
              <div className="flex gap-4 mb-2">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Supply</p>
                  <p className="font-bold">{scenario.supply}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Demand</p>
                  <p className="font-bold">{scenario.demand}</p>
                </div>
              </div>
              <p className="text-sm mb-2">{scenario.outcome}</p>
              <p className="text-xs font-semibold text-primary">{scenario.action}</p>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  const renderHeatmap = () => {
    const data = slide.chart?.data;
    if (!data?.risks) return null;

    const getProbabilityColor = (prob: string) => {
      switch (prob) {
        case 'Low': return 'bg-success/20 text-success';
        case 'Medium': return 'bg-warning/20 text-warning';
        case 'High': return 'bg-destructive/20 text-destructive';
        default: return 'bg-muted';
      }
    };

    const getImpactColor = (impact: string) => {
      switch (impact) {
        case 'Medium': return 'bg-warning/20 text-warning';
        case 'High': return 'bg-destructive/20 text-destructive';
        case 'Critical': return 'bg-destructive text-white';
        default: return 'bg-muted';
      }
    };

    const getStatusColor = (status: string) => {
      switch (status) {
        case 'Mitigated': return 'bg-success/20 text-success';
        case 'Monitored': return 'bg-warning/20 text-warning';
        case 'Active': return 'bg-primary/20 text-primary';
        default: return 'bg-muted';
      }
    };

    return (
      <div className="space-y-3 animate-fade-up" style={{ animationDelay: '200ms' }}>
        {data.risks.map((risk: any, i: number) => (
          <div key={i} className="p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <p className="font-semibold text-sm flex-1">{risk.risk}</p>
              <div className="flex gap-2 ml-4">
                <span className={`text-xs px-2 py-1 rounded-full ${getProbabilityColor(risk.probability)}`}>
                  {risk.probability}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${getImpactColor(risk.impact)}`}>
                  {risk.impact}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(risk.status)}`}>
                  {risk.status}
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{risk.mitigation}</p>
          </div>
        ))}
      </div>
    );
  };

  const renderTimelineChart = () => {
    const data = slide.chart?.data;
    if (!data?.phases) return null;

    return (
      <div className="space-y-6 animate-fade-up" style={{ animationDelay: '200ms' }}>
        <div className="relative">
          {data.phases.map((phase: any, i: number) => (
            <div key={i} className="relative pl-8 pb-8 last:pb-0">
              <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-primary border-4 border-background" />
              {i < data.phases.length - 1 && (
                <div className="absolute left-[7px] top-4 w-0.5 h-full bg-primary/30" />
              )}
              <div className="p-4 rounded-xl bg-card border border-border">
                <h4 className="font-bold text-primary mb-2">{phase.phase}</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Pricing</p>
                    <p className="font-semibold">{phase.pricing}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Expected Conversion</p>
                    <p className="font-semibold text-success">{phase.expectedConversion}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2 italic">"{phase.messaging}"</p>
              </div>
            </div>
          ))}
        </div>
        {data.credentialingTimeline && (
          <div className="p-4 bg-muted/30 rounded-xl">
            <p className="font-semibold text-sm mb-2">Credentialing Timeline</p>
            <div className="flex gap-4 text-xs">
              {Object.entries(data.credentialingTimeline).map(([key, value]: [string, any]) => (
                <div key={key} className="text-center">
                  <p className="text-muted-foreground">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                  <p className="font-semibold">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="slide-container">
      <div className="max-w-6xl mx-auto w-full">
        {/* Title */}
        <h2 className="slide-title animate-fade-up">{slide.title}</h2>

        {/* Chart */}
        <div className="mb-6">
          {renderChart()}
        </div>

        {/* Insight box */}
        {slide.chart?.insight && (
          <div
            className="p-5 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 animate-fade-up"
            style={{ animationDelay: '400ms' }}
          >
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-base font-medium">
                {slide.chart.insight}
              </p>
            </div>
          </div>
        )}

        {/* Highlight box */}
        {slide.highlight && (
          <div
            className="mt-4 p-4 rounded-xl bg-primary/10 border border-primary/20 animate-fade-up"
            style={{ animationDelay: '500ms' }}
          >
            <p className="text-lg font-semibold text-primary text-center">
              {slide.highlight}
            </p>
          </div>
        )}

        {/* Bottom note */}
        {slide.bottomNote && (
          <div
            className="mt-4 flex items-center gap-3 text-muted-foreground animate-fade-up"
            style={{ animationDelay: '600ms' }}
          >
            <ArrowRight className="w-4 h-4" />
            <p className="text-sm italic">{slide.bottomNote}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartSlide;
