import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PathwayLayout from '@/components/pathway/PathwayLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle } from 'lucide-react';
import { useProgress } from '@/contexts/ProgressContext';
import { toast } from 'sonner';

const connections = [
  'I work there',
  'Friend works there',
  'Former colleague',
  'Met at event',
  'LinkedIn connection',
  'Other',
];

const ShareLeadsPathway = () => {
  const [companyName, setCompanyName] = useState('');
  const [connection, setConnection] = useState('');
  const [contactName, setContactName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const { completePathway } = useProgress();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!companyName || !connection) {
      toast.error('Please fill required fields');
      return;
    }
    setSubmitted(true);
    toast.success('Lead submitted!');
    completePathway('layer4', 'shareLeads');
  };

  const handleContinue = () => {
    navigate('/layer4/assisted-onboarding');
  };

  if (submitted) {
    return (
      <PathwayLayout
        title="Share Corporate Leads"
        layerNumber={4}
        pathwayNumber={3}
        onComplete={handleContinue}
        completeButtonText="Continue"
      >
        <div className="text-center py-8 space-y-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-success/20 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">Lead Submitted!</h3>
            <p className="text-muted-foreground mt-2">
              We'll reach out to {companyName} and keep you updated.
            </p>
          </div>
          <div className="bg-muted/50 rounded-xl p-4">
            <p className="text-sm font-medium text-foreground">Pipeline Status</p>
            <div className="flex items-center gap-2 justify-center mt-2">
              <div className="w-3 h-3 rounded-full bg-warning animate-pulse" />
              <span className="text-sm text-muted-foreground">Pending Review</span>
            </div>
          </div>
        </div>
      </PathwayLayout>
    );
  }

  return (
    <PathwayLayout
      title="Share Corporate Leads"
      layerNumber={4}
      pathwayNumber={3}
    >
      <div className="space-y-6">
        <h3 className="font-semibold text-foreground">Lead Submission Form:</h3>

        <div className="space-y-4">
          <div>
            <Label>Company Name *</Label>
            <Input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter company name"
            />
          </div>
          <div>
            <Label>Your Connection *</Label>
            <Select value={connection} onValueChange={setConnection}>
              <SelectTrigger>
                <SelectValue placeholder="How do you know them?" />
              </SelectTrigger>
              <SelectContent>
                {connections.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Contact Name (optional)</Label>
            <Input
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="HR or decision maker name"
            />
          </div>
          <Button onClick={handleSubmit} className="w-full gradient-primary">
            Submit Lead
          </Button>
        </div>
      </div>
    </PathwayLayout>
  );
};

export default ShareLeadsPathway;
