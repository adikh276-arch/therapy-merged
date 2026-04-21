import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface ActivityLayoutProps {
  children: React.ReactNode;
  onBack?: () => void;
  hideBack?: boolean;
}

const ActivityLayout = ({ children, onBack, hideBack }: ActivityLayoutProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      <div className="px-4 pt-4 pb-2 min-h-[40px]">
        {!hideBack && (
          <button
            onClick={onBack || (() => navigate(-1))}
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft size={20} />
            <span className="text-sm font-body">{t('back_btn')}</span>
          </button>
        )}
      </div>
      <div className="flex-1 flex flex-col px-5 pb-8">
        {children}
      </div>
    </div>
  );
};

export default ActivityLayout;
