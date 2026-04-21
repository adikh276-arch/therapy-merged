import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PathwayLayout from '@/components/pathway/PathwayLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Upload, FileCheck, Loader2 } from 'lucide-react';
import { useProgress } from '@/contexts/ProgressContext';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabaseClient';

const conditions = [
  'Post-Surgical Rehab', 'Sports Injuries', 'Chronic Pain',
  'Stroke Recovery', 'Pediatric Development', 'Geriatric Mobility'
];

const SpecialistProfilePathway = () => {
  const [bio, setBio] = useState('');
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [uploaded, setUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [evidenceUrl, setEvidenceUrl] = useState<string | null>(null);

  const { completePathway, progress } = useProgress();
  const navigate = useNavigate();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    try {
      setUploading(true);
      const userId = progress.userId || 'guest';
      // Sanitize filename
      const fileExt = file.name.split('.').pop();
      const cleanFileName = file.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const filePath = `${userId}/specialist/${Date.now()}_${cleanFileName}.${fileExt}`;

      // Upload to Supabase
      const { error: uploadError } = await supabase.storage
        .from('pathway-uploads')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('pathway-uploads')
        .getPublicUrl(filePath);

      // Success
      setEvidenceUrl(publicUrl);
      setUploaded(true);
      toast.success("Certificate Uploaded!", { description: "Added to your specialist profile." });

    } catch (error: any) {
      console.error("Upload failed", error);
      toast.error("Upload Failed", { description: error.message });
    } finally {
      setUploading(false);
    }
  };

  const toggleCondition = (item: string) => {
    if (selectedConditions.includes(item)) {
      setSelectedConditions(selectedConditions.filter(i => i !== item));
    } else {
      setSelectedConditions([...selectedConditions, item]);
    }
  };

  const handleComplete = () => {
    if (!bio || selectedConditions.length === 0) {
      toast.error('Please complete your bio and select conditions');
      return;
    }

    // Collect Form Data
    const formData = {
      bio,
      conditions: selectedConditions,
      hasCertificate: uploaded
    };

    // Save with Evidence URL if present
    completePathway('layer3', 'specialistProfile', evidenceUrl!, formData);

    toast.success('Specialist profile updated!');
    navigate('/layer4');
  };

  return (
    <PathwayLayout
      title="Build Specialist Profile"
      layerNumber={3}
      pathwayNumber={3}
      onComplete={handleComplete}
      completeButtonText="Publish Profile"
    >
      <div className="space-y-8">
        <p className="text-muted-foreground">
          Highlight your expertise to attract the right patients.
        </p>

        {/* Bio */}
        <div className="space-y-3">
          <Label>Professional Bio</Label>
          <Textarea
            placeholder="Describe your expertise and approach..."
            className="h-32"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        {/* Conditions */}
        <div className="space-y-3">
          <Label>Conditions Treated (Select top 3)</Label>
          <div className="grid grid-cols-2 gap-2">
            {conditions.map(c => (
              <div
                key={c}
                className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${selectedConditions.includes(c)
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                  }`}
                onClick={() => toggleCondition(c)}
              >
                <Checkbox checked={selectedConditions.includes(c)} />
                <span className="text-sm">{c}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Certificates */}
        <div className="space-y-3">
          <Label>Upload Certifications (Optional)</Label>
          <div className="flex gap-3 items-center">
            <Input
              type="file"
              className="flex-1"
              disabled={uploaded || uploading}
              onChange={handleFileUpload}
            />
            {uploading ? (
              <Button disabled variant="outline"><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Uploading...</Button>
            ) : uploaded ? (
              <Button disabled variant="outline" className="text-green-600 border-green-200 bg-green-50">
                <FileCheck className="w-4 h-4 mr-2" /> Uploaded
              </Button>
            ) : (
              <Button disabled variant="secondary">Select File</Button>
            )}
          </div>
        </div>
      </div>
    </PathwayLayout>
  );
};

export default SpecialistProfilePathway;
