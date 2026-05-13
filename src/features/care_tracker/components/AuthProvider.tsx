import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { sql } from '@/lib/db';
import Loader from '@/components/Loader';
import { COLORS } from '@/misc/Colors';
import { useTranslation } from "react-i18next";

interface AuthContextType {
    userId: string | null;
    loading: boolean;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userId, setUserId] = useState<string | null>(sessionStorage.getItem('user_id'));
    const [loading, setLoading] = useState(!userId);

    useEffect(() => {
        const handleHandshake = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');
            const lang = urlParams.get('lang');

            // Function to clean URL but keep lang if exists
            const cleanUrl = () => {
                const params = new URLSearchParams();
                if (lang) params.set('lang', lang);
                const query = params.toString();
                const newUrl = window.location.origin + window.location.pathname + (query ? '?' + query : '') + window.location.hash;
                window.history.replaceState({}, '', newUrl);
            };

            // 1. If we already have a userId from sessionStorage, we're good
            if (userId) {
                setLoading(false);
                if (token) cleanUrl();
                return;
            }

            // 2. No userId, check for token
            if (!token) {
                console.error('No token found in URL, redirecting to /token');
                window.location.href = '/token';
                return;
            }

            try {
                // 3. Validate token
                const response = await axios.post('https://api.mantracare.com/user/user-info', { token });
                const { user_id } = response.data;

                if (!user_id || user_id === 'null') {
                    throw new Error('No user_id returned from API');
                }

                // 4. Set userId in state and sessionStorage
                setUserId(user_id.toString());
                sessionStorage.setItem('user_id', user_id.toString());

                // 5. Clean URL
                cleanUrl();

                // 6. DB Initialization/Upsert
                if (true) {

                    // First, ensure the users table exists.
                    await sql`
                        CREATE TABLE IF NOT EXISTS users (
                            id BIGINT PRIMARY KEY,
                            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
                        )
                    `;

                    await sql`
                        INSERT INTO users (id) 
                        VALUES (${user_id}) 
                        ON CONFLICT (id) DO NOTHING
                    `;
                    console.log('User initialized in DB');
                }

                setLoading(false);
            } catch (err) {
                console.error('Handshake failed:', err);
                window.location.href = '/token';
            }
        };

        handleHandshake();
    }, [userId]);

    if (loading) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8FAFC]">
                <Loader size={45} color={COLORS.blueDark} />
                <p className="mt-4 text-xs font-semibold text-[#2954a1]/70 tracking-widest animate-pulse uppercase">{t("initializing_session")}</p>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ userId, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
  const { t } = useTranslation();
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
