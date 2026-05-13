import React, { useEffect, useState } from "react";
import { neon, neonConfig } from "@neondatabase/serverless";
import Loader from '@/components/Loader';
import { COLORS } from '@/misc/Colors';
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
              )
            `;

            // Use the neon driver to avoid CORS issues and management API limits
            await sql`INSERT INTO users (id) VALUES (${parseInt(userId.toString())}) ON CONFLICT (id) DO NOTHING`;
            console.log("AuthGuard: User verified/initialized in database");
        } catch (error) {
            console.error("AuthGuard: Database initialization failed", error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8FAFC]">
                <Loader size={45} color={COLORS.blueDark} />
                <p className="mt-4 text-xs font-semibold text-[#2954a1]/70 tracking-widest animate-pulse uppercase">{t("securing_session")}</p>
            </div>
        );
    }

    if (!isAuthorized) {
        return null;
    }

    return <>{children}</>;
};
