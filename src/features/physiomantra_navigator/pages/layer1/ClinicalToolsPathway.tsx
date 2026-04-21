import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PathwayLayout from '@/components/pathway/PathwayLayout';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useProgress } from '@/contexts/ProgressContext';
import { toast } from 'sonner';

const slides = [
  {
    title: 'Digital Exercise Library',
    description: 'Access 500+ evidence-based exercises with videos and instructions',
    icon: '📚',
  },
  {
    title: 'Home Exercise Programs (HEP)',
    description: 'Create personalized exercise plans patients can follow at home',
    icon: '🏠',
  },
  {
    title: 'Patient Adherence Tracking',
    description: 'Monitor patient compliance and engagement in real-time',
    icon: '📊',
  },
  {
    title: 'Session Summaries',
    description: 'Automatic documentation and progress reports for every session',
    icon: '📝',
  },
];

const ClinicalToolsPathway = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { completePathway } = useProgress();
  const navigate = useNavigate();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleTryDemo = () => {
    toast.info('Demo exercise feature coming soon!');
  };

  const handleComplete = () => {
    completePathway('layer1', 'clinicalTools');
    toast.success('Great! Now let\'s talk earnings.');
    navigate('/layer1/earnings');
  };

  return (
    <PathwayLayout
      title="Clinical Tools Overview"
      layerNumber={1}
      pathwayNumber={4}
      onComplete={handleComplete}
      completeButtonText="Proceed"
    >
      <div className="space-y-6">
        <p className="text-muted-foreground">MantraCare gives you:</p>

        {/* Carousel */}
        <div className="relative">
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 min-h-[200px] flex flex-col items-center justify-center text-center">
            <div className="text-5xl mb-4">{slides[currentSlide].icon}</div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              {slides[currentSlide].title}
            </h3>
            <p className="text-muted-foreground max-w-md">
              {slides[currentSlide].description}
            </p>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 shadow-lg hover:bg-background transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 shadow-lg hover:bg-background transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentSlide ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        <p className="text-muted-foreground text-center">
          These tools help improve outcomes and patient retention.
        </p>

        <div className="flex justify-center">
          <Button variant="outline" onClick={handleTryDemo}>
            Try Demo Exercise (Optional)
          </Button>
        </div>
      </div>
    </PathwayLayout>
  );
};

export default ClinicalToolsPathway;
