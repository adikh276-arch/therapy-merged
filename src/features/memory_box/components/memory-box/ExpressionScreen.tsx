import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import ScreenWrapper from "./ScreenWrapper";
import { useTranslation } from "react-i18next";

const PROMPTS: Record<string, { text: string; emoji: string }> = {
  "A happy moment": { text: "Tell me about a happy moment with", emoji: "😊" },
  "Something they used to say": { text: "What did they used to say?", emoji: "💬" },
  "A small everyday memory": { text: "Describe a small everyday moment with", emoji: "☕" },
  "A place that reminds you of them": { text: "What place reminds you of", emoji: "🏡" },
  "Something I wish I could say": { text: "What would you want to say to", emoji: "💌" },
};

interface Props {
  category: string;
  name: string;
  memoryText: string;
  setMemoryText: (v: string) => void;
  message: string;
  setMessage: (v: string) => void;
  onSave: () => void;
  onSkip: () => void;
  onBack: () => void;
}

const ExpressionScreen = ({ category, name, memoryText, setMemoryText, message, setMessage, onSave, onSkip, onBack }: Props) => {
  const { t } = useTranslation();
  const info = PROMPTS[category] || { text: "Share a memory about", emoji: "✨" };
  const prompt = category === "Something they used to say" || category === "Something I wish I could say"
    ? `${info.text} ${name}?`
    : `${info.text} ${name}…`;

  return (
    <ScreenWrapper>
      <div className="absolute top-0 left-0 px-5 py-4 z-20">
        <button onClick={onBack} className="p-2 rounded-full text-muted-foreground hover:bg-card transition-colors">
          <ChevronLeft size={22} />
        </button>
      </div>

      <div className="space-y-6 w-full max-w-xs">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl"
        >
          {info.emoji}
        </motion.div>

        <h2 className="text-2xl font-heading font-semibold text-foreground">{t("take_your_time")}</h2>

        <p className="text-muted-foreground font-body text-sm">{prompt}</p>

        <textarea
          value={memoryText}
          onChange={(e) => setMemoryText(e.target.value)}
          placeholder={t("write_as_much_or_as_little_as_you_want")}
          rows={5}
          className="w-full bg-card border border-border rounded-xl px-4 py-3.5 font-body text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none transition-all leading-relaxed"
        />

        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-body">💌 A message to them (optional)</p>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t("if_there_s_something_you_d_like_to_say")}
            rows={3}
            className="w-full bg-card border border-border rounded-xl px-4 py-3 font-body text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none transition-all leading-relaxed"
          />
        </div>

        <div className="space-y-3 pt-2">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onSave}
            disabled={!memoryText.trim()}
            className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-base shadow-sm hover:shadow-md transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >{t("save_to_memory_box")}</motion.button>
          <button
            onClick={onSkip}
            className="w-full py-3 text-muted-foreground font-body text-sm hover:text-foreground transition-colors duration-300"
          >{t("expression.skip")}</button>
        </div>
      </div>
    </ScreenWrapper>
  );
};

export default ExpressionScreen;
