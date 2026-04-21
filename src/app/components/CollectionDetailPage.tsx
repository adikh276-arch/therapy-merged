import React from "react";
import { useNavigate, useParams } from "react-router";
import { ChevronLeft, ChevronRight, Play, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import Slider from "react-slick";
import meditationThumb from "figma:asset/df7c6ecf7eaa8aeb924cfeda9cfbe2e7536f022e.png";

export function CollectionDetailPage() {
  const navigate = useNavigate();
  const { collectionId } = useParams();
  const sliderRef = React.useRef<Slider>(null);

  // Mock data for collections
  const collections = {
    "1": {
      title: "For Students",
      subtitle: "Supportive meditations, music and movement sessions to help you find your calm no matter what school throws your way.",
      heroImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&h=800"
    },
    "2": {
      title: "Morning Rituals",
      subtitle: "Start your day with intention and energy",
      heroImage: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&h=800"
    },
    "3": {
      title: "Sleep Better",
      subtitle: "Wind down for restful sleep",
      heroImage: "https://images.unsplash.com/photo-1511295742362-92c96b1cf484?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&h=800"
    }
  };

  const collection = collections[collectionId as keyof typeof collections] || collections["1"];

  const featuredSessions = [
    {
      title: "START HERE",
      subtitle: "Getting Started",
      number: "",
      image: "https://images.unsplash.com/photo-1607551848581-7ee851bf978b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&h=600"
    },
    {
      title: "SESSION 1",
      subtitle: "Morning Energy",
      number: "1",
      image: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&h=600"
    },
    {
      title: "SESSION 2",
      subtitle: "Midday Focus",
      number: "2",
      image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&h=600"
    },
    {
      title: "SESSION 3",
      subtitle: "Evening Calm",
      number: "3",
      image: "https://images.unsplash.com/photo-1545389336-cf090694435e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&h=600"
    },
    {
      title: "SESSION 4",
      subtitle: "Night Rest",
      number: "4",
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&h=600"
    }
  ];

  const quickMeditations = [
    {
      title: "Calming Anxiety",
      subtitle: "Tamara Levitt",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&h=200"
    },
    {
      title: "Focus & Clarity",
      subtitle: "John Hancock",
      image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&h=200"
    },
    {
      title: "Deep Relaxation",
      subtitle: "Sarah Chen",
      image: "https://images.unsplash.com/photo-1545389336-cf090694435e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&h=200"
    },
    {
      title: "Mindful Breathing",
      subtitle: "Tamara Levitt",
      image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&h=200"
    }
  ];

  const guidedPractices = [
    {
      title: "Morning Gratitude",
      subtitle: "Sarah Martinez",
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&h=200"
    },
    {
      title: "Evening Wind Down",
      subtitle: "Erik Braa",
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&h=200"
    },
    {
      title: "Stress Relief",
      subtitle: "Amy Wiley",
      image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&h=200"
    },
    {
      title: "Ocean Waves",
      subtitle: "Soundscapes",
      image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&h=200"
    }
  ];

  const musicSessions = [
    {
      title: "Infinite Piano for Focus",
      subtitle: "Emery Wren",
      image: "https://images.unsplash.com/photo-1761192922491-a45fdbdb4732?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&h=200"
    },
    {
      title: "Calm Classical",
      subtitle: "Music",
      image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&h=200"
    },
    {
      title: "Nature Sounds",
      subtitle: "Soundscapes",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&h=200"
    },
    {
      title: "Rain on Leaves",
      subtitle: "Soundscapes",
      image: "https://images.unsplash.com/photo-1766353392086-bbec394ab3c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&h=200"
    }
  ];

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="flex min-h-screen bg-[#0a1628]">
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="max-w-[1000px] w-full mx-auto px-4 md:px-6 py-4 md:py-10 pt-10">
          {/* Hero Section */}
          <motion.div
            className="relative rounded-2xl overflow-hidden mb-6 h-[280px] md:h-[320px]"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ImageWithFallback
              src={collection.heroImage}
              alt={collection.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/60 via-transparent to-transparent"></div>
            
            {/* Back button */}
            <button
              onClick={() => navigate(-1)}
              className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
          </motion.div>

          {/* Title Section */}
          <motion.div
            className="mb-8 px-1"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="text-4xl md:text-5xl text-white font-bold mb-4 leading-tight tracking-tight">{collection.title}</h1>
            <p className="text-[15px] md:text-[17px] text-white/65 leading-relaxed max-w-[800px]">{collection.subtitle}</p>
          </motion.div>

          {/* Meditation List Section */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <div className="space-y-2.5">
              {[
                { 
                  title: "Self Care Resources", 
                  category: "Meditation", 
                  duration: "5 min", 
                  image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&h=200"
                },
                { 
                  title: "Meditation Basics", 
                  category: "Guided", 
                  duration: "10 min",
                  image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&h=200"
                },
                { 
                  title: "Breathing Exercises", 
                  category: "Meditation", 
                  duration: "7 min",
                  image: "https://images.unsplash.com/photo-1545389336-cf090694435e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&h=200"
                },
                { 
                  title: "Stress Management", 
                  category: "Series", 
                  duration: "12 min",
                  image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&h=200"
                },
                { 
                  title: "Sleep Soundscapes", 
                  category: "Sleep", 
                  duration: "15 min",
                  image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&h=200"
                }
              ].map((item, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => navigate('/meditation-detail/1')}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + idx * 0.05 }}
                  className="w-full flex items-center gap-4 bg-gradient-to-r from-[#1a2744] to-[#1e2d4f] hover:from-[#243554] hover:to-[#283a60] rounded-2xl p-3.5 transition-all group shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20 border border-white/5"
                >
                  {/* Thumbnail Image */}
                  <div className="relative w-[72px] h-[72px] rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30"></div>
                    {/* Play Overlay */}
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <motion.div 
                        className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Play size={16} className="text-[#0a1628] fill-[#0a1628] ml-0.5" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 text-left">
                    <h3 className="text-white text-[17px] font-semibold mb-2 leading-tight group-hover:text-white/95 transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2.5 text-[13px]">
                      <span className="text-white/60 font-medium">{item.category}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20"></span>
                      <span className="text-white/50">{item.duration}</span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 group-hover:bg-white/10 flex items-center justify-center transition-all">
                    <ChevronRight size={18} className="text-white/40 group-hover:text-white/70 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
