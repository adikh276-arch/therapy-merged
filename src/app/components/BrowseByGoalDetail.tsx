import React from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import Slider from "react-slick";

export function BrowseByGoalDetail() {
  const navigate = useNavigate();
  const sliderRef = React.useRef<Slider>(null);

  const firstNights = [
    {
      title: "LET'S GO",
      subtitle: "Get Started",
      number: "",
      image: "https://images.unsplash.com/photo-1607551848581-7ee851bf978b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHJlbGF4aW5nJTIwbWVkaXRhdGlvbiUyMHBlYWNlZnVsfGVufDF8fHx8MTc3MzQ3NDc1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "NIGHT 1",
      subtitle: "Begin Your Journey",
      number: "1",
      image: "https://images.unsplash.com/photo-1607551848581-7ee851bf978b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHJlbGF4aW5nJTIwbWVkaXRhdGlvbiUyMHBlYWNlZnVsfGVufDF8fHx8MTc3MzQ3NDc1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "NIGHT 2",
      subtitle: "Deepen Your Practice",
      number: "2",
      image: "https://images.unsplash.com/photo-1686828752365-1f90f9c502b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNsZWVwaW5nJTIwYmVkJTIwcGVhY2VmdWx8ZW58MXx8fHwxNzczNDc0NzUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "NIGHT 3",
      subtitle: "Find Your Rhythm",
      number: "3",
      image: "https://images.unsplash.com/photo-1764067037164-93d0986881fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb29uJTIwc3RhcnMlMjBuaWdodCUyMG1lZGl0YXRpb258ZW58MXx8fHwxNzczNDc0NzU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "NIGHT 4",
      subtitle: "Embrace Stillness",
      number: "4",
      image: "https://images.unsplash.com/photo-1547309987-23a7baf6ec8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zZXQlMjBjbG91ZHMlMjBkcmFtYXRpYyUyMHNreXxlbnwxfHx8fDE3NzMzOTk2NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  const fallAsleepItems = [
    {
      title: "The Cloak of Invisibility",
      subtitle: "John Hancock · Sleep Fiction",
      image: "https://images.unsplash.com/photo-1715043566038-db1f5ad3a405?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBzaWduJTIwdmludGFnZSUyMGNhbGxpZ3JhcGh5fGVufDF8fHx8MTc3MzQ3NDc1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "Infinite Piano for Sleep",
      subtitle: "Emery Wren",
      image: "https://images.unsplash.com/photo-1761192922491-a45fdbdb4732?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaWFubyUyMGtleXMlMjBtdXNpYyUyMG1vb2R8ZW58MXx8fHwxNzczNDc0NzU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "Rain on Tent",
      subtitle: "Soundscapes",
      image: "https://images.unsplash.com/photo-1766353392086-bbec394ab3c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjByZWFkaW5nJTIwYm9vayUyMGNvenl8ZW58MXx8fHwxNzczNDc0NzUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "Ocean Waves",
      subtitle: "Nature Sounds",
      image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHdhdmVzJTIwY2FsbSUyMGJsdWV8ZW58MXx8fHwxNzQyMDcyNDczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  const seriesCards = [
    {
      title: "You're In The Right Place",
      subtitle: "Series",
      image: "https://images.unsplash.com/photo-1686828752365-1f90f9c502b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNsZWVwaW5nJTIwYmVkJTIwcGVhY2VmdWx8ZW58MXx8fHwxNzczNDc0NzUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "Where To Get Started",
      subtitle: "Series",
      image: "https://images.unsplash.com/photo-1607551848581-7ee851bf978b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHJlbGF4aW5nJTIwbWVkaXRhdGlvbiUyMHBlYWNlZnVsfGVufDF8fHx8MTc3MzQ3NDc1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  const sleepStories = [
    {
      title: "The Nordkapp Night Train",
      subtitle: "Erik Braa",
      image: "https://images.unsplash.com/photo-1663439834327-0543fc552131?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHRyYWlsJTIwaGlraW5nJTIwcGF0aHxlbnwxfHx8fDE3NzM0MDAyMzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "Dream With Me",
      subtitle: "Amy Wiley",
      image: "https://images.unsplash.com/photo-1659431245880-4e9ad1225f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBwYXRoJTIwZ3JlZW4lMjB0cmVlc3xlbnwxfHx8fDE3NzM0NzQ3NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "Wonder",
      subtitle: "John Hancock",
      image: "https://images.unsplash.com/photo-1740109955387-1fa2250afd38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdXJwbGUlMjBtb29uJTIwb2NlYW4lMjByZWZsZWN0aW9uJTIwbmlnaHR8ZW58MXx8fHwxNzczNDc0NzUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "Tranquil Waters",
      subtitle: "Sarah Martinez",
      image: "https://images.unsplash.com/photo-1730977450521-3de0731695af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMGxha2UlMjBzdW5zZXQlMjBuYXR1cmV8ZW58MXx8fHwxNzczNDc5MDI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  const sleepMeditations = [
    {
      title: "Drifting Off with Gratitude",
      subtitle: "Tamara Levitt",
      image: "https://images.unsplash.com/photo-1764067037164-93d0986881fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb29uJTIwc3RhcnMlMjBuaWdodCUyMG1lZGl0YXRpb258ZW58MXx8fHwxNzczNDc0NzU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "Deep Sleep Release",
      subtitle: "Tamara Levitt",
      image: "https://images.unsplash.com/photo-1547309987-23a7baf6ec8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zZXQlMjBjbG91ZHMlMjBkcmFtYXRpYyUyMHNreXxlbnwxfHx8fDE3NzMzOTk2NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "Body Scan for Sleep",
      subtitle: "Tamara Levitt",
      image: "https://images.unsplash.com/photo-1617484784581-24a2e6f80505?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFycnklMjBuaWdodCUyMHNreSUyMHB1cnBsZXxlbnwxfHx8fDE3NzMzNjcyODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "Peaceful Mind Meditation",
      subtitle: "Tamara Levitt",
      image: "https://images.unsplash.com/photo-1579291465300-106653a86c92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwY2FuZGxlcyUyMGNhbG0lMjB6ZW58ZW58MXx8fHwxNzczNDc5MDI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  // Carousel custom arrows
  const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="w-9 h-9 rounded-full bg-[#1a2744] border border-[#313D57] flex items-center justify-center text-white hover:bg-[#313D57] transition-colors shadow-lg"
      >
        <ChevronRight size={18} />
      </button>
    );
  };

  const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="w-9 h-9 rounded-full bg-[#1a2744] border border-[#313D57] flex items-center justify-center text-white hover:bg-[#313D57] transition-colors shadow-lg mr-2"
      >
        <ChevronLeft size={18} />
      </button>
    );
  };

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
              src="https://images.unsplash.com/photo-1740109955387-1fa2250afd38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdXJwbGUlMjBtb29uJTIwb2NlYW4lMjByZWZsZWN0aW9uJTIwbmlnaHR8ZW58MXx8fHwxNzczNDc0NzUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Fall Asleep"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent"></div>
            
            {/* Back button */}
            <button
              onClick={() => navigate(-1)}
              className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Hero Text */}
            <div className="absolute bottom-6 left-6">
              <h1 className="text-3xl md:text-4xl text-white font-semibold mb-2">Fall Asleep</h1>
              <p className="text-sm md:text-base text-white/90">Establish a relaxing routine in 5 days steps</p>
            </div>
          </motion.div>

          {/* Your First 5 Nights */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base md:text-lg text-white mb-1">Your First 5 Nights With Mantra</h2>
                <p className="text-xs text-slate-400">Plan and begin from tomorrow</p>
              </div>
              <div className="flex items-center gap-0">
                <button
                  onClick={() => sliderRef.current?.slickPrev()}
                  className="w-9 h-9 rounded-full bg-[#1a2744] border border-[#313D57] flex items-center justify-center text-white hover:bg-[#313D57] transition-colors shadow-lg mr-2"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => sliderRef.current?.slickNext()}
                  className="w-9 h-9 rounded-full bg-[#1a2744] border border-[#313D57] flex items-center justify-center text-white hover:bg-[#313D57] transition-colors shadow-lg"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <div className="relative carousel-container">
              <Slider ref={sliderRef} {...carouselSettings}>
                {firstNights.map((night, i) => (
                  <div key={i} className="px-2">
                    <motion.button
                      onClick={() => navigate('/meditation-detail/1')}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.97 }}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                      className="group relative w-full"
                    >
                      <div className="aspect-square rounded-xl overflow-hidden mb-2 shadow-lg relative">
                        <ImageWithFallback
                          src={night.image}
                          alt={night.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        
                        {/* Number badge for nights */}
                        {night.number && (
                          <div className="absolute top-3 left-3 w-12 h-12 rounded-lg bg-[#00c0ff] flex items-center justify-center">
                            <span className="text-white text-xl font-bold">{night.number}</span>
                          </div>
                        )}
                        
                        {/* Title overlay */}
                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="text-white text-sm md:text-base font-semibold mb-0.5">{night.title}</h3>
                          <p className="text-white/80 text-xs">{night.subtitle}</p>
                        </div>
                      </div>
                    </motion.button>
                  </div>
                ))}
              </Slider>
            </div>
          </motion.div>

          {/* Easy Tips Banner */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <motion.button
              onClick={() => navigate('/meditation-detail/1')}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="w-full group relative"
            >
              <div className="aspect-[21/9] md:aspect-[3/1] rounded-xl overflow-hidden shadow-lg relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1686828752365-1f90f9c502b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNsZWVwaW5nJTIwYmVkJTIwcGVhY2VmdWx8ZW58MXx8fHwxNzczNDc0NzUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Easy Tips for Better Sleep"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
                
                <div className="absolute inset-0 flex flex-col justify-center px-6">
                  <h2 className="text-xl md:text-2xl text-white font-semibold italic mb-1">Easy Tips</h2>
                  <h2 className="text-xl md:text-2xl text-white font-semibold italic mb-2">for Better Sleep</h2>
                  <p className="text-xs text-white/90">From expert Dr. Matthew Walker</p>
                </div>
              </div>
            </motion.button>
          </motion.div>

          {/* Fall Asleep Section */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base md:text-lg text-white">Fall Asleep</h2>
              <button className="text-xs text-[#00c0ff] hover:underline">See All</button>
            </div>

            <div className="grid grid-cols-4 gap-3 md:gap-4">
              {fallAsleepItems.map((item, i) => (
                <motion.button
                  key={i}
                  onClick={() => navigate('/meditation-detail/1')}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 + i * 0.05 }}
                  className="group"
                >
                  <div className="aspect-square rounded-xl overflow-hidden mb-2 shadow-lg">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-sm text-white mb-1 text-left">{item.title}</h3>
                  <p className="text-xs text-slate-400 text-left">{item.subtitle}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Popular Sleep Stories */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base md:text-lg text-white">Popular Sleep Stories</h2>
              <button className="text-xs text-[#00c0ff] hover:underline">See All</button>
            </div>

            <div className="grid grid-cols-4 gap-3 md:gap-4">
              {sleepStories.map((story, i) => (
                <motion.button
                  key={i}
                  onClick={() => navigate('/meditation-detail/1')}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                  className="group"
                >
                  <div className="aspect-square rounded-xl overflow-hidden mb-2 shadow-lg">
                    <ImageWithFallback
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-sm text-white mb-1 text-left">{story.title}</h3>
                  <p className="text-xs text-slate-400 text-left">{story.subtitle}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Sleep Meditations */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base md:text-lg text-white">Sleep Meditations</h2>
              <button className="text-xs text-[#00c0ff] hover:underline">See All</button>
            </div>

            <div className="grid grid-cols-4 gap-3 md:gap-4">
              {sleepMeditations.map((meditation, i) => (
                <motion.button
                  key={i}
                  onClick={() => navigate('/meditation-detail/1')}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.35 + i * 0.05 }}
                  className="group"
                >
                  <div className="aspect-square rounded-xl overflow-hidden mb-2 shadow-lg">
                    <ImageWithFallback
                      src={meditation.image}
                      alt={meditation.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-sm text-white mb-1 text-left">{meditation.title}</h3>
                  <p className="text-xs text-slate-400 text-left">{meditation.subtitle}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Track Your Sleep Banner */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.button
              onClick={() => navigate('/meditation-detail/1')}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="w-full group relative"
            >
              <div className="aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden shadow-lg relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1617484784581-24a2e6f80505?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFycnklMjBuaWdodCUyMHNreSUyMHB1cnBsZXxlbnwxfHx8fDE3NzMzNjcyODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Track Your Sleep"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
                  <h2 className="text-2xl md:text-3xl text-white font-semibold text-center italic mb-1">How did you</h2>
                  <h2 className="text-2xl md:text-3xl text-white font-semibold text-center italic mb-4">sleep?</h2>
                  <p className="text-sm text-white/90">Check-in</p>
                </div>
              </div>
            </motion.button>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
