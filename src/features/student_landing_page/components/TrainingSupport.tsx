import { BookOpen, Headphones, Award, Gift } from "lucide-react";

const TrainingSupport = () => {
  const benefits = [
    {
      icon: BookOpen,
      title: "Complete training",
      description: "Structured training provided before you start",
    },
    {
      icon: Headphones,
      title: "Step-by-step guidance",
      description: "Clear instructions for every session",
    },
    {
      icon: Award,
      title: "Ongoing support",
      description: "Access to licensed physiotherapists for help",
    },
    {
      icon: Gift,
      title: "Bonuses & rewards",
      description: "Performance bonuses and swag for top performers",
    },
  ];

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-0 w-80 h-80 bg-primary/[0.03] rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-64 h-64 bg-primary/[0.02] rounded-full blur-3xl" />
      
      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-title mb-5">We train you and support you</h2>
          <p className="section-subtitle mx-auto">
            No prior experience needed. We'll teach you everything you need to succeed.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="feature-card group">
              <div className="w-14 h-14 rounded-2xl bg-highlight flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <benefit.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display font-bold text-lg mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainingSupport;
