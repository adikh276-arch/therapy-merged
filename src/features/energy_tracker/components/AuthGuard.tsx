import React, { useEffect, useState } from 'react';
import axios from 'axios';

export interface AuthGuardProps {
    children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = () => {
            const existingUserId = sessionStorage.getItem("user_id");
            if (existingUserId) {
                setIsAuthorized(true);
            } else {
                // If not found, wait up to 2 seconds for root App to finish handshake
                let attempts = 0;
                const interval = setInterval(() => {
                    const uid = sessionStorage.getItem("user_id");
                    if (uid) {
                        setIsAuthorized(true);
                        clearInterval(interval);
                    } else if (attempts > 20) { // 2 seconds
                        console.warn("AuthGuard: timeout waiting for root session");
                        setIsAuthorized(false);
                        clearInterval(interval);
                        window.location.href = "/token";
                    }
                    attempts++;
                }, 100);
                return () => clearInterval(interval);
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
