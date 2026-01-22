import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession } from "@/lib/auth";
import { config as appConfig } from "@/lib/config";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignorer les requêtes avec le préfixe /app/ (probablement des extensions de navigateur)
  if (pathname.startsWith("/app/")) {
    return NextResponse.next();
  }

  // Ignorer les requêtes .well-known (Chrome DevTools, etc.)
  if (pathname.startsWith("/.well-known/")) {
    return NextResponse.next();
  }

  // Protéger toutes les routes /admin/* sauf /admin/login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const sessionCookie = request.cookies.get(appConfig.sessionCookieName);

    if (!sessionCookie?.value) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const session = await verifySession(sessionCookie.value);
    if (!session || session.role !== "ADMIN") {
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.delete(appConfig.sessionCookieName);
      return response;
    }
  }

  // Protéger toutes les routes /portal/* sauf /login
  if (pathname.startsWith("/portal")) {
    const sessionCookie = request.cookies.get(appConfig.sessionCookieName);

    if (!sessionCookie?.value) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const session = await verifySession(sessionCookie.value);
    if (!session || session.role !== "CLIENT") {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete(appConfig.sessionCookieName);
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/portal/:path*",
    "/app/:path*",
    "/.well-known/:path*",
  ],
};
