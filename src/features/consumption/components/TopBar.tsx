import { Cigarette, BarChart2 } from 'lucide-react';

interface TopBarProps {
  onHistoryOpen: () => void;
}

const TopBar = ({ onHistoryOpen }: TopBarProps) => (
  <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-card border-b border-border-light topbar-shadow flex items-center justify-between px-4 max-w-[430px] mx-auto">
    <div className="flex items-center gap-2">
      <Cigarette size={18} className="text-primary" />
      <span className="font-heading text-[17px] font-bold text-foreground">Consumption</span>
    </div>
    <button onClick={onHistoryOpen} className="tap-scale p-1" aria-label="View history">
      <BarChart2 size={20} className="text-primary" />
    </button>
  </header>
);

export default TopBar;
