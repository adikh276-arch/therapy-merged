import { FileText, Phone, GraduationCap, Heart } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: FileText,
      step: "1",
      title: "Apply online",
      description: "Fill out a quick application form",
    },
    {
      icon: Phone,
      step: "2",
      title: "Short call",
      description: "A brief chat with our team",
    },
    {
      icon: GraduationCap,
      step: "3",
      title: "Training",
      description: "Complete your onboarding",
    },
    {
      icon: Heart,
      step: "4",
      title: "Start helping",
      description: "Begin assisting patients",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 sm:py-32 relative overflow-hidden" style={{ background: "var(--section-gradient)" }}>
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-primary/[0.02] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-title mb-5">Our Process</h2>
          <p className="section-subtitle mx-auto">
            Getting started is simple. Here's what to expect.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connection line - desktop */}
          <div className="hidden lg:block absolute top-24 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="feature-card text-center relative z-10 h-full pt-8">
                  {/* Step number */}
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary text-primary-foreground font-display font-bold text-lg flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-300">
                    {step.step}
                  </div>

                  <div className="pt-2">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-highlight mb-5 group-hover:scale-110 transition-transform duration-300">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-display font-bold text-lg mb-3">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
