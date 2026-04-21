import { motion } from "framer-motion";
import { Award, Video, User, Building2, TrendingUp, MessageSquare } from "lucide-react";

const trustCards = [
  {
    icon: Award,
    title: "Healthcare Strategy Expertise",
    description: "Founded by former McKinsey consultant with deep background in healthcare innovation and service delivery",
  },
  {
    icon: Video,
    title: "Licensed Physiotherapists",
    description: "One-on-one video sessions with qualified, experienced physiotherapists via the PhysioMantra app",
  },
  {
    icon: User,
    title: "Personalized Care Plans",
    description: "Your recovery program is tailored to your specific body pattern, lifestyle, and goals—not a generic template",
  },
  {
    icon: Building2,
    title: "Trusted by 6,000+ Organizations",
    description: "Partnered with leading companies worldwide to deliver expert care to their teams",
  },
  {
    icon: TrendingUp,
    title: "Progress Monitoring",
    description: "Your physiotherapist tracks your improvement and adjusts your plan as you recover",
  },
  {
    icon: MessageSquare,
    title: "Ongoing Support",
    description: "Regular check-ins and WhatsApp access to your physiotherapist throughout your journey",
  },
];

export const TrustSection = () => {
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-display-sm font-bold text-foreground mb-4">
            Why Choose PhysioMantra?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert physiotherapy care, made accessible through technology
          </p>
        </motion.div>

        {/* Trust cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {trustCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card-elevated hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <card.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {card.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Impact statement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex flex-col items-center p-8 rounded-2xl bg-gradient-to-br from-brand-pale to-background border border-primary/10">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-bold text-primary mb-2"
            >
              10,000,000+
            </motion.span>
            <p className="text-muted-foreground">
              Lives impacted across our wellness and healthcare services
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
