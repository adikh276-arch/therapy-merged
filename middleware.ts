// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const PUBLIC = ["/api/auth", "/_next", "/favicon"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Allow public paths
  if (PUBLIC.some((p) => pathname.startsWith(p))) return NextResponse.next();
  
  // Allow if token is present (AuthGuard will handle validation)
  if (req.nextUrl.searchParams.has("token"))       return NextResponse.next();
  
  // Special case for root therapy path
  if (pathname === "/therapy" || pathname === "/therapy/") return NextResponse.next();

  return NextResponse.next(); // client-side AuthGuard handles the rest
}

export const config = { matcher: ["/therapy/:path*"] };
