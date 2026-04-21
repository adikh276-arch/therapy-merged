import { motion } from 'framer-motion';
import { Stethoscope, Home, TrendingUp } from 'lucide-react';

const pillars = [
  {
    icon: Stethoscope,
    title: 'Doctor-Led Care',
    description: 'Licensed physiotherapists design and oversee your recovery.',
  },
  {
    icon: Home,
    title: 'Care at Home',
    description: 'Professional guidance delivered to your living space.',
  },
  {
    icon: TrendingUp,
    title: 'Structured Recovery',
    description: 'Clear plans, monitored progress, real outcomes.',
  },
];

const WhyPhysioMantraSection = () => {
  return (
    <section className="section-padding">
      <div className="container-padding max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
            Why <span className="gradient-text">PhysioMantra</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="glass-card p-8 text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
              >
                <pillar.icon className="w-8 h-8 text-primary" />
              </motion.div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {pillar.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyPhysioMantraSection;
