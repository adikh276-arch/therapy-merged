
// lib/auth.tsx
"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const USER_ID_KEY = "user_id";
const APP_REDIRECT_PATH = "APP_REDIRECT_PATH";
const AUTH_PORTAL_URL = "https://web.mantracare.com"; // Central Auth Portal

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 3. The "Smart" Restore & Navigate (Crucial Step)
  const restoreAndNavigate = useCallback((currentPath: string) => {
    const savedPath = localStorage.getItem(APP_REDIRECT_PATH);
    localStorage.removeItem(APP_REDIRECT_PATH);

    // The Fallback Logic: If saved path exists use it, else current path, else home
    let targetPath = savedPath || currentPath || "/";
    
    // Safety check: ensure it doesn't double-prefix /therapy
    if (targetPath.startsWith("/therapy")) {
        targetPath = targetPath.replace("/therapy", "");
    }
    if (!targetPath.startsWith("/")) targetPath = "/" + targetPath;

    // Use router.replace to natively strip all query parameters (the token) from the URL bar
    router.replace(targetPath);
  }, [router]);

  useEffect(() => {
    const token = searchParams.get("token");
    const existingUserId = localStorage.getItem(USER_ID_KEY);

    const initAuth = async () => {
      // 2. Handle Auth Portal Return & Magic Links
      if (token) {
        try {
          const response = await fetch("https://api.mantracare.com/user/user-info", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          });

          if (response.ok) {
            const data = await response.json();
            const id = data.user_id;

            // Save to localStorage (survives better than sessionStorage)
            localStorage.setItem(USER_ID_KEY, id);
            setUserId(id);

            // Execute smart restore
            restoreAndNavigate(pathname);
          } else {
            // Token invalid or expired - re-authenticate
            localStorage.setItem(APP_REDIRECT_PATH, pathname + window.location.search);
            window.location.href = `${AUTH_PORTAL_URL}?redirect_url=${window.location.origin}/therapy/`;
          }
        } catch (error) {
          console.error("Auth Handshake failed", error);
          setLoading(false);
        }
        return;
      }

      // 1. Intercept Unauthenticated Deep Links
      if (!existingUserId) {
        // Allow root Hub path to be public/accessible for browsing
        if (pathname === "/" || pathname === "/token") {
          setLoading(false);
          return;
        }

        // Capture intended path and redirect to Auth Portal
        localStorage.setItem(APP_REDIRECT_PATH, pathname + window.location.search);
        window.location.href = `${AUTH_PORTAL_URL}?redirect_url=${window.location.origin}/therapy/`;
        return;
      }

      setUserId(existingUserId);
      setLoading(false);
    };

    initAuth();
  }, [searchParams, pathname, restoreAndNavigate]);

  // 4. Stale Token Cleanup (Failsafe)
  useEffect(() => {
    const token = searchParams.get("token");
    const existingUserId = localStorage.getItem(USER_ID_KEY);
    
    if (existingUserId && token) {
      // User is already authenticated but a token exists in URL (e.g. stale refresh)
      const params = new URLSearchParams(searchParams.toString());
      params.delete("token");
      const cleaned = params.toString() ? `${pathname}?${params}` : pathname;
      router.replace(cleaned);
    }
  }, [searchParams, pathname, router]);

  // UI feedback while validating
  if (loading && pathname !== "/" && pathname !== "/token") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white font-sans">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-indigo-100 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-900">Sign-in Required</h2>
            <p className="text-gray-500">Securing your therapy space...</p>
          </div>
        </div>
      </div>
    );
  }

  // Safety block
  if (!userId && !searchParams.get("token") && pathname !== "/" && pathname !== "/token") return null;

  return <>{children}</>;
}
