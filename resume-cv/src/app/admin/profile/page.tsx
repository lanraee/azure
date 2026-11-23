import { getContent } from "@/lib/content";
import { updateProfile } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const { profile } = await getContent();

  return (
    <form className="admin-card" action={updateProfile}>
      <h2>Profile</h2>
      <p className="hint">Header details and the professional profile paragraph.</p>

      <div className="admin-field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" defaultValue={profile.name} required />
      </div>
      <div className="admin-field">
        <label htmlFor="tagline">Tagline</label>
        <input id="tagline" name="tagline" type="text" defaultValue={profile.tagline} required />
      </div>
      <div className="admin-field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" defaultValue={profile.email} required />
      </div>
      <div className="admin-field">
        <label htmlFor="location">Location</label>
        <input id="location" name="location" type="text" defaultValue={profile.location} required />
      </div>
      <div className="admin-field">
        <label htmlFor="licence">Licence / badge line</label>
        <input id="licence" name="licence" type="text" defaultValue={profile.licence} required />
      </div>
      <div className="admin-field">
        <label htmlFor="profileText">Professional profile paragraph</label>
        <textarea
          id="profileText"
          name="profileText"
          defaultValue={profile.profileText}
          required
        />
      </div>

      <button type="submit" className="admin-btn">
        Save changes
      </button>
    </form>
  );
}
