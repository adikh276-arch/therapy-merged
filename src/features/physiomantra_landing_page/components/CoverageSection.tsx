import { motion } from 'framer-motion';

const areas = [
  'South Delhi',
  'Central Delhi',
  'Gurgaon',
  'Noida',
  'Faridabad',
  'Ghaziabad',
  'Greater Noida',
];

const CoverageSection = () => {
  return (
    <section id="coverage" className="section-padding">
      <div className="container-padding max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
            Starting across <span className="gradient-text">Delhi NCR</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
            We're launching with focused coverage to ensure the highest quality of care.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {areas.map((area, index) => (
            <motion.span
              key={area}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="px-5 py-2.5 rounded-full bg-secondary text-secondary-foreground font-medium text-sm border border-border hover:border-primary/30 transition-all cursor-default"
            >
              {area}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CoverageSection;
