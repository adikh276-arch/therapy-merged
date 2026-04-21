
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MobileNav } from "./MobileNav";
import { 
  ChevronLeft, 
  MessageCircle, 
  BookOpen, 
  Video, 
  FileText, 
  Heart, 
  Shield, 
  ChevronRight, 
  ChevronDown,
  CloudRain,
  Brain,
  Zap,
  Users,
  Briefcase,
  Moon,
  Baby,
  Flame,
  Frown,
  TrendingUp,
  HeartPulse,
  Sparkles,
  UtensilsCrossed,
  RefreshCw,
  Waves,
  RotateCcw,
  Star,
  FolderTree,
  Mail,
  Smile,
  Wind,
  Compass,
  Play,
  Dumbbell,
  Pen,
  ListChecks,
  Newspaper,
  Lightbulb,
  BookMarked,
  Image,
  ArrowRight,
  Activity,
  Target,
  Pause,
  HelpCircle
} from "lucide-react";

interface TopicCard {
  id: string;
  icon: any;
  label: string;
  bgColor: string;
  iconColor: string;
  url?: string;
}

const topicCards: TopicCard[] = [
  { id: "depression", icon: CloudRain, label: "Depression", bgColor: "#EBF4FF", iconColor: "#4F95FF" },
  { id: "anxiety", icon: Brain, label: "Anxiety", bgColor: "#F3EEFF", iconColor: "#9D6CFF" },
  { id: "stress", icon: Zap, label: "Stress", bgColor: "#FFF4E5", iconColor: "#FFB347" },
  { id: "adolescent", icon: Users, label: "Adolescent", bgColor: "#E8F8F5", iconColor: "#34D399" },
  { id: "relationship", icon: Heart, label: "Relationship", bgColor: "#FFEBF0", iconColor: "#FF6B9D" },
  { id: "workplace", icon: Briefcase, label: "Workplace", bgColor: "#F1F5F9", iconColor: "#64748B" },
  { id: "sleep", icon: Moon, label: "Sleep", bgColor: "#EDE9FE", iconColor: "#8B5CF6" },
  { id: "parenting", icon: Baby, label: "Parenting", bgColor: "#FCE7F3", iconColor: "#EC4899" },
  { id: "anger", icon: Flame, label: "Anger", bgColor: "#FFF0EB", iconColor: "#F97316" },
  { id: "grief", icon: Frown, label: "Grief", bgColor: "#F1F5F9", iconColor: "#475569" },
  { id: "ptsd", icon: Shield, label: "PTSD", bgColor: "#E6FAF5", iconColor: "#14B8A6" },
  { id: "acceptance", icon: TrendingUp, label: "Acceptance", bgColor: "#E0F7FA", iconColor: "#00BCD4" },
  { id: "postpartum", icon: HeartPulse, label: "Postpartum", bgColor: "#F5E6FF", iconColor: "#B794F4" },
  { id: "sexuality", icon: Sparkles, label: "Sexuality", bgColor: "#F0E7FF", iconColor: "#A78BFA" },
  { id: "eating-disorder", icon: UtensilsCrossed, label: "Eating Disorder", bgColor: "#F7FEE7", iconColor: "#84CC16" },
  { id: "ocd", icon: RefreshCw, label: "OCD", bgColor: "#DBEAFE", iconColor: "#3B82F6" },
];

const toolCards: TopicCard[] = [
  { id: "box-breathing", icon: Wind, label: "Box Breathing", bgColor: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)", iconColor: "#00BCD4", url: "/box-breathing" },
  { id: "gratitude-tracker", icon: Star, label: "Gratitude Tracker", bgColor: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)", iconColor: "#F9A825", url: "/gratitude-tracker" },
  { id: "vibe-tracker", icon: Sparkles, label: "Vibe Tracker", bgColor: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)", iconColor: "#EC4899", url: "/vibe-tracker" },
  { id: "care-tracker", icon: Heart, label: "Care Tracker", bgColor: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)", iconColor: "#3B82F6", url: "/care-tracker" },
  { id: "self-care-bingo", icon: ListChecks, label: "Self-Care Bingo", bgColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)", iconColor: "#10B981", url: "/self-care-bingo" },
  { id: "affirmations", icon: Smile, label: "Affirmations", bgColor: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)", iconColor: "#AB47BC", url: "/affirmations" },
];

