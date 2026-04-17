// lib/auth.ts
"use client";
import React, { useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const REDIRECT_KEY = "THERAPY_REDIRECT_PATH";
const AUTH_PORTAL  = process.env.NEXT_PUBLIC_AUTH_PORTAL_URL ?? "https://web.mantracare.com";
const APP_ROOT     = process.env.NEXT_PUBLIC_BASE_URL         ?? "https://platform.mantracare.com";

// Save destination, go to auth portal
export function redirectToAuth(intendedPath: string) {
  if (typeof window === "undefined") return;
  // localStorage (not sessionStorage) — survives cross-domain hops in Safari/mobile
  localStorage.setItem(REDIRECT_KEY, intendedPath);
  window.location.href = `${AUTH_PORTAL}/login?redirect_url=${encodeURIComponent(APP_ROOT)}`;
}

// After auth: navigate to saved destination and strip token from URL
export function restoreAndNavigate(
  navigate: (path: string, opts?: { replace?: boolean }) => void,
  currentPathname: string
) {
  const saved = localStorage.getItem(REDIRECT_KEY);
  localStorage.removeItem(REDIRECT_KEY);
  // Fallback chain: saved path → current path → /therapy
  const target = saved && saved !== "/" ? saved : currentPathname || "/therapy";
  navigate(target, { replace: true }); // { replace: true } keeps token out of back-button history
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router       = useRouter();
  const pathname     = usePathname();
  const searchParams = useSearchParams();
  const token  = searchParams.get("token");
  
  // Use a state-like approach to track userId in client-side
  const [userId, setUserId] = React.useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserId(localStorage.getItem("userId"));
    }
  }, []);

  // Effect 1 — exchange token from auth portal return
  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const res  = await fetch(`/api/auth/exchange?token=${token}`);
        const data = await res.json();
        if (data.userId) {
          localStorage.setItem("userId", data.userId);
          setUserId(data.userId);
          restoreAndNavigate(router.push.bind(router), pathname);
        } else {
          redirectToAuth(pathname);
        }
      } catch {
        redirectToAuth(pathname);
      }
    })();
  }, [token, pathname, router]); // Added dependencies

  // Effect 2 — stale token cleanup (already authed, token still in URL)
  useEffect(() => {
    if (!token || !userId) return;
    const params = new URLSearchParams(searchParams.toString());
    params.delete("token");
    const cleaned = params.toString() ? `${pathname}?${params}` : pathname;
    router.replace(cleaned);
  }, [searchParams, token, userId, pathname, router]); // Added dependencies

  // Effect 3 — not authed, no token → send to auth portal
  useEffect(() => {
    if (!userId && !token && typeof window !== 'undefined') {
       // Check localStorage directly because state might not be updated yet
       const localId = localStorage.getItem("userId");
       if (!localId) {
         redirectToAuth(pathname + (searchParams.toString() ? `?${searchParams}` : ""));
       } else {
         setUserId(localId);
       }
    }
  }, [userId, token, pathname, searchParams]); // Added dependencies

  if (!userId && !token) return null;
  return <>{children}</>;
}
