import { ReactNode } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface PathwayLayoutProps {
  title: string;
  layerNumber: number;
  pathwayNumber: number;
  children: ReactNode;
  onComplete?: () => void;
  completeButtonText?: string;
  showBack?: boolean;
}

const PathwayLayout = ({
  title,
  layerNumber,
  pathwayNumber,
  children,
  onComplete,
  completeButtonText = 'Continue',
  showBack = true,
}: PathwayLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          {showBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="mb-4 -ml-2"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          )}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
              Pathway {layerNumber}
            </span>
            <span>•</span>
            <span>Step {pathwayNumber}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h1>
        </div>

        {/* Content */}
        <div className="bg-card rounded-2xl shadow-card p-6 md:p-8 animate-fade-in">
          {children}
        </div>

        {/* Complete Button */}
        {onComplete && (
          <div className="mt-6 flex justify-end">
            <Button onClick={onComplete} size="lg" className="gradient-primary">
              {completeButtonText}
              <ChevronLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PathwayLayout;
