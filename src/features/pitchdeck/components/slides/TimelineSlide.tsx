import { Clock, Target, TrendingUp } from 'lucide-react';
import type { SlideData } from '@/data/slides';

interface TimelineSlideProps {
  slide: SlideData;
}

const TimelineSlide = ({ slide }: TimelineSlideProps) => {
  const icons = [Clock, Target, TrendingUp];

  return (
    <div className="slide-container">
      <div className="max-w-5xl mx-auto w-full">
        {/* Title */}
        <h2 className="slide-title animate-fade-up">{slide.title}</h2>

        {/* Timeline items */}
        {slide.bullets && (
          <div className="relative mb-10">
            {/* Timeline line */}
            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/20" />

            <div className="space-y-6">
              {slide.bullets.map((bullet, index) => {
                const Icon = icons[index % icons.length];
                return (
                  <div
                    key={index}
                    className="relative flex items-start gap-6 animate-fade-up"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="relative z-10 w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="slide-card flex-1 py-4">
                      <p className="slide-bullet">{bullet}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Metrics */}
        {slide.metrics && (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-up"
            style={{ animationDelay: '400ms' }}
          >
            {slide.metrics.map((metric, index) => (
              <div
                key={index}
                className="slide-card text-center bg-gradient-to-br from-card to-muted/50"
              >
                <p className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {metric.value}
                </p>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Highlight */}
        {slide.highlight && (
          <div
            className="mt-8 p-6 rounded-xl bg-accent/10 border border-accent/20 text-center animate-fade-up"
            style={{ animationDelay: '500ms' }}
          >
            <p className="text-lg md:text-xl font-semibold text-accent-foreground">
              {slide.highlight}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineSlide;
