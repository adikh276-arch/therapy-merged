import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PrimaryButton } from "./PrimaryButton";
import { ProgressBar } from "./ProgressBar";

interface StoryNamingScreenProps {
  storyName: string;
  onStoryNameChange: (val: string) => void;
  onContinue: () => void;
  currentStep: number;
  totalSteps: number;
}

const CHIP_SUGGESTIONS = [
  'The "Not Good Enough" Story',
  'The "Everything Will Go Wrong" Story',
  'The "Failure" Story',
];

export function StoryNamingScreen({ storyName, onStoryNameChange, onContinue, currentStep, totalSteps }: StoryNamingScreenProps) {
  const [isFlipping, setIsFlipping] = useState(false);

  const handleSave = () => {
    if (!storyName.trim()) return;
    setIsFlipping(true);
    setTimeout(() => {
      onContinue();
    }, 900);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className=" w-full relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #F3EDFF 0%, #E9E4FF 100%)" }}
    >
      {/* Floating decorative elements */}
      {[
        { emoji: "📖", top: "8%", left: "8%", dur: 6, rotate: true },
        { emoji: "✨", top: "15%", right: "10%", dur: 3, scale: true },
        { emoji: "📖", bottom: "20%", right: "7%", dur: 7, rotate: true },
        { emoji: "✨", top: "45%", left: "5%", dur: 4, scale: true },
        { emoji: "📖", bottom: "35%", left: "12%", dur: 5, rotate: true },
        { emoji: "✨", bottom: "10%", right: "15%", dur: 3.5, scale: true },
        { emoji: "📖", top: "60%", right: "4%", dur: 8, rotate: true },
        { emoji: "✨", top: "30%", left: "85%", dur: 2.5, scale: true },
      ].map((el, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl opacity-15 select-none pointer-events-none"
          style={{ top: el.top, left: el.left, right: el.right, bottom: el.bottom }}
          animate={
            el.rotate
              ? { rotate: [0, 10, -10, 0], y: [0, -8, 0] }
              : { scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }
          }
          transition={{ duration: el.dur, repeat: Infinity, ease: "easeInOut" }}
        >
          {el.emoji}
        </motion.span>
      ))}

      {/* Content */}
      <div className="relative z-10 w-full mx-auto px-4 pt-8 pb-12">
        <ProgressBar current={currentStep} total={totalSteps} />

        <motion.h2
          className="text-[28px] font-semibold text-foreground text-center mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Give this thought a story name 📖
        </motion.h2>

        <motion.p
          className="text-base text-muted-foreground text-justify mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          What would you call this story?
        </motion.p>

        <motion.div
          className="mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.6 }}
        >
          <p className="text-sm text-muted-foreground text-justify mb-3">
            Pick a suggestion or write your own:
          </p>
          <div className="flex flex-wrap gap-2">
            {CHIP_SUGGESTIONS.map((chip) => (
              <motion.button
                key={chip}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onStoryNameChange(chip)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                  storyName === chip
                    ? "bg-primary text-primary-foreground border-primary "
                    : "bg-transparent/70 text-foreground border-border hover:border-primary/40 hover:bg-primary/5"
                }`}
              >
                {chip}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
        >
          <input
            type="text"
            value={storyName}
            onChange={(e) => onStoryNameChange(e.target.value)}
            placeholder='Or type your own story name...'
            className="w-full border-2 border-primary/20 rounded-xl px-5 py-4 text-lg text-foreground bg-transparent/80 backdrop-blur-sm focus:outline-none focus:border-primary/50 focus:shadow-[0_0_20px_rgba(124,108,242,0.15)] transition-all duration-300 mb-4"
          />
        </motion.div>

        {/* Live preview */}
        <AnimatePresence>
          {storyName.trim() && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-xl p-4 mb-6 border border-primary/10"
              style={{ background: "rgba(124, 108, 242, 0.06)" }}
            >
              <p className="text-sm text-muted-foreground mb-1">Your mindful phrase:</p>
              <p className="text-base font-medium text-foreground italic text-justify">
                "I'm noticing my mind telling the '{storyName}' story again."
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Save button with page-flip animation */}
        <div className="relative">
          <AnimatePresence>
            {isFlipping && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <motion.span
                  className="text-6xl"
                  initial={{ rotateY: 0, scale: 1 }}
                  animate={{ rotateY: [0, -90, -180, -270, -360], scale: [1, 1.3, 1.5, 1.3, 1] }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  📖
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div animate={isFlipping ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
            <PrimaryButton onClick={handleSave} disabled={!storyName.trim()}>
              Save Story
            </PrimaryButton>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
