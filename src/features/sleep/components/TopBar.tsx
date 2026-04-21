import { Moon, BarChart2 } from 'lucide-react';

interface TopBarProps {
  onHistoryOpen: () => void;
}

const TopBar = ({ onHistoryOpen }: TopBarProps) => {
  return (
    <header className="flex items-center justify-between px-5 py-4">
      <div className="flex items-center gap-2">
        <Moon size={18} className="text-primary" />
        <span className="font-sora text-[17px] font-bold text-foreground">Sleep</span>
      </div>
      <button
        onClick={onHistoryOpen}
        className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
      >
        <BarChart2 size={18} />
        <span className="text-sm font-dm">History</span>
      </button>
    </header>
  );
};

export default TopBar;
