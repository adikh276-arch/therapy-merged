import { useNavigate } from 'react-router-dom';
import PathwayLayout from '@/components/pathway/PathwayLayout';
import { useProgress } from '@/contexts/ProgressContext';
import { toast } from 'sonner';
import { AlertCircle, CheckCircle2, IndianRupee } from 'lucide-react';

const InternEarnings = () => {
    const { completePathway } = useProgress();
    const navigate = useNavigate();

    const handleComplete = () => {
        completePathway('layer0', 'earnings');
        toast.success('You represent the future of PhysioMantra! Status: Active Intern.');
        navigate('/');
    };

    return (
        <PathwayLayout
            title="Earnings & Expectations"
            layerNumber={0}
            pathwayNumber={4}
            onComplete={handleComplete}
            completeButtonText="Activate Intern Status"
        >
            <div className="space-y-8">

                {/* Pricing Card */}
                <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
                    <div className="bg-muted/30 p-4 border-b">
                        <h3 className="font-semibold flex items-center gap-2">
                            <IndianRupee className="w-4 h-4" />
                            Intern Session Pricing
                        </h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="flex justify-between items-center py-2 border-b border-dashed">
                            <span className="text-muted-foreground">Patient Pays</span>
                            <span className="font-bold">₹299</span>
                        </div>
                        <div className="flex justify-between items-center py-2 text-success font-medium bg-success/5 px-2 rounded">
                            <span>You Earn</span>
                            <span>₹150</span>
                        </div>
                        <div className="flex justify-between items-center py-2 text-sm text-muted-foreground">
                            <span>Mentor Earns</span>
                            <span>₹100</span>
                        </div>
                        <div className="flex justify-between items-center py-2 text-sm text-muted-foreground">
                            <span>Platform Fee</span>
                            <span>₹49</span>
                        </div>
                    </div>
                </div>

                <div className="bg-primary/5 p-5 rounded-lg border border-primary/10">
                    <h4 className="font-semibold mb-2">Why lower pricing?</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Easier patient acquisition for you</li>
                        <li>• Real-world learning with less pressure</li>
                        <li>• Zero pressure to perform solo</li>
                    </ul>
                </div>

                <div className="space-y-4 pt-4">
                    <h3 className="font-semibold">Expectations & Rules</h3>
                    <div className="grid gap-3 sm:grid-cols-3">
                        <div className="p-4 border rounded-lg text-center space-y-2">
                            <AlertCircle className="w-6 h-6 mx-auto text-amber-500" />
                            <p className="font-medium text-sm">Max Sessions Capped</p>
                        </div>
                        <div className="p-4 border rounded-lg text-center space-y-2">
                            <CheckCircle2 className="w-6 h-6 mx-auto text-primary" />
                            <p className="font-medium text-sm">Mandatory Review</p>
                        </div>
                        <div className="p-4 border rounded-lg text-center space-y-2">
                            <AlertCircle className="w-6 h-6 mx-auto text-destructive" />
                            <p className="font-medium text-sm">No Corporate Cases</p>
                        </div>
                    </div>
                </div>

            </div>
        </PathwayLayout>
    );
};

export default InternEarnings;
