import { TrendingUp, Calendar, Wallet } from "lucide-react";

const Earnings = () => {
  const stats = [
    {
      value: "₹500",
      label: "Per session",
      sublabel: "Earn up to",
    },
    {
      value: "₹40K+",
      label: "Per month",
      sublabel: "Top earners make",
    },
  ];

  const features = [
    {
      icon: Calendar,
      title: "Flexible hours",
      description: "Choose when you work based on your schedule",
    },
    {
      icon: TrendingUp,
      title: "Work as much as you want",
      description: "More sessions = more earnings",
    },
    {
      icon: Wallet,
      title: "Bi-weekly payments",
      description: "Get paid every two weeks directly to your bank",
    },
  ];

  return (
    <section id="earnings" className="py-24 sm:py-32 relative overflow-hidden" style={{ background: "var(--dark-section-gradient)" }}>
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-display font-bold text-[hsl(210_25%_98%)] mb-5 tracking-tight">
            Earnings & flexibility
          </h2>
          <p className="text-[hsl(215_20%_70%)] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Flexible work that pays well. You decide how much you earn.
          </p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-[hsl(220_25%_14%)] backdrop-blur rounded-3xl p-10 text-center border border-[hsl(220_25%_20%)] group-hover:border-primary/30 transition-colors duration-300">
                <p className="text-sm text-primary font-semibold mb-3 uppercase tracking-wider">{stat.sublabel}</p>
                <p className="text-5xl sm:text-6xl font-display font-extrabold text-primary mb-3 tracking-tight">
                  {stat.value}
                </p>
                <p className="text-[hsl(215_20%_65%)] font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid sm:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/15 mb-5 group-hover:bg-primary/25 transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display font-bold text-lg text-[hsl(210_25%_98%)] mb-3">{feature.title}</h3>
              <p className="text-[hsl(215_20%_60%)] leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Earnings;
