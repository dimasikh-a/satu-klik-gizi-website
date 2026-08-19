import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("session");

  const isDashboardRoute =
    req.nextUrl.pathname.startsWith("/admin/dashboard");

  const isLoginRoute =
    req.nextUrl.pathname === "/login";

  if (isDashboardRoute && !session) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }

  if (isLoginRoute && session) {
    return NextResponse.redirect(
      new URL("/admin/dashboard", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/dashboard/:path*",
    "/login",
  ],
};