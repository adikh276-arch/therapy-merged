import { useState, useEffect } from "react";
import { ArrowLeft, Share2, RefreshCw, Smile, Sun, Coffee, Moon, Cloud, Meh, Frown, Save, Sparkles, Check, MoreHorizontal, X, CheckCircle2, ChevronLeft, Edit2, Filter } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const serviceOptions = [
  { id: "all", label: "All Services" },
  { id: "therapy", label: "Therapy" },
  { id: "psychiatry", label: "Psychiatry" },
  { id: "coaching", label: "Life Coaching" },
  { id: "nutrition", label: "Nutrition" },
  { id: "fitness", label: "Fitness" },
  { id: "mindfulness", label: "Mindfulness" },
  { id: "sleep", label: "Sleep Therapy" },
  { id: "couples", label: "Couples Therapy" },
  { id: "teen", label: "Teen Counseling" },
  { id: "career", label: "Career Counseling" },
  { id: "substance", label: "Substance Abuse" },
  { id: "grief", label: "Grief Counseling" }
];

const moodOptions = [
  { id: "great", icon: Smile, label: "Great", color: "#10B981" },
  { id: "good", icon: Sun, label: "Good", color: "#3B82F6" },
  { id: "okay", icon: Meh, label: "Okay", color: "#F59E0B" },
  { id: "sad", icon: Frown, label: "Sad", color: "#EF4444" },
  { id: "anxious", icon: Cloud, label: "Anxious", color: "#8B5CF6" },
];

const timeOfDayOptions = [
  { id: "morning", icon: Sun, label: "Morning" },
  { id: "afternoon", icon: Coffee, label: "Afternoon" },
  { id: "evening", icon: Cloud, label: "Evening" },
  { id: "night", icon: Moon, label: "Night" },
];

const suggestionPrompts = [
  "What are three things you're grateful for today?",
  "Describe a moment that made you smile recently",
  "What's something you learned about yourself this week?",
  "Write about a challenge you overcame",
  "What are your intentions for tomorrow?",
  "Reflect on a meaningful conversation you had",
  "What's bringing you peace right now?",
  "Describe your ideal day",
  "What habits are you proud of building?",
  "Write a letter to your future self"
];

const categorizedSuggestions = [
  {
    category: "Depression",
    prompts: [
      "What small victories did you achieve today, no matter how minor?",
      "Describe a moment when you felt a glimmer of hope or peace",
      "What self-care activity could you do today to nurture yourself?",
      "Write about someone or something that makes you feel supported",
      "What would you tell a friend who was feeling the way you do?",
      "List three things in your environment that bring you comfort"
    ]
  },
  {
    category: "Anxiety",
    prompts: [
      "What are you worried about right now? Is it within your control?",
      "Describe a time when you overcame a worry that didn't come true",
      "What physical sensations are you experiencing? Describe them without judgment",
      "Write a letter to your anxiety, acknowledging it but setting boundaries",
      "What grounding techniques help you feel more centered?",
      "List three things you can see, hear, and feel right now"
    ]
  },
  {
    category: "Gratitude",
    prompts: [
      "What are three things you're grateful for today?",
      "Describe a person who has positively impacted your life recently",
      "What simple pleasure brought you joy this week?",
      "Write about a skill or strength you're grateful to have",
      "What aspect of your daily routine are you thankful for?",
      "Reflect on a difficult experience that taught you something valuable"
    ]
  },
  {
    category: "Self-Discovery",
    prompts: [
      "What's something you learned about yourself this week?",
      "Describe your ideal day from morning to night",
      "What values are most important to you and why?",
      "Write about a moment when you felt most like yourself",
      "What habits are you proud of building?",
      "What does success mean to you personally?"
    ]
  },
  {
    category: "Relationships",
    prompts: [
      "Reflect on a meaningful conversation you had recently",
      "What do you appreciate most about your closest relationships?",
      "Describe a boundary you need to set or maintain",
      "Write about how you've grown in your relationships",
      "What kind of support do you need from others right now?",
      "How do you show love and care to the people around you?"
    ]
  },
  {
    category: "Goals & Growth",
    prompts: [
      "What are your intentions for tomorrow?",
      "Write about a challenge you overcame and what you learned",
      "Describe a goal you're working toward and why it matters",
      "What's one small step you can take today toward your dreams?",
      "Write a letter to your future self one year from now",
      "What limiting belief are you ready to let go of?"
    ]
  }
];

