import React from "react";
import Link from "next/link";
import { 
  Activity, 
  BookOpen, 
  Wind, 
  PenTool, 
  History, 
  Heart,
  Layout,
  MessageSquare,
  Sparkles,
  Zap
} from "lucide-react";

const apps = [
  // Trackers
  { name: "Daily Gratitude Diary", slug: "daily-gratitude-diary", category: "Trackers", icon: <Sparkles className="w-5 h-5" /> },
  { name: "Gratitude Tracker", slug: "gratitude-tracker", category: "Trackers", icon: <History className="w-5 h-5" /> },
  { name: "Care Tracker", slug: "care-tracker", category: "Trackers", icon: <Heart className="w-5 h-5" /> },
  { name: "Vibe Tracker", slug: "vibe-tracker", category: "Trackers", icon: <Zap className="w-5 h-5" /> },
  { name: "Physical Activity Log", slug: "physical-activity-log", category: "Trackers", icon: <Activity className="w-5 h-5" /> },
  { name: "Habit Explorer", slug: "what-are-your-habits", category: "Trackers", icon: <Layout className="w-5 h-5" /> },

  // Tools
  { name: "4-6-8 Breathing", slug: "breathing-4-6-8", category: "Tools", icon: <Wind className="w-5 h-5" /> },
  { name: "Box Breathing", slug: "box-breathing", category: "Tools", icon: <Wind className="w-5 h-5" /> },
  { name: "Doodle Burst", slug: "doodle-burst", category: "Tools", icon: <PenTool className="w-5 h-5" /> },
  { name: "Letter to Self", slug: "a-letter-to-self", category: "Tools", icon: <MessageSquare className="w-5 h-5" /> },
  { name: "Personal Mission", slug: "personal-mission-statement", category: "Tools", icon: <Sparkles className="w-5 h-5" /> },
  { name: "Self-Care Bingo", slug: "self-care-bingo", category: "Tools", icon: <PenTool className="w-5 h-5" /> },
  { name: "Brain Dump", slug: "brain-dump-and-sort", category: "Tools", icon: <Layout className="w-5 h-5" /> },
  { name: "Value Discovery", slug: "know-your-values", category: "Tools", icon: <Heart className="w-5 h-5" /> },
  { name: "5-4-3-2-1 Grounding", slug: "grounding-5-4-3-2-1", category: "Tools", icon: <Wind className="w-5 h-5" /> },

  // Resources (Brief summary)
  { name: "Anxiety Resources", slug: "anxiety-articles", category: "Resources", icon: <BookOpen className="w-5 h-5" /> },
  { name: "Stress Management", slug: "stress-tips", category: "Resources", icon: <BookOpen className="w-5 h-5" /> },
  { name: "Relationships", slug: "relationship-articles", category: "Resources", icon: <BookOpen className="w-5 h-5" /> },
  { name: "Sleep Hygiene", slug: "sleep-tips", category: "Resources", icon: <BookOpen className="w-5 h-5" /> },
];

const categories = ["Trackers", "Tools", "Resources"];

export default function TherapyWarRoom() {
  return (
    <div className="min-h-screen bg-[#FDFCFB] p-6 lg:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
              <Sparkles className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Therapy Hub</h1>
          </div>
          <p className="text-gray-500 text-lg max-w-2xl">
            Welcome to your digital sanctuary. Access all your mindfulness tools, trackers, and resources from one central dashboard.
          </p>
        </header>

        {categories.map((category) => (
          <section key={category} className="mb-12">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-indigo-500 rounded-full"></span>
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {apps
                .filter((app) => app.category === category)
                .map((app) => (
                  <Link
                    key={app.slug}
                    href={`/${app.slug}`}
                    className="group relative bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-300 flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gray-50 group-hover:bg-indigo-50 flex items-center justify-center text-gray-400 group-hover:text-indigo-600 transition-colors">
                      {app.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {app.name}
                      </h3>
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                        Open App
                      </p>
                    </div>
                    <div className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Zap className="w-4 h-4 text-indigo-400" />
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        ))}

        <footer className="mt-20 pt-8 border-t border-gray-100 text-center">
          <p className="text-gray-400 text-sm italic">
            "The journey of a thousand miles begins with a single step."
          </p>
        </footer>
      </div>
    </div>
  );
}
