import { getContent } from "@/lib/content";
import { updateSkills } from "@/lib/actions";
import SavedBanner from "@/components/SavedBanner";

export const dynamic = "force-dynamic";

export default async function SkillsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { skills } = await getContent();
  const { saved } = await searchParams;

  return (
    <form className="admin-card" action={updateSkills}>
      <div className="admin-card-head">
        <div>
          <h2>Technical Skills</h2>
          <p className="hint">
            One group per box. Edit the group name and its comma-separated tags. Leave a
            group&apos;s name blank to remove it. Add a new group using the box at the bottom.
          </p>
        </div>
        <SavedBanner show={saved === "1"} />
      </div>

      {skills.map((group) => (
        <div className="admin-group-box" key={group.id}>
          <input type="hidden" name="groupId" value={group.id} />
          <div className="admin-field">
            <label>Group name</label>
            <input type="text" name="groupName" defaultValue={group.name} />
          </div>
          <div className="admin-field">
            <label>Tags (comma-separated)</label>
            <input type="text" name="groupItems" defaultValue={group.items.join(", ")} />
          </div>
        </div>
      ))}

      <div className="admin-group-box admin-group-box-new">
        <strong style={{ fontSize: "0.85rem" }}>+ Add new group</strong>
        <div className="admin-field" style={{ marginTop: "0.6rem" }}>
          <label>Group name</label>
          <input type="text" name="newGroupName" />
        </div>
        <div className="admin-field">
          <label>Tags (comma-separated)</label>
          <input type="text" name="newGroupItems" />
        </div>
      </div>

      <div className="admin-form-actions">
        <button type="submit" className="admin-btn">
          Save changes
        </button>
      </div>
    </form>
  );
}
