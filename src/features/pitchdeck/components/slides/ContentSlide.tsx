import { CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import type { SlideData } from '@/data/slides';

interface ContentSlideProps {
  slide: SlideData;
}

const ContentSlide = ({ slide }: ContentSlideProps) => {
  return (
    <div className="slide-container">
      <div className="max-w-5xl mx-auto w-full">
        {/* Title */}
        <h2 className="slide-title animate-fade-up">{slide.title}</h2>

        {/* Bullets */}
        {slide.bullets && (
          <ul className="space-y-5 mb-8">
            {slide.bullets.map((bullet, index) => (
              <li
                key={index}
                className="flex items-start gap-4 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="flex-shrink-0 mt-1">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </span>
                <span className="slide-bullet">{bullet}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Highlight box */}
        {slide.highlight && (
          <div
            className="mt-8 p-6 rounded-xl bg-primary/10 border border-primary/20 animate-fade-up"
            style={{ animationDelay: '400ms' }}
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-primary flex-shrink-0" />
              <p className="text-lg md:text-xl font-semibold text-primary">
                {slide.highlight}
              </p>
            </div>
          </div>
        )}

        {/* Bottom note */}
        {slide.bottomNote && (
          <div
            className="mt-8 flex items-center gap-3 text-muted-foreground animate-fade-up"
            style={{ animationDelay: '500ms' }}
          >
            <ArrowRight className="w-5 h-5" />
            <p className="text-lg italic">{slide.bottomNote}</p>
          </div>
        )}

        {/* Metrics */}
        {slide.metrics && (
          <div
            className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 animate-fade-up"
            style={{ animationDelay: '400ms' }}
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

        {/* Closing line */}
        {slide.closingLine && (
          <div
            className="mt-12 pt-8 border-t border-border animate-fade-up"
            style={{ animationDelay: '600ms' }}
          >
            <p className="text-xl md:text-2xl font-semibold text-center gradient-text">
              {slide.closingLine}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentSlide;
