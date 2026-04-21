import { Check, Clock, ShieldCheck } from "lucide-react";

const WhoCanApply = () => {
  const requirements = [
    "Students or early-career individuals",
    "Physically fit and active",
    "Good communication skills",
    "Based in Delhi NCR",
    "Willing to travel locally for sessions",
    "Available between 9 AM – 7 PM",
  ];

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/[0.03] rounded-full blur-3xl -translate-y-1/2" />
      
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="section-title mb-5">Who this role is for</h2>
            <p className="section-subtitle mb-10">
              We're looking for reliable, active individuals who want flexible work with real impact.
            </p>

            <div className="space-y-5">
              {requirements.map((req, index) => (
                <div key={index} className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-highlight flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform duration-200">
                    <Check className="w-4 h-4 text-primary" strokeWidth={3} />
                  </div>
                  <span className="text-foreground text-lg leading-relaxed">{req}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="feature-card bg-highlight/50 border-primary/20 p-8">
            <div className="flex items-start gap-5">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                <ShieldCheck className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl mb-3 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  Safe working hours
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  All sessions are scheduled during safe daytime hours (9 AM – 7 PM). 
                  Your safety is our priority.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoCanApply;