// Mock data for demonstration (in real app, this would come from a database or API)
const sampleEntries = [
  {
    id: "1",
    date: new Date(2026, 2, 9, 9, 41),
    title: "What are three things you're grateful for today?",
    content: "Start with writing what's on your mind. Journaling is a powerful tool for self-reflection and mental clarity. Take a moment each day to capture your thoughts, feelings, and experiences. I'm especially grateful for my morning coffee ritual, the sunshine streaming through my window, and the phone call with an old friend that reminded me how much I value deep connections.",
    mood: "great",
    tags: ["reflection", "morning", "gratitude"],
    timeOfDay: "morning",
    shareWithProvider: false
  },
  {
    id: "2",
    date: new Date(2026, 2, 8, 14, 30),
    title: "Afternoon Reflections",
    content: "Today was productive. I managed to complete most of my tasks and felt a sense of accomplishment. Taking breaks throughout the day really helped maintain my energy levels. I practiced the pomodoro technique and it made such a difference in staying focused without burning out.",
    mood: "good",
    tags: ["productivity", "self-care"],
    timeOfDay: "afternoon",
    shareWithProvider: true
  },
  {
    id: "3",
    date: new Date(2026, 2, 7, 21, 15),
    title: "Evening Thoughts",
    content: "Spent quality time with family tonight. It's important to disconnect from work and be present with loved ones. Grateful for these moments. We played board games and laughed until our stomachs hurt. These are the memories I want to hold onto.",
    mood: "great",
    tags: ["gratitude", "family"],
    timeOfDay: "evening",
    shareWithProvider: false
  },
  {
    id: "4",
    date: new Date(2026, 2, 6, 8, 20),
    title: "Morning Clarity",
    content: "Woke up early today and did some meditation. Starting the day mindfully makes such a difference in how I handle challenges throughout the day. I noticed my thoughts without judgment and felt a sense of calm that carried through the morning.",
    mood: "okay",
    tags: ["meditation", "mindfulness"],
    timeOfDay: "morning",
    shareWithProvider: true
  },
  {
    id: "5",
    date: new Date(2026, 2, 5, 19, 45),
    title: "Overcoming Challenges",
    content: "Had a difficult day with some unexpected obstacles. But I'm learning that challenges are opportunities for growth. One step at a time. I reminded myself that it's okay to not have all the answers right away, and that asking for help is a sign of strength, not weakness.",
    mood: "sad",
    tags: ["growth", "resilience"],
    timeOfDay: "evening",
    shareWithProvider: true
  }
];

