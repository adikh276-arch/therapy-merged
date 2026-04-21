import { useNavigate } from 'react-router-dom';
import PathwayLayout from '@/components/pathway/PathwayLayout';
import { Button } from '@/components/ui/button';
import { Copy, MessageCircle, Linkedin } from 'lucide-react';
import { useProgress } from '@/contexts/ProgressContext';
import { toast } from 'sonner';

const InvitePhysiosPathway = () => {
  const referralLink = 'https://physiomantra.com/join/DMY-ASH123';
  const { completePathway } = useProgress();
  const navigate = useNavigate();

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success('Referral link copied!');
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Join me on PhysioMantra - a platform for physiotherapists to grow their practice! ${referralLink}`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
    toast.success('Opening WhatsApp...');
  };

  const handleLinkedIn = () => {
    toast.success('Opening LinkedIn...');
    window.open('https://linkedin.com/sharing/share-offsite/', '_blank');
  };

  const handleComplete = () => {
    completePathway('layer3', 'invitePhysios');
    toast.success('Great! Let\'s check clinic connections.');
    navigate('/layer3/clinic-connection');
  };

  const handleSkip = () => {
    completePathway('layer3', 'invitePhysios');
    navigate('/layer3/clinic-connection');
  };

  return (
    <PathwayLayout
      title="Invite Other Physios"
      layerNumber={3}
      pathwayNumber={1}
      onComplete={handleComplete}
      completeButtonText="Continue"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Your Unique Referral Link:</h3>
          <div className="bg-muted rounded-xl p-4">
            <p className="font-mono text-sm text-foreground break-all">{referralLink}</p>
          </div>
          <Button onClick={handleCopy} className="w-full" variant="outline">
            <Copy className="w-4 h-4 mr-2" />
            Copy Link
          </Button>
        </div>

        <div className="flex gap-3">
          <Button onClick={handleWhatsApp} variant="outline" className="flex-1">
            <MessageCircle className="w-4 h-4 mr-2" />
            WhatsApp
          </Button>
          <Button onClick={handleLinkedIn} variant="outline" className="flex-1">
            <Linkedin className="w-4 h-4 mr-2" />
            LinkedIn
          </Button>
        </div>

        <div className="bg-success/10 border border-success/30 rounded-xl p-4">
          <h4 className="font-semibold text-foreground mb-3">What You Earn (Capped):</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">10 sessions complete</span>
              <span className="font-bold text-success">₹500</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">50 sessions complete</span>
              <span className="font-bold text-success">₹1,000</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-2">
          <Button variant="ghost" onClick={handleSkip}>
            Skip for now
          </Button>
        </div>
      </div>
    </PathwayLayout>
  );
};

export default InvitePhysiosPathway;
