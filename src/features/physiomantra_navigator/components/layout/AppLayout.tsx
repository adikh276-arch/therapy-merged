import { ReactNode } from 'react';
import { useProgress } from '@/contexts/ProgressContext';
import { Loader2 } from 'lucide-react';
import { SystemStatus } from '@/components/SystemStatus';

interface AppLayoutProps {
    children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
    const { loading } = useProgress();

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                <p className="text-slate-500 font-medium animate-pulse">Initializing Pathway Environment...</p>
            </div>
        );
    }

    return (
        <>
            <SystemStatus />
            <div className="min-h-screen bg-slate-50/50">
                {children}
            </div>
        </>
    );
};
