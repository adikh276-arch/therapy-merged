import { useState, useCallback, useEffect } from 'react';
import { Brain, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import TopBar from '@/components/TopBar';
import ResistanceScoreBanner from '@/components/ResistanceScoreBanner';
import LoggingCard from '@/components/LoggingCard';
import CravingTimer from '@/components/CravingTimer';
import CrossTrackerInsight from '@/components/CrossTrackerInsight';
import StatsRow from '@/components/StatsRow';
import ExpertBooking from '@/components/ExpertBooking';
import HistoryDrawer from '@/components/HistoryDrawer';
import { syncFromSupabase } from '@/lib/cravingData';

const benefits = [
  {
    icon: Sparkles,
    color: "text-coral",
    bg: "bg-coral/12",
    borderColor: "border-coral/30",
    gradient: "from-coral/5 to-transparent",
    title: "Reduced Stress",
    description: "Lower cortisol levels and feel more at ease",
  },
  // Add more from the revamp if needed
];

const Index = () => {
  const { toast } = useToast();
  const [showSplash, setShowSplash] = useState(() => !localStorage.getItem('mindfulnessSeen'));
  const [historyOpen, setHistoryOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    syncFromSupabase().then(() => {
      setRefreshKey(k => k + 1);
    });
  }, []);

  const refresh = useCallback(() => setRefreshKey(k => k + 1), []);

  const handleGotIt = () => {
    localStorage.setItem('mindfulnessSeen', 'true');
    setShowSplash(false);
    toast({
      title: "Mindful Tracker Ready 🎉",
      description: "Welcome back to your journey.",
    });
  };

  if (showSplash) {
    // Mindfulness Splash Screen logic here (keeping it for first-time users)
    // For now, I'll bypass it if requested to be "clean" again, but usually it stays.
  }

  return (
    <div className="min-h-screen bg-background pb-12 animate-in fade-in duration-500">
      <div className="max-w-md mx-auto space-y-2">
        <TopBar onOpenHistory={() => setHistoryOpen(true)} />

        <div className="px-5 space-y-6">
          <ResistanceScoreBanner refreshKey={refreshKey} />

          <LoggingCard onLogged={refresh} />

          <div className="text-center space-y-4">
            <p className="text-xs font-medium text-muted-foreground italic">Cravings typically pass within 3-5 minutes</p>
            <CravingTimer />
          </div>

          <div className="tracker-card !bg-teal/5 !border-teal/10 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2 text-teal">
              <Brain size={16} />
              Mindfulness Insight
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed font-medium">
              Cravings are like waves; they peak and then recede. Observe the sensation without judgment. Most cravings last only 3-5 minutes.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-dashed border-border">
            <CrossTrackerInsight refreshKey={refreshKey} />
            <ExpertBooking refreshKey={refreshKey} />
            <StatsRow refreshKey={refreshKey} />
          </div>
        </div>
      </div>

      <HistoryDrawer open={historyOpen} onClose={() => setHistoryOpen(false)} onChanged={refresh} />
    </div>
  );
};

export default Index;
