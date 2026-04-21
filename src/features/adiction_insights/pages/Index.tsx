import { useState, useEffect } from "react";
import { BarChart3 } from "lucide-react";
import Stepper from "../components/Stepper";
import StatsPanel from "../components/StatsPanel";
import { toast } from "sonner";

const smokingTypes = ["Cigarettes", "Bidis", "Roll-your-own", "Other"];
const durationUnits = ["Years", "Months"];

interface StatsEntry {
  date: string;
  cigarettes: number;
  type: string;
  duration: number;
  durationUnit: string;
}

const Index = () => {
  const [duration, setDuration] = useState<number>(0);
  const [durationUnit, setDurationUnit] = useState<string>("Years");
  const [avgPerDay, setAvgPerDay] = useState<number>(0);
  const [smokingType, setSmokingType] = useState<string>("");
  const [statsOpen, setStatsOpen] = useState(false);
  const [entries, setEntries] = useState<StatsEntry[]>([]);
  const [showInsight, setShowInsight] = useState(false);

  const smokingYears = durationUnit === "Years" ? duration : Math.round((duration / 12) * 10) / 10;

  useEffect(() => {
    if (duration > 0 && avgPerDay > 0) {
      const timer = setTimeout(() => setShowInsight(true), 300);
      return () => clearTimeout(timer);
    }
    setShowInsight(false);
  }, [duration, avgPerDay]);

  useEffect(() => {
    // Fetch initial history
    const fetchHistory = async () => {
      const userId = sessionStorage.getItem("qm_user_id");
      if (!userId) return;

      try {
        const res = await fetch("http://localhost:4000/api/tracker?type=consumption", {
          headers: { "x-user-id": userId },
        });
        if (res.ok) {
          const data = await res.json();
          // Map DB entries to StatsEntry
          const mappedEntries: StatsEntry[] = data.map((item: any) => ({
            date: new Date(item.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            cigarettes: item.payload.cigarettes,
            type: item.payload.type,
            duration: item.payload.duration || 0,
            durationUnit: item.payload.durationUnit || "Years",
          }));
          setEntries(mappedEntries);
        }
      } catch (err) {
        console.error("Failed to fetch history", err);
      }
    };

    fetchHistory();
  }, []);

  const totalCigarettes = Math.round(smokingYears * 365 * avgPerDay);
  const totalPacks = Math.round(totalCigarettes / 20);

  const handleSave = async () => {
    const userId = sessionStorage.getItem("qm_user_id");
    if (!userId) {
      window.location.href = "/token";
      return;
    }

    const payload = {
      cigarettes: avgPerDay,
      type: smokingType || "Not specified",
      duration,
      durationUnit,
    };

    try {
      const res = await fetch("http://localhost:4000/api/tracker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
        body: JSON.stringify({
          tracker_type: "consumption",
          payload,
        }),
      });

      if (!res.ok) throw new Error("Save failed");

      const entry: StatsEntry = {
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        cigarettes: avgPerDay,
        type: smokingType || "Not specified",
        duration,
        durationUnit,
      };
      setEntries((prev) => [entry, ...prev]);
      toast("Saved. Thanks for checking in.", {
        duration: 3000,
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to save entry");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[430px] px-5 pb-10 pt-6">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">Consumption</h1>
            <p className="mt-1 text-sm text-muted-foreground">Log only what feels comfortable</p>
          </div>
          <button
            onClick={() => setStatsOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-card shadow-card transition-all active:scale-95"
            aria-label="View stats"
          >
            <BarChart3 size={18} className="text-primary" />
          </button>
        </div>

        {/* Card 1 — Duration */}
        <div className="mb-4 rounded-card-lg bg-card p-5 shadow-card animate-fade-in">
          <label className="mb-1 block text-sm font-medium text-foreground">
            How long has smoking been part of your life?
          </label>
          <div className="mt-4 flex items-center gap-3">
            <input
              type="number"
              min={0}
              value={duration || ""}
              onChange={(e) => setDuration(Math.max(0, parseInt(e.target.value) || 0))}
              placeholder="0"
              className="h-12 w-24 rounded-lg border border-input bg-background px-3 text-center font-heading text-lg font-semibold text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-ring/20"
            />
            <div className="flex gap-1 rounded-lg bg-secondary p-1">
              {durationUnits.map((unit) => (
                <button
                  key={unit}
                  onClick={() => setDurationUnit(unit)}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${durationUnit === unit
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground"
                    }`}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Card 2 — Average per day */}
        <div className="mb-4 rounded-card-lg bg-card p-5 shadow-card animate-fade-in" style={{ animationDelay: "0.08s" }}>
          <label className="mb-1 block text-sm font-medium text-foreground">
            On average, how many cigarettes feel typical for you?
          </label>
          <p className="mb-4 text-xs text-muted-foreground">This can be an estimate</p>
          <Stepper value={avgPerDay} onChange={setAvgPerDay} min={0} max={80} label="per day" />
        </div>

        {/* Card 3 — Type */}
        <div className="mb-6 rounded-card-lg bg-card p-5 shadow-card animate-fade-in" style={{ animationDelay: "0.16s" }}>
          <label className="mb-3 block text-sm font-medium text-foreground">
            Type of smoking
          </label>
          <div className="flex flex-wrap gap-2">
            {smokingTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSmokingType(smokingType === type ? "" : type)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all active:scale-95 ${smokingType === type
                  ? "gradient-primary text-primary-foreground shadow-button"
                  : "bg-secondary text-secondary-foreground"
                  }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Insight Preview */}
        {showInsight && (
          <div className="mb-6 rounded-card-lg gradient-surface border border-border/50 p-5 animate-fade-in">
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-accent-foreground">
              Insight
            </p>
            <p className="text-sm leading-relaxed text-foreground">
              Based on what you shared, smoking has been part of your routine for approximately{" "}
              <strong>{smokingYears} {smokingYears === 1 ? "year" : "years"}</strong>.
            </p>
            {totalCigarettes > 0 && (
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                That's roughly <strong>{totalCigarettes.toLocaleString()} cigarettes</strong>{" "}
                (~{totalPacks.toLocaleString()} packs) over time.
              </p>
            )}
          </div>
        )}

        {/* Save CTA */}
        <button
          onClick={handleSave}
          className="w-full rounded-card gradient-primary py-4 font-heading text-base font-semibold text-primary-foreground shadow-button transition-all active:scale-[0.98]"
        >
          Save
        </button>
      </div>

      {/* Stats Panel */}
      <StatsPanel
        open={statsOpen}
        onClose={() => setStatsOpen(false)}
        entries={entries}
        smokingYears={smokingYears}
        avgPerDay={avgPerDay}
      />
    </div>
  );
};

export default Index;
