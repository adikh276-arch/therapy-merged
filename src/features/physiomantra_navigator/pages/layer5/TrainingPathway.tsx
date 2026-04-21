import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PathwayLayout from '@/components/pathway/PathwayLayout';
import { Button } from '@/components/ui/button';
import { Calendar, Play, Check } from 'lucide-react';
import { useProgress } from '@/contexts/ProgressContext';
import { toast } from 'sonner';

const TrainingPathway = () => {
  const [registered, setRegistered] = useState(false);
  const [watching, setWatching] = useState(false);

  const { completePathway } = useProgress();
  const navigate = useNavigate();

  const handleRegister = () => {
    setRegistered(true);
    toast.success('Registered for AMA session!');
  };

  const handleWatch = () => {
    setWatching(true);
    toast.success('Playing video...');
    setTimeout(() => {
      toast.success('Video completed!');
      setWatching(false);
    }, 2000);
  };

  const handleComplete = () => {
    completePathway('layer5', 'training');
    navigate('/layer5/recognition');
  };

  return (
    <PathwayLayout
      title="Training & Webinars"
      layerNumber={5}
      pathwayNumber={2}
      onComplete={handleComplete}
      completeButtonText="Continue"
    >
      <div className="space-y-6">
        {/* Upcoming Sessions */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">📅 Upcoming Live Sessions:</h3>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/50 transition-colors">
            <div className="flex-1">
              <p className="font-medium text-foreground">AMA with Founders</p>
              <p className="text-sm text-muted-foreground">Jan 30, 2026 • 7:00 PM</p>
            </div>
            <Button
              onClick={handleRegister}
              variant={registered ? 'outline' : 'default'}
              size="sm"
              className={registered ? 'border-success text-success' : ''}
            >
              {registered ? (
                <>
                  <Check className="w-4 h-4 mr-1" />
                  Registered
                </>
              ) : (
                'Register'
              )}
            </Button>
          </div>
        </div>

        {/* On-Demand Library */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Play className="w-5 h-5 text-accent" />
            <h3 className="font-semibold text-foreground">📚 On-Demand Library:</h3>
          </div>
          <div
            className="relative aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl overflow-hidden cursor-pointer group"
            onClick={handleWatch}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {watching ? (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                  <span className="text-foreground font-medium">Playing...</span>
                </div>
              ) : (
                <>
                  <Button size="lg" className="rounded-full w-14 h-14 gradient-accent mb-3 group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 ml-1" />
                  </Button>
                  <p className="font-medium text-foreground">"How to Close Corporate Deals"</p>
                  <p className="text-sm text-muted-foreground">15 min • Popular</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </PathwayLayout>
  );
};

export default TrainingPathway;
