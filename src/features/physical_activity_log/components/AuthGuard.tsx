import React from 'react';

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const [isAuthResolved, setIsAuthResolved] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { t } = useTranslation();

    useEffect(() => {
        const resolveAuth = async () => {
            // 1. Check if user_id session already exists
            if (sessionStorage.getItem("user_id")) {
                setIsAuthResolved(true);
                return;
            }

            // 2. Extract token from URL
            const params = new URLSearchParams(window.location.search);
            const token = params.get("token");

            if (!token) {
                // No token, redirect to MantraCare token page
                window.location.href = "https://api.mantracare.com/token?redirect=" + encodeURIComponent(window.location.href);
                return;
            }

            try {
                // 3. Validate Token
                const response = await fetch("https://api.mantracare.com/user/user-info", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ token }),
                });

                if (!response.ok) {
                    throw new Error("Authentication failed");
                }

                const data = await response.json();

                if (data && data.user_id) {
                    // 4. Success handling
                    sessionStorage.setItem("user_id", data.user_id.toString());

                    // Remove token from URL
                    const newUrl = window.location.pathname + window.location.search.replace(/[?&]token=[^&]+/, '').replace(/^&/, '?');
                    window.history.replaceState({}, "", newUrl);

                    setIsAuthResolved(true);
                } else {
                    throw new Error("Invalid user information");
                }
            } catch (err) {
                console.error("Auth Handshake Error:", err);
                setError("Authentication failed. Redirecting...");
                setTimeout(() => {
                    // window.location.href = "/therapy/token";
                }, 2000);
            }
        };

        resolveAuth();
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
