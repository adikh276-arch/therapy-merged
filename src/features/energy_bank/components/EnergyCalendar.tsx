import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function EnergyCalendar() {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    // Dummy logic for calendar generation
    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

    const prevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    // Dummy predictive logic (as per requirements)
    const getDayStatus = (day: number) => {
        // Hardcoded patterns for demo
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const dayOfWeek = date.getDay();

        // "Mondays are always medium energy"
        if (dayOfWeek === 1) return { status: 'medium', label: 'Medium' };

        // "You crash every 6-7 days" (e.g. Saturdays)
        if (dayOfWeek === 6) return { status: 'recovery', label: 'Crash Risk' };

        // "You recover best on Wednesdays"
        if (dayOfWeek === 3) return { status: 'high', label: 'High' };

        return { status: 'medium', label: 'Medium' };
    };

    return (
        <Card className="border-border/50 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Energy Forecast</CardTitle>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={prevMonth}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-xs font-semibold w-24 text-center">
                        {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={nextMonth}>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {WEEKDAYS.map(d => (
                        <div key={d} className="text-[10px] text-muted-foreground font-medium uppercase">{d}</div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {blanks.map(i => (
                        <div key={`blank-${i}`} className="aspect-square" />
                    ))}
                    {days.map(day => {
                        const { status } = getDayStatus(day);
                        const isToday = day === new Date().getDate() && currentMonth.getMonth() === new Date().getMonth();

                        let bgClass = 'bg-card hover:bg-muted';
                        if (status === 'high') bgClass = 'bg-surplus/20 text-surplus hover:bg-surplus/30';
                        if (status === 'medium') bgClass = 'bg-energy-medium/20 text-energy-medium hover:bg-energy-medium/30';
                        if (status === 'recovery') bgClass = 'bg-debt/10 text-debt border border-debt/20';

                        return (
                            <button
                                key={day}
                                className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs relative transition-colors ${bgClass} ${isToday ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                            >
                                <span className="font-semibold">{day}</span>
                                {status === 'recovery' && <span className="text-[8px] leading-none mt-0.5">⚠️</span>}
                            </button>
                        );
                    })}
                </div>
                <div className="mt-4 flex gap-2 justify-center">
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <div className="w-2 h-2 rounded-full bg-surplus/50" /> High
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <div className="w-2 h-2 rounded-full bg-energy-medium/50" /> Medium
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <div className="w-2 h-2 rounded-full bg-debt/50" /> Crash Risk
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
