import { useNavigate } from 'react-router-dom';
import PathwayLayout from '@/components/pathway/PathwayLayout';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { useProgress } from '@/contexts/ProgressContext';
import { toast } from 'sonner';

const steps = [
  { num: 1, text: 'Patient books a session' },
  { num: 2, text: 'You assess and guide treatment' },
  { num: 3, text: 'HEP is assigned digitally' },
  { num: 4, text: 'Patient progress is tracked' },
  { num: 5, text: 'Long-term recovery is supported' },
];

const HowItWorksPathway = () => {
  const { completePathway } = useProgress();
  const navigate = useNavigate();

  const handleComplete = () => {
    completePathway('layer1', 'howItWorks');
    toast.success('Great! Let\'s explore the tools.');
    navigate('/layer1/clinical-tools');
  };

  return (
    <PathwayLayout
      title="How MantraCare Works"
      layerNumber={1}
      pathwayNumber={3}
      onComplete={handleComplete}
      completeButtonText="I understand"
    >
      <div className="space-y-6">
        {/* Video Placeholder */}
        <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <Button size="lg" className="rounded-full w-16 h-16 gradient-primary">
              <Play className="w-6 h-6 ml-1" />
            </Button>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-sm text-muted-foreground bg-background/80 backdrop-blur-sm rounded-lg px-3 py-2 inline-block">
              🎥 30-second overview video
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">How care works on MantraCare:</h3>
          <div className="space-y-3">
            {steps.map((step) => (
              <div
                key={step.num}
                className="flex items-center gap-4 p-3 rounded-lg bg-muted/50"
              >
                <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {step.num}
                </div>
                <span className="text-foreground">{step.text}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-muted-foreground text-center pt-4 border-t border-border">
          MantraCare helps you look professional and scale your care.
        </p>
      </div>
    </PathwayLayout>
  );
};

export default HowItWorksPathway;
