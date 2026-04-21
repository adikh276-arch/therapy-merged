import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface FinalCTASectionProps {
  onOpenModal: () => void;
}

const FinalCTASection = ({ onOpenModal }: FinalCTASectionProps) => {
  return (
    <section className="relative section-padding overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 z-0 bg-secondary/30"
        style={{
          background: 'linear-gradient(135deg, hsl(195 90% 96%), hsl(195 80% 92%), hsl(200 70% 95%))'
        }}
      />

      {/* Decorative elements */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="container-padding max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
            Ready to start your <span className="gradient-text">recovery?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Join patients across Delhi NCR choosing smarter physiotherapy.
          </p>
          <Button variant="hero" size="xl" onClick={onOpenModal}>
            Start your care
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