export function JournalNew() {
  const navigate = useNavigate();
  const { id: entryId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState<string | null>(null);
  const [showSuggestion, setShowSuggestion] = useState(true);
  const [currentSuggestion, setCurrentSuggestion] = useState(suggestionPrompts[0]);
  const [shareWithProvider, setShareWithProvider] = useState(false);
  const [showSuggestionsModal, setShowSuggestionsModal] = useState(false);
  const [selectedService, setSelectedService] = useState("all");

  useEffect(() => {
    if (entryId) {
      // Simulate fetching entry from a database
      const entry = sampleEntries.find(e => e.id === entryId);
      if (entry) {
        setTitle(entry.title);
        setContent(entry.content);
        setSelectedMood(entry.mood);
        setSelectedTimeOfDay(entry.timeOfDay);
        setShareWithProvider(entry.shareWithProvider);
        setShowSuggestion(false);
      }
    }
  }, [entryId]);

  const handleRefreshSuggestion = () => {
    const currentIndex = suggestionPrompts.indexOf(currentSuggestion);
    const nextIndex = (currentIndex + 1) % suggestionPrompts.length;
    setCurrentSuggestion(suggestionPrompts[nextIndex]);
  };

  const handleCheckSuggestion = () => {
    setTitle(currentSuggestion);
    setShowSuggestion(false);
  };

  const handleSelectPrompt = (prompt: string) => {
    setTitle(prompt);
    setCurrentSuggestion(prompt);
    setShowSuggestionsModal(false);
    setShowSuggestion(false);
  };

  const handleSave = () => {
    // In a real app, this would save to a database
    console.log({
      title,
      content,
      mood: selectedMood,
      timeOfDay: selectedTimeOfDay,
      shareWithProvider,
      date: new Date()
    });
    navigate("/journal");
  };

  const isFormValid = title.trim() && content.trim();

  return (
    <div className="flex h-screen bg-[#FAFBFC] overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="w-full max-w-[1000px] mx-auto px-4 md:px-8 py-6 md:py-8">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => navigate(-1)}
                    className="flex items-center justify-center text-[#64748B] hover:text-[#043570] transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <div className="w-10 h-10 bg-[#F1F5F9] rounded-md flex items-center justify-center flex-shrink-0">
                    <Edit2 size={20} className="text-[#1E293B]" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl text-[#0f172b] font-medium">
                      {entryId ? "Edit Entry" : "New Entry"}
                    </h1>
                    <p className="text-sm text-[#62748e] font-normal">
                      {new Date().toLocaleDateString("en-US", { 
                        weekday: "long", 
                        month: "long", 
                        day: "numeric", 
                        year: "numeric" 
                      })}
                    </p>
                  </div>
                </div>
                
                {/* Service Filter */}
                <div className="flex items-center gap-2">
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="px-4 py-2 bg-white border border-[#E2ECF5] rounded-xl text-sm text-[#020817] font-medium focus:outline-none focus:ring-2 focus:ring-[#00c0ff] focus:border-transparent cursor-pointer hover:border-[#00c0ff] transition-colors"
                  >
                    {serviceOptions.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Suggestion Box */}
            {showSuggestion && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-gradient-to-r from-[#f3faff] to-white border border-[#E2ECF5] rounded-xl p-4 mb-6"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#00c0ff] rounded-lg flex items-center justify-center">
                    <Sparkles size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-[#043570] mb-1">
                      Suggested topic for today
                    </h3>
                    <p className="text-base text-[#64748B] leading-relaxed">
                      {currentSuggestion}
                    </p>
                  </div>
                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={handleCheckSuggestion}
                      className="text-[#10B981] hover:text-[#059669] transition-colors p-1"
                      title="Mark as done"
                    >
                      <Check size={24} />
                    </button>
                    <button
                      onClick={handleRefreshSuggestion}
                      className="text-[#00c0ff] hover:text-[#043570] transition-colors p-1"
                      title="Get new suggestion"
                    >
                      <RefreshCw size={24} />
                    </button>
                    <button
                      onClick={() => setShowSuggestionsModal(true)}
                      className="text-[#94A3B8] hover:text-[#043570] transition-colors p-1"
                      title="More options"
                    >
                      <MoreHorizontal size={24} />
                    </button>
                    <button
                      onClick={() => setShowSuggestion(false)}
                      className="text-[#EF4444] hover:text-[#DC2626] transition-colors p-1"
                      title="Close"
                    >
                      <X size={24} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Form */}
            <div className="space-y-5">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-[#020817] mb-3">
                  Title
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Give your entry a title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 pr-20 bg-white border border-[#E2ECF5] rounded-xl text-[#020817] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#00c0ff] focus:border-transparent"
                    maxLength={100}
                  />
                  <div className="absolute top-1/2 -translate-y-1/2 right-4 text-xs text-[#94A3B8] pointer-events-none">
                    {title.length}/100
                  </div>
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-semibold text-[#020817] mb-3">
                  What's on your mind?
                </label>
                <div className="relative">
                  <textarea
                    placeholder="Write your thoughts, feelings, and reflections here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={12}
                    className="w-full px-4 py-3 pb-8 bg-white border border-[#E2ECF5] rounded-xl text-[#020817] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#00c0ff] focus:border-transparent resize-none"
                    maxLength={5000}
                  />
                  <div className="absolute bottom-[15px] right-4 text-xs text-[#94A3B8] pointer-events-none">
                    {content.length}/5000 characters
                  </div>
                </div>
              </div>

              {/* Share with Provider Toggle */}
              <button
                onClick={() => setShareWithProvider(!shareWithProvider)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all text-sm font-medium ${
                  shareWithProvider
                    ? "bg-[#00c0ff] text-white border-[#00c0ff]"
                    : "bg-white text-[#64748B] border-[#E2ECF5] hover:border-[#00c0ff]"
                }`}
              >
                <Share2 size={16} />
                <span className="hidden sm:inline">Share with Provider</span>
                <span className="sm:hidden">Share</span>
              </button>

              {/* Save Button */}
              <motion.button
                whileHover={{ scale: isFormValid ? 1.01 : 1 }}
                whileTap={{ scale: isFormValid ? 0.99 : 1 }}
                onClick={handleSave}
                disabled={!isFormValid}
                className={`w-full py-4 rounded-xl font-semibold text-base transition-all flex items-center justify-center gap-2 ${
                  isFormValid
                    ? "bg-[#043570] text-white hover:bg-[#032656] shadow-lg shadow-[#043570]/20"
                    : "bg-[#E2ECF5] text-[#94A3B8] cursor-not-allowed"
                }`}
              >
                <Save size={20} />
                {entryId ? "Update Entry" : "Save Entry"}
              </motion.button>
            </div>
          </div>
        </div>

      </div>

      {/* Suggestions Modal */}
      {showSuggestionsModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowSuggestionsModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl w-full max-w-[600px] max-h-[80vh] overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2ECF5]">
              <h2 className="text-xl font-bold text-[#020817]">Suggested Topics</h2>
              <button
                onClick={() => setShowSuggestionsModal(false)}
                className="text-[#94A3B8] hover:text-[#043570] transition-colors p-1"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(80vh-80px)]">
              {categorizedSuggestions.map((category, categoryIndex) => (
                <div key={category.category}>
                  {/* Category Header */}
                  <div className="px-6 py-3 bg-[#F8FAFC]">
                    <h3 className="text-base font-bold text-[#020817]">
                      {category.category}
                    </h3>
                  </div>

                  {/* Prompts List */}
                  <div>
                    {category.prompts.map((prompt, promptIndex) => (
                      <button
                        key={promptIndex}
                        onClick={() => handleSelectPrompt(prompt)}
                        className="w-full px-6 py-4 flex items-start justify-between gap-4 hover:bg-[#f3faff] transition-colors group border-b border-[#F1F5F9] last:border-b-0"
                      >
                        <span className="text-left text-sm text-[#020817] leading-relaxed flex-1">
                          {prompt}
                        </span>
                        <CheckCircle2 
                          size={20} 
                          className="flex-shrink-0 text-[#3B82F6] opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
