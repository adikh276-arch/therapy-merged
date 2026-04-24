import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, CheckCircle, ChevronRight, ChevronLeft, Headphones, BookOpen, Play, Target, Moon, Briefcase, Music, Circle, Sunrise, Waves, Coffee, Clock, Award, Sparkles, Heart, Wind, BarChart3, MessageCircle, ArrowRight, Star, Check, FileText, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MobileAppModal } from "./MobileAppModal";
import { MobileNav } from "./MobileNav";

export function MindfulnessPage() {
  const navigate = useNavigate();
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());
  const [showMobileAppModal, setShowMobileAppModal] = useState(false);
  const [showTodaysPlan, setShowTodaysPlan] = useState(false);

  const isDark = true; // Mindfulness uses dark theme

  // Mindfulness service data
  const service = {
    name: "Mindfulness",
    description: "Find inner peace with guided meditation sessions and mindfulness practices.",
    longDescription: "Discover the transformative power of meditation. Our guided sessions help reduce stress, improve focus, enhance sleep quality, and promote overall mental wellbeing through ancient practices adapted for modern life.",
    features: [
      "Guided meditation sessions for all levels",
      "Breathing exercises and techniques",
      "Sleep meditation and bedtime stories",
      "Stress relief programs",
      "Mindfulness training courses",
      "Daily meditation reminders"
    ],
    image: "https://images.unsplash.com/photo-1766524791322-8753e582e652?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwcGVhY2VmdWwlMjB6ZW58ZW58MXx8fHwxNzcyNjI5MDc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: "🧘",
    color: "#F59E0B",
    stats: [
      { value: "1000+", label: "Sessions" },
      { value: "92%", label: "Stress Relief" },
      { value: "30K+", label: "Users" }
    ],
    pathways: [
      { title: "Gratitude Meditation Session", type: "Audio", points: "5 Points", icon: "🎧", duration: "8 min", completed: false },
      { title: "Meditation for Inner Peace", type: "Audio", points: "10 Points", icon: "🎧", duration: "12 min", completed: false },
      { title: "Thought Patterns", type: "Exercise", points: "5 Points", icon: "📖", duration: "6 min", completed: false },
      { title: "Emotional Awareness", type: "Exercise", points: "5 Points", icon: "📖", duration: "5 min", completed: false },
      { title: "Nervous System Check", type: "Exercise", points: "5 Points", icon: "📖", duration: "7 min", completed: false },
    ],
    popularCategories: [
      { name: "Meditation", iconKey: "meditate" },
      { name: "Sleep", iconKey: "sleep" },
      { name: "Music", iconKey: "music" },
      { name: "Dailies", iconKey: "dailies" },
      { name: "Soundscapes", iconKey: "soundscapes" },
      { name: "For Work", iconKey: "work" },
    ],
  };

  // Icon mapping for popular categories
  const catIconMap: Record<string, any> = {
    meditate: Circle,
    sleep: Moon,
    music: Music,
    dailies: Sunrise,
    soundscapes: Waves,
    work: Coffee,
  };

  // Map category names to subcategory IDs for navigation
  const categoryToSubcategoryMap: Record<string, string> = {
    "Meditation": "meditation",
    "Sleep": "sleep",
    "Music": "music",
    "Dailies": "focus",
    "Soundscapes": "soundscapes",
    "For Work": "focus",
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <>
      {showMobileAppModal && <MobileAppModal onClose={() => setShowMobileAppModal(false)} />}

      <div className="flex min-h-screen bg-[#0a1628]">
        <MobileNav />
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          <main className="max-w-[1000px] w-full mx-auto px-4 md:px-6 py-4 md:py-10 pt-[72px] md:pt-10">
            {/* Service Header */}
            <motion.div
              className="mb-6 md:mb-8"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <div className="flex items-center gap-2.5 mb-2">
                {/* Back Arrow */}
                <button
                  onClick={() => {
                    if (window.parent !== window) {
                      window.parent.postMessage({ action: 'exit' }, 'https://web.mantracare.com');
                    } else {
                      window.location.href = 'https://web.mantracare.com';
                    }
                  }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors flex-shrink-0 text-white hover:bg-[#1a2744]"
                >
                  <ChevronLeft size={24} />
                </button>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md text-lg flex-shrink-0" style={{ backgroundColor: service.color }}>
                  {service.icon}
                </div>
                <h1 className="text-xl md:text-2xl text-white">{service.name}</h1>
              </div>
              <p className="text-xs md:text-sm leading-relaxed max-w-xl text-slate-300 pl-[54px]">{service.description}</p>
            </motion.div>

            {/* Expert Support Section */}
            <motion.div
              className="mb-[10px]"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="space-y-[10px]">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/care-team")}
                  className="w-full relative overflow-hidden bg-gradient-to-br from-[#1a2744] to-[#0f172a] border-2 border-[#1E293B]/50 rounded-2xl px-5 py-5 flex items-center justify-between shadow-lg hover:shadow-2xl transition-all duration-300 group"
                >
                  {/* Animated gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>

                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-[18px] flex items-center justify-center flex-shrink-0 shadow-md">
                      <MessageCircle className="text-white" size={24} strokeWidth={2} />
                    </div>
                    <div className="text-left">
                      <h4 className="text-base font-semibold text-white">Talk to a Therapist</h4>
                      <p className="text-xs mt-1 text-slate-300 font-medium">Professional Care, Counseling & Therapeutic Support</p>
                    </div>
                  </div>
                  <div className="relative z-10 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-[14px] flex items-center justify-center shadow-sm">
                    <ArrowRight className="text-white group-hover:translate-x-1 transition-transform flex-shrink-0" size={20} strokeWidth={2} />
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/mindfulness-self-care")}
                  className="w-full bg-[#1a2744] border border-[#1E293B]/25 rounded-2xl px-5 py-5 flex items-center justify-between shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-[18px] flex items-center justify-center flex-shrink-0 shadow-md">
                      <Sparkles className="text-white" size={24} strokeWidth={2} />
                    </div>
                    <div className="text-left">
                      <h4 className="text-base font-semibold text-white">Self Care Resources</h4>
                      <p className="text-xs mt-1 text-slate-400">Mindfulness & guided sessions</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-[14px] flex items-center justify-center flex-shrink-0 shadow-sm">
                    <ArrowRight className="text-white group-hover:translate-x-1 transition-transform" size={20} strokeWidth={2} />
                  </div>
                </motion.button>
              </div>
            </motion.div>

            {/* Today's Plan Section */}
            <div className="border bg-[#1a2744] rounded-2xl mb-[10px] shadow-sm overflow-hidden">
              {/* Today's Plan Accordion Button */}
              <motion.button
                onClick={() => setShowTodaysPlan(!showTodaysPlan)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                whileHover={{ scale: 1.005 }}
                whileTap={{ scale: 0.995 }}
                className="w-full p-4 md:p-5 hover:bg-opacity-80 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-sm rounded-[18px] flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Star className="text-white" size={24} strokeWidth={2} />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-base mb-0.5 text-white">
                        Today's Plan
                      </h3>
                      <p className="text-xs md:text-sm text-slate-300">
                        Complete your daily wellness activities
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="text-white flex-shrink-0 group-hover:translate-x-1 transition-transform" size={24} />
                </div>
              </motion.button>

              {/* Today's Plan Content (Collapsible) */}
              {showTodaysPlan && (
              <motion.div 
                className="px-5 md:px-6 pb-5 md:pb-6 pt-2.5"
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.3 }}
              >
              <motion.div 
              className="space-y-4"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {service.pathways.map((pathway, index) => {
                const isCompleted = completedTasks.has(index);
                
                // Map activity types to colors and icon components
                const activityConfig: Record<string, { bgColor: string; iconBg: string; textColor: string; icon: React.ReactNode }> = {
                  'Audio': { 
                    bgColor: '#FEF3C7', 
                    iconBg: 'bg-white/10 backdrop-blur-sm', 
                    textColor: '#F59E0B',
                    icon: <Headphones size={24} className="text-white" strokeWidth={2} />
                  },
                  'Tracker': { 
                    bgColor: '#DBEAFE', 
                    iconBg: 'bg-white/10 backdrop-blur-sm', 
                    textColor: '#3B82F6',
                    icon: <BarChart3 size={24} className="text-white" strokeWidth={2} />
                  },
                  'Assessment': { 
                    bgColor: '#F3E8FF', 
                    iconBg: 'bg-white/10 backdrop-blur-sm', 
                    textColor: '#A855F7',
                      icon: <FileText size={24} className="text-white" strokeWidth={2} />
                  },
                  'Activity': { 
                    bgColor: '#D1FAE5', 
                    iconBg: 'bg-white/10 backdrop-blur-sm', 
                    textColor: '#10B981',
                    icon: <Activity size={24} className="text-white" strokeWidth={2} />
                  },
                  'Exercise': { 
                    bgColor: '#DBEAFE', 
                    iconBg: 'bg-white/10 backdrop-blur-sm', 
                    textColor: '#3B82F6',
                    icon: <BookOpen size={24} className="text-white" strokeWidth={2} />
                  },
                  'Tips': { 
                    bgColor: '#FEF3C7', 
                    iconBg: 'bg-white/10 backdrop-blur-sm', 
                    textColor: '#F59E0B',
                    icon: <Sparkles size={24} className="text-white" strokeWidth={2} />
                  },
                  'Video': { 
                    bgColor: '#FEE2E2', 
                    iconBg: 'bg-white/10 backdrop-blur-sm', 
                    textColor: '#EF4444',
                    icon: <Play size={24} className="text-white" strokeWidth={2} />
                  },
                  'To do': { 
                    bgColor: '#D1FAE5', 
                    iconBg: 'bg-white/10 backdrop-blur-sm', 
                    textColor: '#10B981',
                    icon: <CheckCircle size={24} className="text-white" strokeWidth={2} />
                  },
                };

                const config = activityConfig[pathway.type] || activityConfig['Activity'];

                return (
                  <motion.div
                    key={index}
                    variants={item}
                    whileHover={{ scale: 1.005 }}
                    whileTap={{ scale: 0.995 }}
                    onClick={() => {
                      // If it's an Assessment, show the mobile app modal
                      if (pathway.type === "Assessment") {
                        setShowMobileAppModal(true);
                        return;
                      }
                      setCompletedTasks(prev => {
                        const newSet = new Set(prev);
                        if (newSet.has(index)) {
                          newSet.delete(index);
                        } else {
                          newSet.add(index);
                        }
                        return newSet;
                      });
                    }}
                    className="relative flex items-center gap-3 py-3 transition-all cursor-pointer group"
                  >
                    {/* Checkbox */}
                    <div 
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        isCompleted ? 'bg-[#00c0ff] border-[#00c0ff]' : 'border-white/25'
                      }`}
                    >
                      {isCompleted && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                          <Check className="text-white" size={12} strokeWidth={3} />
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Icon */}
                    <div 
                      className={`w-14 h-14 rounded-[18px] flex items-center justify-center flex-shrink-0 shadow-md ${config.iconBg}`}
                    >
                      {config.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm md:text-base mb-1 font-medium text-white">
                        {pathway.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs flex-wrap">
                        <span 
                          className="px-2 py-0.5 rounded text-xs font-medium"
                          style={{ backgroundColor: config.bgColor, color: config.textColor }}
                        >
                          {pathway.type}
                        </span>
                        {pathway.duration && (
                          <span className="text-slate-400 flex items-center gap-1">
                            <Clock size={12} />
                            {pathway.duration}
                          </span>
                        )}
                        <span className="text-slate-400 flex items-center gap-1 font-medium">
                          <Award size={12} className="text-slate-400" />
                          {pathway.points}
                        </span>
                      </div>
                    </div>

                    {/* Arrow */}
                    <ChevronRight 
                      className="flex-shrink-0 transition-all text-white/20 group-hover:text-[#9CA3AF]" 
                      size={20} 
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
            )}
            </div>

            {/* Popular Categories */}
            {service.popularCategories && (
              <motion.div
                className="mb-5 md:mb-6 mt-6 md:mt-8"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.28 }}
              >
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <h3 className="text-base md:text-lg px-1 text-white">Popular Categories</h3>
                  <button 
                    onClick={() => navigate("/categories")}
                    className="text-xs md:text-sm flex items-center gap-1 px-2 py-1.5 rounded-lg transition-colors text-white/60 hover:text-white hover:bg-white/5"
                  >
                    See All <ChevronRight size={14} />
                  </button>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
                  {service.popularCategories.map((cat, i) => {
                    const Icon = catIconMap[cat.iconKey] ?? Circle;
                    return (
                      <motion.button
                        key={cat.name}
                        onClick={() => navigate(`/subcategory/${categoryToSubcategoryMap[cat.name]}`)}
                        whileHover={{ y: -4, scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.28 + i * 0.06 }}
                        className="bg-[#1A2744] hover:bg-[#1f3060] rounded-2xl py-6 px-3 flex flex-col items-center gap-3 transition-all group"
                      >
                        <Icon size={26} className="text-white group-hover:scale-110 transition-transform duration-200" strokeWidth={1.5} />
                        <span className="text-xs md:text-sm text-center leading-tight text-white">{cat.name}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Quick Tools - REMOVED */}
          </main>
        </div>
      </div>
    </>
  );
}
