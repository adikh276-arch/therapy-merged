import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Smile, 
  Clock, 
  Activity, 
  Book, 
  Target, 
  Moon, 
  Cloud, 
  Wind, 
  Heart, 
  Zap, 
  Users, 
  Sparkles,
  Search,
  Star,
  Brain,
  Scale,
  User
} from 'lucide-react';
import guidedData from '../data/guidedSeries.json';

const iconMap: Record<string, any> = {
  Smile, Clock, Activity, Book, Target, Moon, Cloud, Wind, Heart, Zap, Users, Sparkles, Star, Brain, Scale, User
};

export default function GuidedSeries() {
  const { concern } = useParams<{ concern: string }>();
  const navigate = useNavigate();

  // Normalize concern name (e.g. "depression" -> "Depression")
  const normalizedConcern = concern ? concern.charAt(0).toUpperCase() + concern.slice(1).replace(/-/g, ' ') : '';
  const data = (guidedData as any)[normalizedConcern] || (guidedData as any)["Depression"]; // Fallback

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const handleActivityClick = (activity: any) => {
    const name = activity.name.toLowerCase();
    
    // Existing route mapping
    if (name.includes('sleep record') || name.includes('sleep audit')) return navigate('/trackers/sleep-audit');
    if (name.includes('sleep window')) return navigate('/tools/sleep-window-planner');
    if (name.includes('affirmation')) return navigate('/tools/affirmations');
    if (name.includes('breathing')) return navigate('/exercises/4-6-8-breathing');
    if (name.includes('grounding')) return navigate('/exercises/5-4-3-2-1-grounding');
    if (name.includes('physical activity')) return navigate('/trackers/physical-activity-log');
    if (name.includes('values')) return navigate('/tools/know-your-values');
    if (name.includes('letter')) return navigate('/tools/a-letter-to-self');
    if (name.includes('gratitude')) return navigate('/trackers/gratitude-tracker');
    if (name.includes('mood') || name.includes('assess your mood')) return navigate('/trackers/vibe-tracker');
    if (name.includes('energy')) return navigate('/trackers/energy-tracker');
    if (name.includes('doodle')) return navigate('/tools/doodle-burst');
    if (name.includes('joyful')) return navigate('/tools/joyful-activities');
    
    // Fallback to generic guided activity page (with specialized UI)
    navigate(`/guided-series/${concern}/${encodeURIComponent(activity.name)}`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-10">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-4 flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
        >
          <ChevronLeft size={20} className="text-slate-600" />
        </button>
        <h1 className="text-lg font-semibold text-slate-800">Guided Series</h1>
      </div>

      <motion.div 
        className="max-w-2xl mx-auto px-4 mt-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {data.categories.map((category: any, catIndex: number) => (
          <div key={catIndex} className="mb-8">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 px-1">
              {category.name}
            </h2>
            <div className="space-y-3">
              {category.activities.map((activity: any, actIndex: number) => {
                const Icon = iconMap[activity.icon] || Sparkles;
                return (
                  <motion.button
                    key={actIndex}
                    variants={itemVariants}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleActivityClick(activity)}
                    className="w-full bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md hover:border-slate-200 transition-all text-left group"
                  >
                    {/* Icon Box */}
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${activity.color}15` }} // 15% opacity
                    >
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ border: `2px solid ${activity.color}30` }}
                      >
                        <Icon size={24} style={{ color: activity.color }} strokeWidth={2} />
                      </div>
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[16px] font-bold text-slate-800 mb-0.5 truncate">
                        {activity.name}
                      </h3>
                      <p className="text-sm text-slate-500 line-clamp-1 leading-relaxed">
                        {activity.description || "Explore this activity for your wellness."}
                      </p>
                    </div>

                    {/* Action */}
                    <ChevronRight size={20} className="text-slate-300 group-hover:text-slate-400 transition-colors" />
                  </motion.button>
                );
              })}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
