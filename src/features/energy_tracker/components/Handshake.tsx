import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '@/components/Loader';
import { COLORS } from '@/misc/Colors';
import { useTranslation } from "react-i18next";

interface HandshakeProps {
    onSuccess: () => void;
}

const Handshake: React.FC<HandshakeProps> = ({ onSuccess }) => {
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const checkAuth = () => {
  const { t } = useTranslation();
            if (sessionStorage.getItem("user_id")) {
                onSuccess();
            } else {
                const timer = setTimeout(checkAuth, 100);
                return () => clearTimeout(timer);
            }
        };

        checkAuth();
    }, [onSuccess]);

    // Phase 8: Full screen loader to block UI during handshake
    return (
        <div className="flex h-[100dvh] w-screen flex-col items-center justify-center bg-[#F8FAFC]">
            <Loader size={45} color={COLORS.blueDark} />
            <p className="mt-4 text-xs font-semibold text-[#2954a1]/70 tracking-widest animate-pulse uppercase">{t("secure_authentication")}</p>
            {error && <p className="text-destructive text-xs mt-2">{error}</p>}
        </div>
    );
};

export default Handshake;
