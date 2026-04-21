import { HeartPulse, Settings } from 'lucide-react';

interface TopBarProps {
  onSettingsClick: () => void;
}

const TopBar = ({ onSettingsClick }: TopBarProps) => {
  return (
    <header className="flex items-center justify-between px-5 py-4 bg-card sticky top-0 z-30">
      <div className="flex items-center gap-2">
        <HeartPulse size={18} className="text-primary" />
        <span className="font-heading text-[17px] font-bold text-foreground">Recovery</span>
      </div>
      <button onClick={onSettingsClick} className="p-2 -mr-2" aria-label="Settings">
        <Settings size={20} className="text-health-muted" />
      </button>
    </header>
  );
};

export default TopBar;
