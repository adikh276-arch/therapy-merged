import React from 'react';
import { useEffect, useState } from "react";
import { dbRequest, initSchema } from "../lib/db";

interface AuthGuardProps {
    children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
    const [isAuthResolved, setIsAuthResolved] = useState(false);
    const [status, setStatus] = useState<string>("Authenticating...");

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
            <div className="flex flex-col items-center justify-center  bg-transparent text-primary">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="font-heading text-lg animate-pulse">{status}</p>
            </div>
        );
    }

    return <>{children}</>;
};

export default AuthGuard;
