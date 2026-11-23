import Link from "next/link";
import { getContent } from "@/lib/content";
import { deleteExperience, moveExperience, toggleExperienceHidden } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function ExperienceListPage() {
  const { experience } = await getContent();
  const sorted = [...experience].sort((a, b) => a.order - b.order);

  return (
    <div className="admin-card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.3rem",
        }}
      >
        <h2>Experience</h2>
        <Link href="/admin/experience/new" className="admin-btn">
          + New entry
        </Link>
      </div>
      <p className="hint">Reorder, hide, edit or remove timeline entries.</p>

      {sorted.map((entry, i) => (
        <div className="admin-exp-row" key={entry.id}>
          <div>
            <strong>{entry.title}</strong>
            {entry.hidden && <span className="badge">Hidden</span>}
            {entry.simulation && <span className="badge">Simulation style</span>}
            <div className="meta">
              {entry.org} &middot; {entry.date}
            </div>
          </div>
          <div className="actions">
            <form action={moveExperience}>
              <input type="hidden" name="id" value={entry.id} />
              <input type="hidden" name="direction" value="up" />
              <button type="submit" className="admin-btn secondary" disabled={i === 0}>
                Up
              </button>
            </form>
            <form action={moveExperience}>
              <input type="hidden" name="id" value={entry.id} />
              <input type="hidden" name="direction" value="down" />
              <button
                type="submit"
                className="admin-btn secondary"
                disabled={i === sorted.length - 1}
              >
                Down
              </button>
            </form>
            <form action={toggleExperienceHidden}>
              <input type="hidden" name="id" value={entry.id} />
              <button type="submit" className="admin-btn secondary">
                {entry.hidden ? "Unhide" : "Hide"}
              </button>
            </form>
            <Link href={`/admin/experience/${entry.id}`} className="admin-btn secondary">
              Edit
            </Link>
            <form action={deleteExperience}>
              <input type="hidden" name="id" value={entry.id} />
              <button type="submit" className="admin-btn danger">
                Delete
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}
