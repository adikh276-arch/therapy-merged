import { CheckCircle2, ArrowRight, Globe, MapPin } from 'lucide-react';
import type { SlideData } from '@/data/slides';

interface ComparisonSlideProps {
  slide: SlideData;
}

const ComparisonSlide = ({ slide }: ComparisonSlideProps) => {
  if (!slide.comparison) return null;

  return (
    <div className="slide-container">
      <div className="max-w-6xl mx-auto w-full">
        {/* Title */}
        <h2 className="slide-title animate-fade-up text-center mb-12">{slide.title}</h2>

        {/* Comparison cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* US Card */}
          <div
            className="slide-card market-us animate-fade-up"
            style={{ animationDelay: '100ms' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-market-us/10 flex items-center justify-center">
                <Globe className="w-6 h-6 text-market-us" />
              </div>
              <h3 className="text-2xl font-bold text-market-us">
                {slide.comparison.left.title}
              </h3>
            </div>
            <ul className="space-y-4">
              {slide.comparison.left.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-market-us flex-shrink-0 mt-0.5" />
                  <span className="slide-bullet">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* India Card */}
          <div
            className="slide-card market-india animate-fade-up"
            style={{ animationDelay: '200ms' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-market-india/10 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-market-india" />
              </div>
              <h3 className="text-2xl font-bold text-market-india">
                {slide.comparison.right.title}
              </h3>
            </div>
            <ul className="space-y-4">
              {slide.comparison.right.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-market-india flex-shrink-0 mt-0.5" />
                  <span className="slide-bullet">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom note */}
        {slide.bottomNote && (
          <div
            className="mt-10 flex items-center justify-center gap-3 animate-fade-up"
            style={{ animationDelay: '300ms' }}
          >
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            <div className="flex items-center gap-2 px-6 py-3 bg-accent/10 rounded-full">
              <ArrowRight className="w-5 h-5 text-accent" />
              <p className="text-lg font-semibold text-accent-foreground">
                {slide.bottomNote}
              </p>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonSlide;
