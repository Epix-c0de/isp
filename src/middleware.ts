import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/session";

export async function middleware(request: NextRequest) {
    const protectedRoutes = ["/dashboard"];
    const publicRoutes = ["/login", "/", "/register"];

    const path = request.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
    const isPublicRoute = publicRoutes.includes(path);

    const cookie = request.cookies.get("session")?.value;
    const session = await decrypt(cookie);

    // 1. Redirect to /login if user is not authenticated and trying to access a protected route
    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }

    // 2. Redirect to /dashboard if user is authenticated and trying to access login/register
    if (isPublicRoute && session?.userId && path !== "/") {
        // Allow landing page access even if logged in, but maybe redirect login page
        return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
