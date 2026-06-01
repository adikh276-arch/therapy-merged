/**
 * Utility to prefix API paths with the Next.js basePath.
 * When basePath = "/therapy", fetch('/api/foo') hits the wrong URL.
 * Use apiPath('/api/foo') → '/therapy/api/foo' instead.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '/therapy';

export function apiPath(path: string): string {
  // Avoid double-prefixing
  if (path.startsWith(BASE_PATH)) return path;
  return `${BASE_PATH}${path}`;
}
