import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface ScreenShellProps {
  children: ReactNode;
  onBack?: () => void;
  onHistory?: () => void;
  screenKey?: string;
}

const ScreenShell = ({ children, onBack, onHistory, screenKey }: ScreenShellProps) => (
  <div className="min-h-[100dvh] max-w-md mx-auto bg-background flex flex-col w-full">
    {/* Header */}
    <div className="flex items-center justify-between px-4 pt-4 pb-1">
      {onBack ? (
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted active:bg-muted transition-colors text-foreground"
          aria-label={t("go_back")}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
      ) : <div className="w-10" />}
      {onHistory ? (
        <button
          onClick={onHistory}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted active:bg-muted transition-colors text-foreground"
          aria-label={t("view_past_entries")}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/></svg>
        </button>
      ) : <div className="w-10" />}
    </div>

    {/* Content with screen transition */}
    <div key={screenKey} className="flex-1 flex flex-col items-center justify-center px-6 pb-8 pt-4 text-center screen-transition overflow-y-auto">
      {children}
    </div>
  </div>
);

export default ScreenShell;
