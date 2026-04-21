import { Flame, Clock } from 'lucide-react';

interface TopBarProps {
  onOpenHistory: () => void;
}

const TopBar = ({ onOpenHistory }: TopBarProps) => {
  return (
    <div className="flex items-center justify-between px-6 py-5">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
          <Flame size={20} className="text-primary" />
        </div>
        <span className="text-xl font-bold text-foreground">Cravings</span>
      </div>
      <button
        onClick={onOpenHistory}
        className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:bg-accent transition-colors"
      >
        <Clock size={20} />
      </button>
    </div>
  );
};

export default TopBar;
