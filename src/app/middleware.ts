import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";

// Define protected and public routes
const protectedRoutes = ["/salons"];
const publicRoutes = ["/login", "/signup"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // Check the session cookie
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  // If trying to access a protected route and no valid session exists, redirect to login
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // If trying to access a public route and user is authenticated, redirect to salons page
  if (
    isPublicRoute &&
    session?.userId &&
    !req.nextUrl.pathname.startsWith("/login") &&
    !req.nextUrl.pathname.startsWith("/signup")
  ) {
    return NextResponse.redirect(new URL("/salons", req.nextUrl)); // Redirect to salons if logged in
  }

  return NextResponse.next();
}

// Specify routes the middleware should apply to
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
    "/login",
    "/signup",
    "/",
  ],
};
