import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PathwayLayout from '@/components/pathway/PathwayLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useProgress } from '@/contexts/ProgressContext';
import { toast } from 'sonner';

const ClinicConnectionPathway = () => {
  const [clinicName, setClinicName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [knowClinicName, setKnowClinicName] = useState('');

  const { completePathway } = useProgress();
  const navigate = useNavigate();

  const handleSubmitOption1 = () => {
    if (!clinicName || !ownerName) {
      toast.error('Please fill all fields');
      return;
    }
    toast.success('Clinic connection submitted!');
    completePathway('layer3', 'clinicConnection');
    navigate('/layer3/specialist-profile');
  };

  const handleSubmitOption2 = () => {
    if (!knowClinicName) {
      toast.error('Please enter clinic name');
      return;
    }
    toast.success('Clinic referral submitted!');
    completePathway('layer3', 'clinicConnection');
    navigate('/layer3/specialist-profile');
  };

  const handleSkip = () => {
    completePathway('layer3', 'clinicConnection');
    toast.info('Skipped for now.');
    navigate('/layer3/specialist-profile');
  };

  return (
    <PathwayLayout
      title="Clinic / Practice Connection"
      layerNumber={3}
      pathwayNumber={2}
    >
      <div className="space-y-8">
        {/* Option 1 */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Option 1: I work at a clinic</h3>
          <div className="space-y-3">
            <div>
              <Label>Clinic Name</Label>
              <Input
                value={clinicName}
                onChange={(e) => setClinicName(e.target.value)}
                placeholder="Enter clinic name"
              />
            </div>
            <div>
              <Label>Owner Name</Label>
              <Input
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                placeholder="Enter owner name"
              />
            </div>
            <Button onClick={handleSubmitOption1} className="w-full">
              Submit
            </Button>
          </div>
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

        {/* Option 2 */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Option 2: I know a clinic owner</h3>
          <div className="space-y-3">
            <div>
              <Label>Clinic Name</Label>
              <Input
                value={knowClinicName}
                onChange={(e) => setKnowClinicName(e.target.value)}
                placeholder="Enter clinic name"
              />
            </div>
            <Button onClick={handleSubmitOption2} variant="outline" className="w-full">
              Submit
            </Button>
          </div>
        </div>

        <div className="flex justify-center pt-2">
          <Button variant="ghost" onClick={handleSkip}>
            Skip - Not applicable
          </Button>
        </div>
      </div>
    </PathwayLayout>
  );
};

export default ClinicConnectionPathway;
