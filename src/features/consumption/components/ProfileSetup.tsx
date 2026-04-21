import { useState } from "react";
import { LifetimeProfile } from "@/hooks/useConsumptionData";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 50 }, (_, i) => currentYear - i);

interface ProfileSetupProps {
  onSave: (profile: LifetimeProfile) => void;
  onSkip: () => void;
}

export default function ProfileSetup({ onSave, onSkip }: ProfileSetupProps) {
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(currentYear - 5);
  const [avgPerDay, setAvgPerDay] = useState(10);
  const [perPack, setPerPack] = useState(20);
  const [costPerCig, setCostPerCig] = useState(16);

  const yearsSmoked = Math.max(0, ((currentYear - year) * 12 + (new Date().getMonth() + 1 - month)) / 12);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-card p-6 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xl font-serif text-foreground">Quick setup</h2>
          <button onClick={onSkip} className="p-1 rounded-full text-muted-foreground hover:text-foreground transition-colors">
            <X size={20} />
          </button>
        </div>
        <p className="text-sm text-muted-foreground mb-6">To show meaningful impact</p>

        {/* Question 1: Since when */}
        <div className="mb-5">
          <label className="text-sm font-medium text-foreground mb-2 block">I've smoked since</label>
          <div className="flex gap-2">
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="flex-1 rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {MONTHS.map((m, i) => (
                <option key={m} value={i + 1}>{m}</option>
              ))}
            </select>
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-28 rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {YEARS.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          {yearsSmoked > 0 && (
            <p className="text-xs text-primary mt-1.5 font-medium">
              That's {yearsSmoked.toFixed(1)} years
            </p>
          )}
        </div>

        {/* Question 2: Average per day */}
        <div className="mb-5">
          <label className="text-sm font-medium text-foreground mb-2 block">Average cigarettes per day</label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setAvgPerDay(Math.max(1, avgPerDay - 1))}
              className="w-11 h-11 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xl font-medium hover:bg-accent transition-colors"
            >−</button>
            <span className="text-3xl font-serif text-foreground w-16 text-center">{avgPerDay}</span>
            <button
              onClick={() => setAvgPerDay(avgPerDay + 1)}
              className="w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-medium hover:opacity-90 transition-opacity"
            >+</button>
          </div>
        </div>

        {/* Question 3: Per pack */}
        <div className="mb-5">
          <label className="text-sm font-medium text-foreground mb-2 block">Cigarettes per pack</label>
          <div className="flex gap-2">
            {[10, 20].map((n) => (
              <button
                key={n}
                onClick={() => setPerPack(n)}
                className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all ${
                  perPack === n
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary text-secondary-foreground hover:bg-accent"
                }`}
              >{n}</button>
            ))}
          </div>
        </div>

        {/* Question 4: Cost */}
        <div className="mb-7">
          <label className="text-sm font-medium text-foreground mb-1 block">Cost per cigarette</label>
          <p className="text-xs text-muted-foreground mb-2">Average in India: ₹14–18</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCostPerCig(Math.max(1, costPerCig - 1))}
              className="w-11 h-11 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xl font-medium hover:bg-accent transition-colors"
            >−</button>
            <span className="text-3xl font-serif text-foreground w-16 text-center">₹{costPerCig}</span>
            <button
              onClick={() => setCostPerCig(costPerCig + 1)}
              className="w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-medium hover:opacity-90 transition-opacity"
            >+</button>
          </div>
        </div>

        <Button
          onClick={() => onSave({ startMonth: month, startYear: year, avgPerDay, perPack, costPerCig })}
          className="w-full h-12 rounded-xl text-base font-medium"
        >
          Save & continue
        </Button>

        <button onClick={onSkip} className="w-full mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
          Skip for now
        </button>
      </div>
    </div>
  );
}
