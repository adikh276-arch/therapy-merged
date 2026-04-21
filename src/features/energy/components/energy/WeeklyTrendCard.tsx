import { LineChart, Line, XAxis, YAxis, ReferenceLine, Tooltip, ResponsiveContainer, Dot } from "recharts";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  weeklyData: { date: string; avg: number | null }[];
  last7Avg: number;
  isTrendingUp: boolean;
}

export default function WeeklyTrendCard({ weeklyData, last7Avg, isTrendingUp }: Props) {
  const chartData = weeklyData.map((d) => ({
    ...d,
    avg: d.avg ?? undefined,
  }));

  return (
    <div className="bg-card rounded-lg shadow-card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-sora text-[15px] font-bold text-foreground">This week</h3>
        {isTrendingUp && (
          <span className="flex items-center gap-1 text-[11px] font-dm font-semibold text-energy-5 bg-energy-5-bg px-2 py-0.5 rounded-full">
            <TrendingUp size={11} /> Trending up
          </span>
        )}
      </div>

      <div className="h-36">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10, fontFamily: "DM Sans", fill: "#7A8FA6" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[1, 5]}
              ticks={[1, 2, 3, 4, 5]}
              tick={{ fontSize: 10, fontFamily: "DM Sans", fill: "#7A8FA6" }}
              axisLine={false}
              tickLine={false}
            />
            <ReferenceLine
              y={3}
              stroke="#DDE3EC"
              strokeDasharray="4 3"
              strokeWidth={1}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: "1px solid hsl(214 28% 88%)",
                fontFamily: "DM Sans",
                fontSize: 12,
                boxShadow: "0 2px 12px -2px rgba(100,140,180,0.15)",
              }}
              formatter={(v: number) => [`${v}/5`, "Energy"]}
            />
            <Line
              type="monotone"
              dataKey="avg"
              stroke="#35AEF7"
              strokeWidth={2}
              dot={{ r: 4, fill: "#35AEF7", strokeWidth: 0 }}
              activeDot={{ r: 6, fill: "#35AEF7" }}
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="font-dm text-xs text-muted-foreground">
        7-day average:{" "}
        <span className="font-semibold text-foreground">{last7Avg}/5</span>
      </p>
    </div>
  );
}
