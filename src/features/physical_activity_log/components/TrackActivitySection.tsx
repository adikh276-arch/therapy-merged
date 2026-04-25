import { useState } from "react";
import { format, parseISO } from "date-fns";
import { CalendarIcon, Pencil, Trash2, ChevronDown, ChevronUp, Sparkles, History } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import { Calendar } from "../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { useActivities, type ViewMode } from "../hooks/useActivities";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from "recharts";

const TrackActivitySection = () => {
  const { t } = useTranslation();
  const {
    groupedByDate, stats, chartData, weeklyTrend,
    addActivity, editActivity, deleteActivity, isLoading
  } = useActivities();

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("daily");
  const [filterDate, setFilterDate] = useState<Date | undefined>();
  const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDuration, setEditDuration] = useState("");

  if (isLoading) {
    return (
      <div className="py-24 text-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-muted-foreground animate-pulse">Loading activities...</p>
      </div>
    );
  }

  const handleAdd = () => {
    if (!activity || !duration || !date) return;
    addActivity(format(date, "yyyy-MM-dd"), activity, parseInt(duration), notes || undefined);
    setActivity("");
    setDuration("");
    setNotes("");
  };

  const toggleDate = (d: string) => {
    setExpandedDates(prev => {
      const next = new Set(prev);
      next.has(d) ? next.delete(d) : next.add(d);
      return next;
    });
  };

  const startEdit = (id: string, name: string, dur: number) => {
    setEditingId(id);
    setEditName(name);
    setEditDuration(String(dur));
  };

  const saveEdit = () => {
    if (editingId && editName && editDuration) {
      editActivity(editingId, { name: editName, duration: parseInt(editDuration) });
      setEditingId(null);
    }
  };

  // Filter grouped entries
  const filteredDates = Object.keys(groupedByDate).filter(dateStr => {
    if (!filterDate) return true;
    const d = parseISO(dateStr);
    if (viewMode === "daily") return dateStr === format(filterDate, "yyyy-MM-dd");
    if (viewMode === "weekly") {
      const start = new Date(filterDate);
      start.setDate(start.getDate() - start.getDay() + 1);
      const end = new Date(start);
      end.setDate(end.getDate() + 6);
      return d >= start && d <= end;
    }
    if (viewMode === "monthly") {
      return d.getMonth() === filterDate.getMonth() && d.getFullYear() === filterDate.getFullYear();
    }
    return true;
  });

  return (
    <div className="w-full space-y-10 pb-12">
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.2em]">
            <Sparkles size={16} />
            {t("progress_summary")}
          </div>
          <h1 className="text-4xl font-black text-slate-900 leading-tight tracking-tight">{t("track_title")}</h1>
          <p className="text-slate-500 text-lg font-bold leading-relaxed max-w-sm">
            {t("track_subtitle")}
          </p>
        </header>

        {/* Entry + Summary Grid */}
        <div className="grid grid-cols-1 gap-8">
          {/* Activity Entry Card */}
          <div className="p-10 bg-white rounded-[3rem] border-2 border-slate-100 shadow-xl shadow-slate-200/40 space-y-8">
            <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Pencil size={24} />
                </div>
                <h3 className="text-2xl font-black text-slate-800">{t("activity_log")}</h3>
            </div>
            
            <div className="space-y-6">
              {/* Date Picker */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t("pick_date")}</label>
                <Popover>
                    <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                        "w-full justify-start text-left font-bold h-14 rounded-2xl border-2 border-slate-50 bg-slate-50 hover:bg-white hover:border-primary/20 transition-all px-6",
                        !date && "text-slate-300"
                        )}
                    >
                        <CalendarIcon className="mr-3 h-5 w-5 text-primary" />
                        {date ? format(date, "PPP") : <span>{t("pick_date")}</span>}
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 rounded-[2rem] border-2 border-slate-100 shadow-2xl" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className="p-6 pointer-events-auto"
                    />
                    </PopoverContent>
                </Popover>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">What did you do?</label>
                    <input
                        type="text"
                        placeholder={t("activity_placeholder")}
                        value={activity}
                        onChange={(e) => setActivity(e.target.value)}
                        className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 px-6 py-4 text-base font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-primary/20 focus:bg-white transition-all"
                    />
                </div>
                <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">For how long? (min)</label>
                    <input
                        type="number"
                        placeholder={t("duration_placeholder")}
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 px-6 py-4 text-base font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-primary/20 focus:bg-white transition-all"
                    />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t("notes_placeholder")}</label>
                <textarea
                    placeholder="Add a thought or feeling..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 px-6 py-4 text-base font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-primary/20 focus:bg-white transition-all resize-none"
                />
              </div>
            </div>

            <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleAdd}
                className="w-full py-5 rounded-[2rem] bg-primary text-primary-foreground font-black text-lg shadow-xl shadow-primary/20 hover:shadow-2xl transition-all"
            >
                {t("save_activity")}
            </motion.button>
          </div>

          {/* Progress Summary Card */}
          <div className="p-10 bg-slate-900 rounded-[3rem] shadow-2xl space-y-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 text-white/5 pointer-events-none">
                <History size={160} strokeWidth={1} />
            </div>
            
            <div className="relative z-10 space-y-2">
                <h3 className="text-2xl font-black text-white">{t("progress_summary")}</h3>
                <p className="text-slate-400 font-bold text-sm">You're doing great!</p>
            </div>

            <div className="relative z-10 grid grid-cols-2 gap-4">
              <StatBox label={t("this_week")} value={`${stats.weekMinutes} min`} />
              <StatBox label={t("this_month")} value={`${stats.monthMinutes} min`} />
              <StatBox label={t("most_frequent")} value={stats.mostFrequent || "—"} />
              <StatBox label={t("longest_session")} value={stats.longestSession > 0 ? `${stats.longestSession} min` : "—"} />
            </div>

            <div className="relative z-10 pt-10 border-t border-white/10 flex justify-between items-center">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t("current_streak")}</span>
                <p className="text-white font-bold text-sm">Consistency is key</p>
              </div>
              <div className="flex items-center gap-4 bg-white/10 px-6 py-4 rounded-3xl border border-white/10">
                <Sparkles size={20} className="text-yellow-400" />
                <span className="text-3xl font-black text-white leading-none">{stats.streak}</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stats.streak === 1 ? t("day") : t("days")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="p-10 bg-white rounded-[3rem] border-2 border-slate-100 shadow-xl shadow-slate-200/40">
            <h4 className="text-xl font-black text-slate-800 mb-8">{t("last_7_days")}</h4>
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                  <XAxis 
                    dataKey="day" 
                    tick={{ fontSize: 11, fill: "#94A3B8", fontWeight: 600 }} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 11, fill: "#94A3B8", fontWeight: 600 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: '#F8FAFC' }}
                    contentStyle={{
                      borderRadius: "20px",
                      border: "none",
                      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                      padding: "12px 16px"
                    }}
                  />
                  <Bar dataKey="minutes" fill="#10B981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="p-10 bg-white rounded-[3rem] border-2 border-slate-100 shadow-xl shadow-slate-200/40">
            <h4 className="text-xl font-black text-slate-800 mb-8">{t("weekly_trend")}</h4>
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                  <XAxis 
                    dataKey="week" 
                    tick={{ fontSize: 11, fill: "#94A3B8", fontWeight: 600 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 11, fill: "#94A3B8", fontWeight: 600 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "20px",
                      border: "none",
                      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                      padding: "12px 16px"
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="minutes" 
                    stroke="#10B981" 
                    strokeWidth={4} 
                    dot={{ r: 6, fill: "#10B981", stroke: "white", strokeWidth: 3 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Activity History */}
        <div className="max-w-2xl mx-auto mt-12">
          <h3 className="text-2xl font-extrabold text-slate-900 mb-4">{t("activity_history")}</h3>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="flex gap-1 rounded-xl bg-muted p-1">
              {(["daily", "weekly", "monthly"] as ViewMode[]).map(mode => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-colors capitalize",
                    viewMode === mode ? "bg-primary text-primary-foreground " : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {t(mode)}
                </button>
              ))}
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-xl text-xs md:text-sm">
                  <CalendarIcon className="mr-2 h-3.5 w-3.5" />
                  {filterDate ? format(filterDate, "PPP") : t("filter_by_date")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filterDate}
                  onSelect={setFilterDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            {filterDate && (
              <Button variant="ghost" size="sm" onClick={() => setFilterDate(undefined)} className="text-xs md:text-sm">
                {t("clear_filter")}
              </Button>
            )}
          </div>

          {/* History cards */}
          <div className="space-y-3">
            {filteredDates.length === 0 && (
              <div className="p-8 bg-slate-50 rounded-[2rem] border-2 border-slate-100 text-center py-8">
                <p className="text-slate-400 font-bold">{t("no_activities")}</p>
              </div>
            )}
            {filteredDates.map(dateStr => {
              const dayActivities = groupedByDate[dateStr];
              const dayTotal = dayActivities.reduce((s, a) => s + a.duration, 0);
              const isExpanded = expandedDates.has(dateStr);

              return (
                <div key={dateStr} className="p-4 bg-white rounded-[1.5rem] border-2 border-slate-50 shadow-sm overflow-hidden mb-3">
                  <button
                    onClick={() => toggleDate(dateStr)}
                    className="w-full flex items-center justify-between py-2"
                  >
                    <span className="text-base font-bold text-slate-800">
                      {format(parseISO(dateStr), "EEEE, MMMM d, yyyy")}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs md:text-sm text-primary font-bold">{dayTotal} min</span>
                      {isExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="mt-3 space-y-2 pt-3 border-t border-border/30">
                      {dayActivities.map(a => (
                        <div key={a.id} className="flex items-center justify-between gap-2">
                          {editingId === a.id ? (
                            <div className="flex-1 flex gap-2 items-center flex-wrap">
                              <input
                                value={editName}
                                onChange={e => setEditName(e.target.value)}
                                className="rounded-lg border border-input bg-background px-2 py-1 text-sm w-24"
                              />
                              <input
                                type="number"
                                value={editDuration}
                                onChange={e => setEditDuration(e.target.value)}
                                className="rounded-lg border border-input bg-background px-2 py-1 text-sm w-20"
                              />
                              <Button size="sm" onClick={saveEdit} className="h-7 text-xs rounded-lg">{t("save")}</Button>
                              <Button size="sm" variant="ghost" onClick={() => setEditingId(null)} className="h-7 text-xs">{t("cancel")}</Button>
                            </div>
                          ) : (
                            <>
                              <span className="text-sm font-bold text-slate-700">
                                {a.name}
                                {a.notes && <span className="text-slate-400 font-medium ml-1">— {a.notes}</span>}
                              </span>
                              <div className="flex items-center gap-1">
                                <span className="text-xs md:text-sm text-muted-foreground mr-1">{a.duration} min</span>
                                <button onClick={() => startEdit(a.id, a.name, a.duration)} className="p-1 rounded hover:bg-accent transition-colors">
                                  <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                                </button>
                                <button onClick={() => deleteActivity(a.id)} className="p-1 rounded hover:bg-destructive/10 transition-colors">
                                  <Trash2 className="h-3.5 w-3.5 text-destructive" />
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                      <div className="pt-2 border-t border-border/30 flex justify-between">
                        <span className="text-xs font-medium text-foreground">{t("daily_total")}</span>
                        <span className="text-sm font-bold text-primary">{dayTotal} {t("minutes")}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
      </div>
    </div>
  );
};

const StatBox = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-[1.5rem] bg-white/5 p-4 text-center border border-white/5 backdrop-blur-sm">
    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] mb-1">{label}</p>
    <p className="text-lg font-black text-white truncate">{value}</p>
  </div>
);

export default TrackActivitySection;
