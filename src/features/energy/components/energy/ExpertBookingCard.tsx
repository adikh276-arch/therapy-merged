import { AlertTriangle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnergyLog } from "@/types/energy";

interface Props {
  logs: EnergyLog[];
  todayLogs: EnergyLog[];
  consecutiveLowDays: number;
  last7Avg: number;
}

export default function ExpertBookingCard({ logs, todayLogs, consecutiveLowDays, last7Avg }: Props) {
  // Pattern 1: 5+ consecutive days avg ≤ 2
  const pattern1 = consecutiveLowDays >= 5;

  // Pattern 2: Today energy 1 or 2 + withdrawal factor selected + cravings
  const todayLevel = todayLogs.length > 0 ? todayLogs[todayLogs.length - 1].level : null;
  const hasWithdrawal = todayLogs.some((l) => l.factors.includes("withdrawal"));
  const cravingLogs = (() => {
    try {
      const raw = localStorage.getItem("cravingLogs");
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  })();
  const todayStrongCraving = cravingLogs.some((c: { timestamp: string; intensity?: string }) => {
    return new Date(c.timestamp).toDateString() === new Date().toDateString() && c.intensity === "strong";
  });
  const pattern2 = todayLevel !== null && todayLevel <= 2 && hasWithdrawal && todayStrongCraving;

  // Pattern 3: Avg last 7 < 2.5 + smoke above average
  const pattern3 = last7Avg > 0 && last7Avg < 2.5;

  if (!pattern1 && !pattern2 && !pattern3) return null;

  let message = "";
  let buttonText = "Talk to someone";
  if (pattern2) {
    message = "Low energy + withdrawal + cravings is a high-risk combination.";
    buttonText = "Book a session";
  } else if (pattern1) {
    message = "Persistent low energy can increase relapse risk. Support is available.";
    buttonText = "Talk to someone";
  } else {
    message = "Multiple challenging factors detected. Let's talk.";
    buttonText = "Connect with an expert";
  }

  return (
    <div className="bg-energy-1-bg border border-energy-1/20 rounded-lg shadow-card p-4 space-y-3 animate-fade-in">
      <div className="flex items-start gap-2">
        <AlertTriangle size={18} className="text-energy-1 shrink-0 mt-0.5" />
        <p className="font-dm text-sm text-foreground">{message}</p>
      </div>
      <Button
        variant="destructive"
        size="sm"
        className="w-full font-dm font-semibold"
        onClick={() => alert("Connecting you to a support specialist...")}
      >
        <Phone size={14} className="mr-1.5" />
        {buttonText}
      </Button>
    </div>
  );
}
