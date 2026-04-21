import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Marketing Director",
    location: "Singapore",
    quote: "After 6 months of chronic lower back pain, I was skeptical about online physio. But my therapist's personalized approach and consistent follow-ups made all the difference. I'm pain-free now and back to running.",
    initials: "SC",
  },
  {
    id: 2,
    name: "Ahmad Hassan",
    role: "Software Engineer",
    location: "Dubai, UAE",
    quote: "The flexibility of video sessions fit perfectly into my busy schedule. My physio understood my desk job struggles and gave me exercises I could actually do at work. Two months in and my neck pain is almost gone.",
    initials: "AH",
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Consultant",
    location: "Kuala Lumpur, Malaysia",
    quote: "I've tried local physio clinics before but never stuck with it due to the time commitment. PhysioMantra made it so convenient, and my therapist held me accountable. My posture has improved dramatically.",
    initials: "PS",
  },
  {
    id: 4,
    name: "James Tan",
    role: "Financial Analyst",
    location: "Singapore",
    quote: "As someone who sits 10+ hours daily, my shoulder and upper back were a mess. The personalized stretching routine and regular check-ins from my physio turned things around in just 4 weeks. Highly recommend.",
    initials: "JT",
  },
  {
    id: 5,
    name: "Linda Wong",
    role: "HR Manager",
    location: "Dubai, UAE",
    quote: "I was dealing with sciatica pain for over a year. After just 8 sessions with my PhysioMantra therapist, I have my mobility back and understand how to prevent it from returning. Professional, caring, and effective.",
    initials: "LW",
  },
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-12 md:py-20 bg-gradient-surface">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-display-sm font-bold text-foreground mb-4">
            Trusted by professionals worldwide
          </h2>

          {/* McKinsey badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-card rounded-xl border border-border shadow-sm">
            <span className="text-sm font-semibold text-foreground">Ex-McKinsey Founded</span>
            <span className="text-xs text-muted-foreground">
              Healthcare strategy expertise applied to accessible physiotherapy care
            </span>
          </div>
        </motion.div>

        {/* Testimonial carousel */}
        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-12 w-8 h-8 md:w-10 md:h-10 rounded-full bg-card border border-border shadow-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-all z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-12 w-8 h-8 md:w-10 md:h-10 rounded-full bg-card border border-border shadow-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-all z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          {/* Testimonial card */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="testimonial-card text-center"
          >
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-brand-pale border-4 border-background shadow-lg flex items-center justify-center mx-auto mb-6">
              <span className="text-xl font-bold text-brand-dark">
                {currentTestimonial.initials}
              </span>
            </div>

            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-6 max-w-2xl mx-auto">
              "{currentTestimonial.quote}"
            </blockquote>

            {/* Author info */}
            <div>
              <p className="font-semibold text-foreground">{currentTestimonial.name}</p>
              <p className="text-sm text-muted-foreground">
                {currentTestimonial.role} • {currentTestimonial.location}
              </p>
            </div>
          </motion.div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                  ? "w-8 bg-primary"
                  : "bg-border hover:bg-muted-foreground"
                  }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
