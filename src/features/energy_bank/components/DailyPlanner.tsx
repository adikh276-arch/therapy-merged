import { useEnergyStore } from '@/hooks/useEnergyStore';
import { ActivityPicker } from './ActivityPicker';
import { DEFAULT_ACTIVITIES } from '@/lib/activities';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowRight, Trash2, CheckCircle2 } from 'lucide-react';

export function DailyPlanner() {
    const {
        dayRecord,
        planActivity,
        removePlannedActivity,
        completePlannedActivity,
        projectedBalance,
        balance
    } = useEnergyStore();

    const plannedItems = dayRecord.plannedActivities || [];

    return (
        <div className="space-y-6 pb-20">
            <div className="bg-card border border-border/50 rounded-2xl p-6">
                <h2 className="text-lg font-semibold mb-1">Energy Budget</h2>
                <div className="flex items-end justify-between mb-4">
                    <div>
                        <div className="text-sm text-muted-foreground">Current</div>
                        <div className={`font-mono text-xl font-bold ${balance < 0 ? 'text-debt' : 'text-primary'}`}>
                            {balance}
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-muted-foreground">Projected</div>
                        <div className={`font-mono text-xl font-bold ${projectedBalance < 0 ? 'text-debt' : 'text-surplus'}`}>
                            {projectedBalance}
                        </div>
                    </div>
                </div>

                {/* Visual Bar */}
                <div className="h-4 bg-muted rounded-full overflow-hidden flex">
                    {/* This is a simplified visual bar. A proper stacked bar chart would be better but this is MVP */}
                    <div
                        className="bg-primary h-full transition-all"
                        style={{ width: `${Math.max(0, Math.min(100, (projectedBalance / 100) * 100))}%` }}
                    />
                    {projectedBalance < 0 && (
                        <div className="bg-debt h-full flex-1" />
                    )}
                </div>
                {projectedBalance < 0 && (
                    <div className="mt-2 text-xs text-debt font-medium flex items-center gap-1">
                        ⚠️ Warning: You are planning to overspend by {Math.abs(projectedBalance)} units.
                    </div>
                )}
            </div>

            <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Planned Activities</h3>

                {plannedItems.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground border-2 border-dashed border-muted rounded-xl">
                        <p>No activities planned yet.</p>
                        <p className="text-xs mt-1">Tap activities below to add them.</p>
                    </div>
                )}

                <div className="space-y-2">
                    {plannedItems.map((item, index) => {
                        const activity = DEFAULT_ACTIVITIES.find(a => a.id === item.activityId);
                        if (!activity) return null;
                        return (
                            <div key={item.id} className="group flex items-center gap-3 bg-card border border-border/50 p-3 rounded-xl">
                                <div className="text-2xl">{activity.emoji}</div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium text-sm truncate">{activity.name}</div>
                                    <div className={`text-xs font-mono ${activity.cost > 0 ? 'text-debt' : 'text-surplus'}`}>
                                        {activity.cost > 0 ? '-' : '+'}{Math.abs(activity.cost)} units
                                    </div>
                                </div>

                                <div className="flex items-center gap-1">
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                        onClick={() => removePlannedActivity(item.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10"
                                        onClick={() => completePlannedActivity(item.id)}
                                    >
                                        <CheckCircle2 className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-border">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Add to Plan</h3>
                <ActivityPicker onSelect={planActivity} />
            </div>
        </div>
    );
}
