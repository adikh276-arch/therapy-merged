import type { SlideData } from '@/data/slides';

interface TitleSlideProps {
  slide: SlideData;
}

const TitleSlide = ({ slide }: TitleSlideProps) => {
  return (
    <div className="slide-container bg-gradient-to-br from-slide-title via-primary to-primary/80 text-primary-foreground flex flex-col items-center justify-center text-center">
      <div className="animate-fade-up">
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full text-sm font-medium tracking-wide">
            GTM STRATEGY 2026
          </span>
        </div>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 font-display">
          {slide.title}
        </h1>
        
        {slide.subtitle && (
          <p className="text-xl md:text-2xl lg:text-3xl font-light opacity-90 max-w-4xl mx-auto mb-12">
            {slide.subtitle}
          </p>
        )}
        
        {slide.footer && (
          <div className="mt-auto pt-12">
            <p className="text-sm md:text-base opacity-70 tracking-widest uppercase">
              {slide.footer}
            </p>
          </div>
        )}
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-secondary via-accent to-secondary opacity-60" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
    </div>
  );
};

export default TitleSlide;
