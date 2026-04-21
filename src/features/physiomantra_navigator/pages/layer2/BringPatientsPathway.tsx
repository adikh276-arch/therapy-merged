import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PathwayLayout from '@/components/pathway/PathwayLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Copy, MessageCircle, Upload } from 'lucide-react';
import { useProgress } from '@/contexts/ProgressContext';
import { toast } from 'sonner';

const BringPatientsPathway = () => {
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [condition, setCondition] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  const { completePathway } = useProgress();
  const navigate = useNavigate();

  const handleGenerateLink = () => {
    if (!patientName) {
      toast.error('Please enter patient name');
      return;
    }
    const link = `https://mantracare.com/book/${patientName.toLowerCase().replace(/\s+/g, '-')}-${Date.now().toString(36)}`;
    setGeneratedLink(link);
    toast.success('Booking link generated!');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    toast.success('Link copied to clipboard!');
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hi! Book your physiotherapy session with me on MantraCare: ${generatedLink}`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
    toast.success('Opening WhatsApp...');
  };

  const handleComplete = () => {
    completePathway('layer2', 'bringPatients');
    toast.success('Moving to professional identity setup.');
    navigate('/layer2/professional-identity');
  };

  const handleSkip = () => {
    completePathway('layer2', 'bringPatients');
    toast.info('Skipped for now. You can return anytime.');
    navigate('/layer2/professional-identity');
  };

  return (
    <PathwayLayout
      title="Bring Your Existing Patients"
      layerNumber={2}
      pathwayNumber={2}
      onComplete={handleComplete}
      completeButtonText="Continue"
    >
      <div className="space-y-8">
        {/* Option 1: Add Patient Manually */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Option 1: Add Patient Manually</h3>
          <div className="space-y-3">
            <div>
              <Label>Name</Label>
              <Input
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Patient name"
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                placeholder="Phone number"
              />
            </div>
            <div>
              <Label>Condition</Label>
              <Input
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                placeholder="e.g., Lower back pain"
              />
            </div>
            <Button onClick={handleGenerateLink} className="w-full">
              Generate Booking Link
            </Button>
          </div>

          {generatedLink && (
            <div className="bg-success/10 border border-success/30 rounded-xl p-4 space-y-3">
              <p className="text-sm font-medium text-foreground">Your patient's booking link:</p>
              <div className="bg-background rounded-lg p-3 font-mono text-sm text-muted-foreground break-all">
                {generatedLink}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCopyLink} className="flex-1">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Link
                </Button>
                <Button variant="outline" size="sm" onClick={handleWhatsApp} className="flex-1">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Share via WhatsApp
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-card px-4 text-muted-foreground">OR</span>
          </div>
        </div>

        {/* Option 2: Bulk Import */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Option 2: Bulk Import</h3>
          <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
            <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">Upload CSV (Name, Phone)</p>
            <Button variant="outline" size="sm" className="mt-3">
              Choose File
            </Button>
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <Button variant="ghost" onClick={handleSkip}>
            Skip for now
          </Button>
        </div>
      </div>
    </PathwayLayout>
  );
};

export default BringPatientsPathway;
