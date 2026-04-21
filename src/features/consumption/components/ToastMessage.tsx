import { useEffect, useState } from 'react';

interface ToastMessageProps {
  message: string;
  variant?: 'default' | 'impact';
  caption?: string;
  duration?: number;
  onDone: () => void;
}

const ToastMessage = ({ message, variant = 'default', caption, duration = 3000, onDone }: ToastMessageProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onDone]);

  return (
    <div
      className={`fixed bottom-5 left-4 right-4 max-w-[430px] mx-auto z-[200] rounded-xl px-5 py-3 toast-shadow border transition-all duration-300 ${
        visible ? 'animate-slide-up' : 'opacity-0 translate-y-4'
      } ${
        variant === 'impact'
          ? 'bg-warning-foreground'
          : 'bg-card border-border'
      }`}
      style={variant === 'impact' ? { borderColor: 'hsl(38 92% 44% / 0.4)' } : {}}
    >
      <div className="flex items-start gap-2">
        {variant === 'impact' && <span className="text-base">⚠️</span>}
        <div>
          <p className="font-body text-sm text-foreground">{message}</p>
          {caption && <p className="font-body text-[10px] text-muted-foreground mt-0.5">{caption}</p>}
        </div>
      </div>
    </div>
  );
};

export default ToastMessage;
