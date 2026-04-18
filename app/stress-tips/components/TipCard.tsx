import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";

interface TipCardProps {
  icon: ReactNode;
  iconClass: string;
  title: string;
  description: string;
  slug: string;
  delay?: number;
}

const TipCard = ({ icon, iconClass, title, description, slug, delay = 0 }: TipCardProps) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/tip/${slug}`)}
      className="wellness-card w-full flex items-center gap-4 text-left"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`pastel-icon ${iconClass}`}>{icon}</div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm text-foreground">{title}</h4>
        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
          {description}
        </p>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
    </button>
  );
};

export default TipCard;
