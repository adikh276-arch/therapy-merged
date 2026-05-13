import React from "react";
import { useAuthHandshake } from "../lib/auth";
import Loader from '@/components/Loader';
import { COLORS } from '@/misc/Colors';
import { useTranslation } from "react-i18next";

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthResolved } = useAuthHandshake();

    if (!isAuthResolved) {
        return (
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#F8FAFC] z-50">
                <Loader size={45} color={COLORS.blueDark} />
                <p className="mt-4 text-xs font-semibold text-[#2954a1]/70 tracking-widest animate-pulse uppercase">{t("authenticating")}</p>
            </div>
        );
    }

    return <>{children}</>;
};

export default AuthGuard;
