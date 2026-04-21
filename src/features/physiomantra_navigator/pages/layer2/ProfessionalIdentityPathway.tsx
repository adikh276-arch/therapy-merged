import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PathwayLayout from '@/components/pathway/PathwayLayout';
import { Button } from '@/components/ui/button';
import { Download, FileText, Award, Mail, Image, Check } from 'lucide-react';
import { useProgress } from '@/contexts/ProgressContext';
import { toast } from 'sonner';

const assets = [
  { id: 'letter', label: 'Appointment Letter', icon: FileText, type: 'PDF' },
  { id: 'badge', label: 'Provider Badge', icon: Award, type: 'Image' },
  { id: 'signature', label: 'Email Signature', icon: Mail, type: 'Template' },
  { id: 'banner', label: 'LinkedIn Banner', icon: Image, type: 'Image' },
];

const ProfessionalIdentityPathway = () => {
  const [downloaded, setDownloaded] = useState<string[]>([]);
  const { completePathway } = useProgress();
  const navigate = useNavigate();

  const handleDownload = (id: string, label: string) => {
    if (!downloaded.includes(id)) {
      setDownloaded([...downloaded, id]);
    }
    toast.success(`${label} downloaded!`);
  };

  const canContinue = downloaded.length > 0;

  const handleComplete = () => {
    if (!canContinue) {
      toast.error('Download at least 1 asset to continue');
      return;
    }
    completePathway('layer2', 'professionalIdentity');
    toast.success('Identity assets ready! Last step for Layer 2.');
    navigate('/layer2/local-awareness');
  };

  return (
    <PathwayLayout
      title="Professional Identity Setup"
      layerNumber={2}
      pathwayNumber={3}
      onComplete={handleComplete}
      completeButtonText="Continue"
    >
      <div className="space-y-6">
        <p className="text-muted-foreground">
          Use MantraCare branding to build trust:
        </p>

        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Available Assets:</h3>
          <div className="grid gap-3">
            {assets.map((asset) => {
              const isDownloaded = downloaded.includes(asset.id);
              return (
                <div
                  key={asset.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                    isDownloaded
                      ? 'border-success/30 bg-success/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${isDownloaded ? 'bg-success/20' : 'bg-muted'}`}>
                    <asset.icon className={`w-5 h-5 ${isDownloaded ? 'text-success' : 'text-muted-foreground'}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{asset.label}</p>
                    <p className="text-sm text-muted-foreground">{asset.type}</p>
                  </div>
                  <Button
                    variant={isDownloaded ? 'outline' : 'default'}
                    size="sm"
                    onClick={() => handleDownload(asset.id, asset.label)}
                    className={isDownloaded ? 'border-success text-success' : ''}
                  >
                    {isDownloaded ? (
                      <>
                        <Check className="w-4 h-4 mr-1" />
                        Downloaded
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </>
                    )}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>

        <p className={`text-sm text-center ${canContinue ? 'text-success' : 'text-muted-foreground'}`}>
          {canContinue
            ? '✓ You can continue now!'
            : 'Download at least 1 asset to continue'}
        </p>
      </div>
    </PathwayLayout>
  );
};

export default ProfessionalIdentityPathway;
