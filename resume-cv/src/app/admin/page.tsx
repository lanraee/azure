import Link from "next/link";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const content = await getContent();
  const visibleCount = content.experience.filter((e) => !e.hidden).length;
  const hiddenCount = content.experience.length - visibleCount;

  return (
    <div className="admin-card">
      <div className="admin-card-head">
        <div>
          <h2>Overview</h2>
          <p className="hint">Quick summary of what&apos;s currently published on the live resume.</p>
        </div>
      </div>

      <div className="admin-stats-grid">
        <Link href="/admin/skills" className="admin-stat-tile">
          <span className="admin-stat-number">{content.skills.length}</span>
          <span className="admin-stat-label">Skill groups</span>
        </Link>
        <Link href="/admin/certifications" className="admin-stat-tile">
          <span className="admin-stat-number">{content.certsInProgress.length}</span>
          <span className="admin-stat-label">In progress certs</span>
        </Link>
        <Link href="/admin/certifications" className="admin-stat-tile">
          <span className="admin-stat-number">{content.certifications.length}</span>
          <span className="admin-stat-label">Completed certs</span>
        </Link>
        <Link href="/admin/experience" className="admin-stat-tile">
          <span className="admin-stat-number">{visibleCount}</span>
          <span className="admin-stat-label">
            Visible entries{hiddenCount > 0 ? ` (${hiddenCount} hidden)` : ""}
          </span>
        </Link>
      </div>

      <div className="admin-form-actions">
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
