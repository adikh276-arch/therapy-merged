import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Play, Lock, Heart, Share2, RotateCcw, RotateCw, Square, Globe } from "lucide-react";
import { motion } from "framer-motion";

export function MeditationDetailPage() {
  const navigate = useNavigate();
  const { meditationId } = useParams();
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  // Mock data - in a real app, this would be fetched based on meditationId
  const meditationData = {
    title: "7 Days of Happiness",
    subtitle: "Relish the day with gratitude, acceptance and play",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    author: {
      name: "Tamara Levitt",
      title: "Head of Mindfulness at Calm",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    },
    sessions: [
      { id: 1, title: "Practice Gratitude", duration: "10m", isLocked: false, isPlaying: true },
      { id: 2, title: "Love and Accept Yourself", duration: "12m", isLocked: true, isPlaying: false },
      { id: 3, title: "Learn to Let Go", duration: "11m", isLocked: true, isPlaying: false },
      { id: 4, title: "Live in the Now", duration: "12m", isLocked: true, isPlaying: false },
      { id: 5, title: "Embrace Uncertainty", duration: "12m", isLocked: true, isPlaying: false },
      { id: 6, title: "Prioritize Your Health", duration: "11m", isLocked: true, isPlaying: false },
      { id: 7, title: "Take Time to Play", duration: "13m", isLocked: true, isPlaying: false }
    ]
  };

  const toggleFavorite = (sessionId: number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(sessionId)) {
        newFavorites.delete(sessionId);
      } else {
        newFavorites.add(sessionId);
      }
      return newFavorites;
    });
  };

  return (
    <div className="flex min-h-screen bg-[#0a1628] relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img
          src={meditationData.image}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <main className="max-w-[500px] w-full mx-auto px-4 md:px-6 py-4 md:py-10 pt-10">
          {/* Back Button */}
          <motion.button
            onClick={() => {
              if (window.parent !== window) {
                window.parent.postMessage({ action: 'exit' }, 'https://web.mantracare.com');
              } else {
                window.location.href = 'https://web.mantracare.com';
              }
            }}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronLeft size={24} />
          </motion.button>

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-10"
          >
            {/* Title */}
            <h1 className="text-4xl md:text-5xl text-white mb-3">
              {meditationData.title}
            </h1>

            {/* Subtitle */}
            <p className="text-white/90 text-base md:text-lg mb-6">
              {meditationData.subtitle}
            </p>

            {/* Author Section */}
            <div className="flex flex-col items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/30">
                <img
                  src={meditationData.author.avatar}
                  alt={meditationData.author.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-white font-medium text-lg">{meditationData.author.name}</p>
                <p className="text-white/70 text-sm">{meditationData.author.title}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="w-16 h-[2px] bg-white/30 mx-auto"></div>
          </motion.div>

          {/* Media Player */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-10"
          >
            <div className="p-6 space-y-4">
              {/* Top Row - Heart, Share, Language */}
              <div className="flex justify-between items-center">
                <div className="flex gap-3">
                  <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Heart size={20} className="text-white" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Share2 size={20} className="text-white" />
                  </button>
                </div>
                <button className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm flex items-center gap-1.5 hover:bg-white/20 transition-colors">
                  <Globe size={16} className="text-white" />
                  <span className="text-white text-sm font-medium">EN</span>
                </button>
              </div>

              {/* Playback Controls */}
              <div className="flex justify-center items-center gap-6">
                <button className="text-white hover:text-white/80 transition-colors">
                  <RotateCcw size={24} />
                </button>
                <button className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors">
                  <Play size={24} className="text-black ml-1" fill="black" />
                </button>
                <button className="text-white hover:text-white/80 transition-colors">
                  <RotateCw size={24} />
                </button>
                <button className="text-white hover:text-white/80 transition-colors">
                  <Square size={20} fill="white" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="relative h-1 bg-white/30 rounded-full overflow-hidden">
                  <div className="absolute inset-y-0 left-0 w-[40%] bg-white rounded-full"></div>
                </div>
                <div className="flex justify-between text-white text-xs">
                  <span>04:07</span>
                  <span>10:17</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sessions List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {meditationData.sessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className={`flex items-start justify-between ${
                  session.isLocked ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                {/* Left Side - Play Icon and Session Info */}
                <div className="flex items-start gap-3">
                  {/* Play Icon */}
                  {!session.isLocked && (
                    <Play size={20} className="text-white mt-0.5" />
                  )}
                  
                  <div>
                    <h3 className="text-white text-base md:text-lg">
                      {session.id}. {session.title}
                    </h3>
                    <p className="text-white/70 text-sm mt-0.5">
                      {session.duration}
                    </p>
                  </div>
                </div>

                {/* Right Side - Heart or Lock Icon */}
                <div>
                  {session.isLocked ? (
                    <Lock size={20} className="text-white/70" />
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(session.id);
                      }}
                      className="transition-colors"
                    >
                      <Heart
                        size={20}
                        className={
                          favorites.has(session.id)
                            ? "text-red-500 fill-red-500"
                            : "text-white/70 hover:text-red-500"
                        }
                      />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
