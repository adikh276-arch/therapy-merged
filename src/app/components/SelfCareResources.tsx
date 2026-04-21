import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
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

const mindfulnessCards: MindfulnessCard[] = [
  { id: "meditate", icon: BookOpen, label: "Meditate", subtitle: "Calm your mind" },
  { id: "sleep", icon: Video, label: "Sleep", subtitle: "Rest better" },
  { id: "relax", icon: FileText, label: "Relax", subtitle: "Unwind deeply" },
  { id: "music", icon: Heart, label: "Music", subtitle: "Soothing sounds" },
];

const toolCards: TopicCard[] = [
  { id: "box-breathing", icon: Wind, label: "Box Breathing", bgColor: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)", iconColor: "#00BCD4", url: "https://platform.mantracare.com/box_breathing/?lang=en" },
  { id: "gratitude-tracker", icon: Star, label: "Gratitude Tracker", bgColor: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)", iconColor: "#F9A825", url: "https://web.mantracare.com/app/gratitude_tracker" },
  { id: "loving-kindness-meditation", icon: Heart, label: "Loving-Kindness", bgColor: "linear-gradient(135deg, #f472b6 0%, #ec4899 100%)", iconColor: "#EC407A", url: "https://web.mantracare.com/mindfulness/media/203/1" },
  { id: "affirmations", icon: Smile, label: "Affirmations", bgColor: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)", iconColor: "#AB47BC", url: "https://platform.mantracare.com/affirmations/?lang=en" },
  { id: "mindful-space", icon: Compass, label: "Mindful Space", bgColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)", iconColor: "#66BB6A", url: "https://platform.mantracare.com/joyful_activities/?lang=en" },
  { id: "letter-to-self", icon: Mail, label: "A Letter To Self", bgColor: "linear-gradient(135deg, #fb923c 0%, #f97316 100%)", iconColor: "#FF9800", url: "https://web.mantracare.com/app/letter_to_self" },
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
    guidedSeriesUrl: "https://app.mantracare.com/therapy/depression/depr-guided-series/",
    exercises: [
      { title: "5-4-3-2-1 Grounding", icon: Compass, url: "http://platform.mantracare.com/5-4-3-2-1-grounding" },
      { title: "Guided Imagery", icon: Play, url: "https://web.mantracare.com/mindfulness/media/203/1" },
      { title: "Affirmations", icon: Smile, url: "https://platform.mantracare.com/affirmations/?lang=en" },
      { title: "Joyful Activities", icon: Sparkles, url: "https://platform.mantracare.com/joyful_activities/?lang=en" },
    ],
    todos: [
      { title: "Gratitude Tracker", icon: Star, url: "https://web.mantracare.com/app/gratitude_tracker" },
      { title: "Daily Self Care Tracker", icon: Heart, url: "https://web.mantracare.com/app/daily_self_care_tracker" },
      { title: "Brain Dump & Sort", icon: Brain, url: "http://web.mantracare.com/app/brain_dump_and_sort" },
      { title: "Letter to Self", icon: Mail, url: "https://web.mantracare.com/app/letter_to_self" },
    ],
    resources: [
      { title: "Articles", count: 35, icon: Newspaper, url: "https://platform.mantracare.com/depression_articles/?lang=en" },
      { title: "Tips", count: 25, icon: Lightbulb, url: "https://platform.mantracare.com/depression_tips/?lang=en" },
      { title: "Stories", count: 18, icon: BookMarked, url: "https://platform.mantracare.com/depression_stories/?lang=en" },
      { title: "Myths", count: 12, icon: HelpCircle, url: "https://platform.mantracare.com/depression_myths/?lang=en" },
    ],
  },
  anxiety: {
    description: "Calming techniques and strategies to manage anxiety, reduce worry, and regain a sense of control.",
    guidedSeriesUrl: "https://app.mantracare.com/therapy/anxiety/anx-guided-series/",
    exercises: [
      { title: "Box Breathing", icon: Wind, url: "https://platform.mantracare.com/box_breathing/?lang=en" },
      { title: "4-6-8 Breathing", icon: Play, url: "https://platform.mantracare.com/4_6_8_breathing/" },
      { title: "Grounded Technique", icon: Compass, url: "http://platform.mantracare.com/grounded_technique" },
      { title: "Diffusion Techniques", icon: Brain, url: "https://platform.mantracare.com/diffusion_techniques/" },
    ],
    todos: [
      { title: "Vibe Tracker", icon: TrendingUp, url: "https://web.mantracare.com/app/vibe_tracker" },
      { title: "Brain Dump & Sort", icon: Brain, url: "http://web.mantracare.com/app/brain_dump_and_sort" },
      { title: "Thought Shifts", icon: RefreshCw, url: "https://platform.mantracare.com/thought_shifts" },
      { title: "Daily Self Care Tracker", icon: Heart, url: "https://web.mantracare.com/app/daily_self_care_tracker" },
    ],
    resources: [
      { title: "Articles", count: 30, icon: Newspaper, url: "https://platform.mantracare.com/anxiety_articles/?lang=en" },
      { title: "Tips", count: 22, icon: Lightbulb, url: "https://platform.mantracare.com/anxiety_tips/?lang=en" },
      { title: "Stories", count: 15, icon: BookMarked, url: "https://platform.mantracare.com/anxiety_stories/?lang=en" },
      { title: "Myths", count: 10, icon: HelpCircle, url: "https://platform.mantracare.com/anxiety_myths/?lang=en" },
    ],
  },
  stress: {
    description: "Practical tools and exercises to manage stress, build coping skills, and restore balance in your life.",
    guidedSeriesUrl: "https://app.mantracare.com/therapy/stress-home/strs-guided-series/",
    exercises: [
      { title: "Box Breathing", icon: Wind, url: "https://platform.mantracare.com/box_breathing/?lang=en" },
      { title: "Guided Imagery", icon: Play, url: "https://web.mantracare.com/mindfulness/media/203/1" },
      { title: "Doodle Burst", icon: Pen, url: "https://web.mantracare.com/app/doodle_burst" },
      { title: "Grounding", icon: Compass, url: "http://platform.mantracare.com/5-4-3-2-1-grounding" },
    ],
    todos: [
      { title: "Energy Tracker", icon: Zap, url: "https://web.mantracare.com/app/energy_tracker" },
      { title: "Daily Self Care Tracker", icon: Heart, url: "https://web.mantracare.com/app/daily_self_care_tracker" },
      { title: "Brain Dump & Sort", icon: Brain, url: "http://web.mantracare.com/app/brain_dump_and_sort" },
      { title: "Environment Optimization", icon: Compass, url: "https://platform.mantracare.com/environment_optimization/?lang=en" },
    ],
    resources: [
      { title: "Articles", count: 28, icon: Newspaper, url: "https://platform.mantracare.com/stress_articles/?lang=en" },
      { title: "Tips", count: 20, icon: Lightbulb, url: "https://platform.mantracare.com/stress_tips/?lang=en" },
      { title: "Stories", count: 10, icon: BookMarked, url: "https://platform.mantracare.com/stress_stories/?lang=en" },
      { title: "Myths", count: 6, icon: HelpCircle, url: "https://platform.mantracare.com/stress_myths/?lang=en" },
    ],
  },
  sleep: {
    description: "Techniques and trackers to improve your sleep quality, build healthy bedtime habits, and wake up refreshed.",
    guidedSeriesUrl: "https://app.mantracare.com/therapy/sleep/slp-guided-series/",
    exercises: [
      { title: "4-6-8 Breathing", icon: Play, url: "https://platform.mantracare.com/4_6_8_breathing/" },
      { title: "Box Breathing", icon: Wind, url: "https://platform.mantracare.com/box_breathing/?lang=en" },
      { title: "Guided Imagery", icon: Play, url: "https://web.mantracare.com/mindfulness/media/203/1" },
      { title: "Grounding", icon: Compass, url: "http://platform.mantracare.com/5-4-3-2-1-grounding" },
    ],
    todos: [
      { title: "Sleep Tracker", icon: Moon, url: "https://web.mantracare.com/app/sleep_tracker" },
      { title: "Energy Tracker", icon: Zap, url: "https://web.mantracare.com/app/energy_tracker" },
      { title: "Daily Self Care Tracker", icon: Heart, url: "https://web.mantracare.com/app/daily_self_care_tracker" },
      { title: "Brain Dump & Sort", icon: Brain, url: "http://web.mantracare.com/app/brain_dump_and_sort" },
    ],
    resources: [
      { title: "Articles", count: 20, icon: Newspaper, url: "https://platform.mantracare.com/sleep_articles/?lang=en" },
      { title: "Tips", count: 15, icon: Lightbulb, url: "https://platform.mantracare.com/sleep_tips/?lang=en" },
      { title: "Stories", count: 10, icon: BookMarked, url: "https://platform.mantracare.com/sleep_stories/?lang=en" },
      { title: "Myths", count: 7, icon: HelpCircle, url: "https://platform.mantracare.com/sleep_myths/?lang=en" },
    ],
  },
  adolescent: {
    description: "Guidance and activities designed for teens navigating growth, identity, and emotional challenges.",
    guidedSeriesUrl: "https://app.mantracare.com/therapy/adolescent/adlscnt-guided-series/",
    exercises: [
      { title: "Guided Imagery", icon: Play, url: "https://web.mantracare.com/mindfulness/media/203/1" },
      { title: "Affirmations", icon: Smile, url: "https://platform.mantracare.com/affirmations/?lang=en" },
      { title: "Doodle Burst", icon: Pen, url: "https://web.mantracare.com/app/doodle_burst" },
      { title: "Memory Recall", icon: Brain, url: "https://platform.mantracare.com/memory-recall/" },
    ],
    todos: [
      { title: "Vibe Tracker", icon: TrendingUp, url: "https://web.mantracare.com/app/vibe_tracker" },
      { title: "Gratitude Tracker", icon: Star, url: "https://web.mantracare.com/app/gratitude_tracker" },
      { title: "Daily Self Care Tracker", icon: Heart, url: "https://web.mantracare.com/app/daily_self_care_tracker" },
      { title: "Brain Dump & Sort", icon: Brain, url: "http://web.mantracare.com/app/brain_dump_and_sort" },
    ],
    resources: [
      { title: "Articles", count: 18, icon: Newspaper, url: "https://platform.mantracare.com/adolescent_articles/?lang=en" },
      { title: "Tips", count: 14, icon: Lightbulb, url: "https://platform.mantracare.com/adolescent_tips/?lang=en" },
      { title: "Stories", count: 10, icon: BookMarked, url: "https://platform.mantracare.com/adolescent_stories/?lang=en" },
      { title: "Myths", count: 6, icon: HelpCircle, url: "https://platform.mantracare.com/adolescent_myths/?lang=en" },
    ],
  },
  relationship: {
    description: "Tools and insights to strengthen connections, improve communication, and build healthier relationships.",
    exercises: [
      { title: "Letter to Self", icon: Mail, url: "https://web.mantracare.com/app/letter_to_self" },
      { title: "Affirmations", icon: Smile, url: "https://platform.mantracare.com/affirmations/?lang=en" },
      { title: "Guided Imagery", icon: Play, url: "https://web.mantracare.com/mindfulness/media/203/1" },
      { title: "Thought Shifts", icon: RefreshCw, url: "https://platform.mantracare.com/thought_shifts" },
    ],
    todos: [
      { title: "Know Your Values", icon: Target, url: "http://web.mantracare.com/app/know_your_values/" },
      { title: "Gratitude Tracker", icon: Star, url: "https://web.mantracare.com/app/gratitude_tracker" },
      { title: "Brain Dump & Sort", icon: Brain, url: "http://web.mantracare.com/app/brain_dump_and_sort" },
      { title: "Personal Mission Statement", icon: Compass, url: "https://web.mantracare.com/app/personal_mission_statement" },
    ],
    resources: [
      { title: "Articles", count: 22, icon: Newspaper, url: "https://platform.mantracare.com/relationship_articles/?lang=en" },
      { title: "Tips", count: 16, icon: Lightbulb, url: "https://platform.mantracare.com/relationship_tips/?lang=en" },
      { title: "Stories", count: 12, icon: BookMarked, url: "https://platform.mantracare.com/relationship_stories/?lang=en" },
      { title: "Myths", count: 8, icon: HelpCircle, url: "https://platform.mantracare.com/relationship_myths/?lang=en" },
    ],
  },
  workplace: {
    description: "Strategies to manage workplace stress, improve focus, and maintain work-life balance.",
    guidedSeriesUrl: "https://app.mantracare.com/therapy/workplace/wrkplc-guided-series/",
    exercises: [
      { title: "Box Breathing", icon: Wind, url: "https://platform.mantracare.com/box_breathing/?lang=en" },
      { title: "Guided Imagery", icon: Play, url: "https://web.mantracare.com/mindfulness/media/203/1" },
      { title: "Thought Shifts", icon: RefreshCw, url: "https://platform.mantracare.com/thought_shifts" },
      { title: "Environment Optimization", icon: Compass, url: "https://platform.mantracare.com/environment_optimization/?lang=en" },
    ],
    todos: [
      { title: "Physical Activity Log", icon: Activity, url: "https://web.mantracare.com/app/physical_activity_log" },
      { title: "Energy Tracker", icon: Zap, url: "https://web.mantracare.com/app/energy_tracker" },
      { title: "Brain Dump & Sort", icon: Brain, url: "http://web.mantracare.com/app/brain_dump_and_sort" },
      { title: "Daily Self Care Tracker", icon: Heart, url: "https://web.mantracare.com/app/daily_self_care_tracker" },
    ],
    resources: [
      { title: "Articles", count: 25, icon: Newspaper, url: "https://platform.mantracare.com/workplace_articles/?lang=en" },
      { title: "Tips", count: 18, icon: Lightbulb, url: "https://platform.mantracare.com/workplace_tips/?lang=en" },
      { title: "Stories", count: 10, icon: BookMarked, url: "https://platform.mantracare.com/workplace_stories/?lang=en" },
      { title: "Myths", count: 7, icon: HelpCircle, url: "https://platform.mantracare.com/workplace_myths/?lang=en" },
    ],
  },
  parenting: {
    description: "Resources to support mindful parenting, reduce burnout, and nurture your family's wellbeing.",
    guidedSeriesUrl: "https://app.mantracare.com/therapy/parenting/prntng-guided-series/",
    exercises: [
      { title: "Pause for Appreciation", icon: Pause, url: "https://platform.mantracare.com/pause_for_appreciation?lang=en" },
      { title: "Guided Imagery", icon: Play, url: "https://web.mantracare.com/mindfulness/media/203/1" },
      { title: "Affirmations", icon: Smile, url: "https://platform.mantracare.com/affirmations/?lang=en" },
      { title: "Grounding", icon: Compass, url: "http://platform.mantracare.com/5-4-3-2-1-grounding" },
    ],
    todos: [
      { title: "Gratitude Tracker", icon: Star, url: "https://web.mantracare.com/app/gratitude_tracker" },
      { title: "Daily Self Care Tracker", icon: Heart, url: "https://web.mantracare.com/app/daily_self_care_tracker" },
      { title: "Brain Dump & Sort", icon: Brain, url: "http://web.mantracare.com/app/brain_dump_and_sort" },
      { title: "Letter to Self", icon: Mail, url: "https://web.mantracare.com/app/letter_to_self" },
    ],
    resources: [
      { title: "Articles", count: 20, icon: Newspaper, url: "https://platform.mantracare.com/parenting_articles/?lang=en" },
      { title: "Tips", count: 15, icon: Lightbulb, url: "https://platform.mantracare.com/parenting_tips/?lang=en" },
      { title: "Stories", count: 10, icon: BookMarked, url: "https://platform.mantracare.com/parenting_stories/?lang=en" },
      { title: "Myths", count: 6, icon: HelpCircle, url: "https://platform.mantracare.com/parenting_myths/?lang=en" },
    ],
  },
  anger: {
    description: "Techniques to understand, manage, and channel anger in healthy and constructive ways.",
    guidedSeriesUrl: "https://app.mantracare.com/therapy/anger/angr-guided-series/",
    exercises: [
      { title: "Box Breathing", icon: Wind, url: "https://platform.mantracare.com/box_breathing/?lang=en" },
      { title: "Grounding", icon: Compass, url: "http://platform.mantracare.com/5-4-3-2-1-grounding" },
      { title: "Diffusion Techniques", icon: Brain, url: "https://platform.mantracare.com/diffusion_techniques/" },
      { title: "Doodle Burst", icon: Pen, url: "https://web.mantracare.com/app/doodle_burst" },
    ],
    todos: [
      { title: "Vibe Tracker", icon: TrendingUp, url: "https://web.mantracare.com/app/vibe_tracker" },
      { title: "Brain Dump & Sort", icon: Brain, url: "http://web.mantracare.com/app/brain_dump_and_sort" },
      { title: "Thought Shifts", icon: RefreshCw, url: "https://platform.mantracare.com/thought_shifts" },
      { title: "Energy Tracker", icon: Zap, url: "https://web.mantracare.com/app/energy_tracker" },
    ],
    resources: [
      { title: "Articles", count: 18, icon: Newspaper, url: "https://platform.mantracare.com/anger_articles/?lang=en" },
      { title: "Tips", count: 14, icon: Lightbulb, url: "https://platform.mantracare.com/anger_tips/?lang=en" },
      { title: "Stories", count: 8, icon: BookMarked, url: "https://platform.mantracare.com/anger_stories/?lang=en" },
      { title: "Myths", count: 5, icon: HelpCircle, url: "https://platform.mantracare.com/anger_myths/?lang=en" },
    ],
  },
  grief: {
    description: "Compassionate tools and exercises to help you process loss and find healing at your own pace.",
    guidedSeriesUrl: "https://app.mantracare.com/therapy/grief/grf-guided-series/",
    exercises: [
      { title: "Letter to Self", icon: Mail, url: "https://web.mantracare.com/app/letter_to_self" },
      { title: "Guided Imagery", icon: Play, url: "https://web.mantracare.com/mindfulness/media/203/1" },
      { title: "Grounding", icon: Compass, url: "http://platform.mantracare.com/5-4-3-2-1-grounding" },
      { title: "Affirmations", icon: Smile, url: "https://platform.mantracare.com/affirmations/?lang=en" },
    ],
    todos: [
      { title: "Gratitude Tracker", icon: Star, url: "https://web.mantracare.com/app/gratitude_tracker" },
      { title: "Brain Dump & Sort", icon: Brain, url: "http://web.mantracare.com/app/brain_dump_and_sort" },
      { title: "Vibe Tracker", icon: TrendingUp, url: "https://web.mantracare.com/app/vibe_tracker" },
      { title: "Daily Self Care Tracker", icon: Heart, url: "https://web.mantracare.com/app/daily_self_care_tracker" },
    ],
    resources: [
      { title: "Articles", count: 16, icon: Newspaper, url: "https://platform.mantracare.com/grief_articles/?lang=en" },
      { title: "Tips", count: 12, icon: Lightbulb, url: "https://platform.mantracare.com/grief_tips/?lang=en" },
      { title: "Stories", count: 10, icon: BookMarked, url: "https://platform.mantracare.com/grief_stories/?lang=en" },
      { title: "Myths", count: 6, icon: HelpCircle, url: "https://platform.mantracare.com/grief_myths/?lang=en" },
    ],
  },
  ptsd: {
    description: "Grounding and stabilization techniques to help manage trauma responses and build safety.",
    guidedSeriesUrl: "https://app.mantracare.com/therapy/ptsd/ptsd-guided-series/",
    exercises: [
      { title: "Grounded Technique", icon: Compass, url: "http://platform.mantracare.com/grounded_technique" },
      { title: "Box Breathing", icon: Wind, url: "https://platform.mantracare.com/box_breathing/?lang=en" },
      { title: "Diffusion Techniques", icon: Brain, url: "https://platform.mantracare.com/diffusion_techniques/" },
      { title: "Guided Imagery", icon: Play, url: "https://web.mantracare.com/mindfulness/media/203/1" },
    ],
    todos: [
      { title: "Vibe Tracker", icon: TrendingUp, url: "https://web.mantracare.com/app/vibe_tracker" },
      { title: "Brain Dump & Sort", icon: Brain, url: "http://web.mantracare.com/app/brain_dump_and_sort" },
      { title: "Energy Tracker", icon: Zap, url: "https://web.mantracare.com/app/energy_tracker" },
      { title: "Thought Shifts", icon: RefreshCw, url: "https://platform.mantracare.com/thought_shifts" },
    ],
    resources: [
      { title: "Articles", count: 20, icon: Newspaper, url: "https://platform.mantracare.com/ptsd_articles/?lang=en" },
      { title: "Tips", count: 15, icon: Lightbulb, url: "https://platform.mantracare.com/ptsd_tips/?lang=en" },
      { title: "Stories", count: 10, icon: BookMarked, url: "https://platform.mantracare.com/ptsd_stories/?lang=en" },
      { title: "Myths", count: 7, icon: HelpCircle, url: "https://platform.mantracare.com/ptsd_myths/?lang=en" },
    ],
  },
  acceptance: {
    description: "Exercises to cultivate acceptance, let go of resistance, and embrace life as it is.",
    guidedSeriesUrl: "https://app.mantracare.com/therapy/acceptance/accpt-guided-series/",
    exercises: [
      { title: "Diffusion Techniques", icon: Brain, url: "https://platform.mantracare.com/diffusion_techniques/" },
      { title: "Affirmations", icon: Smile, url: "https://platform.mantracare.com/affirmations/?lang=en" },
      { title: "Guided Imagery", icon: Play, url: "https://web.mantracare.com/mindfulness/media/203/1" },
      { title: "Thought Shifts", icon: RefreshCw, url: "https://platform.mantracare.com/thought_shifts" },
    ],
    todos: [
      { title: "Letter to Self", icon: Mail, url: "https://web.mantracare.com/app/letter_to_self" },
      { title: "Know Your Values", icon: Target, url: "http://web.mantracare.com/app/know_your_values/" },
      { title: "Gratitude Tracker", icon: Star, url: "https://web.mantracare.com/app/gratitude_tracker" },
      { title: "Brain Dump & Sort", icon: Brain, url: "http://web.mantracare.com/app/brain_dump_and_sort" },
    ],
    resources: [
      { title: "Articles", count: 16, icon: Newspaper, url: "https://platform.mantracare.com/acceptance_articles/?lang=en" },
      { title: "Tips", count: 12, icon: Lightbulb, url: "https://platform.mantracare.com/acceptance_tips/?lang=en" },
      { title: "Stories", count: 8, icon: BookMarked, url: "https://platform.mantracare.com/acceptance_stories/?lang=en" },
      { title: "Myths", count: 5, icon: HelpCircle, url: "https://platform.mantracare.com/acceptance_myths/?lang=en" },
    ],
  },
  postpartum: {
    description: "Supportive resources for new mothers managing postpartum challenges and emotional changes.",
    guidedSeriesUrl: "https://app.mantracare.com/therapy/postpartum/pstprtm-guided-series/",
    exercises: [
      { title: "Guided Imagery", icon: Play, url: "https://web.mantracare.com/mindfulness/media/203/1" },
      { title: "Affirmations", icon: Smile, url: "https://platform.mantracare.com/affirmations/?lang=en" },
      { title: "Box Breathing", icon: Wind, url: "https://platform.mantracare.com/box_breathing/?lang=en" },
      { title: "Grounding", icon: Compass, url: "http://platform.mantracare.com/5-4-3-2-1-grounding" },
    ],
    todos: [
      { title: "Energy Tracker", icon: Zap, url: "https://web.mantracare.com/app/energy_tracker" },
      { title: "Daily Self Care Tracker", icon: Heart, url: "https://web.mantracare.com/app/daily_self_care_tracker" },
      { title: "Gratitude Tracker", icon: Star, url: "https://web.mantracare.com/app/gratitude_tracker" },
      { title: "Brain Dump & Sort", icon: Brain, url: "http://web.mantracare.com/app/brain_dump_and_sort" },
    ],
    resources: [
      { title: "Articles", count: 18, icon: Newspaper, url: "https://platform.mantracare.com/postpartum_articles/?lang=en" },
      { title: "Tips", count: 14, icon: Lightbulb, url: "https://platform.mantracare.com/postpartum_tips/?lang=en" },
      { title: "Stories", count: 10, icon: BookMarked, url: "https://platform.mantracare.com/postpartum_stories/?lang=en" },
      { title: "Myths", count: 6, icon: HelpCircle, url: "https://platform.mantracare.com/postpartum_myths/?lang=en" },
    ],
  },
  sexuality: {
    description: "Safe and supportive resources to explore identity, build self-acceptance, and find community.",
    guidedSeriesUrl: "https://therapy.mantracare.com/en/therapyapp/sexuality-guided-series/",
    exercises: [
      { title: "Affirmations", icon: Smile, url: "https://platform.mantracare.com/affirmations/?lang=en" },
      { title: "Guided Imagery", icon: Play, url: "https://web.mantracare.com/mindfulness/media/203/1" },
      { title: "Thought Shifts", icon: RefreshCw, url: "https://platform.mantracare.com/thought_shifts" },
      { title: "Letter to Self", icon: Mail, url: "https://web.mantracare.com/app/letter_to_self" },
    ],
    todos: [
      { title: "Know Your Values", icon: Target, url: "http://web.mantracare.com/app/know_your_values/" },
      { title: "Brain Dump & Sort", icon: Brain, url: "http://web.mantracare.com/app/brain_dump_and_sort" },
      { title: "Vibe Tracker", icon: TrendingUp, url: "https://web.mantracare.com/app/vibe_tracker" },
      { title: "Gratitude Tracker", icon: Star, url: "https://web.mantracare.com/app/gratitude_tracker" },
    ],
    resources: [
      { title: "Articles", count: 16, icon: Newspaper, url: "https://platform.mantracare.com/sexuality_articles/?lang=en" },
      { title: "Tips", count: 12, icon: Lightbulb, url: "https://platform.mantracare.com/sexuality_tips/?lang=en" },
      { title: "Stories", count: 8, icon: BookMarked, url: "https://platform.mantracare.com/sexuality_stories/?lang=en" },
      { title: "Myths", count: 5, icon: HelpCircle, url: "https://platform.mantracare.com/sexuality_myths/?lang=en" },
    ],
  },
  "eating-disorder": {
    description: "Supportive exercises and resources to build a healthier relationship with food and body image.",
    guidedSeriesUrl: "https://app.mantracare.com/therapy/eating-disorder/etn-guided-series/",
    exercises: [
      { title: "Grounding", icon: Compass, url: "http://platform.mantracare.com/5-4-3-2-1-grounding" },
      { title: "Diffusion Techniques", icon: Brain, url: "https://platform.mantracare.com/diffusion_techniques/" },
      { title: "Affirmations", icon: Smile, url: "https://platform.mantracare.com/affirmations/?lang=en" },
      { title: "Guided Imagery", icon: Play, url: "https://web.mantracare.com/mindfulness/media/203/1" },
    ],
    todos: [
      { title: "Energy Tracker", icon: Zap, url: "https://web.mantracare.com/app/energy_tracker" },
      { title: "Daily Self Care Tracker", icon: Heart, url: "https://web.mantracare.com/app/daily_self_care_tracker" },
      { title: "Brain Dump & Sort", icon: Brain, url: "http://web.mantracare.com/app/brain_dump_and_sort" },
      { title: "Gratitude Tracker", icon: Star, url: "https://web.mantracare.com/app/gratitude_tracker" },
    ],
    resources: [
      { title: "Articles", count: 18, icon: Newspaper, url: "https://platform.mantracare.com/eating_disorder_articles/?lang=en" },
      { title: "Tips", count: 14, icon: Lightbulb, url: "https://platform.mantracare.com/eating_disorder_tips/?lang=en" },
      { title: "Stories", count: 10, icon: BookMarked, url: "https://platform.mantracare.com/eating_disorder_stories/?lang=en" },
      { title: "Myths", count: 6, icon: HelpCircle, url: "https://platform.mantracare.com/eating_disorder_myths/?lang=en" },
    ],
  },
  ocd: {
    description: "Evidence-based techniques to manage obsessive thoughts and compulsive behaviors.",
    guidedSeriesUrl: "https://app.mantracare.com/therapy/ocd/ocd-guided-series/",
    exercises: [
      { title: "Diffusion Techniques", icon: Brain, url: "https://platform.mantracare.com/diffusion_techniques/" },
      { title: "Grounded Technique", icon: Compass, url: "http://platform.mantracare.com/grounded_technique" },
      { title: "Box Breathing", icon: Wind, url: "https://platform.mantracare.com/box_breathing/?lang=en" },
      { title: "Thought Shifts", icon: RefreshCw, url: "https://platform.mantracare.com/thought_shifts" },
    ],
    todos: [
      { title: "Brain Dump & Sort", icon: Brain, url: "https://web.mantracare.com/app/brain_dump_and_sort" },
      { title: "Vibe Tracker", icon: TrendingUp, url: "https://web.mantracare.com/app/vibe_tracker" },
      { title: "Daily Self Care Tracker", icon: Heart, url: "https://web.mantracare.com/app/daily_self_care_tracker" },
      { title: "Gratitude Tracker", icon: Star, url: "https://web.mantracare.com/app/gratitude_tracker" },
    ],
    resources: [
      { title: "Articles", count: 20, icon: Newspaper, url: "https://platform.mantracare.com/ocd_articles/?lang=en" },
      { title: "Tips", count: 15, icon: Lightbulb, url: "https://platform.mantracare.com/ocd_tips/?lang=en" },
      { title: "Stories", count: 10, icon: BookMarked, url: "https://platform.mantracare.com/ocd_stories/?lang=en" },
      { title: "Myths", count: 7, icon: HelpCircle, url: "https://platform.mantracare.com/ocd_myths/?lang=en" },
    ],
  },
};

