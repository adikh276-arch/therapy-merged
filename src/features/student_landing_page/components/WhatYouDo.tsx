import { Home, Activity, Shield, MessageSquare, Info } from "lucide-react";

const WhatYouDo = () => {
  const tasks = [
    {
      icon: Home,
      title: "Visit patients at home",
      description: "Travel to patients' homes in your area to provide support",
    },
    {
      icon: Activity,
      title: "Guide exercises",
      description: "Help patients perform exercises as instructed by physiotherapists",
    },
    {
      icon: Shield,
      title: "Ensure safety",
      description: "Make sure all exercises are done safely and correctly",
    },
    {
      icon: MessageSquare,
      title: "Share updates",
      description: "Report session progress to the supervising physiotherapist",
    },
  ];

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden" style={{ background: "var(--section-gradient)" }}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/[0.03] rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/[0.02] rounded-full blur-3xl" />

      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-title mb-5">What you'll do</h2>
          <p className="section-subtitle mx-auto">
            As a PT Assistant, you'll support patients in their recovery journey at home.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {tasks.map((task, index) => (
            <div key={index} className="feature-card text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-highlight mb-5 group-hover:scale-110 transition-transform duration-300">
                <task.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display font-bold text-lg mb-3">{task.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{task.description}</p>
            </div>
          ))}
        </div>

        {/* Important clarification */}
        <div className="mt-14 max-w-3xl mx-auto">
          <div className="bg-blue-50/80 border border-blue-100 rounded-xl p-5 flex items-start gap-4 shadow-sm">
            <div className="p-2 bg-white rounded-full shrink-0 shadow-sm">
              <Info className="w-5 h-5 text-primary" />
            </div>
            <div className="pt-1">
              <h4 className="font-semibold text-foreground text-sm mb-1 uppercase tracking-wide">Important Note</h4>
              <p className="text-muted-foreground leading-relaxed">
                You won't diagnose or treat independently. You always work under the guidance of licensed physiotherapists.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatYouDo;
