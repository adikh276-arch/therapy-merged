interface WeekSummaryProps {
  data: { label: string; count: number; isToday: boolean }[];
}

export default function WeekSummary({ data }: WeekSummaryProps) {
  const maxCount = Math.max(...data.map((d) => d.count), 1);

  return (
    <section className="px-1">
      <h3 className="text-sm font-medium text-muted-foreground mb-4 tracking-wide uppercase">
        This Week
      </h3>
      <div className="flex items-end justify-between gap-2 h-28">
        {data.map((day, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full flex items-end justify-center h-20">
              <div
                className={`w-full max-w-[28px] rounded-t-md bar-animate ${
                  day.isToday ? "bg-primary" : "bg-primary/30"
                }`}
                style={{
                  height: day.count > 0 ? `${Math.max(8, (day.count / maxCount) * 80)}px` : "4px",
                  animationDelay: `${i * 60}ms`,
                }}
              />
            </div>
            <span className={`text-xs ${day.isToday ? "text-primary font-semibold" : "text-muted-foreground"}`}>
              {day.label}
            </span>
            {day.count > 0 && (
              <span className={`text-xs ${day.isToday ? "text-primary font-medium" : "text-muted-foreground"}`}>
                {day.count}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
