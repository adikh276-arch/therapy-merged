import { useNavigate } from 'react-router-dom';
import PathwayLayout from '@/components/pathway/PathwayLayout';
import { Trophy, MapPin } from 'lucide-react';
import { useProgress } from '@/contexts/ProgressContext';
import { toast } from 'sonner';

const topEarners = [
  { rank: 1, name: 'Dr. Priya Sharma', earnings: '₹2,45,000', avatar: 'PS' },
  { rank: 2, name: 'Dr. Rahul Mehta', earnings: '₹2,12,000', avatar: 'RM' },
  { rank: 3, name: 'Dr. Meera Singh', earnings: '₹1,98,000', avatar: 'MS' },
];

const cityChampions = [
  { city: 'Bangalore', name: 'Dr. Priya', rating: '9.2/10' },
  { city: 'Mumbai', name: 'Dr. Vikram', rating: '9.0/10' },
  { city: 'Delhi', name: 'Dr. Neha', rating: '8.8/10' },
];

const RecognitionPathway = () => {
  const { completePathway } = useProgress();
  const navigate = useNavigate();

  const handleComplete = () => {
    completePathway('layer5', 'recognition');
    toast.success('Layer 5 complete! Community features always available.');
    navigate('/');
  };

  return (
    <PathwayLayout
      title="Recognition & Growth"
      layerNumber={5}
      pathwayNumber={3}
      onComplete={handleComplete}
      completeButtonText="Back to Dashboard"
    >
      <div className="space-y-6">
        {/* Top Earners */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-accent" />
            <h3 className="font-semibold text-foreground">🏆 Top Earners This Quarter:</h3>
          </div>
          <div className="space-y-3">
            {topEarners.map((earner) => (
              <div
                key={earner.rank}
                className={`flex items-center gap-4 p-4 rounded-xl border ${
                  earner.rank === 1
                    ? 'border-accent/50 bg-accent/5'
                    : 'border-border'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                    earner.rank === 1
                      ? 'bg-accent text-accent-foreground'
                      : earner.rank === 2
                      ? 'bg-muted text-muted-foreground'
                      : 'bg-muted/50 text-muted-foreground'
                  }`}
                >
                  {earner.rank}
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-medium text-primary">
                  {earner.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{earner.name}</p>
                </div>
                <p className="font-bold text-success">{earner.earnings}</p>
              </div>
            ))}
          </div>
        </div>

        {/* City Champions */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">🏆 City Champions:</h3>
          </div>
          <div className="grid gap-3">
            {cityChampions.map((champion) => (
              <div
                key={champion.city}
                className="flex items-center gap-4 p-3 rounded-xl bg-muted/30"
              >
                <span className="font-medium text-foreground w-24">{champion.city}</span>
                <span className="flex-1 text-muted-foreground">{champion.name}</span>
                <span className="text-sm font-medium text-primary">({champion.rating})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PathwayLayout>
  );
};

export default RecognitionPathway;
