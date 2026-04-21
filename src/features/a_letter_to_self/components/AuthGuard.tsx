import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { validateToken, setSessionUserId, getSessionUserId } from "@/lib/auth";
import { query } from "@/lib/db";
import { Loader2 } from "lucide-react";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const [isAuthResolved, setIsAuthResolved] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const resolveAuth = async () => {
            const params = new URLSearchParams(window.location.search);
            const token = params.get("token");

            if (token) {
                const userId = await validateToken(token);
                if (userId) {
                    setSessionUserId(userId);
                    // Remove token from URL
                    window.history.replaceState({}, "", window.location.pathname);

                    // Initialize user in DB
                    try {
                        const userCheck = await query("SELECT id FROM users WHERE id = $1", [userId]);
                        if (userCheck.rowCount === 0) {
                            await query("INSERT INTO users (id) VALUES ($1)", [userId]);
                        }
                    } catch (error) {
                        console.error("User initialization failed:", error);
                    }

                    setIsAuthResolved(true);
                } else {
                    window.location.href = "/token";
                }
            } else {
                const userId = getSessionUserId();
                if (!userId) {
                    window.location.href = "/token";
                } else {
                    setIsAuthResolved(true);
                }
            }
        };

        resolveAuth();
    }, [location]);

    if (!isAuthResolved) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        );
    }

    return <>{children}</>;
};
