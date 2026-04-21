import { ArrowRight, X, Check } from 'lucide-react';
import type { SlideData } from '@/data/slides';

interface FrameworkSlideProps {
  slide: SlideData;
}

const FrameworkSlide = ({ slide }: FrameworkSlideProps) => {
  const renderPerceptionReality = () => {
    if (!slide.framework?.perception || !slide.framework?.reality) return null;

    return (
      <div className="grid grid-cols-2 gap-8 animate-fade-up" style={{ animationDelay: '200ms' }}>
        {/* Perception - Wrong */}
        <div className="p-6 rounded-xl bg-destructive/5 border-2 border-destructive/30">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
              <X className="w-5 h-5 text-destructive" />
            </div>
            <h4 className="text-xl font-bold text-destructive">
              {slide.framework.perception.title}
            </h4>
          </div>
          <ul className="space-y-4">
            {slide.framework.perception.items.map((item, i) => (
              <li 
                key={i} 
                className="flex items-start gap-3 animate-fade-up"
                style={{ animationDelay: `${300 + i * 100}ms` }}
              >
                <span className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <X className="w-3 h-3 text-destructive" />
                </span>
                <span className="text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Reality - Correct */}
        <div className="p-6 rounded-xl bg-success/5 border-2 border-success/30">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
              <Check className="w-5 h-5 text-success" />
            </div>
            <h4 className="text-xl font-bold text-success">
              {slide.framework.reality.title}
            </h4>
          </div>
          <ul className="space-y-4">
            {slide.framework.reality.items.map((item, i) => (
              <li 
                key={i} 
                className="flex items-start gap-3 animate-fade-up"
                style={{ animationDelay: `${300 + i * 100}ms` }}
              >
                <span className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-success" />
                </span>
                <span className="text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="slide-container">
      <div className="max-w-5xl mx-auto w-full">
        {/* Title */}
        <h2 className="slide-title animate-fade-up">{slide.title}</h2>

        {/* Framework content */}
        {renderPerceptionReality()}

        {/* Highlight box */}
        {slide.highlight && (
          <div
            className="mt-8 p-6 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 animate-fade-up"
            style={{ animationDelay: '700ms' }}
          >
            <p className="text-lg md:text-xl font-semibold text-center gradient-text">
              {slide.highlight}
            </p>
          </div>
        )}

        {/* Bottom note */}
        {slide.bottomNote && (
          <div
            className="mt-6 flex items-center justify-center gap-3 text-muted-foreground animate-fade-up"
            style={{ animationDelay: '800ms' }}
          >
            <ArrowRight className="w-5 h-5" />
            <p className="text-base italic">{slide.bottomNote}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FrameworkSlide;
