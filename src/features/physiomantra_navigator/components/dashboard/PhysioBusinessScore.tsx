import { useBusinessScore } from '@/hooks/useBusinessScore';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { TrendingUp, Users, Activity, Building, ShieldCheck } from 'lucide-react';

const PhysioBusinessScore = () => {
    const score = useBusinessScore();

    return (
        <div className="bg-card border border-border/60 shadow-lg rounded-2xl p-6 w-full max-w-md mx-auto animate-fade-in relative overflow-hidden group hover:border-primary/30 transition-all duration-300">
            {/* Background Decorative Elements */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-all"></div>

            <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                    <h3 className="font-bold text-lg flex items-center gap-2 text-foreground">
                        <Activity className="w-5 h-5 text-primary" />
                        Physio Business Score
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">Real-time practice health metrics</p>
                </div>
                <div className="flex flex-col items-end">
                    <span className={cn(
                        "text-4xl font-black tracking-tighter",
                        score.total >= 80 ? "text-primary" :
                            score.total >= 50 ? "text-blue-500" : "text-muted-foreground"
                    )}>
                        {score.total}
                        <span className="text-lg text-muted-foreground/50 font-medium ml-1">/100</span>
                    </span>
                </div>
            </div>

            <div className="space-y-4 relative z-10">
                <ScoreRow
                    label="Foundation & Trust"
                    value={score.foundation}
                    max={30}
                    icon={ShieldCheck}
                    colorClass="bg-primary"
                />
                <ScoreRow
                    label="Patient Flow"
                    value={score.patientFlow}
                    max={25}
                    icon={TrendingUp}
                    colorClass="bg-blue-500"
                />
                <ScoreRow
                    label="Outreach Activity"
                    value={score.outreach}
                    max={25}
                    icon={Building}
                    colorClass="bg-sky-500"
                />
                <ScoreRow
                    label="Network Contribution"
                    value={score.network}
                    max={20}
                    icon={Users}
                    colorClass="bg-indigo-500"
                />
            </div>
        </div>
    );
};

interface ScoreRowProps {
    label: string;
    value: number;
    max: number;
    icon: any;
    colorClass?: string;
}

const ScoreRow = ({ label, value, max, icon: Icon, colorClass = "bg-primary" }: ScoreRowProps) => {
    const percentage = (value / max) * 100;

    return (
        <div className="group/row">
            <div className="flex justify-between text-xs mb-1.5 align-middle">
                <div className="flex items-center gap-2 text-muted-foreground group-hover/row:text-foreground transition-colors">
                    <Icon className="w-3.5 h-3.5" />
                    <span className="font-medium">{label}</span>
                </div>
                <span className="font-bold text-foreground">
                    {value}<span className="text-muted-foreground/60">/{max}</span>
                </span>
            </div>
            <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden">
                <div
                    className={cn("h-full rounded-full transition-all duration-1000 ease-out", colorClass)}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};

export default PhysioBusinessScore;
