
// lib/auth.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

// Use distinct keys as per the ideal pattern
const REDIRECT_KEY = "APP_REDIRECT_PATH"; 
const USER_ID_KEY  = "userId";

// Portal and App URLs from env
const AUTH_PORTAL  = process.env.NEXT_PUBLIC_AUTH_PORTAL_URL ?? "https://web.mantracare.com";
const APP_ROOT     = process.env.NEXT_PUBLIC_BASE_URL         ?? "https://platform.mantracare.com/therapy";

/**
 * 1. Intercept Unauthenticated Deep Links
 */
export function redirectToAuth(intendedPath: string) {
  if (typeof window === "undefined") return;
  
  // Save precise path (including search params) to localStorage 
  localStorage.setItem(REDIRECT_KEY, intendedPath);
  
  // Redirect to Auth Portal with the app's root URL for return
  window.location.href = `${AUTH_PORTAL}/login?redirect_url=${encodeURIComponent(APP_ROOT)}`;
}

/**
 * 3. The "Smart" Restore & Navigate
 */
export function restoreAndNavigate(
  navigate: (path: string, opts?: { replace?: boolean }) => void,
  currentPathname: string
) {
  const saved = localStorage.getItem(REDIRECT_KEY);
  localStorage.removeItem(REDIRECT_KEY);
  
  // The Fallback Logic: Saved path -> Current Path -> Home (/)
  // Note: Since we use basePath: "/therapy", "/" refers to the hub at /therapy
  const target = (saved && saved !== "/") ? saved : (currentPathname || "/");
  
  navigate(target, { replace: true });
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router       = useRouter();
  const pathname     = usePathname();
  const searchParams = useSearchParams();
  const token        = searchParams.get("token");
  
  const [userId, setUserId] = useState<string | null>(null);

  // Load userId on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserId(localStorage.getItem(USER_ID_KEY));
    }
  }, []);

  /**
   * 2. Handle Auth Portal Return & Magic Links
   */
  useEffect(() => {
    if (!token) return;
    
    (async () => {
      try {
        const res  = await fetch(`/api/auth/exchange?token=${token}`);
        const data = await res.json();
        
        if (data.userId) {
          localStorage.setItem(USER_ID_KEY, data.userId);
          setUserId(data.userId);
          // Hand off to smart navigator
          restoreAndNavigate(router.push.bind(router), pathname);
        } else {
          redirectToAuth(pathname + (searchParams.toString() ? `?${searchParams}` : ""));
        }
      } catch (err) {
        console.error("Token exchange failed", err);
        redirectToAuth(pathname + (searchParams.toString() ? `?${searchParams}` : ""));
      }
    })();
  }, [token, pathname, router]);

  /**
   * 4. Stale Token Cleanup (Failsafe)
   */
  useEffect(() => {
    // If authed but token still in URL (refresh/stale link)
    if (userId && token) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("token");
      const cleaned = params.toString() ? `${pathname}?${params}` : pathname;
      router.replace(cleaned);
    }
  }, [userId, token, pathname, router, searchParams]);

  // Handle initial redirect if not authed
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Allow the root hub (/) to be public so users can see the buttons
    if (pathname === "/") return;

    const localId = localStorage.getItem(USER_ID_KEY);
    if (!localId && !token) {
       redirectToAuth(pathname + (searchParams.toString() ? `?${searchParams}` : ""));
    } else if (localId && !userId) {
       setUserId(localId);
    }
  }, [userId, token, pathname, searchParams]);

  // Don't render until we are either authed, have a token to exchange, or are on a public path
  if (!userId && !token && pathname !== "/") return null;
  
  return <>{children}</>;
}
