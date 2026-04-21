import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";

export const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthResolved, setIsAuthResolved] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const authenticate = async () => {
            // Step 1: Extract Token
            const params = new URLSearchParams(window.location.search);
            const token = params.get("token");

            if (token) {
                try {
                    // Step 2: Validate Token
                    const response = await fetch("https://api.mantracare.com/user/user-info", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ token }),
                    });

                    if (response.ok) {
                        const data = await response.json();
                        if (data.user_id) {
                            // Step 3: Handle Success
                            sessionStorage.setItem("user_id", data.user_id);
                            // Remove token from URL
                            window.history.replaceState({}, "", window.location.pathname);

                            // Phase 12: User Initialization
                            // Realistically this triggers an internal API to init the user in DB
                            try {
                                await fetch("/doodle_burst/api/init-user", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ user_id: data.user_id }),
                                });
                            } catch (e) {
                                console.error("Failed to init user", e);
                            }
                        } else {
                            throw new Error("Missing user_id");
                        }
                    } else {
                        throw new Error("Invalid token");
                    }
                } catch (error) {
                    console.error("Authentication failed", error);
                    window.location.href = "/token";
                    return;
                }
            }

            // Step 4: Failure Handling if no user_id after token check
            if (!sessionStorage.getItem("user_id")) {
                window.location.href = "/token";
                return;
            }

            setIsAuthResolved(true);
        };

        authenticate();
    }, []);

    if (!isAuthResolved) {
        return (
            <div className="min-h-screen bg-playful flex items-center justify-center">
                <Loader2 className="animate-spin text-primary" size={48} />
            </div>
        );
    }

    return <>{children}</>;
};

export default AuthGuard;
