import { ChevronLeft, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface TopBarProps {
  onBack?: () => void;
  showHistory?: boolean;
}

const TopBar = ({ onBack, showHistory }: TopBarProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <button
        onClick={onBack ?? (() => navigate(-1))}
        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary transition-colors"
        aria-label={t("go_back")}
      >
        <ChevronLeft className="w-5 h-5 text-foreground" />
      </button>
      {showHistory && (
        <button
          onClick={() => navigate("../history")}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary transition-colors"
          aria-label={t("past_entries")}
        >
          <Clock className="w-5 h-5 text-foreground" />
        </button>
      )}
      {!showHistory && <div className="w-10" />}
    </div>
  );
};

export default TopBar;
