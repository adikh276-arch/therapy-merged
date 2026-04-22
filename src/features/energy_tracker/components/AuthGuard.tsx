import React, { useEffect, useState } from 'react';
import axios from 'axios';

export interface AuthGuardProps {
    children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        const handleHandshake = async () => {
            const params = new URLSearchParams(window.location.search);
            const token = params.get("token");
            const existingUserId = sessionStorage.getItem("user_id");

            if (existingUserId) {
                setIsAuthorized(true);
                return;
            }

            if (!token) {
                console.warn("AuthGuard: token missing, redirecting to /token");
                window.location.href = "/token";
                return;
            }

            try {
                const response = await axios.post("https://api.mantracare.com/user/user-info", { token }, { timeout: 5000 });

                if (response.status === 200 && response.data.user_id) {
                    const { user_id } = response.data;
                    sessionStorage.setItem("user_id", user_id.toString());

                    // Clean token from URL
                    const url = new URL(window.location.href);
                    url.searchParams.delete("token");
                    window.history.replaceState({}, "", url.pathname + url.search);

                    setIsAuthorized(true);
                } else {
                    console.error("AuthGuard: invalid token response");
                    window.location.href = "./token";
                }
            } catch (err) {
                console.error("AuthGuard authentication failed:", err);
                // Fallback to anonymous or redirect
                window.location.href = "./token";
            }
        };

        const timeout = setTimeout(() => {
            if (isAuthorized === null) {
                console.warn("AuthGuard: handshake timed out, redirecting");
                window.location.href = "./token";
            }
        }, 10000);

        handleHandshake();
        return () => clearTimeout(timeout);
    }, [isAuthorized]);

    if (isAuthorized === null) {
        return (
            <div className="flex h-[100dvh] w-screen items-center justify-center bg-transparent">
                <div className="flex flex-col items-center gap-6">
                    <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                    <p className="text-sm font-semibold text-foreground/70 tracking-widest animate-pulse">
                        SECURE AUTHENTICATION...
                    </p>
                </div>
            </div>
        );
    }

    if (!isAuthorized) {
        return null; // Redirect is handled in useEffect
    }

    return <>{children}</>;
};

export default AuthGuard;
