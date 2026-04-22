import React from 'react';

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const [isAuthResolved, setIsAuthResolved] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { t } = useTranslation();

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
            <div className=" flex flex-col items-center justify-center bg-transparent space-y-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-muted-foreground font-medium animate-pulse">
                    {error || "Authenticating..."}
                </p>
            </div>
        );
    }

    return <>{children}</>;
};
