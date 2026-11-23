import { getContent } from "@/lib/content";
import { updateSkills } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function SkillsPage() {
  const { skills } = await getContent();

  return (
    <form className="admin-card" action={updateSkills}>
      <h2>Technical Skills</h2>
      <p className="hint">
        One group per box. Edit the group name and its comma-separated tags. Leave a group&apos;s
        name blank to remove it. Add a new group using the box at the bottom.
      </p>

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

      <div className="admin-group-box">
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

      <button type="submit" className="admin-btn">
        Save changes
      </button>
    </form>
  );
}
