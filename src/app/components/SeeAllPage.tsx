import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Sparkles, Star, Target, Layers } from "lucide-react";
import { motion } from "framer-motion";

export function SeeAllPage() {
  const navigate = useNavigate();
  const { section } = useParams();

  // Get the section title
  const getSectionTitle = () => {
    if (!section) return "All Content";
    return section
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Get section icon and description
  const getSectionInfo = () => {
    switch (section) {
      case "featured-on-mantra":
        return {
          icon: Sparkles,
          description: "Curated selections handpicked by our mindfulness experts"
        };
      case "new-and-noteworthy":
        return {
          icon: Star,
          description: "Latest additions and trending content for your practice"
        };
      case "browse-by-goal":
        return {
          icon: Target,
          description: "Discover meditations tailored to your specific intentions"
        };
      case "featured-collections":
        return {
          icon: Layers,
          description: "Thoughtfully organized collections for every journey"
        };
      default:
        return {
          icon: Sparkles,
          description: "Explore our complete library of mindfulness content"
        };
    }
  };

  const sectionInfo = getSectionInfo();
  const SectionIcon = sectionInfo.icon;

  // Mock data for browse by goal items
  const browseByGoalItems = [
    {
      id: 1,
      title: "For Beginners",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&h=400"
    },
    {
      id: 2,
      title: "Coping with Grief",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&h=400"
    },
    {
      id: 3,
      title: "Better Sleep",
      image: "https://images.unsplash.com/photo-1511295742362-92c96b1cf484?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&h=400"
    },
    {
      id: 4,
      title: "Stress Relief",
      image: "https://images.unsplash.com/photo-1545389336-cf090694435e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&h=400"
    },
    {
      id: 5,
      title: "Focus & Productivity",
      image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&h=400"
    },
    {
      id: 6,
      title: "Self-Love",
      image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&h=400"
    },
    {
      id: 7,
      title: "Anxiety Relief",
      image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&h=400"
    },
    {
      id: 8,
      title: "Morning Motivation",
      image: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&h=400"
    },
    {
      id: 9,
      title: "Gratitude Practice",
      image: "https://images.unsplash.com/photo-1533577116850-9cc66cad8a9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&h=400"
    },
    {
      id: 10,
      title: "Inner Peace",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&h=400"
    },
    {
      id: 11,
      title: "Compassion",
      image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&h=400"
    },
    {
      id: 12,
      title: "Emotional Balance",
      image: "https://images.unsplash.com/photo-1502139214982-d0ad755818d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&h=400"
    }
  ];

  // Mock data for content items
  const contentItems = [
    {
      id: 1,
      title: "Calming Anxiety",
      duration: "5 min",
      category: "Meditation",
      tags: ["Mindfulness", "Restore"],
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=300"
    },
    {
      id: 2,
      title: "Skills for Deep Relaxation",
      duration: "10 min",
      category: "Guided",
      tags: ["Curated by Mind", "Restorative"],
      image: "https://images.unsplash.com/photo-1597589022928-bb4002c099d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=300"
    },
    {
      id: 3,
      title: "Inner Peace Journey",
      duration: "8 min",
      category: "Guided",
      tags: ["Peace", "Breath"],
      image: "https://images.unsplash.com/photo-1602088113235-229c19758e9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=300"
    },
    {
      id: 4,
      title: "Mountain Stillness",
      duration: "12 min",
      category: "Sleep",
      tags: ["Nature", "Relax"],
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=300"
    },
    {
      id: 5,
      title: "Morning Mindfulness",
      duration: "7 min",
      category: "Meditation",
      tags: ["Mindfulness", "Energy"],
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=300"
    },
    {
      id: 6,
      title: "Evening Calm",
      duration: "15 min",
      category: "Sleep",
      tags: ["Relaxation", "Night"],
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=300"
    },
    {
      id: 7,
      title: "Stress Relief",
      duration: "6 min",
      category: "Meditation",
      tags: ["Calm", "Focus"],
      image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=300"
    },
    {
      id: 8,
      title: "Ocean Waves",
      duration: "20 min",
      category: "Soundscapes",
      tags: ["Nature", "Sleep"],
      image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=300"
    },
    {
      id: 9,
      title: "Body Scan",
      duration: "12 min",
      category: "Guided",
      tags: ["Relaxation", "Awareness"],
      image: "https://images.unsplash.com/photo-1545389336-cf090694435e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=300"
    },
    {
      id: 10,
      title: "Peaceful Garden",
      duration: "9 min",
      category: "Meditation",
      tags: ["Peace", "Nature"],
      image: "https://images.unsplash.com/photo-1517817748493-49ec54a32465?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=300"
    },
    {
      id: 11,
      title: "Deep Breathing",
      duration: "5 min",
      category: "Guided",
      tags: ["Breathwork", "Calm"],
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=300"
    },
    {
      id: 12,
      title: "Forest Bath",
      duration: "18 min",
      category: "Soundscapes",
      tags: ["Nature", "Relax"],
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=300"
    }
  ];

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
            <div className="flex items-center gap-2.5 mb-2">
              {/* Back Arrow */}
              <button
                onClick={() => navigate(-1)}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors flex-shrink-0 text-white hover:bg-[#1a2744]"
              >
                <ChevronLeft size={24} />
              </button>
              
              {/* Section Icon */}
              <div className="w-9 h-9 rounded-xl bg-[#1a2744] flex items-center justify-center flex-shrink-0">
                <SectionIcon size={20} className="text-white" />
              </div>

              <div className="flex-1">
                <h1 className="text-xl md:text-2xl text-white">{getSectionTitle()}</h1>
              </div>
            </div>
            <p className="text-xs md:text-sm leading-relaxed text-slate-300 pl-[108px]">
              {sectionInfo.description}
            </p>
          </motion.div>

          {/* Content Grid - 3 rows of 4 items each */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
          >
            {section === "browse-by-goal" ? (
              browseByGoalItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => navigate(`/browse-by-goal-detail/${item.id}`)}
                >
                  {/* Image Container */}
                  <div className="relative rounded-2xl overflow-hidden mb-2 aspect-square bg-[#1a2744]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Content Info */}
                  <div className="px-1">
                    <h4 className="text-white text-sm md:text-base font-medium mb-1 line-clamp-1">
                      {item.title}
                    </h4>
                  </div>
                </motion.div>
              ))
            ) : section === "featured-collections" ? (
              browseByGoalItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => navigate(`/collection-detail/${item.id}`)}
                >
                  {/* Image Container */}
                  <div className="relative rounded-2xl overflow-hidden mb-2 aspect-square bg-[#1a2744]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Content Info */}
                  <div className="px-1">
                    <h4 className="text-white text-sm md:text-base font-medium mb-1 line-clamp-1">
                      {item.title}
                    </h4>
                  </div>
                </motion.div>
              ))
            ) : (
              contentItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => navigate(`/meditation-detail/${item.id}`)}
                >
                  {/* Image Container */}
                  <div className="relative rounded-2xl overflow-hidden mb-2 aspect-square bg-[#1a2744]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Content Info */}
                  <div className="px-1">
                    <h4 className="text-white text-sm md:text-base font-medium mb-1 line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-slate-400 text-xs md:text-sm mb-1">
                      {item.duration} • {item.category} • {item.tags.join(" • ")}
                    </p>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
