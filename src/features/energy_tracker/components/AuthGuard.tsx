import React, { useEffect, useState } from 'react';
import axios from 'axios';

export interface AuthGuardProps {
    children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = () => {
            if (sessionStorage.getItem("user_id")) {
                setIsAuthorized(true);
            } else {
                const timer = setTimeout(checkAuth, 100);
                return () => clearTimeout(timer);
            }
        };
        checkAuth();
    }, []);

    if (isAuthorized === null) {
        return (
            <div className="flex h-[100dvh] w-screen items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-6">
                    <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                    <p className="text-sm font-semibold text-black tracking-widest animate-pulse">
                        INITIALIZING...
                    </p>
                </div>
            </div>
        );
    }

    if (!isAuthorized) {
        return null; 
    }

    return <>{children}</>;
};

export default AuthGuard;
