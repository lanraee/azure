import { ClerkProvider, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import AdminNav from "@/components/AdminNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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
