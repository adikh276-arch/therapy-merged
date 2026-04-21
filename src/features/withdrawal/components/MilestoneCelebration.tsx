import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { MILESTONES, getMinutesSinceQuit } from '@/lib/milestones';
import { getSeenMilestones, markMilestoneSeen } from '@/lib/storage';

interface MilestoneCelebrationProps {
  quitDate: string;
}

const MilestoneCelebration = ({ quitDate }: MilestoneCelebrationProps) => {
  const [celebrating, setCelebrating] = useState<{ label: string; description: string } | null>(null);

  useEffect(() => {
    const mins = getMinutesSinceQuit(quitDate);
    const seen = getSeenMilestones();
    const reached = MILESTONES.filter(m => mins >= m.minutes);
    const newMilestone = reached.find(m => !seen.includes(m.id));

    if (newMilestone) {
      setCelebrating({ label: newMilestone.label, description: newMilestone.description });
      markMilestoneSeen(newMilestone.id);
      
      // Haptic feedback
      if (navigator.vibrate) navigator.vibrate(200);
      
      setTimeout(() => setCelebrating(null), 2500);
    }
  }, [quitDate]);

  return (
    <AnimatePresence>
      {celebrating && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-card rounded-[20px] p-8 mx-6 text-center shadow-2xl max-w-sm"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
              <Check size={28} className="text-accent-foreground" strokeWidth={3} />
            </div>
            <h2 className="font-heading text-xl font-bold text-foreground">{celebrating.label}</h2>
            <p className="font-body text-sm text-health-muted mt-2">{celebrating.description}</p>
          </motion.div>

          {/* Confetti dots */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(47 100% 60%)'][i % 3],
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], y: [0, -60] }}
              transition={{ duration: 2, delay: Math.random() * 0.5, ease: 'easeOut' }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MilestoneCelebration;
