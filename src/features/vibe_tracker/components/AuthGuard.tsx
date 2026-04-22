import React, { useEffect, useState } from "react";
import { neon, neonConfig } from "@neondatabase/serverless";

// Disable the browser warning
neonConfig.disableWarningInBrowsers = true;

interface AuthGuardProps {
    children: React.ReactNode;
}

const AUTH_API_URL = "https://api.mantracare.com/user/user-info";

// Create client with warning suppressed
const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;
const sql = neon(DATABASE_URL);

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            if (sessionStorage.getItem("user_id")) {
                setIsAuthorized(true);
                setIsLoading(false);
            } else {
                const timer = setTimeout(checkAuth, 100);
                return () => clearTimeout(timer);
            }
        };

        checkAuth();
    }, []);

    const initializeUser = async (userId: number | string) => {
        try {
            // First, ensure the users table exists.
            await sql`
              CREATE TABLE IF NOT EXISTS users (
                id BIGINT PRIMARY KEY,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
              );
            `;

            // Use the neon driver to avoid CORS issues and management API limits
            await sql`INSERT INTO users (id) VALUES (${parseInt(userId.toString())}) ON CONFLICT (id) DO NOTHING;`;
            console.log("AuthGuard: User verified/initialized in database");
        } catch (error) {
            console.error("AuthGuard: Database initialization failed", error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center  bg-transparent">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    <p className="text-muted-foreground animate-pulse font-medium">Securing session...</p>
                </div>
            </div>
        );
    }

    if (!isAuthorized) {
        return null;
    }

    return <>{children}</>;
};
