import { useAuth } from '@/hooks/useAuth';
import { Leaf } from 'lucide-react';

interface AuthGuardProps {
  children: (userId: number) => React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { loading, userId } = useAuth();

  if (loading || !userId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4 animate-breathe">
          <Leaf className="h-12 w-12 text-primary" />
          <p className="text-muted-foreground font-body text-sm">Preparing your space…</p>
        </div>
      </div>
    );
  }

  return <>{children(userId)}</>;
}
