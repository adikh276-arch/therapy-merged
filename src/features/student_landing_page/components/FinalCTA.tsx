import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FinalCTAProps {
  onApplyClick: () => void;
}

const FinalCTA = ({ onApplyClick }: FinalCTAProps) => {
  return (
    <section className="py-24 sm:py-32 bg-primary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[hsl(0_0%_100%_/_0.1)] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[hsl(0_0%_100%_/_0.05)] rounded-full blur-3xl" />
      </div>
      
      <div className="section-container text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-display font-extrabold text-primary-foreground mb-5 tracking-tight leading-tight">
          Start earning while helping<br className="hidden sm:block" /> people recover
        </h2>
        <p className="text-primary-foreground/80 text-lg sm:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
          Flexible work. Real experience. Meaningful impact.
        </p>
        <Button
          size="lg"
          className="text-base font-bold px-12 py-7 rounded-xl bg-background text-foreground hover:bg-background/95 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          onClick={onApplyClick}
        >
          Apply Now
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </section>
  );
};

export default FinalCTA;
