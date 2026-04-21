// src/components/AuthGuard.tsx
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AUTH_PORTAL_URL = import.meta.env.VITE_AUTH_PORTAL_URL;
// APP_ROOT_URL is intentionally NOT hardcoded — window.location.origin is used
// at runtime so this works across web.mantracare.com, therapy.mantracare.com,
// or any other domain without changing config.
const REDIRECT_KEY    = 'THERAPY_REDIRECT_PATH';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const navigate  = useNavigate();
  const location  = useLocation();
  const userId    = localStorage.getItem('userId');

  // ─────────────────────────────────────────────────────────────────────
  // EFFECT 1 — Runs ONCE on mount
  // Handles: unauthenticated redirect + token exchange on return
  // ─────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token  = params.get('token');

    if (token) {
      // Auth portal has returned with a token — exchange it
      fetch(`${AUTH_PORTAL_URL}/api/verify-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
        .then(res => res.json())
        .then(({ userId: resolvedId }) => {
          if (resolvedId) {
            localStorage.setItem('userId', resolvedId);
            restoreAndNavigate(location.pathname);
          } else {
            localStorage.removeItem('userId');
            redirectToAuthPortal();
          }
        })
        .catch(() => {
          redirectToAuthPortal();
        });

    } else if (!userId) {
      redirectToAuthPortal();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ─────────────────────────────────────────────────────────────────────
  // EFFECT 2 — Watches location.search
  // Failsafe: clean stale token from URL if user is already authenticated
  // ─────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (userId && params.has('token')) {
      params.delete('token');
      const cleanSearch = params.toString();
      navigate(
        location.pathname + (cleanSearch ? `?${cleanSearch}` : ''),
        { replace: true }
      );
    }
  }, [location.search]); // eslint-disable-line react-hooks/exhaustive-deps

  // ─────────────────────────────────────────────────────────────────────
  // Helpers
  // ─────────────────────────────────────────────────────────────────────
  function redirectToAuthPortal() {
    const intendedPath = location.pathname + location.search;
    if (intendedPath && intendedPath !== '/') {
      localStorage.setItem(REDIRECT_KEY, intendedPath);
    }
    // window.location.origin gives the correct domain automatically —
    // works on web.mantracare.com, therapy.mantracare.com, or any other
    // domain this app is ever deployed to, with zero config changes.
    const returnUrl = window.location.origin;
    window.location.href = `${AUTH_PORTAL_URL}?redirect_url=${encodeURIComponent(returnUrl)}`;
  }

  function restoreAndNavigate(currentPathname: string) {
    const saved = localStorage.getItem(REDIRECT_KEY);
    localStorage.removeItem(REDIRECT_KEY);
    const target =
      (saved && saved !== '/') ? saved :
      (currentPathname && currentPathname !== '/') ? currentPathname :
      '/';
    navigate(target, { replace: true });
  }

  if (!userId) return null;

  return <>{children}</>;
}
