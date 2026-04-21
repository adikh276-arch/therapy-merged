import { useState } from 'react';
import { DEFAULT_ACTIVITIES, CATEGORY_LABELS, CATEGORY_ORDER } from '@/lib/activities';

interface Props {
  onSelect: (activityId: string) => void;
}

export function ActivityPicker({ onSelect }: Props) {
  const [activeCategory, setActiveCategory] = useState('basic');

  const activities = DEFAULT_ACTIVITIES.filter(a => a.category === activeCategory);

  return (
    <div className="space-y-3">
      {/* Category tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORY_ORDER.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Activity grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {activities.map(activity => {
          const isRecovery = activity.cost < 0;
          return (
            <button
              key={activity.id}
              onClick={() => onSelect(activity.id)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-left transition-all active:scale-95 hover:shadow-md ${
                isRecovery
                  ? 'bg-surplus/5 border-surplus/20 hover:border-surplus/40'
                  : 'bg-card border-border/50 hover:border-primary/30'
              }`}
            >
              <span className="text-lg">{activity.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-foreground truncate">{activity.name}</div>
                <div className={`text-xs font-mono font-semibold ${isRecovery ? 'text-surplus' : 'text-debt'}`}>
                  {isRecovery ? '+' : '−'}{Math.abs(activity.cost)}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
