import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import type { Reward } from "@/lib/validation";
import MantraCareLogo from "@/assets/MantraCare_Logo.svg";
import { PartyPopper, CheckCircle2 } from "lucide-react";

interface SuccessScreenProps {
  reward: Reward;
  name: string;
}

const SuccessScreen = ({ reward, name }: SuccessScreenProps) => {
  const confettiFired = useRef(false);

  useEffect(() => {
    if (confettiFired.current) return;
    confettiFired.current = true;

    const fire = (opts: confetti.Options) =>
      confetti({ ...opts, disableForReducedMotion: true });

    // Burst from both sides
    fire({ particleCount: 80, angle: 60, spread: 70, origin: { x: 0, y: 0.6 }, colors: ["#043570", "#00C0FF", "#0a5cad"] });
    fire({ particleCount: 80, angle: 120, spread: 70, origin: { x: 1, y: 0.6 }, colors: ["#043570", "#00C0FF", "#0a5cad"] });

    setTimeout(() => {
      fire({ particleCount: 50, angle: 90, spread: 100, origin: { x: 0.5, y: 0.7 }, colors: ["#043570", "#00C0FF"] });
    }, 300);
  }, []);

  const firstName = name.split(" ")[0];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="glass-card flex max-w-md flex-col items-center rounded-2xl p-8 text-center shadow-xl sm:p-10"
      >
        <img src={MantraCareLogo} alt="Mantra Care" className="mb-6 h-8" />

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10"
        >
          <PartyPopper className="h-8 w-8 text-secondary" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-2 text-2xl font-bold text-foreground sm:text-3xl"
        >
          Congratulations, {firstName}!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-6 text-muted-foreground"
        >
          You've won an exclusive reward
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="brand-gradient glow-accent mb-6 w-full rounded-xl px-6 py-5"
        >
          <p className="text-sm font-medium text-primary-foreground/80">Your Reward</p>
          <p className="mt-1 text-xl font-bold text-primary-foreground sm:text-2xl">
            {reward.name}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-start gap-2 rounded-lg bg-muted/60 px-4 py-3 text-left"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
          <p className="text-sm text-muted-foreground">
            Our team will reach out to you shortly to help you redeem your <strong>{reward.name}</strong>. Thank you for visiting the Mantra Care booth!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SuccessScreen;
