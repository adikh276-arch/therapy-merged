import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PathwayLayout from '@/components/pathway/PathwayLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useProgress } from '@/contexts/ProgressContext';
import { toast } from 'sonner';
import { Check, Loader2, FileCheck } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

const InternVerification = () => {
    const { completePathway, progress } = useProgress();
    const navigate = useNavigate();

    // Form State
    const [college, setCollege] = useState('');
    const [year, setYear] = useState('');
    const [interests, setInterests] = useState('');

    // Upload State
    const [uploaded, setUploaded] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [evidenceUrl, setEvidenceUrl] = useState<string | null>(null);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];

        try {
            setUploading(true);
            const userId = progress.userId || 'guest';
            const fileExt = file.name.split('.').pop();
            const cleanFileName = file.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
            const filePath = `${userId}/intern/${Date.now()}_${cleanFileName}.${fileExt}`;

            // Upload
            const { error: uploadError } = await supabase.storage
                .from('pathway-uploads')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // Get URL
            const { data: { publicUrl } } = supabase.storage
                .from('pathway-uploads')
                .getPublicUrl(filePath);

            setEvidenceUrl(publicUrl);
            setUploaded(true);
            toast.success("ID Card Uploaded!");

        } catch (error: any) {
            console.error("Upload failed", error);
            toast.error("Upload Failed", { description: error.message });
        } finally {
            setUploading(false);
        }
    };

    const handleComplete = () => {
        if (!uploaded || !college || !year) {
            toast.error('Please complete all fields and upload ID');
            return;
        }

        const formData = {
            college,
            year,
            interests,
            role: 'intern'
        };

        // Complete with Evidence and Data
        completePathway('layer0', 'verification', evidenceUrl!, formData);

        toast.success('Verification submitted for manual approval');
        navigate('/layer0/how-it-works');
    };

    return (
        <PathwayLayout
            title="Intern Verification"
            layerNumber={0}
            pathwayNumber={2}
            onComplete={handleComplete}
            completeButtonText="Submit for Approval"
        >
            <div className="space-y-8">
                <div className="grid gap-6">
                    <div className="space-y-2">
                        <Label>College / University</Label>
                        <Input
                            placeholder="Enter your college name"
                            value={college}
                            onChange={(e) => setCollege(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Year of Study</Label>
                        <Select value={year} onValueChange={setYear}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="final">Final Year BPT</SelectItem>
                                <SelectItem value="intern">Internship</SelectItem>
                                <SelectItem value="grad">Fresh Graduate</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Areas of Interest</Label>
                        <Input
                            placeholder="e.g. Ortho, Sports, Neuro"
                            value={interests}
                            onChange={(e) => setInterests(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Upload College ID / Internship Letter</Label>
                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer relative">
                            {/* Hidden File Input */}
                            <input
                                type="file"
                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                onChange={handleFileUpload}
                                disabled={uploading || uploaded}
                            />

                            {uploading ? (
                                <div className="text-muted-foreground flex items-center justify-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
                                </div>
                            ) : uploaded ? (
                                <div className="text-success flex items-center justify-center gap-2">
                                    <FileCheck className="w-5 h-5" />
                                    <span className="font-semibold">ID Document Secured</span>
                                </div>
                            ) : (
                                <div className="text-muted-foreground">
                                    <span className="text-primary font-medium">Click to upload</span> or drag and drop
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold text-sm">Rules & Guidelines</h4>
                    <ul className="space-y-2">
                        {[
                            "You can deliver care under mentor supervision",
                            "You will NOT claim independent expertise",
                            "Pricing is lower for patients",
                            "Feedback is mandatory"
                        ].map((rule, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Check className="w-4 h-4 text-success" />
                                {rule}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </PathwayLayout>
    );
};

export default InternVerification;
