import { Activity, BarChart3, Share2, User, CalendarDays } from 'lucide-react';

export type TabId = 'today' | 'planner' | 'insights' | 'share' | 'profile';

interface Props {
  active: TabId;
  onNavigate: (tab: TabId) => void;
}

const TABS: { id: TabId; label: string; icon: typeof Activity }[] = [
  { id: 'today', label: 'Today', icon: Activity },
  { id: 'planner', label: 'Planner', icon: CalendarDays },
  { id: 'insights', label: 'Insights', icon: BarChart3 },
  { id: 'share', label: 'Share', icon: Share2 },
  { id: 'profile', label: 'Profile', icon: User },
];

export function BottomNav({ active, onNavigate }: Props) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around max-w-lg mx-auto h-16">
        {TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center gap-0.5 px-4 py-1 transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
            >
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
