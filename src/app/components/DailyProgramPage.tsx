import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Headphones, BookOpen, Clock, Award } from "lucide-react";
import { motion } from "framer-motion";

interface ProgramItem {
  id: number;
  title: string;
  type: "Audio" | "Exercise";
  duration: string;
  points: number;
  icon: "headphones" | "book";
  completed: boolean;
}

export function DailyProgramPage() {
  const navigate = useNavigate();
  
  const [programItems, setProgramItems] = useState<ProgramItem[]>([
    {
      id: 1,
      title: "Gratitude Meditation Session",
      type: "Audio",
      duration: "8 min",
      points: 5,
      icon: "headphones",
      completed: false
    },
    {
      id: 2,
      title: "Meditation for Inner Peace",
      type: "Audio",
      duration: "12 min",
      points: 10,
      icon: "headphones",
      completed: false
    },
    {
      id: 3,
      title: "Thought Patterns",
      type: "Exercise",
      duration: "6 min",
      points: 5,
      icon: "book",
      completed: false
    },
    {
      id: 4,
      title: "Emotional Awareness",
      type: "Exercise",
      duration: "5 min",
      points: 5,
      icon: "book",
      completed: false
    },
    {
      id: 5,
      title: "Nervous System Check",
      type: "Exercise",
      duration: "7 min",
      points: 5,
      icon: "book",
      completed: false
    }
  ]);

  const toggleCompletion = (id: number) => {
    setProgramItems(items =>
      items.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <>
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
              <div className="flex items-center gap-2.5 mb-2">
                {/* Back Arrow */}
                <button
                  onClick={() => navigate(-1)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors flex-shrink-0 text-white hover:bg-[#1a2744]"
                >
                  <ChevronLeft size={24} />
                </button>

                <div className="flex-1">
                  <h1 className="text-xl md:text-2xl text-white">Daily Program</h1>
                </div>
              </div>
              <p className="text-xs md:text-sm leading-relaxed text-slate-300 pl-[46px]">
                Complete your daily mindfulness activities and earn points
              </p>
            </motion.div>

            {/* Summary */}
            <motion.div
              className="mb-6 bg-gradient-to-br from-[#1a2744] to-[#0f172a] border border-slate-700/50 rounded-2xl p-5"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold text-base mb-1">
                    Today's Progress
                  </h3>
                  <p className="text-slate-400 text-sm">
                    {programItems.filter(item => item.completed).length} of {programItems.length} activities completed
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-[#00c0ff] text-2xl font-bold">
                    {programItems
                      .filter(item => item.completed)
                      .reduce((sum, item) => sum + item.points, 0)}
                  </div>
                  <div className="text-slate-400 text-xs">Points Earned</div>
                </div>
              </div>
            </motion.div>

            {/* Program Items List */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {programItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                  className="bg-[#1a2744] hover:bg-[#1f3060] rounded-2xl p-4 transition-all duration-300 group cursor-pointer"
                  onClick={() => navigate('/meditation-detail/1')}
                >
                  <div className="flex items-center gap-4">
                    {/* Checkbox */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCompletion(item.id);
                      }}
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        item.completed
                          ? 'border-[#00c0ff] bg-[#00c0ff]'
                          : 'border-slate-500 hover:border-slate-400'
                      }`}
                    >
                      {item.completed && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </button>

                    {/* Icon */}
                    <div className="w-12 h-12 bg-[#313D57] rounded-xl flex items-center justify-center flex-shrink-0">
                      {item.icon === "headphones" ? (
                        <Headphones size={22} className="text-white" />
                      ) : (
                        <BookOpen size={22} className="text-white" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium text-[15px] mb-1.5">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Type Badge */}
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-[#0a1628] text-white">
                          {item.type}
                        </span>

                        {/* Duration */}
                        <div className="flex items-center gap-1 text-slate-400 text-xs">
                          <Clock size={13} />
                          <span>{item.duration}</span>
                        </div>

                        {/* Points */}
                        <div className="flex items-center gap-1 text-slate-400 text-xs">
                          <Award size={13} />
                          <span>{item.points} Points</span>
                        </div>
                      </div>
                    </div>

                    {/* Arrow */}
                    <ChevronRight
                      size={20}
                      className="text-slate-500 group-hover:text-slate-400 transition-colors flex-shrink-0"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </main>
        </div>
      </div>
    </>
  );
}
