import { LifetimeStats } from "@/hooks/useConsumptionData";
import { useState } from "react";

interface LifetimeImpactProps {
  stats: LifetimeStats;
  formatNumber: (n: number) => string;
}

export default function LifetimeImpact({ stats, formatNumber }: LifetimeImpactProps) {
  const [tooltip, setTooltip] = useState<string | null>(null);

  const items = [
    {
      value: `${formatNumber(stats.lifeDaysAffected)} days`,
      label: "of life affected",
      detail: `Based on ${formatNumber(stats.totalCigarettes)} cigarettes × 11 min each (NHS data)`,
      hero: true,
    },
    {
      value: formatNumber(stats.totalSpend),
      label: "spent on cigarettes",
      detail: `Estimated total spend over your smoking history`,
      hero: false,
    },
    {
      value: formatNumber(stats.totalPacks),
      label: "packs smoked",
      detail: `Total packs based on your pack size`,
      hero: false,
    },
  ];

  return (
    <section className="px-1">
      <h3 className="text-sm font-medium text-muted-foreground mb-4 tracking-wide uppercase">
        Lifetime Impact
      </h3>
      <div className="space-y-5">
        {items.map((item, i) => (
          <button
            key={i}
            className="w-full text-left group"
            onClick={() => setTooltip(tooltip === item.detail ? null : item.detail)}
          >
            <p className={`stat-number ${item.hero ? "text-4xl text-primary" : "text-2xl text-foreground"} transition-colors`}>
              {item.value}
            </p>
            <p className="text-sm text-muted-foreground mt-0.5">{item.label}</p>
            {tooltip === item.detail && (
              <p className="text-xs text-muted-foreground mt-1 bg-secondary rounded-lg px-3 py-2 animate-in fade-in duration-200">
                {item.detail}
              </p>
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
