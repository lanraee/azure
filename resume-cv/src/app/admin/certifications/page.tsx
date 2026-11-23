import { getContent } from "@/lib/content";
import { updateCertifications } from "@/lib/actions";
import SavedBanner from "@/components/SavedBanner";

export const dynamic = "force-dynamic";

export default async function CertificationsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { certsInProgress, certifications } = await getContent();
  const { saved } = await searchParams;

  return (
    <form className="admin-card" action={updateCertifications}>
      <div className="admin-card-head">
        <div>
          <h2>Certifications</h2>
          <p className="hint">One entry per line.</p>
        </div>
        <SavedBanner show={saved === "1"} />
      </div>

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

      <div className="admin-form-actions">
        <button type="submit" className="admin-btn">
          Save changes
        </button>
      </div>
    </form>
  );
}
