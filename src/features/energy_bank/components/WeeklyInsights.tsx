import { WEEK_HISTORY, DUMMY_INSIGHTS, DETECTED_PATTERNS } from '@/lib/dummy-data';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { EnergyCalendar } from './EnergyCalendar';

const chartData = WEEK_HISTORY.map(d => ({
  day: new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' }),
  started: d.started,
  ended: d.started + d.netBalance,
  net: d.netBalance,
}));

export function WeeklyInsights() {
  const { avgDailyEnergy, healthyPersonEnergy, capacityPercent, mostExpensive, bestInvestment, weeklyDeposited, weeklySpent, weeklyNet, daysInDebt } = DUMMY_INSIGHTS;

  return (
    <div className="space-y-6 pb-24">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Weekly Report</h2>
        <p className="text-sm text-muted-foreground">Your energy economics this week</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Deposited" value={weeklyDeposited} suffix=" units" color="text-surplus" />
        <StatCard label="Spent" value={weeklySpent} suffix=" units" color="text-debt" />
        <StatCard label="Net Balance" value={weeklyNet} suffix=" units" color={weeklyNet >= 0 ? 'text-surplus' : 'text-debt'} prefix={weeklyNet >= 0 ? '+' : ''} />
        <StatCard label="Days in Debt" value={daysInDebt} suffix=" days" color="text-debt" />
      </div>

      {/* NEW: Energy Calendar */}
      <EnergyCalendar />

      {/* NEW: Active Investments (using dummy data for now or connecting to store) */}
      <div className="bg-card border border-border/50 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">🌱 Active Investments</h3>
        <div className="space-y-3">
          {/* This would ideally map over activeModifiers from store, sticking to dummy/static for now as requested by user context "DUMMY DATA TO INCLUDE" */}
          <div className="flex items-center justify-between p-3 bg-surplus/5 border border-surplus/20 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="bg-surplus/20 p-2 rounded-full">🦴</div>
              <div>
                <div className="text-sm font-medium">Physical Therapy</div>
                <div className="text-xs text-muted-foreground">Payback: +5 units/day</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-mono font-bold text-surplus">5 days left</div>
              <div className="text-[10px] text-muted-foreground">ROI: +25%</div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-surplus/5 border border-surplus/20 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="bg-surplus/20 p-2 rounded-full">🥘</div>
              <div>
                <div className="text-sm font-medium">Meal Prep</div>
                <div className="text-xs text-muted-foreground">Payback: +10 units/day</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-mono font-bold text-surplus">2 days left</div>
              <div className="text-[10px] text-muted-foreground">ROI: +50%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-card border border-border/50 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Energy Balance Trend</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
            <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
            <ReferenceLine y={0} stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
            <Line type="monotone" dataKey="started" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} name="Started" />
            <Line type="monotone" dataKey="ended" stroke="hsl(var(--surplus))" strokeWidth={2} dot={{ r: 4 }} name="Ended" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Comparison */}
      <div className="bg-card border border-border/50 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">⚡ Capacity Comparison</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">You (avg)</span>
              <span className="font-mono font-semibold text-foreground">{avgDailyEnergy} units</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: `${capacityPercent}%` }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Healthy person</span>
              <span className="font-mono font-semibold text-foreground">{healthyPersonEnergy} units</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-muted-foreground/30 rounded-full" style={{ width: '100%' }} />
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-center mt-2">
            You're operating at <strong className="text-foreground">{capacityPercent}% capacity</strong> every day.
            <br />This is what invisible disability looks like.
          </p>
        </div>
      </div>

      {/* Patterns */}
      <div className="bg-card border border-border/50 rounded-xl p-4 space-y-2">
        <h3 className="text-sm font-semibold text-foreground">🔍 Patterns Detected</h3>
        {DETECTED_PATTERNS.map((p, i) => (
          <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="text-primary mt-0.5">•</span>
            <span>{p}</span>
          </div>
        ))}
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-1 gap-3">
        <div className="bg-card border border-border/50 rounded-xl p-4 flex items-center gap-3">
          <span className="text-2xl">💸</span>
          <div>
            <p className="text-xs text-muted-foreground">Most Expensive Activity</p>
            <p className="text-sm font-semibold text-foreground">{mostExpensive.name} — <span className="font-mono text-debt">{mostExpensive.cost} units</span></p>
          </div>
        </div>
        <div className="bg-card border border-border/50 rounded-xl p-4 flex items-center gap-3">
          <span className="text-2xl">📈</span>
          <div>
            <p className="text-xs text-muted-foreground">Best Investment</p>
            <p className="text-sm font-semibold text-foreground">{bestInvestment.name} — <span className="font-mono text-surplus">+{bestInvestment.roi}% ROI</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, suffix, color, prefix = '' }: { label: string; value: number; suffix: string; color: string; prefix?: string }) {
  return (
    <div className="bg-card border border-border/50 rounded-xl p-3 text-center">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className={`font-mono font-bold text-xl ${color}`}>{prefix}{value}{suffix}</p>
    </div>
  );
}
