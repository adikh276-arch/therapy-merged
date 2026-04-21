import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PathwayLayout from '@/components/pathway/PathwayLayout';
import { Button } from '@/components/ui/button';
import { Calendar, Phone, CheckCircle, Clock } from 'lucide-react';
import { useProgress } from '@/contexts/ProgressContext';
import { toast } from 'sonner';

const AssistedOnboardingPathway = () => {
  const [callJoined, setCallJoined] = useState(false);
  const { completePathway } = useProgress();
  const navigate = useNavigate();

  const handleAddToCalendar = () => {
    toast.success('Added to calendar!');
  };

  const handleJoinCall = () => {
    setCallJoined(true);
    toast.success('Call completed!');
    completePathway('layer4', 'assistedOnboarding');
  };

  const handleBackToDashboard = () => {
    toast.success('Layer 4 Complete! You\'re ready for corporate partnerships.');
    navigate('/');
  };

  if (callJoined) {
    return (
      <PathwayLayout
        title="Sales Call Prep"
        layerNumber={4}
        pathwayNumber={4}
        onComplete={handleBackToDashboard}
        completeButtonText="Back to Dashboard"
      >
        <div className="text-center py-8 space-y-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-success/20 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">Call Completed!</h3>
            <p className="text-muted-foreground mt-2">
              Great job! You're now fully equipped for corporate partnerships.
            </p>
          </div>
          <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-left space-y-3">
            <h4 className="font-semibold text-foreground">Post-Call Summary:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ Corporate pitch techniques reviewed</li>
              <li>✓ Pricing discussion completed</li>
              <li>✓ Objection handling practiced</li>
              <li>✓ Next steps: Start reaching out to leads</li>
            </ul>
          </div>
        </div>
      </PathwayLayout>
    );
  }

  return (
    <PathwayLayout
      title="Sales Call Prep - (Mock Call)"
      layerNumber={4}
      pathwayNumber={4}
    >
      <div className="space-y-6">
        <div className="bg-muted/50 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">📞 Call Details:</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Date: Jan 28, 2026, 3:00 PM</span>
          </div>
        </div>

        <div className="space-y-3">
          <Button onClick={handleAddToCalendar} variant="outline" className="w-full">
            <Calendar className="w-4 h-4 mr-2" />
            Add to Calendar
          </Button>
          <Button onClick={handleJoinCall} className="w-full gradient-primary">
            <Phone className="w-4 h-4 mr-2" />
            Join Call (When Ready)
          </Button>
        </div>

        <p className="text-sm text-muted-foreground text-center">
          This mock call will prepare you for real corporate conversations.
        </p>
      </div>
    </PathwayLayout>
  );
};

export default AssistedOnboardingPathway;
