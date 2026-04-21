import { motion } from "framer-motion";
import MantraCareLogo from "@/assets/MantraCare_Logo.svg";

interface LandingScreenProps {
  onStart: () => void;
}

const LandingScreen = ({ onStart }: LandingScreenProps) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex max-w-lg flex-col items-center text-center"
      >
        <motion.img
          src={MantraCareLogo}
          alt="Mantra Care"
          className="mb-10 h-12 w-auto sm:h-14"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        />

        <motion.h1
          className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Spin & Win
          <span className="brand-gradient-text block">Exclusive Rewards</span>
        </motion.h1>

        <motion.p
          className="mb-10 max-w-md text-base text-muted-foreground sm:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Share your details and spin the wheel for a chance to win premium wellness offerings for your organization.
        </motion.p>

        <motion.button
          onClick={onStart}
          className="brand-gradient glow-accent rounded-xl px-10 py-4 text-lg font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:brightness-110 active:scale-[0.98]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Get Started
        </motion.button>
      </motion.div>
    </div>
  );
};

export default LandingScreen;
