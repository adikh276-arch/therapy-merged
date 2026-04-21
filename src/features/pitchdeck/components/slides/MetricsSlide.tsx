import { CheckCircle2, AlertTriangle, DollarSign } from 'lucide-react';
import type { SlideData } from '@/data/slides';

interface MetricsSlideProps {
  slide: SlideData;
}

const MetricsSlide = ({ slide }: MetricsSlideProps) => {
  return (
    <div className="slide-container">
      <div className="max-w-5xl mx-auto w-full">
        {/* Title */}
        <h2 className="slide-title animate-fade-up">{slide.title}</h2>

        {/* Content cards */}
        {slide.bullets && (
          <div className="grid gap-6 mb-8">
            {slide.bullets.map((bullet, index) => (
              <div
                key={index}
                className="slide-card animate-fade-up flex items-start gap-4"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="slide-bullet">{bullet}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Metrics grid */}
        {slide.metrics && (
          <div
            className="grid grid-cols-2 gap-4 mb-8 animate-fade-up"
            style={{ animationDelay: '300ms' }}
          >
            {slide.metrics.map((metric, index) => (
              <div
                key={index}
                className="slide-card text-center"
              >
                <p className="text-2xl md:text-3xl font-bold text-primary mb-1">
                  {metric.value}
                </p>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Highlight / Rule box */}
        {slide.highlight && (
          <div
            className="p-6 rounded-xl bg-secondary/10 border border-secondary/30 animate-fade-up"
            style={{ animationDelay: '400ms' }}
          >
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-secondary flex-shrink-0" />
              <p className="text-lg md:text-xl font-semibold text-secondary">
                {slide.highlight}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricsSlide;
