import { useNavigate } from 'react-router-dom';
import PathwayLayout from '@/components/pathway/PathwayLayout';
import { useProgress } from '@/contexts/ProgressContext';
import { toast } from 'sonner';
import { Zap } from 'lucide-react';

const GettingPatientsPathway = () => {
  const { completePathway } = useProgress();
  const navigate = useNavigate();

  const handleComplete = () => {
    completePathway('layer2', 'gettingPatients');
    toast.success('Great! Let\'s bring in your patients.');
    navigate('/layer2/bring-patients');
  };

  return (
    <PathwayLayout
      title="Start Getting Patients"
      layerNumber={2}
      pathwayNumber={1}
      onComplete={handleComplete}
      completeButtonText="Start"
    >
      <div className="space-y-6">
        {/* Honest Update Banner */}
        <div className="bg-accent/10 border border-accent/30 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-accent/20">
              <span className="text-lg">🔹</span>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">HONEST UPDATE</h3>
              <p className="text-muted-foreground mt-1">
                We're early in building platform demand
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 text-muted-foreground">
          <p>
            Right now, most patient flow comes from <strong className="text-foreground">what YOU create</strong>.
          </p>
          <p>
            But here's the opportunity: Providers who join early and help us grow 
            demand will benefit most as the platform scales.
          </p>
        </div>

        <div className="border-t border-border pt-6">
          <h3 className="font-semibold text-foreground mb-4">Where patients come from today:</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                1
              </div>
              <span className="text-foreground flex-1">Your personal & local network</span>
              <Zap className="w-5 h-5 text-accent" />
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted-foreground/20 text-muted-foreground font-bold text-sm">
                2
              </div>
              <span className="text-muted-foreground">Platform demand</span>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted-foreground/20 text-muted-foreground font-bold text-sm">
                3
              </div>
              <span className="text-muted-foreground">Corporate partnerships</span>
            </div>
          </div>
        </div>
      </div>
    </PathwayLayout>
  );
};

export default GettingPatientsPathway;
