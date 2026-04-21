import { useState, useEffect, useCallback } from 'react';
import { slides } from '@/data/slides';
import SlideNavigation from './SlideNavigation';
import TitleSlide from './slides/TitleSlide';
import ContentSlide from './slides/ContentSlide';
import ComparisonSlide from './slides/ComparisonSlide';
import TimelineSlide from './slides/TimelineSlide';
import MetricsSlide from './slides/MetricsSlide';
import ChartSlide from './slides/ChartSlide';
import FrameworkSlide from './slides/FrameworkSlide';
import MatrixSlide from './slides/MatrixSlide';

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious]);

  const renderSlide = () => {
    const slide = slides[currentSlide];

    switch (slide.type) {
      case 'title':
        return <TitleSlide slide={slide} />;
      case 'comparison':
        return <ComparisonSlide slide={slide} />;
      case 'timeline':
        return <TimelineSlide slide={slide} />;
      case 'metrics':
        return <MetricsSlide slide={slide} />;
      case 'chart':
        return <ChartSlide slide={slide} />;
      case 'framework':
        return <FrameworkSlide slide={slide} />;
      case 'matrix':
        return <MatrixSlide slide={slide} />;
      case 'content':
      default:
        return <ContentSlide slide={slide} />;
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Slide content with key for re-animation */}
      <div key={currentSlide} className="w-full min-h-screen pb-20">
        {renderSlide()}
      </div>

      {/* Navigation */}
      <SlideNavigation
        currentSlide={currentSlide}
        totalSlides={slides.length}
        onPrevious={goToPrevious}
        onNext={goToNext}
        onGoToSlide={goToSlide}
      />

      {/* Click zones for navigation */}
      <div
        className="fixed top-0 left-0 w-1/4 h-full cursor-pointer z-10"
        onClick={goToPrevious}
        aria-label="Previous slide"
      />
      <div
        className="fixed top-0 right-0 w-1/4 h-full cursor-pointer z-10"
        onClick={goToNext}
        aria-label="Next slide"
      />
    </div>
  );
};

export default Presentation;
