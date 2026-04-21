import { AlertTriangle } from 'lucide-react';

interface Props {
  onClick: () => void;
}

export function CrashButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 right-4 z-30 w-14 h-14 rounded-full bg-debt text-debt-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center active:scale-95"
      aria-label="Activate crash mode"
    >
      <AlertTriangle className="w-6 h-6" />
    </button>
  );
}