const topicDetails: Record<string, {
  description: string;
  guidedSeriesUrl?: string;
  exercises: { title: string; icon: any; url?: string }[];
  todos: { title: string; icon: any; url?: string }[];
  resources: { title: string; count: number; icon: any; url?: string }[];
}> = {
  depression: {
    description: "Evidence-based exercises and resources to help you manage depression symptoms and build resilience.",
    exercises: [
      { title: "5-4-3-2-1 Grounding", icon: Compass, url: "/grounding-5-4-3-2-1" },
      { title: "Box Breathing", icon: Wind, url: "/box-breathing" },
      { title: "Affirmations", icon: Smile, url: "/affirmations" },
      { title: "Joyful Activities", icon: Sparkles, url: "/joyful-activities" },
    ],
    todos: [
      { title: "Gratitude Tracker", icon: Star, url: "/gratitude-tracker" },
      { title: "Daily Food Diary", icon: Heart, url: "/daily-gratitude-diary" },
      { title: "Brain Dump & Sort", icon: Brain, url: "/brain-dump-and-sort" },
      { title: "Letter to Self", icon: Mail, url: "/a-letter-to-self" },
    ],
    resources: [
      { title: "Articles", count: 35, icon: Newspaper, url: "/depression-articles" },
      { title: "Tips", count: 25, icon: Lightbulb, url: "/depression-tips" },
      { title: "Stories", count: 18, icon: BookMarked, url: "/depression-stories" },
      { title: "Myths", count: 12, icon: HelpCircle, url: "/depression-myths" },
    ],
  },
  anxiety: {
    description: "Calming techniques and strategies to manage anxiety, reduce worry, and regain a sense of control.",
    exercises: [
      { title: "Box Breathing", icon: Wind, url: "/box-breathing" },
      { title: "4-6-8 Breathing", icon: Play, url: "/breathing-4-6-8" },
      { title: "Grounded Technique", icon: Compass, url: "/grounded-technique" },
      { title: "Diffusion Techniques", icon: Brain, url: "/diffusion-technique" },
    ],
    todos: [
      { title: "Vibe Tracker", icon: TrendingUp, url: "/vibe-tracker" },
      { title: "Brain Dump & Sort", icon: Brain, url: "/brain-dump-and-sort" },
      { title: "Thought Shifts", icon: RefreshCw, url: "/thought-shifts" },
      { title: "Care Tracker", icon: Heart, url: "/care-tracker" },
    ],
    resources: [
      { title: "Articles", count: 30, icon: Newspaper, url: "/anxiety-articles" },
      { title: "Tips", count: 22, icon: Lightbulb, url: "/anxiety-tips" },
      { title: "Stories", count: 15, icon: BookMarked, url: "/anxiety-stories" },
      { title: "Myths", count: 10, icon: HelpCircle, url: "/anxiety-myths" },
    ],
  },
  stress: {
    description: "Practical tools and exercises to manage stress, build coping skills, and restore balance in your life.",
    exercises: [
      { title: "Box Breathing", icon: Wind, url: "/box-breathing" },
      { title: "Doodle Burst", icon: Pen, url: "/doodle-burst" },
      { title: "Grounding", icon: Compass, url: "/grounding-5-4-3-2-1" },
      { title: "Thought Shifts", icon: RefreshCw, url: "/thought-shifts" },
    ],
    todos: [
      { title: "Vibe Tracker", icon: Zap, url: "/vibe-tracker" },
      { title: "Brain Dump & Sort", icon: Brain, url: "/brain-dump-and-sort" },
      { title: "Environment Optimization", icon: Compass, url: "/environment-optimization" },
      { title: "Physical Activity Log", icon: Activity, url: "/physical-activity-log" },
    ],
    resources: [
      { title: "Articles", count: 28, icon: Newspaper, url: "/stress-articles" },
      { title: "Tips", count: 20, icon: Lightbulb, url: "/stress-tips" },
      { title: "Stories", count: 10, icon: BookMarked, url: "/stress-stories" },
      { title: "Myths", count: 6, icon: HelpCircle, url: "/stress-myths" },
    ],
  },
};

