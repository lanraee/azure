import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import AdminNav from "@/components/AdminNav";
import { isAuthorizedAdminEmail } from "@/lib/admin-auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  if (!isAuthorizedAdminEmail(email)) {
    return (
      <ClerkProvider>
        <div className="admin-shell">
          <div className="admin-card" style={{ textAlign: "center" }}>
            <h2>Not authorized</h2>
            <p className="hint">
              {email
                ? `${email} isn't on the admin allowlist for this dashboard.`
                : "You need to sign in to view this page."}
            </p>
            <UserButton />
          </div>
        </div>
      </ClerkProvider>
    );
  }

  return (
    <ClerkProvider>
      <div className="admin-shell">
        <div className="admin-topbar">
          <h1>CV Admin</h1>
          <div className="admin-topbar-actions">
            <Link href="/" className="admin-btn secondary" target="_blank">
              View live site
            </Link>
            <UserButton />
          </div>
        </div>
        <AdminNav />
        {children}
      </div>
    </ClerkProvider>
  );
}
