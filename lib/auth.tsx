
// lib/auth.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const USER_ID_KEY = "user_id"; // Pattern says sessionStorage.setItem("user_id", ...)

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If we already have a userId and no new token to exchange, skip
    if (userId && !token) {
        setLoading(false);
        return;
    }

    const initAuth = async () => {
      // 1. Check Query Token
      if (token) {
        try {
          // 2. Perform Handshake (Validation)
          const response = await fetch("https://api.mantracare.com/user/user-info", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          });

          if (response.ok) {
            const data = await response.json();
            const id = data.user_id;

            // 3. Resolution - Success
            sessionStorage.setItem(USER_ID_KEY, id);
            setUserId(id);

            // Clean URL (remove token)
            const params = new URLSearchParams(searchParams.toString());
            params.delete("token");
            const cleaned = params.toString() ? `${pathname}?${params}` : pathname;
            window.history.replaceState({}, "", cleaned);
            
            setLoading(false);
          } else {
            // Failure
            window.location.href = "/therapy/token";
          }
        } catch (error) {
          console.error("Handshake failed", error);
          window.location.href = "/therapy/token";
        }
        return;
      }

      // Check existing session
      const existingId = sessionStorage.getItem(USER_ID_KEY);
      if (existingId) {
        setUserId(existingId);
        setLoading(false);
      } else {
        // Missing token and no session
        // Allow the Hub (/) and Error page (/token) to be public
        if (pathname === "/" || pathname === "/token") {
          setLoading(false);
        } else {
          window.location.href = "/therapy/token";
        }
      }
    };

    initAuth();
  }, [token, pathname, searchParams, userId]);

  // Blocking Navigation: Do not render any application UI until handshake complete
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Validating session...</p>
        </div>
      </div>
    );
  }

  // Don't render until we are either authed, have a token to exchange, or are on a public path
  if (!userId && !token && pathname !== "/" && pathname !== "/token") return null;
  
  return <>{children}</>;
}
