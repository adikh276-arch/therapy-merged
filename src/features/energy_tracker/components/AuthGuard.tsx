import React, { useEffect, useState } from 'react';
import axios from 'axios';

export interface AuthGuardProps {
    children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const check = () => {
            const userId = sessionStorage.getItem("user_id");
            if (userId) {
                setIsAuthorized(true);
                setIsLoading(false);
                return true;
            }
            return false;
        };

        if (check()) return;

        const interval = setInterval(() => {
            if (check()) {
                clearInterval(interval);
            }
        }, 100);

        return () => clearInterval(interval);
    }, []);

    if (isLoading) {
        return (
            <div className="flex h-[100dvh] w-full items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-6">
                    <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                    <p className="text-sm font-semibold text-black tracking-widest animate-pulse uppercase">
                        Initializing session...
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
