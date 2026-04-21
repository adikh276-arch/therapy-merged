import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
    userId: string | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ userId: null, loading: true });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userId, setUserId] = useState<string | null>(sessionStorage.getItem('user_id'));
    const hasToken = new URLSearchParams(window.location.search).has('token');
    const [loading, setLoading] = useState(!userId || hasToken);

    useEffect(() => {
        const performHandshake = async () => {
            const params = new URLSearchParams(window.location.search);
            const token = params.get('token');

            if (token) {
                try {
                    const response = await fetch('/identity_journey/api/auth/handshake', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ token }),
                    });

                    if (response.ok) {
                        const data = await response.json();
                        if (data.user_id) {
                            sessionStorage.setItem('user_id', data.user_id);
                            setUserId(data.user_id);

                            // Remove token from URL
                            const url = new URL(window.location.href);
                            url.searchParams.delete('token');
                            window.history.replaceState({}, '', url.toString());
                        }
                    } else {
                        // Redirect to /token on failure
                        window.location.href = '/identity_journey/token';
                    }
                } catch (error) {
                    console.error('Handshake failed:', error);
                    window.location.href = '/identity_journey/token';
                } finally {
                    setLoading(false);
                }
            } else if (!userId) {
                // Redirect to /token if no token and no session
                window.location.href = '/identity_journey/token';
            }
        };

        if (!userId || new URLSearchParams(window.location.search).has('token')) {
            performHandshake();
        }
    }, [userId]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-background">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
                <p className="text-muted-foreground animate-pulse">Authenticating...</p>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ userId, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
