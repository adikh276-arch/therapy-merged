import { cn } from '@/lib/utils';
import { Check, Award, Star } from 'lucide-react';

interface BadgeProps {
  label: string;
  variant?: 'verified' | 'achievement' | 'special' | 'partner';
}

const Badge = ({ label, variant = 'verified' }: BadgeProps) => {
  const icons = {
    verified: Check,
    achievement: Award,
    special: Star,
    partner: Star,
  };

  const styles = {
    verified: 'bg-success/10 text-success border-success/20 shadow-sm shadow-success/5',
    achievement: 'bg-accent/10 text-accent border-accent/20 shadow-sm shadow-accent/5',
    special: 'bg-primary/10 text-primary border-primary/20 shadow-sm shadow-primary/5',
    partner: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20 shadow-sm shadow-indigo-500/5',
  };

  const Icon = icons[variant];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-transform hover:scale-105 select-none',
        styles[variant]
      )}
    >
      <Icon className="w-3.5 h-3.5" />
      {label}
    </span>
  );
};

export default Badge;
