import arcjet, { detectBot, shield } from "@arcjet/next";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/account(.*)",
  "/transaction(.*)",
]);

// Create Arcjet protection instance
const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({
      mode: "LIVE",
    }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE", "GO_HTTP"],
    }),
  ],
});

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    const { userId } = await auth();
    if (!userId) {
      const { redirectToSignIn } = await auth();
      return redirectToSignIn();
    }
  }

  // Redirect authenticated user from landing page (/) to /dashboard
  if (req.nextUrl.pathname === "/") {
    const { userId } = await auth();
    if (userId) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  // Run Arcjet security rules safely
  if (process.env.ARCJET_KEY) {
    try {
      const decision = await aj.protect(req);
      if (decision.isDenied()) {
        if (decision.reason.isBot()) {
          return NextResponse.json({ error: "Bot detected" }, { status: 403 });
        }
        return NextResponse.json({ error: "Access denied" }, { status: 403 });
      }
    } catch (arcjetError) {
      console.error("Arcjet protection error in middleware:", arcjetError);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};