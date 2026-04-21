import { useAchievements } from '@/hooks/useAchievements';
import { useDarkMode } from '@/hooks/useDarkMode';
import { Switch } from '@/components/ui/switch';
import { DUMMY_INSIGHTS } from '@/lib/dummy-data';

export function ProfileTab() {
  const { isDark, toggle } = useDarkMode();
  const { unlocked, locked } = useAchievements();

  return (
    <div className="space-y-6 pb-24">
      {/* ... (existing header and stats same as before) ... */}
      <div>
        <h2 className="text-xl font-semibold text-foreground">Profile</h2>
        <p className="text-sm text-muted-foreground">Settings & achievements</p>
      </div>

      {/* Quick stats (keeping same) */}
      <div className="bg-card border border-border/50 rounded-xl p-4 space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Your Energy Profile</h3>
        <div className="grid grid-cols-2 gap-3 text-center">
          <div>
            <p className="font-mono font-bold text-2xl text-primary">{DUMMY_INSIGHTS.avgDailyEnergy}</p>
            <p className="text-xs text-muted-foreground">Avg daily energy</p>
          </div>
          <div>
            <p className="font-mono font-bold text-2xl text-foreground">{DUMMY_INSIGHTS.capacityPercent}%</p>
            <p className="text-xs text-muted-foreground">Of normal capacity</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          Chronic illness range: 40–80 units/day
        </p>
      </div>

      {/* Settings */}
      <div className="bg-card border border-border/50 rounded-xl p-4 space-y-4">
        <h3 className="text-sm font-semibold text-foreground">Settings</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-foreground">Dark mode</p>
            <p className="text-xs text-muted-foreground">Easier on the eyes</p>
          </div>
          <Switch checked={isDark} onCheckedChange={toggle} />
        </div>
      </div>

      {/* Achievements */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">🏆 Achievements Unlocked ({unlocked.length})</h3>
        {unlocked.length === 0 && (
          <p className="text-sm text-muted-foreground italic">No achievements yet. Keep tracking!</p>
        )}
        {unlocked.map(a => (
          <div key={a.title} className="bg-surplus/5 border border-surplus/20 rounded-xl p-4 flex items-center gap-3">
            <span className="text-2xl">{a.icon}</span>
            <div>
              <p className="text-sm font-semibold text-foreground">{a.title}</p>
              <p className="text-xs text-muted-foreground">{a.description}</p>
            </div>
          </div>
        ))}

        {locked.length > 0 && (
          <div className="opacity-60 grayscale">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 mt-4">Locked</h4>
            {locked.map(a => (
              <div key={a.title} className="bg-card border border-border/50 rounded-xl p-4 flex items-center gap-3 mb-2">
                <span className="text-2xl">{a.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>


      {/* Export */}
      <div className="bg-card border border-border/50 rounded-xl p-4 space-y-2">
        <h3 className="text-sm font-semibold text-foreground">Data</h3>
        <p className="text-xs text-muted-foreground">All data is stored locally on your device.</p>
        <button className="text-sm text-primary font-medium hover:underline">
          Export data as JSON
        </button>
      </div>
    </div>
  );
}
