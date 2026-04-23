import React, { useContext, useEffect, useState } from "react";

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
                <div className=" flex items-center justify-center bg-transparent">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            )}
        </AuthContext.Provider>
    );
};