export function SelfCareResources() {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
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

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <MobileNav />
      <div className="flex-1 flex flex-col min-w-0">
        <main className="max-w-[1000px] w-full mx-auto px-4 md:px-6 py-4 md:py-8 pt-[72px] md:pt-8">
          <AnimatePresence mode="wait">
            {selectedTopic ? (() => {
              const topic = topicCards.find(t => t.id === selectedTopic)!;
              const detail = topicDetails[selectedTopic];
              return (
                <motion.div
                  key="topic-detail"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Header */}
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
                    <h1 className="font-semibold text-[#020817] mb-2" style={{ fontSize: '28px' }}>
                      {topic.label}
                    </h1>
                    <p className="text-base text-[#64748B] leading-relaxed">
                      {detail.description}
                    </p>
                  </motion.div>

                  {/* Guided Series */}
                  {detail.guidedSeriesUrl && (
                    <motion.div
                      className="mb-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <h2 className="font-semibold text-[#020817] mb-4" style={{ fontSize: '18px' }}>
                        Guided Series
                      </h2>
                      <motion.button
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => { if(detail.guidedSeriesUrl) window.location.href = detail.guidedSeriesUrl; }}
                        className="w-full bg-[#F5FBFF] border-2 border-[#E0F2FE] rounded-2xl p-5 flex items-center justify-between hover:border-[#2D9CDB] hover:shadow-lg transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-[#2D9CDB] rounded-2xl flex items-center justify-center">
                            <Play size={20} className="text-white" fill="#ffffff" />
                          </div>
                          <span className="font-medium text-[#020817]">Start guided series</span>
                        </div>
                        <ArrowRight size={20} className="text-[#64748B] group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </motion.div>
                  )}

                  {/* Exercises */}
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <h2 className="font-semibold text-[#020817] mb-4" style={{ fontSize: '18px' }}>
                      Exercises
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {detail.exercises.map((ex, i) => {
                        const ExIcon = ex.icon;
                        const colors = [
                          { bg: '#FFF4ED', border: '#FECACA', icon: '#F97316' },
                          { bg: '#EFF6FF', border: '#BFDBFE', icon: '#3B82F6' },
                          { bg: '#FCE7F3', border: '#FBCFE8', icon: '#EC4899' },
                          { bg: '#ECFDF5', border: '#A7F3D0', icon: '#10B981' }
                        ];
                        const color = colors[i % colors.length];
                        return (
                          <motion.button
                            key={ex.title}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 + i * 0.05 }}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => ex.url && (window.location.href = ex.url)}
                            className="w-full rounded-2xl p-4 border-2 transition-all hover:shadow-md"
                            style={{
                              backgroundColor: color.bg,
                              borderColor: color.border
                            }}
                          >
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3" style={{ backgroundColor: color.icon }}>
                              <ExIcon size={20} className="text-white" strokeWidth={2} />
                            </div>
                            <p className="text-sm font-medium text-[#020817] text-left leading-snug">
                              {ex.title}
                            </p>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>

                  {/* To Do's */}
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="font-semibold text-[#020817] mb-4" style={{ fontSize: '18px' }}>
                      To Do's
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {detail.todos.map((todo, i) => {
                        const TodoIcon = todo.icon;
                        const colors = [
                          { bg: '#FEF2F2', border: '#FECACA', icon: '#EF4444' },
                          { bg: '#F5F3FF', border: '#DDD6FE', icon: '#8B5CF6' },
                          { bg: '#F0FDFA', border: '#99F6E4', icon: '#14B8A6' },
                          { bg: '#FFF7ED', border: '#FED7AA', icon: '#F97316' }
                        ];
                        const color = colors[i % colors.length];
                        return (
                          <motion.button
                            key={todo.title}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.05 }}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => todo.url && (window.location.href = todo.url)}
                            className="border-2 rounded-2xl p-4 flex items-center gap-3 hover:shadow-md transition-all group"
                            style={{
                              backgroundColor: color.bg,
                              borderColor: color.border
                            }}
                          >
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: color.icon }}>
                              <TodoIcon size={18} className="text-white" strokeWidth={2} />
                            </div>
                            <span className="text-sm font-medium text-[#020817] flex-1 text-left">
                              {todo.title}
                            </span>
                            <ArrowRight size={16} className="text-[#64748B] group-hover:translate-x-1 transition-transform" />
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>

                  {/* Resources */}
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <h2 className="font-semibold text-[#020817] mb-4" style={{ fontSize: '18px' }}>
                      Resources
                    </h2>
                    <div className="space-y-3">
                      {detail.resources.map((res, i) => {
                        const ResIcon = res.icon;
                        const colors = [
                          { accent: '#F59E0B', bg: '#FFFBEB', bar: '#FDE68A', iconBg: '#FEF3C7' },
                          { accent: '#3B82F6', bg: '#EFF6FF', bar: '#BFDBFE', iconBg: '#DBEAFE' },
                          { accent: '#A855F7', bg: '#FAF5FF', bar: '#E9D5FF', iconBg: '#F3E8FF' },
                          { accent: '#10B981', bg: '#F0FDF4', bar: '#A7F3D0', iconBg: '#D1FAE5' }
                        ];
                        const color = colors[i % colors.length];
                        return (
                          <motion.button
                            key={res.title}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.25 + i * 0.06, type: "spring", damping: 20 }}
                            whileHover={{ x: 8, scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => res.url && (window.location.href = res.url)}
                            className="w-full rounded-2xl p-4 flex items-center gap-4 transition-all group relative overflow-hidden"
                            style={{ backgroundColor: color.bg }}
                          >
                            {/* Left accent bar */}
                            <div
                              className="absolute left-0 top-0 bottom-0 w-1 group-hover:w-1.5 transition-all"
                              style={{ backgroundColor: color.accent }}
                            ></div>

                            {/* Icon container */}
                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform relative z-10"
                              style={{ backgroundColor: color.iconBg }}
                            >
                              <ResIcon size={22} strokeWidth={2} style={{ color: color.accent }} />
                            </div>

                            {/* Content */}
                            <div className="flex-1 text-left">
                              <h3 className="text-sm font-semibold text-[#020817] mb-0.5 leading-tight">
                                {res.title}
                              </h3>
                              <div className="flex items-center gap-2">
                                <div
                                  className="h-1 w-12 rounded-full group-hover:w-16 transition-all"
                                  style={{ backgroundColor: color.bar }}
                                ></div>
                                <span className="text-xs text-[#64748B] opacity-0 group-hover:opacity-100 transition-opacity">
                                  View resource
                                </span>
                              </div>
                            </div>

                            {/* Arrow */}
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:shadow-md transition-all"
                              style={{ backgroundColor: color.iconBg }}
                            >
                              <ArrowRight
                                size={16}
                                className="group-hover:translate-x-1 transition-transform"
                                strokeWidth={2.5}
                                style={{ color: color.accent }}
                              />
                            </div>
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
            className="mb-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={() => {
                  if (window.parent !== window) {
                    window.parent.postMessage({ action: 'exit' }, 'http://192.168.1.60:3000');
                  } else {
                    window.location.href = 'http://192.168.1.60:3000';
                  }
                }}
                className="flex items-center justify-center text-[#64748B] hover:text-[#043570] transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="w-10 h-10 bg-[#F1F5F9] rounded-md flex items-center justify-center flex-shrink-0">
                <MessageCircle size={20} className="text-[#1E293B]" strokeWidth={2} />
              </div>
              <div>
                <h1 className="text-2xl text-[#0f172b] font-medium">Self-Care Resources</h1>
                <p className="text-sm text-[#62748e] font-normal">
                  Explore tools and guidance for your mental wellness journey
                </p>
              </div>
            </div>
          </motion.div>

          {/* Tools */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-[#0f172b] mb-4">Tools</h2>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-6 gap-4"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <AnimatePresence mode="popLayout">
                {toolCards.map((tool) => {
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
                          window.location.href = tool.url;
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

          {/* Wellness Guides */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-[#0f172b] mb-4">Wellness Guides</h2>

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
                        if (topic.id === 'ocd') {
                          window.location.href = 'https://web.mantracare.com/wp/selfcare-ocd';
                        } else {
                          setSelectedTopic(topic.id);
                        }
                      }}
                      className="bg-white border border-[#E2E8F0] rounded-2xl p-6 hover:shadow-md transition-all text-center"
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
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
