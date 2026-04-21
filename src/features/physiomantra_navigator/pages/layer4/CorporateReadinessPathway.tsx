import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PathwayLayout from '@/components/pathway/PathwayLayout';
import { Button } from '@/components/ui/button';
import { useProgress } from '@/contexts/ProgressContext';
import { toast } from 'sonner';
import { Check, Building, FileText, Send, Rocket, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const CorporateReadinessPathway = () => {
  const { completePathway } = useProgress();
  const navigate = useNavigate();
  const [showDoneForYou, setShowDoneForYou] = useState(false);

  const handleComplete = () => {
    completePathway('layer4', 'corporateReadiness');
    toast.success('Corporate profile is ready!');
    navigate('/layer4/share-leads');
  };

  const checklist = [
    'Uploaded professional bio',
    'Previous workshop photos (optional)',
    'Selected 3 specialty topics',
    'Agreed to standard pricing',
  ];

  return (
    <PathwayLayout
      title="Corporate Readiness"
      layerNumber={4}
      pathwayNumber={2}
      onComplete={handleComplete}
      completeButtonText="Profile Ready"
    >
      <div className="space-y-8">
        {/* Intro */}
        <div className="bg-muted/30 p-4 rounded-lg">
          <h3 className="font-semibold flex items-center gap-2 mb-2">
            <Rocket className="w-5 h-5 text-primary" />
            New: Corporate Pilot Mode
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Start with a low-commitment pilot instead of a full contract.
            <strong> 10-20 sessions • Flat price • 14-day trial</strong>
          </p>
          <div className="flex gap-2">
            <Check className="w-4 h-4 text-success" />
            <span className="text-xs font-medium">Easier to sell</span>
            <Check className="w-4 h-4 text-success" />
            <span className="text-xs font-medium">Fast close</span>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-4 space-y-4 border-2 border-primary/10">
            <h3 className="font-semibold flex items-center gap-2">
              <Building className="w-5 h-5 text-primary" />
              Do It Yourself
            </h3>
            <p className="text-sm text-muted-foreground">
              Download our pitch deck and approach HR yourself. Keep 100% of outreach credit.
            </p>
            <div className="space-y-2">
              {checklist.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center">
                    <Check className="w-3 h-3 text-success" />
                  </div>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full">Download Kit</Button>
          </Card>

          <Card className="p-4 space-y-4 border-2 border-indigo-500/20 bg-indigo-50/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-bl">New</div>
            <h3 className="font-semibold flex items-center gap-2 text-indigo-600">
              <Sparkles className="w-5 h-5" />
              Done-For-You Outreach
            </h3>
            <p className="text-sm text-muted-foreground">
              PhysioMantra ops team will handle the cold emails, calls, and scheduling for you.
            </p>

            {!showDoneForYou ? (
              <Button
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200"
                onClick={() => setShowDoneForYou(true)}
              >
                Let Mantra do this for me
              </Button>
            ) : (
              <div className="bg-background rounded p-3 space-y-3 animate-fade-in border">
                <div className="space-y-1">
                  <label className="text-xs font-medium">Target Company/Area</label>
                  <input type="text" className="w-full text-sm border rounded p-1" placeholder="e.g. Tech Park, Hebbal" />
                </div>
                <Button size="sm" className="w-full gap-2" onClick={() => toast.success("Request sent to Ops team!")}>
                  <Send className="w-3 h-3" /> Submit Request
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </PathwayLayout>
  );
};

export default CorporateReadinessPathway;
