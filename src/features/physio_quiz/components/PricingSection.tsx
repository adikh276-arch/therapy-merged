import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PricingPlan {
  id: string;
  name: string;
  bestFor: string;
  features: string[];
  duration: string;
  price: string;
  savings: string;
  popular?: boolean;
  ctaText: string;
}

const plans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter Relief",
    bestFor: "Recent discomfort or trying physio for the first time",
    features: [
      "3 live physio sessions",
      "Personalized assessment",
      "Custom exercise plan",
      "WhatsApp support",
      "Progress tracking",
    ],
    duration: "3 weeks",
    price: "SGD 299",
    savings: "Save ~40% vs local clinic",
    ctaText: "Get Started",
  },
  {
    id: "recovery",
    name: "Recovery Program",
    bestFor: "Ongoing pain or building long-term body health",
    features: [
      "6 live physio sessions",
      "Comprehensive assessment",
      "Progressive recovery plan",
      "WhatsApp support",
      "Progress tracking",
      "Posture analysis",
      "Lifestyle guidance",
    ],
    duration: "6 weeks",
    price: "SGD 549",
    savings: "Save ~50% vs local clinic",
    popular: true,
    ctaText: "Start Recovery",
  },
  {
    id: "full-reset",
    name: "Full Body Reset",
    bestFor: "Chronic issues or complete body transformation",
    features: [
      "10 live physio sessions",
      "Full body assessment",
      "Comprehensive care plan",
      "Priority WhatsApp support",
      "Detailed progress tracking",
      "Posture & movement analysis",
      "Lifestyle & ergonomic guidance",
      "Follow-up care plan",
    ],
    duration: "10 weeks",
    price: "SGD 899",
    savings: "Save ~55% vs local clinic",
    ctaText: "Complete Reset",
  },
];

interface PricingSectionProps {
  onSelectPlan: (planId: string) => void;
}

export const PricingSection = ({ onSelectPlan }: PricingSectionProps) => {
  return (
    <section id="pricing" className="py-12 md:py-20 bg-gradient-surface">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 bg-brand-pale text-brand-dark rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse mr-2" />
            Assessment Complete
          </div>
          <h2 className="text-display-sm font-bold text-foreground mb-4">
            Unlock your personalised pathway
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose a plan below to access your full assessment results and start your recovery journey with a dedicated physiotherapist.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={cn(
                "pricing-card",
                plan.popular && "popular"
              )}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center px-4 py-1.5 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan header */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Best for: {plan.bestFor}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="text-3xl font-bold text-foreground mb-1">
                  {plan.price}
                </div>
                <p className="text-sm text-brand-secondary font-medium">
                  {plan.savings}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {plan.duration}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => onSelectPlan(plan.id)}
                className={cn(
                  "w-full py-3.5 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2",
                  plan.popular
                    ? "btn-hero"
                    : "bg-secondary text-secondary-foreground hover:bg-brand-pale border border-brand-light/30"
                )}
              >
                {plan.ctaText}
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12 space-y-2"
        >
          <p className="text-sm text-muted-foreground">
            All prices significantly lower than local clinic rates
            (SGD 120-180/session in Singapore, AED 300-450/session in UAE)
          </p>
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-4">
            <span className="flex items-center gap-1">
              <Check className="w-4 h-4 text-primary" />
              Secure payment
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-4 h-4 text-primary" />
              Your information is protected
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
