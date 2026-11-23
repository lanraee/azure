import { ClerkProvider, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <div className="admin-shell">
        <div className="admin-topbar">
          <h1>CV Admin</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Link href="/" className="admin-btn secondary" target="_blank">
              View live site
            </Link>
            <UserButton />
          </div>
        </div>
        <nav className="admin-nav">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/profile">Profile</Link>
          <Link href="/admin/skills">Skills</Link>
          <Link href="/admin/certifications">Certifications</Link>
          <Link href="/admin/experience">Experience</Link>
        </nav>
        {children}
      </div>
    </ClerkProvider>
  );
}
