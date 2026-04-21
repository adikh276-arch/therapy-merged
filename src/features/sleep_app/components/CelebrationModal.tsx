import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react';

interface Props {
  show: boolean;
  score: number;
  onClose: () => void;
}

export default function CelebrationModal({ show, score, onClose }: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="glass-card p-8 text-center max-w-xs mx-4"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 15 }}
            onClick={e => e.stopPropagation()}
          >
            <motion.div
              initial={{ rotate: -20 }}
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Trophy className="w-16 h-16 mx-auto text-score-excellent mb-4" />
            </motion.div>
            <h2 className="font-display text-2xl font-bold mb-2">New Personal Best!</h2>
            <p className="text-3xl font-bold text-score-excellent mb-2">{score}/100</p>
            <p className="text-muted-foreground text-sm">Keep up the amazing work! 🎉</p>
            <button
              onClick={onClose}
              className="mt-4 text-sm text-primary underline"
            >
              Continue
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
