import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ChevronLeft, Play, Clock } from "lucide-react";
import { motion } from "framer-motion";

export function TimePage() {
  const navigate = useNavigate();
  const { timeId } = useParams();
  const [activeFilter, setActiveFilter] = useState("All");

  // Parse the time limit from the URL parameter
  const timeLimit = timeId ? parseInt(timeId) : null;

  // Mock data for content items with various durations
  const allContentItems = [
    {
      id: 1,
      title: "Quick Breathing Exercise",
      category: "Meditation",
      author: "Dr. Sarah Chen",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      duration: "3 min",
      durationMinutes: 3
    },
    {
      id: 2,
      title: "Morning Mindfulness",
      category: "Guided",
      author: "Alan Cumming",
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=300&fit=crop",
      duration: "5 min",
      durationMinutes: 5
    },
    {
      id: 3,
      title: "Stress Relief Session",
      category: "Meditation",
      author: "Dr. Vivek Murthy",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
      duration: "10 min",
      durationMinutes: 10
    },
    {
      id: 4,
      title: "The Cask of Amontillado",
      category: "Wisdom",
      author: "Alan Cumming",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop",
      duration: "15 min",
      durationMinutes: 15
    },
    {
      id: 5,
      title: "Focus Flow",
      category: "Focus",
      author: "Emma Davis",
      image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=300&fit=crop",
      duration: "20 min",
      durationMinutes: 20
    },
    {
      id: 6,
      title: "Infinite Piano for Sleep",
      category: "Sleep",
      author: "Michael Chen",
      image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=300&fit=crop",
      duration: "30 min",
      durationMinutes: 30
    },
    {
      id: 7,
      title: "Deep Sleep Soundscape",
      category: "Sleep",
      author: "Nature Sounds",
      image: "https://images.unsplash.com/photo-1517817748493-49ec54a32465?w=400&h=300&fit=crop",
      duration: "45 min",
      durationMinutes: 45
    },
    {
      id: 8,
      title: "Ocean Waves",
      category: "Soundscapes",
      author: "Nature Sounds",
      image: "https://images.unsplash.com/photo-1439405326854-014607f694d7?w=400&h=300&fit=crop",
      duration: "60 min",
      durationMinutes: 60
    },
    {
      id: 9,
      title: "Body Scan Meditation",
      category: "Guided",
      author: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=400&h=300&fit=crop",
      duration: "8 min",
      durationMinutes: 8
    },
    {
      id: 10,
      title: "Evening Relaxation",
      category: "Sleep",
      author: "Michael Chen",
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=300&fit=crop",
      duration: "12 min",
      durationMinutes: 12
    },
    {
      id: 11,
      title: "Gentle Stretching",
      category: "Yoga",
      author: "Emma Davis",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      duration: "7 min",
      durationMinutes: 7
    },
    {
      id: 12,
      title: "Calm Your Mind",
      category: "Meditation",
      author: "Dr. Sarah Chen",
      image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=300&fit=crop",
      duration: "2 min",
      durationMinutes: 2
    }
  ];

  // Filter content based on time limit
  const contentItems = timeLimit 
    ? allContentItems.filter(item => item.durationMinutes <= timeLimit)
    : allContentItems;

  const filters = ["All", "Guided", "Yoga", "Beginners", "Sleep", "Focus"];

  const getTimeTitle = () => {
    if (!timeId) return "Content";
    return timeId
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="flex min-h-screen bg-[#0a1628]">
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="max-w-[1000px] w-full mx-auto px-4 md:px-6 py-4 md:py-10 pt-10">
          {/* Header */}
          <motion.div
            className="mb-6 md:mb-8"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="flex items-center gap-3 mb-1.5">
              {/* Back Arrow */}
              <button
                onClick={() => navigate(-1)}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors flex-shrink-0 text-white hover:bg-[#1a2744]"
              >
                <ChevronLeft size={24} />
              </button>
              
              {/* Icon */}
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center flex-shrink-0">
                <Clock size={20} className="text-white" />
              </div>
              
              <h1 className="text-xl md:text-2xl text-white">Time</h1>
            </div>
            
            {/* Description */}
            <p className="text-slate-400 text-sm mb-5 ml-[54px]">
              {timeLimit 
                ? `Showing meditations ${timeLimit} minutes or less`
                : `Explore meditations organized by duration`}
            </p>

            {/* Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeFilter === filter
                      ? "bg-white text-[#0a1628]"
                      : "bg-transparent text-white border border-[#313D57] hover:border-[#4a5568]"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Content Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5"
          >
            {contentItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.05 }}
                className="group cursor-pointer"
                onClick={() => navigate(`/meditation-detail/${item.id}`)}
              >
                {/* Image Container */}
                <div className="relative rounded-2xl overflow-hidden mb-3 aspect-[16/10] bg-[#1a2744]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Overlay with title */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-center justify-center">
                    <h3 className="text-white text-xl md:text-2xl font-serif text-center px-4 italic">
                      {item.title}
                    </h3>
                  </div>
                  {/* Play button on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                      <Play size={24} className="text-[#0a1628] ml-1" fill="currentColor" />
                    </div>
                  </div>
                  {/* Duration badge */}
                  <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                    {item.duration}
                  </div>
                </div>

                {/* Content Info */}
                <div className="px-1">
                  <h4 className="text-white font-medium mb-1 line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-slate-400 text-sm">
                    {item.category} · {item.author}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
