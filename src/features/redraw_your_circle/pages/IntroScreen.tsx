import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import TopBar from "@/features/redraw_your_circle/components/TopBar";
import ProgressDots from "@/features/redraw_your_circle/components/ProgressDots";
import BackgroundOrbs from "@/features/redraw_your_circle/components/BackgroundOrbs";

const IntroScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <BackgroundOrbs />
      <TopBar onBack={() => navigate("/", { replace: true })} showHistory />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex-1 flex flex-col items-center justify-center px-6 pb-8 text-center relative z-10"
      >
        <ProgressDots current={1} />

        <motion.span
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="text-4xl mt-6 mb-2"
        >
          🫂
        </motion.span>

        <h1 className="text-2xl font-semibold text-foreground mt-2 mb-4 leading-tight">
          <span className="bg-gradient-to-r from-[hsl(258,52%,58%)] to-[hsl(340,45%,65%)] bg-clip-text text-transparent">Redraw Your Circle</span>
        </h1>

        <div className="text-muted-foreground text-sm leading-relaxed max-w-xs space-y-3">
          <p>
            At different points in life, our support system can shift. 🌱
            Sometimes we feel connected and supported. Other times, things may
            feel distant or unclear.
          </p>
          <p>
            This activity is a space to pause and look at the people around you
            — and understand who currently feels part of your circle. 💛
          </p>
          <p>There's no right or wrong here. Just awareness. ✨</p>
        </div>

        <p className="text-xs text-muted-foreground mt-6 italic">
          🌿 Your circle can change — and that's okay.
        </p>

        <button
          onClick={() => navigate("../circle")}
          className="mt-10 bg-primary text-primary-foreground font-medium px-8 py-3 rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-200"
        >
          Start →
        </button>
      </motion.div>
    </div>
  );
};

export default IntroScreen;
