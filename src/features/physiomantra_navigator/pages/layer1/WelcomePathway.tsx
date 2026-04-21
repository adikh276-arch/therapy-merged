import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PathwayLayout from '@/components/pathway/PathwayLayout';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useProgress } from '@/contexts/ProgressContext';
import { toast } from 'sonner';

const goals = [
  { id: 'practice', label: 'Grow my own patient practice' },
  { id: 'corporate', label: 'Work with corporate clients' },
  { id: 'clinic', label: 'Join as clinic/practice physio' },
  { id: 'explore', label: 'Explore all options' },
];

const WelcomePathway = () => {
  const [selectedGoal, setSelectedGoal] = useState<string>('');
  const { completePathway, setPrimaryGoal } = useProgress();
  const navigate = useNavigate();

  const handleComplete = () => {
    if (!selectedGoal) {
      toast.error('Please select your primary goal');
      return;
    }
    setPrimaryGoal(selectedGoal);
    completePathway('layer1', 'welcome');
    toast.success('Welcome! Let\'s continue your setup.');
    navigate('/layer1/verification');
  };

  return (
    <PathwayLayout
      title="Welcome to PhysioMantra"
      layerNumber={1}
      pathwayNumber={1}
      onComplete={handleComplete}
      completeButtonText="Continue"
    >
      <div className="space-y-6">
        <div className="space-y-4 text-muted-foreground">
          <p className="text-lg">
            You are joining a national physiotherapy platform that helps providers:
          </p>
          <ul className="space-y-2">
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span>Get regular patient flow</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span>Work with corporates</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span>Build a long-term practice</span>
            </li>
          </ul>
          <p>
            MantraCare supports you with technology, credibility, and growth
            opportunities while you focus on care.
          </p>
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

export default WelcomePathway;
