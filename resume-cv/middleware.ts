import { clerkMiddleware, createRouteMatcher, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { isAuthorizedAdminEmail } from "@/lib/admin-auth";

const isProtectedRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (!isProtectedRoute(req)) return;

  await auth.protect();

  // Clerk sign-up is open by default - being signed in only proves someone
  // has *a* Clerk account, not that they're the site owner. Gate /admin to
  // an explicit email allowlist so a random sign-up can't reach the CMS.
  const user = await currentUser();
  if (!isAuthorizedAdminEmail(user?.primaryEmailAddress?.emailAddress)) {
    return new NextResponse("Not authorized", { status: 403 });
  }
});

export const config = {
  // Scoped to /admin only: the public resume page must keep working even
  // before Clerk keys are configured, and clerkMiddleware() throws hard in
  // production the moment it runs without them (unlike `next dev`, which
  // only warns) - so it must never run for "/".
  matcher: ["/admin(.*)"],
};
