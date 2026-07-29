import arcjet, { detectBot, shield } from "@arcjet/next";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);
const protectedRoutes = ["/dashboard", "/account", "/transaction"];

const aj =
  process.env.NODE_ENV === "production" && process.env.ARCJET_KEY
    ? arcjet({
        key: process.env.ARCJET_KEY,
        rules: [
          shield({ mode: "LIVE" }),
          detectBot({
            mode: "LIVE",
            allow: ["CATEGORY:SEARCH_ENGINE", "GO_HTTP"],
          }),
        ],
      })
    : null;

export default auth(async (req) => {
  const pathname = req.nextUrl.pathname;
  const isLoggedIn = !!req.auth;

  // Immediately skip middleware processing for public static assets & images
  if (
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".jpeg") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".ico") ||
    pathname.endsWith(".webp") ||
    pathname.endsWith(".css") ||
    pathname.endsWith(".js")
  ) {
    return NextResponse.next();
  }

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtected && !isLoggedIn) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Redirect authenticated user from landing page (/) to /dashboard
  if (pathname === "/" && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Run Arcjet security rules in production
  if (aj) {
    try {
      const decision = await aj.protect(req);
      if (decision.isDenied()) {
        if (decision.reason.isBot()) {
          return NextResponse.json({ error: "Bot detected" }, { status: 403 });
        }
        return NextResponse.json({ error: "Access denied" }, { status: 403 });
      }
    } catch (arcjetError) {
      // Ignore Arcjet errors
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};