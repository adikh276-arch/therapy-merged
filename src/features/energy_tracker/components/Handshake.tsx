import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface HandshakeProps {
    onSuccess: () => void;
}

const Handshake: React.FC<HandshakeProps> = ({ onSuccess }) => {
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const checkAuth = () => {
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
        <div className="flex h-[100dvh] w-screen items-center justify-center bg-[#F6F8FB]">
            <div className="flex flex-col items-center gap-6">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent -primary"></div>
                <p className="text-sm font-semibold text-foreground/70 tracking-widest animate-pulse">
                    SECURE AUTHENTICATION...
                </p>
                {error && <p className="text-destructive text-xs">{error}</p>}
            </div>
        </div>
    );
};

export default Handshake;
