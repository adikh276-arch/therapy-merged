import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { pool } from "@/lib/db";


const AUTH_API = "https://api.mantracare.com/user/user-info";

interface AuthGuardProps {
    children: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
    const [searchParams] = useSearchParams();
    const [isAuthResolved, setIsAuthResolved] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const validateToken = async () => {
            const token = searchParams.get("token");
            const sessionUserId = sessionStorage.getItem("user_id");

            if (sessionUserId) {
                setIsAuthResolved(true);
                return;
            }

            if (token) {
                try {
                    const response = await fetch(AUTH_API, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ token }),
                    });

                    if (response.ok) {
                        const data = await response.json();
                        if (data.user_id) {
                            const userId = data.user_id.toString();
                            sessionStorage.setItem("user_id", userId);

                            // Phase 11 & 12: User Initialization in Database
                            try {
                                await pool.query("INSERT INTO users (id) VALUES ($1) ON CONFLICT (id) DO NOTHING", [userId]);
                                console.log(`User ${userId} initialized in Neon.`);
                            } catch (dbErr) {
                                console.error("Failed to initialize user in Neon:", dbErr);
                            }

                            // Step 3: Remove token from URL
                            const newUrl = window.location.pathname + window.location.search.replace(/[?&]token=[^&]+/, '').replace(/^&/, '?');
                            window.history.replaceState({}, "", newUrl);

                            setIsAuthResolved(true);
                            return;
                        }

                    }
                } catch (error) {
                    console.error("Auth validation failed:", error);
                }
            }

            // Step 4: Failure Handling
            if (!sessionStorage.getItem("user_id")) {
                window.location.href = "/token";
            }
        };

        validateToken();
    }, [searchParams]);

    if (!isAuthResolved) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-app-gradient">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
        );
    }

    return <>{children}</>;
};

export default AuthGuard;
