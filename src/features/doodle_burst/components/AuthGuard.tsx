import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";

export const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthResolved, setIsAuthResolved] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const checkAuth = () => {
            const userId = sessionStorage.getItem("user_id");
            if (userId) {
                setIsAuthResolved(true);
            } else {
                // Wait for root app to finish handshake
                const timer = setTimeout(checkAuth, 100);
                return () => clearTimeout(timer);
            }
        };

        checkAuth();
    }, []);

    if (!isAuthResolved) {
        return (
            <div className=" bg-playful flex items-center justify-center">
                <Loader2 className="animate-spin text-primary" size={48} />
            </div>
        );
    }

    return <>{children}</>;
};

export default AuthGuard;
