/**
 * Utility to prefix API paths with the Next.js basePath (/therapy).
 *
 * Next.js's basePath only affects <Link> and router.push() — NOT bare fetch() calls.
 * All client-side fetch('/api/...') calls MUST use this helper so the request
 * goes to /therapy/api/... instead of /api/... on the root domain.
 *
 * NOTE: Hardcoded to '/therapy' to guarantee correctness regardless of
 * build-time env vars (NEXT_PUBLIC_* vars are inlined at build time and were
 * silently absent in the CI/Docker pipeline, causing paths to be un-prefixed).
 */
const BASE_PATH = '/therapy';

export function apiPath(path: string): string {
  // Avoid double-prefixing if somehow already prefixed
  if (path.startsWith(BASE_PATH)) return path;
  return `${BASE_PATH}${path}`;
}
