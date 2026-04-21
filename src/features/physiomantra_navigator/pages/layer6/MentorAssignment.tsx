import { useNavigate } from 'react-router-dom';
import PathwayLayout from '@/components/pathway/PathwayLayout';
import { useProgress } from '@/contexts/ProgressContext';
import { toast } from 'sonner';
import { MapPin, Calendar, Star, User, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const MentorAssignment = () => {
    const { completePathway } = useProgress();
    const navigate = useNavigate();

    const handleComplete = () => {
        completePathway('layer6', 'mentorAssignment');
        toast.success('Assignment preferences saved.');
        navigate('/layer6/intern-feedback');
    };

    const interns = [
        { name: "Ankit (Ortho)", reviews: 12, status: "Active" },
        { name: "Neha (Sports)", reviews: 7, status: "Active" }
    ];

    return (
        <PathwayLayout
            title="Mentor Assignment System"
            layerNumber={6}
            pathwayNumber={2}
            onComplete={handleComplete}
            completeButtonText="Go to Feedback Loop"
        >
            <div className="space-y-8">

                <div className="space-y-4">
                    <h3 className="font-semibold">How Matching Works</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {[
                            { icon: MapPin, text: "Same city preferred" },
                            { icon: Star, text: "Same specialization preferred" },
                            { icon: Calendar, text: "Availability overlap" },
                            { icon: ShieldCheck, text: "Trust Score priority" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                                <item.icon className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm">{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border rounded-xl overflow-hidden">
                    <div className="bg-muted/50 p-4 border-b flex justify-between items-center">
                        <h3 className="font-semibold">Your Assigned Interns</h3>
                        <Badge variant="secondary">2 Active</Badge>
                    </div>
                    <div className="divide-y">
                        {interns.map((intern, i) => (
                            <div key={i} className="p-4 flex items-center justify-between hover:bg-muted/10 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">{intern.name}</p>
                                        <p className="text-xs text-muted-foreground">{intern.reviews} sessions reviewed</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" className="text-xs">View Profile</Button>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 bg-primary/5 text-center">
                        <p className="text-sm font-medium text-primary">Earnings from Mentorship: ₹1,900 this month</p>
                    </div>
                </div>

            </div>
        </PathwayLayout>
    );
};

export default MentorAssignment;
