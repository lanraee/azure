import type { ExperienceEntry } from "@/lib/types";

export default function ExperienceForm({
  entry,
  action,
}: {
  entry?: ExperienceEntry;
  action: (formData: FormData) => void | Promise<void>;
}) {
  return (
    <form className="admin-card" action={action}>
      <h2>{entry ? "Edit entry" : "New entry"}</h2>

      <div className="admin-field">
        <label htmlFor="title">Title</label>
        <input id="title" name="title" type="text" defaultValue={entry?.title} required />
      </div>
      <div className="admin-field">
        <label htmlFor="org">Organisation</label>
        <input id="org" name="org" type="text" defaultValue={entry?.org} required />
      </div>
      <div className="admin-field">
        <label htmlFor="date">Date range</label>
        <input id="date" name="date" type="text" defaultValue={entry?.date} required />
      </div>
      <div className="admin-field">
        <label htmlFor="subtitle">Subtitle</label>
        <input id="subtitle" name="subtitle" type="text" defaultValue={entry?.subtitle} />
      </div>
      <div className="admin-field">
        <label htmlFor="bullets">Bullet points (one per line)</label>
        <textarea
          id="bullets"
          name="bullets"
          defaultValue={entry?.bullets.join("\n")}
          style={{ minHeight: "10rem" }}
        />
      </div>
      <div className="admin-field checkbox-row">
        <input
          type="checkbox"
          id="hidden"
          name="hidden"
          defaultChecked={entry?.hidden}
        />
        <label htmlFor="hidden" style={{ margin: 0, textTransform: "none" }}>
          Hidden (kept in the data but not shown on the live site)
        </label>
      </div>
      <div className="admin-field checkbox-row">
        <input
          type="checkbox"
          id="simulation"
          name="simulation"
          defaultChecked={entry?.simulation}
        />
        <label htmlFor="simulation" style={{ margin: 0, textTransform: "none" }}>
          Style as a simulation / dashed timeline entry
        </label>
      </div>

      <button type="submit" className="admin-btn">
        {entry ? "Save changes" : "Create entry"}
      </button>
    </form>
  );
}
