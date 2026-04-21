import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
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
  Calendar,
  Clock,
  Lightbulb,
  Award,
  Compass,
  History,
  CheckSquare
} from "lucide-react";

interface MoodOption {
  emoji: string;
  label: string;
  value: string;
}

interface TopicCard {
  id: string;
  icon: any;
  label: string;
  bgColor: string;
  iconColor: string;
  url?: string;
}

interface MindfulnessCard {
  id: string;
  icon: any;
  label: string;
  subtitle: string;
}

const moodOptions: MoodOption[] = [
  { emoji: "😊", label: "Great", value: "great" },
  { emoji: "🙂", label: "Good", value: "good" },
  { emoji: "😐", label: "Okay", value: "okay" },
  { emoji: "😟", label: "Down", value: "down" },
  { emoji: "😢", label: "Sad", value: "sad" },
];

const topicCards: TopicCard[] = [
  { id: "ocd-tips", icon: Lightbulb, label: "OCD Tips", bgColor: "#FFF4E5", iconColor: "#FFB347", url: "/concerns/ocd/tips" },
  { id: "manage-ocd", icon: Shield, label: "Manage OCD", bgColor: "#EBF4FF", iconColor: "#4F95FF", url: "/concerns/ocd/articles" },
  { id: "self-compassion", icon: Heart, label: "Self Compassion", bgColor: "#FFEBF0", iconColor: "#FF6B9D", url: "/tools/affirmations" },
  { id: "ocd-cycle", icon: RefreshCw, label: "OCD Cycle", bgColor: "#E0F7FA", iconColor: "#00BCD4", url: "/concerns/ocd/myths" },
  { id: "reframing-thoughts", icon: Brain, label: "Reframing Thoughts", bgColor: "#E8F8F5", iconColor: "#34D399", url: "/tools/thought-shifts" },
  { id: "success-stories", icon: Award, label: "Success Stories", bgColor: "#F7FEE7", iconColor: "#84CC16", url: "/concerns/ocd/stories" },
  { id: "meditation", icon: BookOpen, label: "Meditation", bgColor: "#EDE9FE", iconColor: "#8B5CF6", url: "/service/meditation" },
];

const mindfulnessCards: MindfulnessCard[] = [
  { id: "meditate", icon: BookOpen, label: "Meditate", subtitle: "Calm your mind" },
  { id: "sleep", icon: Video, label: "Sleep", subtitle: "Rest better" },
  { id: "relax", icon: FileText, label: "Relax", subtitle: "Unwind deeply" },
  { id: "music", icon: Heart, label: "Music", subtitle: "Soothing sounds" },
];

const selfCareToolCards: TopicCard[] = [
  { id: "vibe-tracker", icon: Sparkles, label: "Vibe Tracker", bgColor: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)", iconColor: "#EC4899", url: "/trackers/mood" },
];

const wellnessGuideCards: TopicCard[] = [
  { id: "health-ocd", icon: HeartPulse, label: "Health OCD", bgColor: "#FFEBEE", iconColor: "#EF5350" },
  { id: "hoarding-ocd", icon: FolderTree, label: "Hoarding OCD", bgColor: "#FFF3E0", iconColor: "#FF9800" },
  { id: "trichotillomania", icon: Sparkles, label: "Trichotillomania", bgColor: "#F3E5F5", iconColor: "#AB47BC" },
  { id: "contamination-ocd", icon: Shield, label: "Contamination OCD", bgColor: "#E8F5E9", iconColor: "#66BB6A" },
  { id: "pure-o-ocd", icon: Brain, label: "Pure O OCD", bgColor: "#E3F2FD", iconColor: "#42A5F5" },
];

export function OCDSelfCare() {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <div className="flex-1 flex flex-col min-w-0">
        <main className="max-w-[1000px] w-full mx-auto px-4 md:px-6 py-4 md:py-8 pt-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-2">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center w-9 h-9 rounded-lg text-[#64748B] hover:text-[#043570] hover:bg-white/80 transition-all"
              >
                <ChevronLeft size={20} strokeWidth={2.5} />
              </button>
              <div className="w-12 h-12 bg-gradient-to-br from-[#3b82f6] to-[#2563eb] rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                <RefreshCw size={24} className="text-white" strokeWidth={2} />
              </div>
              <div>
                <h1 className="text-2xl text-[#0f172b] font-semibold">OCD Self-Care</h1>
                <p className="text-sm text-[#62748e] font-normal mt-0.5">
                  Tools and resources to support your wellness journey
                </p>
              </div>
            </div>
          </motion.div>

          {/* Trackers */}
          <div>
            <h2 className="text-lg font-semibold text-[#0f172b] mb-5">Trackers</h2>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-6 gap-4"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <AnimatePresence mode="popLayout">
                {selfCareToolCards.map((tool) => {
                  const IconComponent = tool.icon;
                  return (
                    <motion.button
                      key={tool.id}
                      variants={item}
                      layout
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        if (tool.url) {
                          if (tool.url.startsWith('/')) {
                            navigate(tool.url);
                          } else {
                            window.location.href = tool.url;
                          }
                        }
                      }}
                      className="rounded-2xl p-5 shadow-sm flex flex-col items-start justify-between h-28"
                      style={{ background: tool.bgColor }}
                    >
                      <IconComponent size={32} className="text-white mb-auto" strokeWidth={2} />
                      <h3 className="text-white font-semibold text-xs text-left leading-tight">{tool.label}</h3>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Tools */}
          <div className="mt-10">
            <h2 className="text-lg font-semibold text-[#0f172b] mb-5">Tools</h2>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <AnimatePresence mode="popLayout">
                {topicCards.map((topic) => {
                  const IconComponent = topic.icon;
                  return (
                    <motion.button
                      key={topic.id}
                      variants={item}
                      layout
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        if (topic.url) {
                          if (topic.url.startsWith('/')) {
                            navigate(topic.url);
                          } else {
                            window.location.href = topic.url;
                          }
                        }
                      }}
                      className="bg-white border border-[#E2E8F0] rounded-2xl py-6 px-2 hover:shadow-md transition-all text-center"
                    >
                      <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto"
                        style={{ backgroundColor: topic.bgColor }}
                      >
                        <IconComponent size={28} style={{ color: topic.iconColor }} strokeWidth={2} />
                      </div>
                      <h3 className="text-[#1E293B] font-medium text-base">{topic.label}</h3>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Wellness Guides */}
          <div className="mt-10">
            <h2 className="text-lg font-semibold text-[#0f172b] mb-5">Wellness Guides</h2>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-5 gap-4"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <AnimatePresence mode="popLayout">
                {wellnessGuideCards.map((guide) => {
                  const IconComponent = guide.icon;
                  return (
                    <motion.button
                      key={guide.id}
                      variants={item}
                      layout
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        if (guide.url) {
                          if (guide.url.startsWith('/')) {
                            navigate(guide.url);
                          } else {
                            window.location.href = guide.url;
                          }
                        }
                      }}
                      className="bg-white border border-[#E2E8F0] rounded-2xl py-6 px-2 hover:shadow-md transition-all text-center"
                    >
                      <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto"
                        style={{ backgroundColor: guide.bgColor }}
                      >
                        <IconComponent size={28} style={{ color: guide.iconColor }} strokeWidth={2} />
                      </div>
                      <h3 className="text-[#1E293B] font-medium text-base">{guide.label}</h3>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
