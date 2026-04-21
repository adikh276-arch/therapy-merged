import { useNavigate } from 'react-router-dom';
import PathwayLayout from '@/components/pathway/PathwayLayout';
import { useProgress } from '@/contexts/ProgressContext';
import { toast } from 'sonner';
import { GraduationCap, CheckCircle2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const InternGraduation = () => {
    const { completePathway } = useProgress();
    const navigate = useNavigate();

    const handleComplete = () => {
        completePathway('layer6', 'internGraduation');
        toast.success('Mentorship pathway completed!');
        navigate('/');
    };

    return (
        <PathwayLayout
            title="Intern Graduation Pathway"
            layerNumber={6}
            pathwayNumber={4}
            onComplete={handleComplete}
            completeButtonText="Complete Module"
        >
            <div className="space-y-8">

                <div className="text-center space-y-4 py-8 bg-gradient-to-b from-primary/5 to-transparent rounded-2xl">
                    <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <GraduationCap className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold">Graduation Criteria</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        When your intern is ready to level up, they graduate to become a Verified Provider.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    {[
                        "30+ supervised sessions",
                        "Outcome score > 7.5",
                        "Mentor approval",
                        "License uploaded"
                    ].map((criteria, i) => (
                        <div key={i} className="flex items-center gap-3 p-4 border rounded-xl">
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                            <span className="font-medium">{criteria}</span>
                        </div>
                    ))}
                </div>

                <div className="border-t pt-6 text-center">
                    <p className="text-sm font-medium text-muted-foreground mb-4">Sample System Prompt for Interns:</p>
                    <div className="bg-card border shadow-sm p-6 rounded-xl max-w-md mx-auto relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-primary"></div>
                        <h4 className="font-bold text-lg mb-2">🎉 You're ready to level up!</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                            You’ve completed enough supervised sessions.
                            Would you like to upgrade to a Verified Provider?
                        </p>
                        <Button className="w-full gap-2" variant="default">
                            Upgrade to Provider <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

            </div>
        </PathwayLayout>
    );
};

export default InternGraduation;
