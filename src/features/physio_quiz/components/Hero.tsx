import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  onStartQuiz: () => void;
}

export const Hero = ({ onStartQuiz }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden pt-24 md:pt-20">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-light/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-brand-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <span className="trust-badge">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Trusted by 6,000+ organizations worldwide
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-[4rem] lg:text-[4.5rem] font-bold text-foreground mb-6 leading-tight"
          >
            Your Body Is Trying To{" "}
            <span className="text-primary">Tell You Something</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Take a 2-minute body check to understand what's really happening.
            Get personalized insights and connect with expert physiotherapists.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5, type: "spring", stiffness: 200 }}
          >
            <button
              onClick={onStartQuiz}
              className="btn-hero group"
            >
              Start My Body Check
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-8 text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-brand-pale border-2 border-background flex items-center justify-center text-xs font-medium text-brand-dark"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <span className="text-sm">10M+ lives impacted</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <span className="text-sm">Ex-McKinsey Founded</span>
            <div className="h-4 w-px bg-border hidden sm:block" />
            <span className="text-sm hidden sm:block">Licensed Physiotherapists</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
