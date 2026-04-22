import React from 'react';
import { useEffect, useState } from "react";
import { query } from "../lib/db";

const DEV_FALLBACK_USER_ID = "999999999"; // Temporary dev user when API is not yet available

const initUser = async (userId: string) => {
    // Upsert user — do nothing if already exists
    const existingUser = await query("SELECT id FROM users WHERE id = $1", [userId]);
    if (!existingUser || existingUser.length === 0) {
        await query("INSERT INTO users (id) VALUES ($1)", [userId]);
    }
};

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const [isAuthResolved, setIsAuthResolved] = useState(false);

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
            <div className=" flex items-center justify-center bg-transparent">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return <>{children}</>;
};

export default AuthGuard;
