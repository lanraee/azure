import { getContent } from "@/lib/content";
import { updateCertifications } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function CertificationsPage() {
  const { certsInProgress, certifications } = await getContent();

  return (
    <form className="admin-card" action={updateCertifications}>
      <h2>Certifications</h2>
      <p className="hint">One entry per line.</p>

      <div className="admin-field">
        <label htmlFor="certsInProgress">In Progress</label>
        <textarea
          id="certsInProgress"
          name="certsInProgress"
          defaultValue={certsInProgress.join("\n")}
          style={{ minHeight: "9rem" }}
        />
      </div>

      <div className="admin-field">
        <label htmlFor="certifications">Certifications</label>
        <textarea
          id="certifications"
          name="certifications"
          defaultValue={certifications.join("\n")}
          style={{ minHeight: "12rem" }}
        />
      </div>

      <button type="submit" className="admin-btn">
        Save changes
      </button>
    </form>
  );
}
