import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (!isProtectedRoute(req)) return;
  await auth.protect();
  // Email-allowlist check happens in the /admin layout (a Server Component)
  // and in every Server Action instead of here: currentUser() inside
  // clerkMiddleware intermittently loses request context under concurrent
  // requests, surfacing as "auth() was called but Clerk can't detect usage
  // of clerkMiddleware()" even though this middleware did run.
});

export const config = {
  // Scoped to /admin only: the public resume page must keep working even
  // before Clerk keys are configured, and clerkMiddleware() throws hard in
  // production the moment it runs without them (unlike `next dev`, which
  // only warns) - so it must never run for "/".
  matcher: ["/admin(.*)"],
};
