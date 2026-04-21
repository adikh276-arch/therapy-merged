import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PathwayLayout from '@/components/pathway/PathwayLayout';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useProgress } from '@/contexts/ProgressContext';
import { toast } from 'sonner';

const goals = [
    { id: 'practice', label: 'Learn through real patient cases' },
    { id: 'confidence', label: 'Build confidence before practice' },
    { id: 'earn', label: 'Earn while completing internship' },
    { id: 'all', label: 'All of the above' },
];

const InternWelcome = () => {
    const [selectedGoal, setSelectedGoal] = useState<string>('');
    const { completePathway } = useProgress();
    const navigate = useNavigate();

    const handleComplete = () => {
        if (!selectedGoal) {
            toast.error('Please select your primary goal');
            return;
        }
        completePathway('layer0', 'welcome');
        toast.success('Welcome to the Intern Program!');
        navigate('/layer0/verification');
    };

    return (
        <PathwayLayout
            title="Welcome to PhysioMantra – Intern Program"
            layerNumber={0}
            pathwayNumber={1}
            onComplete={handleComplete}
            completeButtonText="Start Intern Journey"
        >
            <div className="space-y-6">
                <div className="space-y-4 text-muted-foreground">
                    <p className="text-lg">
                        This program helps physiotherapy interns:
                    </p>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-primary" />
                            <span>Gain real patient exposure</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-primary" />
                            <span>Earn while learning</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-primary" />
                            <span>Work under experienced mentors</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-primary" />
                            <span>Build confidence before independent practice</span>
                        </li>
                    </ul>
                    <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                        <p className="font-medium text-foreground">You will NOT be alone.</p>
                        <p className="text-sm mt-1">Every session you do is supervised and supported.</p>
                    </div>
                </div>

                <div className="border-t border-border pt-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                        What's your primary goal?
                    </h3>
                    <RadioGroup value={selectedGoal} onValueChange={setSelectedGoal}>
                        <div className="space-y-3">
                            {goals.map((goal) => (
                                <div
                                    key={goal.id}
                                    className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
                                    onClick={() => setSelectedGoal(goal.id)}
                                >
                                    <RadioGroupItem value={goal.id} id={goal.id} />
                                    <Label htmlFor={goal.id} className="cursor-pointer flex-1">
                                        {goal.label}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </RadioGroup>
                </div>
            </div>
        </PathwayLayout>
    );
};

export default InternWelcome;
