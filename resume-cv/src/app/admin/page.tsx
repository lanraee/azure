import Link from "next/link";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const content = await getContent();
  const visibleCount = content.experience.filter((e) => !e.hidden).length;

  return (
    <div className="admin-card">
      <h2>Overview</h2>
      <p className="hint">Quick summary of what&apos;s currently published on the live resume.</p>
      <ul style={{ fontSize: "0.9rem", lineHeight: 1.9, paddingLeft: "1.2rem" }}>
        <li>{content.skills.length} skill groups</li>
        <li>{content.certsInProgress.length} in-progress certifications</li>
        <li>{content.certifications.length} completed certifications</li>
        <li>
          {content.experience.length} experience entries ({visibleCount} visible,{" "}
          {content.experience.length - visibleCount} hidden)
        </li>
      </ul>
      <div style={{ marginTop: "1.2rem", display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
        <Link href="/admin/profile" className="admin-btn">
          Edit profile
        </Link>
        <Link href="/admin/experience" className="admin-btn secondary">
          Manage experience
        </Link>
      </div>
    </div>
  );
}
