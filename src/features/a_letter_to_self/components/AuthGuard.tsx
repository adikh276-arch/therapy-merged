import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { validateToken, setSessionUserId, getSessionUserId } from "../lib/auth";
import { query } from "../lib/db";
import Loader from '@/components/Loader';
import { COLORS } from '@/misc/Colors';
import { useTranslation } from "react-i18next";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();
    const [isAuthResolved, setIsAuthResolved] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

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
            <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8FAFC]">
                <Loader size={45} color={COLORS.blueDark} />
            </div>
        );
    }

    return <>{children}</>;
};
