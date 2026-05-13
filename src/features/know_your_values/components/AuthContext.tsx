import React, { useContext, useEffect, useState } from "react";
import Loader from '@/components/Loader';
import { COLORS } from '@/misc/Colors';
import { useTranslation } from "react-i18next";

interface AuthContextType {
    userId: string | null;
    isAuthResolved: boolean;
}

const AuthContext = React.createContext<AuthContextType>({
    userId: null,
    isAuthResolved: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userId, setUserId] = useState<string | null>(sessionStorage.getItem("user_id"));
    const [isAuthResolved, setIsAuthResolved] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
  const { t } = useTranslation();
            const storedId = sessionStorage.getItem("user_id");
            if (storedId) {
                setUserId(storedId);
                setIsAuthResolved(true);
            } else {
                const timer = setTimeout(checkAuth, 100);
                return () => clearTimeout(timer);
            }
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ userId, isAuthResolved }}>
            {isAuthResolved ? children : (
                <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8FAFC]">
                    <Loader size={45} color={COLORS.blueDark} />
                </div>
            )}
        </AuthContext.Provider>
    );
};
