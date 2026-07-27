import arcjet, { detectBot, shield } from "@arcjet/next";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/account(.*)",
  "/transaction(.*)",
]);

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

export default clerkMiddleware(async (auth, req) => {
  const pathname = req.nextUrl.pathname;

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

  if (isProtectedRoute(req)) {
    const { userId } = await auth();
    if (!userId) {
      const { redirectToSignIn } = await auth();
      return redirectToSignIn();
    }
  }

  // Redirect authenticated user from landing page (/) to /dashboard
  if (pathname === "/") {
    try {
      const { userId } = await auth();
      if (userId) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    } catch (e) {}
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