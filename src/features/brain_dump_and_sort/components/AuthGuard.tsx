import { useState, useEffect, ReactNode } from "react";

interface AuthGuardProps {
    children: ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
    const [isAuthResolved, setIsAuthResolved] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const checkAuth = () => {
            if (sessionStorage.getItem("user_id")) {
                setIsAuthResolved(true);
            } else {
                const timer = setTimeout(checkAuth, 100);
                return () => clearTimeout(timer);
            }
        };

        checkAuth();
    }, []);

    if (!isAuthResolved) {
        return (
            <div className=" flex items-center justify-center gradient-calm">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                    <p className="text-muted-foreground animate-pulse text-sm">Authenticating...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};
