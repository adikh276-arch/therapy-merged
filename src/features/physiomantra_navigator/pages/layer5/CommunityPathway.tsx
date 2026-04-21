import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PathwayLayout from '@/components/pathway/PathwayLayout';
import { Button } from '@/components/ui/button';
import { MessageCircle, Hash, Users, Zap } from 'lucide-react';
import { useProgress } from '@/contexts/ProgressContext';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

const CommunityPathway = () => {
  const { completePathway } = useProgress();
  const navigate = useNavigate();
  const [joinedPod, setJoinedPod] = useState(false);

  const handleJoinWhatsApp = () => {
    toast.success('Added to WhatsApp group!');
    completePathway('layer5', 'community');
  };

  const handleJoinSlack = () => {
    toast.success('Slack invite sent!');
  };

  const handleJoinPod = () => {
    setJoinedPod(true);
    toast.success('You have been added to "Alpha Pod - North Bangalore"');
  };

  const handleContinue = () => {
    completePathway('layer5', 'community');
    navigate('/layer5/training');
  };

  return (
    <PathwayLayout
      title="Provider Community"
      layerNumber={5}
      pathwayNumber={1}
      onComplete={handleContinue}
      completeButtonText="Continue"
    >
      <div className="space-y-8">

        {/* Demand Pods Section - NEW */}
        <div className="border-2 border-primary/20 bg-primary/5 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Physio-Led Demand Pods
            </h3>
            <Badge variant="secondary" className="bg-primary/20 text-primary">High Impact</Badge>
          </div>

          <p className="text-sm text-muted-foreground">
            Join a small squad of 5-7 physios.
            <span className="block mt-1 font-medium text-foreground">Goal: Close 1 corporate deal together this month.</span>
          </p>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-background p-2 rounded border flex items-center gap-2">
              <Zap className="w-3 h-3 text-yellow-500" /> Faster Execution
            </div>
            <div className="bg-background p-2 rounded border flex items-center gap-2">
              <Users className="w-3 h-3 text-blue-500" /> Collective Wins
            </div>
          </div>

          {!joinedPod ? (
            <Button className="w-full" onClick={handleJoinPod}>
              Join a Demand Pod
            </Button>
          ) : (
            <div className="bg-background p-3 rounded border text-center text-sm font-medium text-success">
              ✓ Member of Alpha Pod
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">General Channels</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-4 rounded-xl border border-success/30 bg-success/5">
              <div className="p-2 rounded-lg bg-success/20">
                <MessageCircle className="w-5 h-5 text-success" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">WhatsApp Community</p>
                <p className="text-sm text-muted-foreground">Auto-added for all providers</p>
              </div>
              <Button onClick={handleJoinWhatsApp} variant="outline" size="sm">
                Join
              </Button>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl border border-border">
              <div className="p-2 rounded-lg bg-muted">
                <Hash className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">Slack Workspace</p>
                <p className="text-sm text-muted-foreground">Optional - for advanced discussions</p>
              </div>
              <Button onClick={handleJoinSlack} variant="outline" size="sm">
                Join
              </Button>
            </div>
          </div>
        </div>

      </div>
    </PathwayLayout>
  );
};

export default CommunityPathway;
