import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const CompletionScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 fade-enter">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center gentle-pulse">
            <Heart className="w-10 h-10 text-accent-foreground" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-heading">Your Letter Has Been Saved</h1>
        </div>

        <p className="text-justified text-foreground/80 leading-relaxed px-2">
          You showed up for yourself today. That matters more than perfection.
          This letter has been saved under today's date. You can revisit it
          anytime.
        </p>

        <div className="space-y-3 pt-2">
          <Button
            onClick={() => navigate("/letters")}
            className="w-full rounded-2xl h-12 text-base"
          >
            View My Letters
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="w-full rounded-2xl h-12 text-base"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompletionScreen;
