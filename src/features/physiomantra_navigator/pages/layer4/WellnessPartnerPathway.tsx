import { useNavigate } from 'react-router-dom';
import PathwayLayout from '@/components/pathway/PathwayLayout';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useProgress } from '@/contexts/ProgressContext';
import { toast } from 'sonner';

const WellnessPartnerPathway = () => {
  const { completePathway } = useProgress();
  const navigate = useNavigate();

  const handleEnroll = () => {
    completePathway('layer4', 'wellnessPartner');
    toast.success('Enrolled in Corporate Pathway!');
    navigate('/layer4/corporate-readiness');
  };

  return (
    <PathwayLayout
      title="Corporate Wellness Partner"
      layerNumber={4}
      pathwayNumber={1}
      onComplete={handleEnroll}
      completeButtonText="Enroll in Corporate Pathway"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Why Corporate Matters:</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-success" />
              <span className="text-foreground">Predictable monthly income</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-success" />
              <span className="text-foreground">Scale (50-500 employees per company)</span>
            </div>
          </div>
        </div>

        <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
          <h4 className="font-semibold text-foreground mb-3">Average Corporate Partner Earnings:</h4>
          <p className="text-2xl font-bold text-primary">
            1 account = ₹15,000-25,000/month
          </p>
        </div>

        <div className="bg-muted/50 rounded-xl p-4 text-center">
          <p className="text-muted-foreground">
            Corporate partnerships provide consistent income and help you scale your practice beyond individual sessions.
          </p>
        </div>
      </div>
    </PathwayLayout>
  );
};

export default WellnessPartnerPathway;
