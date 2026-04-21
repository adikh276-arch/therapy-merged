import React from "react";

const SparkleDecoration: React.FC = () => (
  <div className="relative w-full h-32 flex items-center justify-center">
    <div className="absolute animate-float" style={{ animationDelay: "0s" }}>
      <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 text-primary">
        <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="currentColor" />
      </svg>
    </div>
    <div className="absolute top-2 right-16 animate-sparkle" style={{ animationDelay: "0.5s" }}>
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-accent">
        <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="currentColor" />
      </svg>
    </div>
    <div className="absolute bottom-4 left-16 animate-sparkle" style={{ animationDelay: "1s" }}>
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-secondary">
        <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="currentColor" />
      </svg>
    </div>
    <div className="absolute top-6 left-20 animate-sparkle" style={{ animationDelay: "1.5s" }}>
      <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 text-primary/50">
        <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="currentColor" />
      </svg>
    </div>
  </div>
);

export default SparkleDecoration;
