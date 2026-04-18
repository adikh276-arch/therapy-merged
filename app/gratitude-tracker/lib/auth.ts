"use client";
import { useEffect, useState } from "react";
import { dbRequest } from './db';

interface UserInfo {
    user_id: string;
}

export const useAuthHandshake = () => {
    const [isAuthResolved, setIsAuthResolved] = useState(false);
    
    useEffect(() => {
        const handleAuth = async () => {
            const storedUserId = sessionStorage.getItem("user_id");
            if (storedUserId) {
                await dbRequest('INSERT INTO users (id) VALUES (storedUserId) ON CONFLICT DO NOTHING', [storedUserId]);
                setIsAuthResolved(true);
                return;
            }

            const params = new URLSearchParams(window.location.search);
            const token = params.get("token");

            if (!token) {
                window.location.href = '/token';
                return;
            }

            try {
                const response = await fetch("https://api.mantracare.com/user/user-info", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ token }),
                });

                if (response.ok) {
                    const data: UserInfo = await response.json();
                    const userId = data.user_id;

                    await dbRequest('INSERT INTO users (id) VALUES (userId) ON CONFLICT DO NOTHING', [userId]);
                    sessionStorage.setItem("user_id", userId);

                    // Remove token from URL
                    const url = new URL(window.location.href);
                    url.searchParams.delete("token");
                    window.history.replaceState({}, "", url.pathname + url.search);

                    setIsAuthResolved(true);
                } else {
                    window.location.href = '/token';
                }
            } catch (error) {
                console.error("Auth error:", error);
                window.location.href = '/token';
            }
        };

        handleAuth();
    }, [navigate]);

    return { isAuthResolved };
};