// Default detail for any topic not explicitly defined above
const getDefaultDetail = (topicId: string, label: string) => ({
  description: `Resources and tools specifically curated to help you navigate ${label.toLowerCase()} concerns.`,
  exercises: [
    { title: "Box Breathing", icon: Wind, url: "/box-breathing" },
    { title: "Grounding", icon: Compass, url: "/grounding-5-4-3-2-1" },
  ],
  todos: [
    { title: "Brain Dump", icon: Brain, url: "/brain-dump-and-sort" },
    { title: "Vibe Tracker", icon: Zap, url: "/vibe-tracker" },
  ],
  resources: [
    { title: "Articles", count: 12, icon: Newspaper, url: `/${topicId}-articles` },
    { title: "Tips", count: 8, icon: Lightbulb, url: `/${topicId}-tips` },
    { title: "Stories", count: 5, icon: BookMarked, url: `/${topicId}-stories` },
    { title: "Myths", count: 3, icon: HelpCircle, url: `/${topicId}-myths` },
  ],
});

export function SelfCareHub() {
  const router = useRouter();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  const handleLink = (url: string | undefined) => {
    if (!url) return;
    if (url.startsWith('/')) {
        router.push(url);
    } else {
        window.location.href = url;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F9FAFB] font-sans">
      <MobileNav />
      <div className="flex-1 flex flex-col min-w-0">
        <main className="max-w-[1000px] w-full mx-auto px-4 md:px-6 py-4 md:py-8 pt-[72px] md:pt-8 bg-[#F9FAFB]">
          <AnimatePresence mode="wait">
            {selectedTopic ? (() => {
              const topic = topicCards.find(t => t.id === selectedTopic)!;
              const detail = topicDetails[selectedTopic] || getDefaultDetail(topic.id, topic.label);
              return (
                <motion.div
                  key="topic-detail"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <button
                      onClick={() => setSelectedTopic(null)}
                      className="flex items-center gap-2 mb-6 text-[#64748B] hover:text-[#020817] transition-colors group"
                    >
                      <ChevronLeft size={20} strokeWidth={2} className="group-hover:-translate-x-1 transition-transform" />
                      <span className="text-sm font-medium">Back to topics</span>
                    </button>
                    <h1 className="font-bold text-[#020817] mb-2 text-3xl tracking-tight">
                      {topic.label}
                    </h1>
                    <p className="text-base text-[#64748B] leading-relaxed max-w-2xl">
                      {detail.description}
                    </p>
                  </motion.div>

                  {/* Exercises */}
                  <motion.div
                    className="mb-10"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <h2 className="font-semibold text-[#020817] mb-5 text-xl">
                      Exercises
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {detail.exercises.map((ex, i) => {
                        const ExIcon = ex.icon;
                        const colors = [
                          { bg: '#FFF4ED', border: '#FFD8C2', icon: '#F97316' },
                          { bg: '#EFF6FF', border: '#DBEAFE', icon: '#3B82F6' },
                          { bg: '#FCE7F3', border: '#FBCFE8', icon: '#EC4899' },
                          { bg: '#ECFDF5', border: '#D1FAE5', icon: '#10B981' }
                        ];
                        const color = colors[i % colors.length];
                        return (
                          <motion.button
                            key={ex.title}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 + i * 0.05 }}
                            whileHover={{ y: -3, shadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => handleLink(ex.url)}
                            className="w-full rounded-3xl p-5 border shadow-sm transition-all text-left"
                            style={{
                              backgroundColor: color.bg,
                              borderColor: color.border
                            }}
                          >
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-sm" style={{ backgroundColor: color.icon }}>
                              <ExIcon size={22} className="text-white" strokeWidth={2.5} />
                            </div>
                            <p className="text-sm font-bold text-[#020817] leading-tight">
                              {ex.title}
                            </p>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>

                  {/* To Do's */}
                  <motion.div
                    className="mb-10"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="font-semibold text-[#020817] mb-5 text-xl">
                      To Do's
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {detail.todos.map((todo, i) => {
                        const TodoIcon = todo.icon;
                        const colors = [
                          { bg: '#FFFFFF', border: '#E2E8F0', icon: '#6366F1' },
                          { bg: '#FFFFFF', border: '#E2E8F0', icon: '#8B5CF6' },
                          { bg: '#FFFFFF', border: '#E2E8F0', icon: '#14B8A6' },
                          { bg: '#FFFFFF', border: '#E2E8F0', icon: '#F59E0B' }
                        ];
                        const color = colors[i % colors.length];
                        return (
                          <motion.button
                            key={todo.title}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.05 }}
                            whileHover={{ scale: 1.01, borderColor: '#CBD5E1' }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleLink(todo.url)}
                            className="bg-white border rounded-2xl p-5 flex items-center gap-4 shadow-sm transition-all group"
                          >
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-6" style={{ backgroundColor: color.icon + '15' }}>
                              <TodoIcon size={22} style={{ color: color.icon }} strokeWidth={2.5} />
                            </div>
                            <span className="text-base font-semibold text-[#1E293B] flex-1 text-left">
                              {todo.title}
                            </span>
                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                              <ArrowRight size={18} className="text-[#64748B] group-hover:text-indigo-600 transition-transform group-hover:translate-x-0.5" />
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>

                  {/* Resources */}
                  <motion.div
                    className="mb-10"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <h2 className="font-semibold text-[#020817] mb-5 text-xl">
                      Resources
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {detail.resources.map((res, i) => {
                        const ResIcon = res.icon;
                        const palette = [
                            { accent: '#3B82F6', bg: '#F0F7FF' },
                            { accent: '#8B5CF6', bg: '#F5F3FF' },
                            { accent: '#F59E0B', bg: '#FFFBEB' },
                            { accent: '#10B981', bg: '#F0FDF4' }
                        ];
                        const col = palette[i % palette.length];
                        return (
                          <motion.button
                            key={res.title}
                            whileHover={{ x: 5 }}
                            onClick={() => handleLink(res.url)}
                            className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 shadow-sm transition-all text-left"
                          >
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: col.bg }}>
                                <ResIcon size={22} style={{ color: col.accent }} strokeWidth={2.5} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-slate-800 text-sm mb-0.5">{res.title}</h3>
                                <p className="text-xs text-slate-500 font-medium">{res.count} items</p>
                            </div>
                            <ChevronRight size={18} className="text-slate-300" />
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })() : (
              <motion.div
                key="main-list"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex items-center gap-4 mb-3">
                        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-indigo-100 shadow-lg">
                            <Sparkles size={24} className="text-white" strokeWidth={2.5} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-[#0f172b] tracking-tight">Therapy Hub</h1>
                            <p className="text-slate-500 font-medium">Your personalized mental wellness space</p>
                        </div>
                    </div>
                </motion.div>

                {/* Trackers/Main Tools */}
                <div className="mb-12">
                    <h2 className="text-xl font-bold text-[#0f172b] mb-6">Essentials</h2>
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-6 gap-5"
                        variants={container}
                        initial="hidden"
                        animate="show"
                    >
                        {toolCards.map((tool) => {
                            const IconComponent = tool.icon;
                            return (
                                <motion.button
                                    key={tool.id}
                                    variants={item}
                                    whileHover={{ y: -5, shadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleLink(tool.url)}
                                    className="aspect-square rounded-[2rem] p-5 shadow-sm flex flex-col items-start justify-between transition-all"
                                    style={{ background: tool.bgColor }}
                                >
                                    <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                                        <IconComponent size={24} className="text-white" strokeWidth={2.5} />
                                    </div>
                                    <h3 className="text-white font-bold text-xs text-left leading-tight pr-2">{tool.label}</h3>
                                </motion.button>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Categories / Topics */}
                <div>
                   <h2 className="text-xl font-bold text-[#0f172b] mb-6">Explore by Topic</h2>
                   <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4"
                        variants={container}
                        initial="hidden"
                        animate="show"
                    >
                        {topicCards.map((topic) => {
                            const IconComponent = topic.icon;
                            return (
                                <motion.button
                                    key={topic.id}
                                    variants={item}
                                    whileHover={{ scale: 1.02, borderColor: topic.iconColor }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelectedTopic(topic.id)}
                                    className="bg-white border-2 border-slate-50 rounded-[2rem] p-6 hover:shadow-xl hover:shadow-slate-100 transition-all text-center flex flex-col items-center group"
                                >
                                    <div 
                                        className="w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-5 transition-transform group-hover:rotate-3"
                                        style={{ backgroundColor: topic.bgColor }}
                                    >
                                        <IconComponent size={30} style={{ color: topic.iconColor }} strokeWidth={2.5} />
                                    </div>
                                    <h3 className="text-slate-800 font-bold text-base">{topic.label}</h3>
                                </motion.button>
                            );
                        })}
                    </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
