import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface PricingSectionProps {
  onOpenModal: () => void;
}

const features = [
  'Initial doctor consultation',
  'Personalised care plan',
  'Guided home sessions',
  'Progress monitoring',
  'Doctor supervision',
];

const PricingSection = ({ onOpenModal }: PricingSectionProps) => {
  return (
    <section id="pricing" className="section-padding bg-secondary/30">
      <div className="container-padding max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
            Clear, <span className="gradient-text">honest pricing</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-8 sm:p-12 max-w-lg mx-auto text-center"
        >
          <div className="mb-8">
            <div className="flex items-baseline justify-center gap-1 mb-2">
              <span className="text-2xl font-medium text-muted-foreground">₹</span>
              <span className="text-6xl font-bold text-foreground">999</span>
            </div>
            <p className="text-muted-foreground">per session</p>
          </div>

          <ul className="space-y-4 mb-8 text-left">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-foreground">{feature}</span>
              </li>
            ))}
          </ul>

          <p className="text-sm text-muted-foreground mb-6">
            Final care plan discussed after doctor consultation.
          </p>

          <Button variant="hero" size="lg" onClick={onOpenModal} className="w-full">
            Request a callback
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
