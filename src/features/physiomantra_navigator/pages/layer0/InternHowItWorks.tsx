import { useNavigate } from 'react-router-dom';
import PathwayLayout from '@/components/pathway/PathwayLayout';
import { useProgress } from '@/contexts/ProgressContext';
import { toast } from 'sonner';
import { User, UserCheck, Stethoscope, FileText, TrendingUp, ArrowRight } from 'lucide-react';

const InternHowItWorks = () => {
    const { completePathway } = useProgress();
    const navigate = useNavigate();

    const handleComplete = () => {
        completePathway('layer0', 'howItWorks');
        toast.success('Great! You understand the flow.');
        navigate('/layer0/earnings');
    };

    const steps = [
        {
            icon: User,
            title: "Patient books Intern Session",
            desc: "Patients choose lower-priced intern sessions knowing they help you learn."
        },
        {
            icon: UserCheck,
            title: "Mentor Auto-Assigned",
            desc: "A senior physio is assigned to oversee the case and guide you."
        },
        {
            icon: Stethoscope,
            title: "You Conduct Session",
            desc: "You perform the assessment/treatment with confidence."
        },
        {
            icon: FileText,
            title: "Mentor Reviews Plan",
            desc: "You create the care plan/HEP, and your mentor approves it."
        },
        {
            icon: TrendingUp,
            title: "Progress Tracking",
            desc: "Patient improves under supervised care, and you get feedback."
        }
    ];

    return (
        <PathwayLayout
            title="How Intern Sessions Work"
            layerNumber={0}
            pathwayNumber={3}
            onComplete={handleComplete}
            completeButtonText="I Understand & Agree"
        >
            <div className="space-y-8">
                <p className="text-muted-foreground text-center max-w-lg mx-auto">
                    A safe, structured environment designed to help you learn without risk or confusion.
                </p>

                <div className="grid gap-6">
                    {steps.map((step, index) => (
                        <div key={index} className="flex items-start gap-4 p-4 rounded-xl border bg-card hover:shadow-sm transition-shadow">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary font-bold">
                                {index + 1}
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-semibold text-foreground flex items-center gap-2">
                                    {step.title}
                                </h4>
                                <p className="text-sm text-muted-foreground">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </PathwayLayout>
    );
};

export default InternHowItWorks;
