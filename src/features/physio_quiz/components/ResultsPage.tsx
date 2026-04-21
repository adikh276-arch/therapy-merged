import { motion } from "framer-motion";
import { ArrowRight, AlertTriangle, Lightbulb, TrendingUp } from "lucide-react";
import type { BodyPattern } from "@/lib/patternCalculator";
import MantraLogo from "@/assets/mantra-logo.svg";

interface ResultsPageProps {
  pattern: BodyPattern;
  onContinue: () => void;
}

export const ResultsPage = ({ pattern, onContinue }: ResultsPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
        <div className="section-container py-4 flex justify-center">
          <img src={MantraLogo} alt="PhysioMantra" className="h-8" />
        </div>
      </header>
      
      <main className="section-container py-12">
        <div className="max-w-3xl mx-auto">
          {/* Pattern reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="text-center mb-12"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-pale text-brand-dark rounded-full text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Your Body Pattern
            </motion.div>
            
            {/* Pattern name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-display font-bold text-foreground mb-4"
            >
              {pattern.name}
            </motion.h1>
            
            {/* Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="w-20 h-20 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-8"
            >
              <TrendingUp className="w-10 h-10 text-primary" />
            </motion.div>
          </motion.div>
          
          {/* What's happening */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card-elevated mb-6"
          >
            <h2 className="text-lg font-semibold text-foreground mb-4">
              What's happening
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {pattern.description}
            </p>
          </motion.div>
          
          {/* Why this happens */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="card-elevated mb-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-secondary/20 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-brand-secondary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Why you're feeling this way
                </h2>
                <ul className="space-y-3">
                  {pattern.whyHappening.map((reason, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-start gap-3 text-muted-foreground"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary mt-2 flex-shrink-0" />
                      {reason}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
          
          {/* Risk section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
            className="card-elevated mb-6 border border-amber-200/50 bg-amber-50/30"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  If left unaddressed
                </h2>
                <ul className="space-y-3">
                  {pattern.risks.map((risk, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + index * 0.1 }}
                      className="flex items-start gap-3 text-muted-foreground"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                      {risk}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
          
          {/* Immediate tip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="card-elevated mb-8 bg-gradient-to-br from-brand-pale to-background border border-primary/10"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <span className="text-xs font-medium text-primary uppercase tracking-wide">
                  One thing you can try today
                </span>
                <h3 className="text-lg font-semibold text-foreground mt-1 mb-2">
                  {pattern.tip}
                </h3>
                <p className="text-muted-foreground">
                  {pattern.tipDescription}
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Transition statement */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="text-center"
          >
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Quick tips help temporarily, but structured physiotherapy 
              addresses the root causes and prevents recurrence.
            </p>
            
            <motion.button
              onClick={onContinue}
              className="btn-hero group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              See Your Recovery Options
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};
