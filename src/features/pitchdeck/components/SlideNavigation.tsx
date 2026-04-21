import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SlideNavigationProps {
  currentSlide: number;
  totalSlides: number;
  onPrevious: () => void;
  onNext: () => void;
  onGoToSlide: (index: number) => void;
}

const SlideNavigation = ({
  currentSlide,
  totalSlides,
  onPrevious,
  onNext,
  onGoToSlide,
}: SlideNavigationProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Progress dots */}
        <div className="hidden md:flex items-center gap-1.5 flex-1">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => onGoToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-primary w-6'
                  : index < currentSlide
                  ? 'bg-primary/50'
                  : 'bg-muted-foreground/30'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={onPrevious}
            disabled={currentSlide === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="hidden sm:inline text-sm font-medium">Previous</span>
          </button>

          <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg">
            <span className="text-lg font-bold text-primary">{currentSlide + 1}</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">{totalSlides}</span>
          </div>

          <button
            onClick={onNext}
            disabled={currentSlide === totalSlides - 1}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
          >
            <span className="hidden sm:inline text-sm font-medium">Next</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Keyboard hint */}
        <div className="hidden md:flex items-center gap-2 flex-1 justify-end text-xs text-muted-foreground">
          <kbd className="px-2 py-1 bg-muted rounded text-xs">←</kbd>
          <kbd className="px-2 py-1 bg-muted rounded text-xs">→</kbd>
          <span>to navigate</span>
        </div>
      </div>
    </div>
  );
};

export default SlideNavigation;
