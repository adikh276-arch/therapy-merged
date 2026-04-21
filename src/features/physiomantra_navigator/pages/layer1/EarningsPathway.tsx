import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PathwayLayout from '@/components/pathway/PathwayLayout';
import { Slider } from '@/components/ui/slider';
import { Check, PartyPopper } from 'lucide-react';
import { useProgress } from '@/contexts/ProgressContext';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const earningsTable = [
  { sessions: 20, earnings: '₹7,500' },
  { sessions: 50, earnings: '₹18,750' },
  { sessions: 100, earnings: '₹37,500' },
];

const EarningsPathway = () => {
  const [sessionsPerMonth, setSessionsPerMonth] = useState([50]);
  const [showCelebration, setShowCelebration] = useState(false);
  const { completePathway } = useProgress();
  const navigate = useNavigate();

  const calculatedEarnings = sessionsPerMonth[0] * 375;

  const handleComplete = () => {
    completePathway('layer1', 'earnings');
    setShowCelebration(true);
  };

  const handleStartLayer2 = () => {
    setShowCelebration(false);
    navigate('/layer2/getting-patients');
  };

  const handleMaybeLater = () => {
    setShowCelebration(false);
    toast.success('Layer 1 Complete! You can continue Layer 2 anytime.');
    navigate('/');
  };

  return (
    <>
      <PathwayLayout
        title="Earnings & Payments"
        layerNumber={1}
        pathwayNumber={5}
        onComplete={handleComplete}
        completeButtonText="Continue"
      >
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">How you earn on MantraCare:</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-success mt-0.5" />
                <div>
                  <p className="text-foreground">₹375 per completed session</p>
                  <p className="text-sm text-muted-foreground">(₹499 patient price)</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-success" />
                <span className="text-foreground">Higher activity = higher visibility</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-success" />
                <span className="text-foreground">Corporate sessions: ₹450</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-success" />
                <span className="text-foreground">Specialists: up to ₹525/session</span>
              </div>
            </div>
          </div>

          <p className="text-muted-foreground">
            Payments processed automatically every week.
          </p>

          {/* Example Earnings Table */}
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-muted/50 p-3 font-semibold text-center">
              Example Monthly Earnings
            </div>
            <table className="w-full">
              <tbody>
                {earningsTable.map((row) => (
                  <tr key={row.sessions} className="border-t border-border">
                    <td className="p-3 text-center text-muted-foreground">
                      {row.sessions} sessions
                    </td>
                    <td className="p-3 text-center font-bold text-success">
                      {row.earnings}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Earnings Calculator */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
            <h4 className="font-semibold text-foreground mb-4">💰 Earnings Calculator</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted-foreground">Sessions/month</span>
                  <span className="font-bold text-foreground">{sessionsPerMonth[0]}</span>
                </div>
                <Slider
                  value={sessionsPerMonth}
                  onValueChange={setSessionsPerMonth}
                  min={10}
                  max={150}
                  step={10}
                />
              </div>
              <div className="text-center pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">Estimated Monthly Earnings</p>
                <p className="text-3xl font-bold text-success">
                  ₹{calculatedEarnings.toLocaleString()}/month
                </p>
              </div>
            </div>
          </div>
        </div>
      </PathwayLayout>

      {/* Celebration Modal */}
      <Dialog open={showCelebration} onOpenChange={setShowCelebration}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <div className="mx-auto w-16 h-16 rounded-full gradient-success flex items-center justify-center mb-4">
              <PartyPopper className="w-8 h-8 text-success-foreground" />
            </div>
            <DialogTitle className="text-2xl">🎉 Foundation Complete!</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-muted-foreground">
              You're now a verified PhysioMantra provider.
            </p>
            <div className="space-y-2">
              <Button
                onClick={handleStartLayer2}
                className="w-full gradient-primary"
                size="lg"
              >
                Start Layer 2: Build Patient Base →
              </Button>
              <Button
                onClick={handleMaybeLater}
                variant="ghost"
                className="w-full"
              >
                Maybe Later
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EarningsPathway;
