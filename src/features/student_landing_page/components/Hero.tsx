import { ArrowRight, Clock, GraduationCap, IndianRupee, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/logo.svg";
import HeroImage from "@/assets/hero_new.jpg";

interface HeroProps {
  onApplyClick: () => void;
}

const Hero = ({ onApplyClick }: HeroProps) => {
  const badges = [
    { icon: Clock, text: "Flexible work" },
    { icon: GraduationCap, text: "Training provided" },
    { icon: IndianRupee, text: "Up to ₹500/session" },
    { icon: MapPin, text: "Delhi NCR only" },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Soft gradient shapes */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/[0.02] blur-3xl" />

        {/* Subtle wave pattern */}
        <svg className="absolute bottom-0 left-0 w-full h-32 text-secondary/50" preserveAspectRatio="none" viewBox="0 0 1440 120">
          <path
            fill="currentColor"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          />
        </svg>
      </div>

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-screen py-20 lg:py-24">
          {/* Content */}
          <div className="order-2 lg:order-1">
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[3.5rem] font-display font-extrabold text-foreground leading-[1.1] mb-8 animate-fade-in-up stagger-1 tracking-tight">
              Work as a PT Assistant.{" "}
              <span className="text-gradient">Earn flexibly.</span>{" "}
              Learn on the job.
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl lg:text-[1.35rem] text-muted-foreground mb-10 max-w-xl leading-relaxed animate-fade-in-up stagger-2">
              Join PhysioMantra as a Physiotherapy Assistant and help patients recover at home across Delhi NCR.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-3 mb-12 animate-fade-in-up stagger-3">
              {badges.map((badge, index) => (
                <div key={index} className="badge-highlight">
                  <badge.icon className="w-4 h-4" />
                  <span>{badge.text}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up stagger-4">
              <Button
                size="lg"
                className="premium-button text-base font-bold px-10 py-7 rounded-xl shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-300"
                onClick={onApplyClick}
              >
                Apply Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base font-semibold px-10 py-7 rounded-xl border-2 hover:bg-primary/5"
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
              >
                How it works
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="order-1 lg:order-2 animate-slide-in-right stagger-2">
            <div className="relative">
              {/* Glow effect behind image */}
              <div className="absolute inset-4 bg-primary/20 rounded-3xl blur-2xl" />

              {/* Main image container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-foreground/10 border border-border/50 aspect-[4/3] lg:aspect-[4/3.5]">
                <img
                  src={HeroImage}
                  alt="PhysioMantra PT Assistant helping a patient at home"
                  className="w-full h-full object-cover object-top"
                />

                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 via-transparent to-transparent" />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 lg:-left-8 bg-card rounded-2xl p-4 shadow-xl border border-border/80 animate-fade-in-up stagger-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-highlight flex items-center justify-center">
                    <IndianRupee className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Earn up to</p>
                    <p className="text-xl font-display font-bold text-primary">₹40K/month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
