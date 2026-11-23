import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  // Scoped to /admin only: the public resume page must keep working even
  // before Clerk keys are configured, and clerkMiddleware() throws hard in
  // production the moment it runs without them (unlike `next dev`, which
  // only warns) - so it must never run for "/".
  matcher: ["/admin(.*)"],
};
