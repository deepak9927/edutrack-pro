import { auth } from "./auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/lib/constants";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  console.log("Middleware - Path:", nextUrl.pathname);
  console.log("Middleware - isApiAuthRoute:", isApiAuthRoute);
  console.log("Middleware - isPublicRoute:", isPublicRoute);
  console.log("Middleware - isAuthRoute:", isAuthRoute);
  console.log("Middleware - isLoggedIn:", isLoggedIn);

  if (isApiAuthRoute) {
    console.log("Middleware - Allowing API Auth Route:", nextUrl.pathname);
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return NextResponse.redirect(
      new URL(
        `/auth/login?callbackUrl=${encodedCallbackUrl}`,
        nextUrl
      )
    );
  }

  return null;
});

// Optionally, don't invoke "auth" except on specific routes
export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)", 
    "/", 
    "/(api|trpc)(.*)"
  ]
};
