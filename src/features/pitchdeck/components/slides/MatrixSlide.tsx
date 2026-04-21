import { ArrowRight, Sparkles } from 'lucide-react';
import type { SlideData } from '@/data/slides';

interface MatrixSlideProps {
  slide: SlideData;
}

const MatrixSlide = ({ slide }: MatrixSlideProps) => {
  const renderQuadrantMatrix = () => {
    if (!slide.framework?.quadrants || !slide.framework?.axes) return null;

    return (
      <div className="relative animate-fade-up" style={{ animationDelay: '200ms' }}>
        {/* Axes labels */}
        <div className="mb-4 text-center">
          <p className="text-sm text-muted-foreground">{slide.framework.axes.y}</p>
        </div>

        {/* Matrix grid */}
        <div className="grid grid-cols-2 gap-4 relative">
          {/* Q2 - Top Left */}
          <div className="p-5 rounded-xl bg-muted/30 border border-border hover:border-muted-foreground/50 transition-colors min-h-[140px]">
            <div className="whitespace-pre-line text-sm">
              {slide.framework.quadrants.q2}
            </div>
          </div>

          {/* Q1 - Top Right */}
          <div className="p-5 rounded-xl bg-muted/30 border border-border hover:border-muted-foreground/50 transition-colors min-h-[140px]">
            <div className="whitespace-pre-line text-sm">
              {slide.framework.quadrants.q1}
            </div>
          </div>

          {/* Q3 - Bottom Left */}
          <div className="p-5 rounded-xl bg-muted/30 border border-border hover:border-muted-foreground/50 transition-colors min-h-[140px]">
            <div className="whitespace-pre-line text-sm">
              {slide.framework.quadrants.q3}
            </div>
          </div>

          {/* Q4 - Bottom Right (PhysioMantra - Highlighted) */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary shadow-lg relative min-h-[140px]">
            <div className="absolute -top-3 -right-3">
              <span className="flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                <Sparkles className="w-3 h-3" /> Our Position
              </span>
            </div>
            <div className="whitespace-pre-line text-sm font-medium">
              {slide.framework.quadrants.q4}
            </div>
          </div>
        </div>

        {/* X-axis label */}
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">{slide.framework.axes.x}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="slide-container">
      <div className="max-w-4xl mx-auto w-full">
        {/* Title */}
        <h2 className="slide-title animate-fade-up">{slide.title}</h2>

        {/* Matrix content */}
        {renderQuadrantMatrix()}

        {/* Highlight box */}
        {slide.highlight && (
          <div
            className="mt-8 p-5 rounded-xl bg-primary/10 border border-primary/20 animate-fade-up"
            style={{ animationDelay: '500ms' }}
          >
            <p className="text-lg font-semibold text-primary text-center">
              {slide.highlight}
            </p>
          </div>
        )}

        {/* Bottom note */}
        {slide.bottomNote && (
          <div
            className="mt-6 flex items-center justify-center gap-3 text-muted-foreground animate-fade-up"
            style={{ animationDelay: '600ms' }}
          >
            <ArrowRight className="w-5 h-5" />
            <p className="text-base italic">{slide.bottomNote}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatrixSlide;
