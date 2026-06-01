'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation, I18nextProvider } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Pencil, Trash2, Sparkles, History, Loader2, Plus, Dumbbell, Award, Flame, Check, X } from 'lucide-react';
import i18n, { loadLocale } from './i18n';
import { PremiumLayout } from '@/components/shared/PremiumLayout';

interface Activity {
  id: number;
  date: string; // YYYY-MM-DD
  emoji: string;
  name: string;
  duration: number;
  notes?: string;
}

const EMOJI_MAP: Record<string, string> = {
  run: "🏃", walk: "🚶", swim: "🏊", bike: "🚴", yoga: "🧘", hike: "🥾",
  dance: "💃", gym: "🏋️", stretch: "🤸", meditation: "🧘",
};

const QUICK_TAGS = [
  { name: 'Run', emoji: '🏃' },
  { name: 'Walk', emoji: '🚶' },
  { name: 'Yoga', emoji: '🧘' },
  { name: 'Gym', emoji: '🏋️' },
  { name: 'Bike', emoji: '🚴' },
  { name: 'Swim', emoji: '🏊' },
];

function getEmoji(name: string): string {
  return EMOJI_MAP[name.toLowerCase()] || "💪";
}

const toLocalIsoDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

function PhysicalActivityLogInner() {
  const { t } = useTranslation(undefined, { i18n });

  // List states
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form states
  const [dateStr, setDateStr] = useState(toLocalIsoDate(new Date()));
  const [activityName, setActivityName] = useState('');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');

  // Editing state
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editDuration, setEditDuration] = useState('');
  const [editNotes, setEditNotes] = useState('');

  // Filter state
  const [filterDate, setFilterDate] = useState('');

  // Sync lang URL parameter
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang') || 'en';
      loadLocale(lang);
    }
  }, []);

  // Fetch activities from DB
  const fetchActivities = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/physical-activity');
      if (res.ok) {
        const data = await res.json();
        setActivities(data);
      }
    } catch (err) {
      console.error('Failed to load physical activities:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  // Insert activity
  const handleAddActivity = async () => {
    if (!activityName.trim() || !duration || !dateStr) return;

    const payload = {
      date: dateStr,
      emoji: getEmoji(activityName),
      name: activityName,
      duration: parseInt(duration, 10),
      notes: notes,
    };

    try {
      const res = await fetch('/api/physical-activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const newRecord = await res.json();
        setActivities((prev) => [newRecord, ...prev]);
        setActivityName('');
        setDuration('');
        setNotes('');
      }
    } catch (err) {
      console.error('Failed to add physical log:', err);
    }
  };

  // Edit activity
  const handleStartEdit = (a: Activity) => {
    setEditingId(a.id);
    setEditName(a.name);
    setEditDuration(a.duration.toString());
    setEditNotes(a.notes || '');
  };

  const handleSaveEdit = async () => {
    if (!editingId || !editName.trim() || !editDuration) return;

    const payload = {
      id: editingId,
      name: editName,
      emoji: getEmoji(editName),
      duration: parseInt(editDuration, 10),
      notes: editNotes,
    };

    try {
      const res = await fetch('/api/physical-activity', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const updated = await res.json();
        setActivities((prev) =>
          prev.map((a) => (a.id === editingId ? updated : a))
        );
        setEditingId(null);
      }
    } catch (err) {
      console.error('Failed to edit activity log:', err);
    }
  };

  // Delete activity
  const handleDeleteActivity = async (id: number) => {
    try {
      const res = await fetch(`/api/physical-activity?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setActivities((prev) => prev.filter((a) => a.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete physical log:', err);
    }
  };

  // NATIVE MATH AND STATS COMPUTATION
  const stats = useMemo(() => {
    const now = new Date();
    const todayStr = toLocalIsoDate(now);

    // Filter this week (past 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const thisWeek = activities.filter((a) => {
      const d = new Date(a.date);
      return d >= sevenDaysAgo;
    });

    // Filter this month (past 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const thisMonth = activities.filter((a) => {
      const d = new Date(a.date);
      return d >= thirtyDaysAgo;
    });

    const weekMinutes = thisWeek.reduce((sum, a) => sum + a.duration, 0);
    const monthMinutes = thisMonth.reduce((sum, a) => sum + a.duration, 0);

    const freq: Record<string, number> = {};
    activities.forEach((a) => {
      freq[a.name] = (freq[a.name] || 0) + 1;
    });
    const mostFrequent =
      Object.entries(freq).sort((x, y) => y[1] - x[1])[0]?.[0] || '—';

    const longestSession =
      activities.length > 0 ? Math.max(...activities.map((a) => a.duration)) : 0;

    // Consistency streak logic based on active log dates
    let streak = 0;
    const activeDates = new Set(activities.map((a) => a.date));
    let checkDate = new Date();

    // If today has no entry, start checking from yesterday
    if (!activeDates.has(toLocalIsoDate(checkDate))) {
      checkDate.setDate(checkDate.getDate() - 1);
    }

    while (activeDates.has(toLocalIsoDate(checkDate))) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    }

    return { weekMinutes, monthMinutes, mostFrequent, longestSession, streak };
  }, [activities]);

  // Daily Chart Math: last 7 days of daily minutes
  const chartData = useMemo(() => {
    const list = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      const iso = toLocalIsoDate(d);
      const minutes = activities
        .filter((a) => a.date === iso)
        .reduce((sum, a) => sum + a.duration, 0);
      list.push({
        day: d.toLocaleDateString(undefined, { weekday: 'short' }),
        date: iso,
        minutes: minutes,
      });
    }
    return list;
  }, [activities]);

  // Weekly Trend Curve Math: last 4 weeks of weekly sums
  const weeklyTrendData = useMemo(() => {
    const list = [];
    const now = new Date();
    for (let i = 3; i >= 0; i--) {
      const start = new Date();
      start.setDate(now.getDate() - (i * 7 + 6));
      const end = new Date();
      end.setDate(now.getDate() - i * 7);

      const minutes = activities
        .filter((a) => {
          const d = new Date(a.date);
          return d >= start && d <= end;
        })
        .reduce((sum, a) => sum + a.duration, 0);

      list.push({
        weekLabel: `W${4 - i}`,
        minutes: minutes,
      });
    }
    return list;
  }, [activities]);

  // Filtered logs
  const filteredActivities = useMemo(() => {
    if (!filterDate) return activities;
    return activities.filter((a) => a.date === filterDate);
  }, [activities, filterDate]);

  return (
    <PremiumLayout
      title={t('app_title', 'Mental Fitness Log')}
      icon={<Dumbbell className="w-6 h-6 text-primary animate-pulse" />}
    >
      <div className="w-full max-w-4xl mx-auto px-6 py-6 space-y-10 text-left">
        <header className="space-y-3">
          <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.2em]">
            <Sparkles size={14} />
            {t('progress_summary', 'Wellness Tracking')}
          </div>
          <h1 className="text-3.5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
            {t('track_title', 'Physical Activity Journal')}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-bold leading-relaxed max-w-md">
            {t(
              'track_subtitle',
              'Physical movement releases endorphins, reduces anxiety, and keeps your mind clear. Log your sessions to track your consistency.'
            )}
          </p>
        </header>

        {/* LOG AND STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LOG ACTIVITY CARD */}
          <div className="bg-white dark:bg-slate-900 border border-white/60 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/10 dark:shadow-none space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-50 dark:border-slate-850 pb-4">
              <div className="w-11 h-11 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                <Plus size={22} />
              </div>
              <h2 className="text-xl font-black text-slate-800 dark:text-slate-200">
                {t('activity_log', 'Record Exercise')}
              </h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
                  {t('pick_date', 'Select Date')}
                </label>
                <input
                  type="date"
                  value={dateStr}
                  onChange={(e) => setDateStr(e.target.value)}
                  className="w-full py-4.5 rounded-2xl bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 dark:bg-slate-950 border border-white/60 dark:border-slate-800 font-bold px-5 text-slate-700 dark:text-slate-200 focus:border-primary focus:bg-white dark:focus:bg-gradient-to-r from-primary to-sky-400 border-none outline-none transition-all shadow-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
                  {t('what_did_you_do', 'What activity did you do?')}
                </label>
                <input
                  type="text"
                  placeholder={t('activity_placeholder', 'e.g. Morning jog, Vinyasa yoga, swimming...')}
                  value={activityName}
                  onChange={(e) => setActivityName(e.target.value)}
                  className="w-full py-4.5 rounded-2xl bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 dark:bg-slate-950 border border-white/60 dark:border-slate-800 font-bold px-5 text-slate-700 dark:text-slate-200 focus:border-primary focus:bg-white outline-none transition-all shadow-sm"
                />

                <div className="flex flex-wrap gap-2 pt-2">
                  {QUICK_TAGS.map((tag) => (
                    <button
                      key={tag.name}
                      type="button"
                      onClick={() => setActivityName(tag.name)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-100/60 dark:bg-slate-950 hover:bg-primary/10 hover:text-primary transition-all text-xs font-bold text-slate-600 dark:text-slate-350 border border-white/60/10"
                    >
                      {tag.emoji} {t(tag.name, tag.name)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
                  {t('for_how_long_min', 'Duration (in minutes)')}
                </label>
                <input
                  type="number"
                  placeholder={t('duration_placeholder', 'e.g. 30, 45')}
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full py-4.5 rounded-2xl bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 dark:bg-slate-950 border border-white/60 dark:border-slate-800 font-bold px-5 text-slate-700 dark:text-slate-200 focus:border-primary focus:bg-white outline-none transition-all shadow-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
                  {t('notes_placeholder', 'Add thoughts or feeling')}
                </label>
                <textarea
                  placeholder={t('add_a_thought_or_feeling', 'e.g. Felt a bit anxious before starting, but fully focused and calm after.')}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full py-4 rounded-2xl bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 dark:bg-slate-950 border border-white/60 dark:border-slate-800 font-bold px-5 text-slate-700 dark:text-slate-200 focus:border-primary focus:bg-white outline-none transition-all shadow-sm resize-none"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={handleAddActivity}
              className="w-full py-4.5 rounded-2xl bg-primary text-primary-foreground font-black text-base shadow-lg shadow-primary/10 hover:shadow-xl transition-all"
            >
              {t('save_activity', 'Save Log Entry')}
            </motion.button>
          </div>

          {/* STATS OVERVIEW PANEL */}
          <div className="bg-gradient-to-r from-primary to-sky-400 border-none dark:bg-slate-950 rounded-[2.5rem] p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-2xl space-y-8">
            <div className="absolute top-0 right-0 p-12 text-white/5 pointer-events-none">
              <History size={160} strokeWidth={1} />
            </div>

            <div className="relative z-10 space-y-2">
              <span className="flex items-center gap-1.5 text-yellow-400 font-bold text-[10px] uppercase tracking-widest">
                <Award size={14} />
                {t('stat_dashboard', 'PERFORMANCE STATUS')}
              </span>
              <h2 className="text-2.5xl font-black leading-tight text-white">
                {t('progress_summary', 'Wellness Impact')}
              </h2>
              <p className="text-slate-400 font-bold text-xs leading-relaxed">
                {t('you_re_doing_great', 'You are building exceptional consistent habits! Keep moving.')}
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/5 p-4 border border-white/5 backdrop-blur-sm">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  {t('this_week', 'Last 7 Days')}
                </p>
                <p className="text-xl font-black text-white">{stats.weekMinutes} min</p>
              </div>

              <div className="rounded-2xl bg-white/5 p-4 border border-white/5 backdrop-blur-sm">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  {t('this_month', 'Last 30 Days')}
                </p>
                <p className="text-xl font-black text-white">{stats.monthMinutes} min</p>
              </div>

              <div className="rounded-2xl bg-white/5 p-4 border border-white/5 backdrop-blur-sm">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  {t('most_frequent', 'Favorite Exercise')}
                </p>
                <p className="text-xl font-black text-white truncate capitalize">{t(stats.mostFrequent, stats.mostFrequent)}</p>
              </div>

              <div className="rounded-2xl bg-white/5 p-4 border border-white/5 backdrop-blur-sm">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  {t('longest_session', 'Longest Duration')}
                </p>
                <p className="text-xl font-black text-white">
                  {stats.longestSession > 0 ? `${stats.longestSession} min` : '—'}
                </p>
              </div>
            </div>

            <div className="relative z-10 pt-6 border-t border-white/10 flex justify-between items-center">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {t('current_streak', 'Active Streak')}
                </span>
                <p className="text-slate-300 font-bold text-xs">
                  {t('consistency_is_key', 'Consistency builds mental focus')}
                </p>
              </div>

              <div className="flex items-center gap-3 bg-white/10 px-5 py-3 rounded-2xl border border-white/10 shrink-0">
                <Flame size={20} className="text-orange-500 fill-orange-500 animate-pulse" />
                <span className="text-2xl font-black text-white leading-none">{stats.streak}</span>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                  {stats.streak === 1 ? t('day', 'Day') : t('days', 'Days')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CUSTOM Responsive SVG Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* DAILY MINUTES BAR CHART */}
          <div className="bg-white dark:bg-slate-900 border border-white/60 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm">
            <h3 className="text-lg font-black text-slate-800 dark:text-slate-200 mb-6">
              {t('last_7_days', 'Daily Minutes (Past 7 Days)')}
            </h3>

            {/* Custom zero-dependency SVG Bar Chart */}
            <div className="w-full h-[200px]">
              <svg className="w-full h-full" viewBox="0 0 350 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary, #10B981)" stopOpacity="1" />
                    <stop offset="100%" stopColor="var(--color-primary, #10B981)" stopOpacity="0.4" />
                  </linearGradient>
                </defs>

                {/* Y Axis Gridlines */}
                {[0, 1, 2, 3].map((val) => (
                  <line
                    key={val}
                    x1="20"
                    y1={30 + val * 45}
                    x2="330"
                    y2={30 + val * 45}
                    stroke="#F1F5F9"
                    strokeWidth="1.5"
                    className="dark:stroke-slate-800"
                  />
                ))}

                {/* Draw the Bars */}
                {chartData.map((data, index) => {
                  const maxVal = Math.max(...chartData.map((d) => d.minutes), 60);
                  const barHeight = (data.minutes / maxVal) * 130;
                  const x = 35 + index * 42;
                  const y = 165 - barHeight;

                  return (
                    <g key={data.date} className="group">
                      <rect
                        x={x}
                        y={y}
                        width="24"
                        height={Math.max(barHeight, 3)}
                        rx="5"
                        fill="url(#barGrad)"
                        className="transition-all duration-300 hover:opacity-90"
                      />
                      {/* Tooltip on Hover */}
                      <text
                        x={x + 12}
                        y={Math.min(y - 6, 150)}
                        textAnchor="middle"
                        className="text-[9px] font-black fill-slate-800 dark:fill-slate-250 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {data.minutes}m
                      </text>
                      {/* X Labels */}
                      <text
                        x={x + 12}
                        y="185"
                        textAnchor="middle"
                        className="text-[9px] font-black fill-slate-400 dark:fill-slate-500 uppercase tracking-wider"
                      >
                        {data.day}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* WEEKLY TREND LINE CHART */}
          <div className="bg-white dark:bg-slate-900 border border-white/60 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm">
            <h3 className="text-lg font-black text-slate-800 dark:text-slate-200 mb-6">
              {t('weekly_trend', 'Weekly Progress Curve')}
            </h3>

            {/* Custom zero-dependency SVG Line Chart */}
            <div className="w-full h-[200px]">
              <svg className="w-full h-full" viewBox="0 0 350 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary, #10B981)" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="var(--color-primary, #10B981)" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Y Axis Gridlines */}
                {[0, 1, 2, 3].map((val) => (
                  <line
                    key={val}
                    x1="20"
                    y1={30 + val * 45}
                    x2="330"
                    y2={30 + val * 45}
                    stroke="#F1F5F9"
                    strokeWidth="1.5"
                    className="dark:stroke-slate-800"
                  />
                ))}

                {/* Calculate coordinates for line */}
                {(() => {
                  const maxVal = Math.max(...weeklyTrendData.map((d) => d.minutes), 120);
                  const points = weeklyTrendData.map((data, index) => {
                    const x = 50 + index * 85;
                    const y = 165 - (data.minutes / maxVal) * 120;
                    return { x, y, minutes: data.minutes, weekLabel: data.weekLabel };
                  });

                  // Build SVG path string
                  const pathD = points.reduce(
                    (acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`),
                    ''
                  );

                  // Fill area path string
                  const areaD = `${pathD} L ${points[points.length - 1].x} 165 L ${points[0].x} 165 Z`;

                  return (
                    <g>
                      {/* Gradient Fill under Curve */}
                      {pathD && <path d={areaD} fill="url(#lineGrad)" />}

                      {/* The Line */}
                      {pathD && (
                        <path
                          d={pathD}
                          fill="none"
                          stroke="var(--color-primary, #10B981)"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      )}

                      {/* Vertex circles & labels */}
                      {points.map((p) => (
                        <g key={p.weekLabel} className="group">
                          <circle
                            cx={p.x}
                            cy={p.y}
                            r="5"
                            fill="#FFFFFF"
                            stroke="var(--color-primary, #10B981)"
                            strokeWidth="3.5"
                            className="transition-transform duration-300 hover:scale-150 cursor-pointer"
                          />
                          <text
                            x={p.x}
                            y={Math.min(p.y - 10, 150)}
                            textAnchor="middle"
                            className="text-[9px] font-black fill-slate-800 dark:fill-slate-200 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            {p.minutes}m
                          </text>
                          <text
                            x={p.x}
                            y="185"
                            textAnchor="middle"
                            className="text-[9px] font-black fill-slate-400 dark:fill-slate-500 uppercase tracking-widest"
                          >
                            {p.weekLabel}
                          </text>
                        </g>
                      ))}
                    </g>
                  );
                })()}
              </svg>
            </div>
          </div>
        </div>

        {/* LOG HISTORY LIST */}
        <div className="space-y-6 max-w-2xl mx-auto">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {t('activity_history', 'Activity Log History')}
            </h3>

            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                {t('filter_by_date', 'Filter by Date')}
              </span>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="py-2.5 rounded-xl bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 dark:bg-slate-900 border border-white/60 dark:border-slate-800 font-bold px-3 text-xs text-slate-700 dark:text-slate-200 focus:border-primary outline-none transition-all shadow-sm"
              />
              {filterDate && (
                <button
                  onClick={() => setFilterDate('')}
                  className="p-2.5 text-xs font-bold text-primary hover:underline flex items-center gap-1"
                >
                  <X size={14} />
                  {t('clear_filter', 'Clear')}
                </button>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="py-16 text-center flex flex-col items-center justify-center gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-primary opacity-30" />
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
                {t('loading_activities', 'Loading exercises...')}
              </p>
            </div>
          ) : filteredActivities.length === 0 ? (
            <div className="py-12 text-center bg-slate-55/40 dark:bg-slate-900/40 rounded-[2.5rem] border border-dashed border-white/60 dark:border-slate-800">
              <p className="text-slate-400 dark:text-slate-500 font-bold text-xs uppercase tracking-widest px-4">
                {t('no_activities', 'No exercises logged on this date')}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredActivities.map((a) => {
                const isEditing = editingId === a.id;
                return (
                  <motion.div
                    key={a.id}
                    className="p-5.5 bg-white dark:bg-slate-900 rounded-[2rem] border border-white/60 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-primary/10 transition-all"
                  >
                    {isEditing ? (
                      <div className="space-y-4 text-left">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest block">
                              Name
                            </label>
                            <input
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              className="w-full py-2.5 rounded-xl bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 dark:bg-slate-950 border border-white/60 dark:border-slate-800 font-bold px-3 text-xs text-slate-700 dark:text-slate-200"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest block">
                              Duration (min)
                            </label>
                            <input
                              type="number"
                              value={editDuration}
                              onChange={(e) => setEditDuration(e.target.value)}
                              className="w-full py-2.5 rounded-xl bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 dark:bg-slate-955 border border-white/60 dark:border-slate-800 font-bold px-3 text-xs text-slate-700 dark:text-slate-200"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest block">
                            Notes
                          </label>
                          <textarea
                            value={editNotes}
                            onChange={(e) => setEditNotes(e.target.value)}
                            rows={2}
                            className="w-full py-2 rounded-xl bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 dark:bg-slate-950 border border-white/60 dark:border-slate-800 font-bold px-3 text-xs text-slate-700 dark:text-slate-200 resize-none"
                          />
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={handleSaveEdit}
                            className="px-4 py-2 bg-primary text-primary-foreground text-xs font-black rounded-xl flex items-center gap-1.5"
                          >
                            <Check size={14} />
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-350 text-xs font-black rounded-xl"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 dark:bg-slate-950 flex items-center justify-center text-2xl leading-none shrink-0 shadow-inner">
                            {a.emoji}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-base capitalize">
                                {t(a.name, a.name)}
                              </h4>
                              <span className="px-2.5 py-1 text-[9px] font-black bg-primary/10 text-primary rounded-full uppercase tracking-wider">
                                {a.duration} min
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                              {new Date(a.date + 'T00:00:00').toLocaleDateString(undefined, {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </p>
                            {a.notes && (
                              <p className="text-slate-550 dark:text-slate-400 text-sm font-medium leading-relaxed mt-2.5 italic">
                                &quot;{a.notes}&quot;
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleStartEdit(a)}
                            className="p-2 text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-950 rounded-xl transition-all"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() => handleDeleteActivity(a.id)}
                            className="p-2 text-slate-450 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </PremiumLayout>
  );
}

export default function PhysicalActivityLogPage() {
  return (
    <I18nextProvider i18n={i18n}>
      <PhysicalActivityLogInner />
    </I18nextProvider>
  );
}
