import { useState } from "react";
import { ArrowLeft, Plus, Search, Calendar, Clock, Smile, Meh, Frown, Heart, Star, Zap, Coffee, Sun, Moon, Cloud, Edit2, Trash2, Filter, ChevronDown, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";

interface JournalEntry {
  id: string;
  date: Date;
  title: string;
  content: string;
  mood?: string;
  tags?: string[];
  timeOfDay: "morning" | "afternoon" | "evening" | "night";
}

const moodEmojis = {
  great: { icon: Smile, label: "Great", color: "#10B981" },
  good: { icon: Sun, label: "Good", color: "#3B82F6" },
  okay: { icon: Meh, label: "Okay", color: "#F59E0B" },
  sad: { icon: Frown, label: "Sad", color: "#EF4444" },
  anxious: { icon: Cloud, label: "Anxious", color: "#8B5CF6" },
};

const sampleEntries: JournalEntry[] = [
  {
    id: "1",
    date: new Date(2026, 3, 16, 3, 41),
    title: "Your First Thought",
    content: "Start with writing what's on your mind. Journaling is a powerful tool for self-reflection and mental clarity. Take a moment each day to capture your thoughts, feelings, and experiences.",
    mood: "great",
    tags: ["reflection", "morning"],
    timeOfDay: "morning"
  },
  {
    id: "2",
    date: new Date(2026, 3, 15, 14, 30),
    title: "Afternoon Reflections",
    content: "Today was productive. I managed to complete most of my tasks and felt a sense of accomplishment. Taking breaks throughout the day really helped maintain my energy levels.",
    mood: "good",
    tags: ["productivity", "self-care"],
    timeOfDay: "afternoon"
  },
  {
    id: "3",
    date: new Date(2026, 3, 14, 21, 15),
    title: "Evening Thoughts",
    content: "Spent quality time with family tonight. It's important to disconnect from work and be present with loved ones. Grateful for these moments.",
    mood: "great",
    tags: ["gratitude", "family"],
    timeOfDay: "evening"
  },
  {
    id: "4",
    date: new Date(2026, 3, 13, 8, 20),
    title: "Morning Clarity",
    content: "Woke up early today and did some meditation. Starting the day mindfully makes such a difference in how I handle challenges throughout the day.",
    mood: "okay",
    tags: ["meditation", "mindfulness"],
    timeOfDay: "morning"
  },
  {
    id: "5",
    date: new Date(2026, 3, 12, 19, 45),
    title: "Overcoming Challenges",
    content: "Had a difficult day with some unexpected obstacles. But I'm learning that challenges are opportunities for growth. One step at a time.",
    mood: "sad",
    tags: ["growth", "resilience"],
    timeOfDay: "evening"
  }
];

export function Journal() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [entries] = useState<JournalEntry[]>(sampleEntries);

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMood = !selectedMood || entry.mood === selectedMood;
    return matchesSearch && matchesMood;
  });

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
  };

  const getTimeIcon = (timeOfDay: string) => {
    switch (timeOfDay) {
      case "morning": return Sun;
      case "afternoon": return Coffee;
      case "evening": return Cloud;
      case "night": return Moon;
      default: return Clock;
    }
  };

  return (
    <div className="flex h-screen bg-[#FAFBFC] overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="w-full max-w-[1000px] mx-auto px-4 md:px-8 py-6 md:py-8">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => navigate(-1)}
                    className="flex items-center justify-center text-[#64748B] hover:text-[#043570] transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <div className="w-10 h-10 bg-[#F1F5F9] rounded-md flex items-center justify-center flex-shrink-0">
                    <Edit2 size={20} className="text-[#1E293B]" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl text-[#0f172b] font-medium">Journal</h1>
                    <p className="text-sm text-[#62748e] font-normal">
                      Document your thoughts, feelings, and daily experiences
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/journal-new")}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#043570] text-white rounded-xl hover:bg-[#032656] transition-colors shadow-lg shadow-[#043570]/20"
                >
                  <Plus size={18} />
                  <span className="hidden sm:inline font-medium text-sm">New Entry</span>
                </motion.button>
              </div>

              {/* Search and Filter Bar */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={20} />
                  <input
                    type="text"
                    placeholder="Search your journal entries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-[#E2ECF5] rounded-xl text-sm text-[#020817] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#00c0ff] focus:border-transparent"
                  />
                </div>

                {/* Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${
                    showFilters
                      ? "bg-[#043570] text-white border-[#043570]"
                      : "bg-white text-[#64748B] border-[#E2ECF5] hover:border-[#00c0ff]"
                  }`}
                >
                  <Filter size={20} />
                  <span className="font-medium text-sm">Filters</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${showFilters ? "rotate-180" : ""}`}
                  />
                </button>
              </div>

              {/* Mood Filters */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-white border border-[#E2ECF5] rounded-xl p-4 mb-6">
                      <label className="block text-sm font-medium text-[#64748B] mb-3">
                        Filter by mood:
                      </label>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setSelectedMood(null)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            selectedMood === null
                              ? "bg-[#043570] text-white"
                              : "bg-[#f3faff] text-[#64748B] hover:bg-[#E2ECF5]"
                          }`}
                        >
                          All Moods
                        </button>
                        {Object.entries(moodEmojis).map(([key, { icon: Icon, label, color }]) => (
                          <button
                            key={key}
                            onClick={() => setSelectedMood(key)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                              selectedMood === key
                                ? "bg-[#043570] text-white"
                                : "bg-[#f3faff] text-[#64748B] hover:bg-[#E2ECF5]"
                            }`}
                          >
                            <Icon size={16} style={{ color: selectedMood === key ? "white" : color }} />
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Journal Entries */}
            <div className="space-y-3">
              {filteredEntries.length === 0 ? (
                <div className="bg-white rounded-xl border border-[#E2ECF5] p-12 text-center">
                  <div className="w-20 h-20 bg-[#f3faff] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Edit2 size={32} className="text-[#00c0ff]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#020817] mb-2">No entries found</h3>
                  <p className="text-[#64748B] mb-6">
                    {searchQuery || selectedMood
                      ? "Try adjusting your search or filters"
                      : "Start your journaling journey today"}
                  </p>
                  <button
                    onClick={() => navigate("/journal-new")}
                    className="px-6 py-3 bg-[#043570] text-white rounded-xl hover:bg-[#032656] transition-colors font-medium inline-flex items-center gap-2"
                  >
                    <Plus size={20} />
                    Write Your First Entry
                  </button>
                </div>
              ) : (
                filteredEntries.map((entry, index) => {
                  const MoodIcon = entry.mood ? moodEmojis[entry.mood as keyof typeof moodEmojis].icon : Smile;
                  const moodColor = entry.mood ? moodEmojis[entry.mood as keyof typeof moodEmojis].color : "#64748B";
                  const TimeIcon = getTimeIcon(entry.timeOfDay);

                  return (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white rounded-xl border border-[#E2ECF5] hover:border-[#00c0ff] transition-all overflow-hidden group cursor-pointer"
                      onClick={() => navigate(`/journal/${entry.id}`)}
                    >
                      <div className="p-5">
                        {/* Header with Date Badge and Title */}
                        <div className="flex items-start gap-4">
                          {/* Date Badge */}
                          <div className="flex-shrink-0">
                            <div className="bg-[#00c0ff] text-white rounded-lg px-3 py-2 text-center min-w-[56px]">
                              <div className="text-[10px] font-semibold uppercase tracking-wide">
                                {entry.date.toLocaleDateString("en-US", { month: "short" })}
                              </div>
                              <div className="text-2xl font-bold leading-none mt-0.5">
                                {entry.date.getDate()}
                              </div>
                            </div>
                          </div>

                          {/* Title and Meta */}
                          <div className="flex-1 min-w-0">
                            {/* Title and Metadata on Same Line */}
                            <div className="flex items-center justify-between gap-4 mb-2">
                              <h3 className="text-base font-semibold text-[#020817] truncate">
                                {entry.title}
                              </h3>
                              
                              {/* Metadata Row on Right - Hidden on Mobile */}
                              <div className="hidden md:flex items-center gap-3 text-xs text-[#64748B] flex-shrink-0">
                                <span className="flex items-center gap-1">
                                  <Clock size={12} />
                                  {formatTime(entry.date)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar size={12} />
                                  {formatDate(entry.date)}
                                </span>
                                {entry.mood && (
                                  <span className="flex items-center gap-1">
                                    <MoodIcon size={12} style={{ color: moodColor }} />
                                    <span style={{ color: moodColor }}>
                                      {moodEmojis[entry.mood as keyof typeof moodEmojis].label}
                                    </span>
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Content Preview - Single Line */}
                            <p className="text-[#64748B] text-sm leading-relaxed truncate">
                              {entry.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Floating Action Button (Mobile) */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/journal-new")}
              className="md:hidden fixed bottom-20 right-6 w-14 h-14 bg-[#043570] text-white rounded-full shadow-xl shadow-[#043570]/30 flex items-center justify-center z-40"
            >
              <Plus size={24} />
            </motion.button>
          </div>
        </div>

      </div>
    </div>
  );
}
