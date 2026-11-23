import { getContent } from "@/lib/content";
import { HeaderWidgets, ScrollTopButton } from "@/components/SiteScripts";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const content = await getContent();
  const { profile, skills, certsInProgress, certifications, experience } = content;
  const visibleExperience = [...experience]
    .filter((e) => !e.hidden)
    .sort((a, b) => a.order - b.order);

  return (
    <>
    <div className="page">
      <header>
        <div
          className="cv-stamp"
          role="img"
          aria-label="Badge: Azure Static Web CV, Cloud Engineer, Agentic Engineer"
        >
          <svg className="stamp-svg" viewBox="0 0 220 220">
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff6d2" />
                <stop offset="40%" stopColor="#f5d478" />
                <stop offset="70%" stopColor="#d4a53b" />
                <stop offset="100%" stopColor="#9c7a22" />
              </linearGradient>
              <path id="stampArcTop" d="M 20,110 A 90,90 0 0 1 200,110" fill="none" />
              <path id="stampArcBottom" d="M 13,110 A 97,97 0 0 0 207,110" fill="none" />
            </defs>
            <circle cx="110" cy="110" r="102" className="stamp-ring-outer" />
            <circle cx="110" cy="110" r="84" className="stamp-ring-inner" />
            <text className="stamp-text-arc">
              <textPath href="#stampArcTop" startOffset="50%" textAnchor="middle">
                AZURE STATIC WEB CV
              </textPath>
            </text>
            <text className="stamp-text-arc">
              <textPath href="#stampArcBottom" startOffset="50%" textAnchor="middle">
                AGENTIC ENGINEER
              </textPath>
            </text>
            <text x="110" y="103" textAnchor="middle" className="stamp-text-main">
              CLOUD
            </text>
            <text x="110" y="125" textAnchor="middle" className="stamp-text-main">
              ENGINEER
            </text>
            <circle cx="20" cy="110" r="2.4" className="stamp-dot" />
            <circle cx="200" cy="110" r="2.4" className="stamp-dot" />
          </svg>
        </div>
        <h1>{profile.name}</h1>
        <p className="tagline">{profile.tagline}</p>
        <div className="contact-bar">
          <a href={`mailto:${profile.email}`}>
            <svg className="icon" viewBox="0 0 24 24">
              <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            {profile.email}
          </a>
          <span>
            <svg className="icon" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            {profile.location}
          </span>
          <span>
            <svg className="icon" viewBox="0 0 24 24">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM19 17H5v-5h14v5z" />
            </svg>
            {profile.licence}
          </span>
        </div>
        <HeaderWidgets />
      </header>

      <div className="body">
        <aside className="sidebar">
          <div className="section">
            <div className="section-title">Technical Skills</div>
            {skills.map((group) => (
              <div className="skill-group" key={group.id}>
                <h4>{group.name}</h4>
                <div className="tags">
                  {group.items.map((item) => (
                    <span className="tag" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="section">
            <div className="section-title">In Progress</div>
            {certsInProgress.map((cert) => (
              <div className="cert-item" key={cert}>
                <span className="cert-dot"></span>
                {cert}
              </div>
            ))}
          </div>

          <div className="section">
            <div className="section-title">Certifications</div>
            {certifications.map((cert) => (
              <div className="cert-item" key={cert}>
                <span className="cert-dot"></span>
                {cert}
              </div>
            ))}
          </div>
        </aside>

        <main className="main">
          <div className="section">
            <div className="section-title">Professional Profile</div>
            <p className="profile-text">{profile.profileText}</p>
          </div>

          <div className="section">
            <div className="section-title">Professional Experience</div>
            <div className="timeline">
              {visibleExperience.map((entry) => (
                <div
                  className={`entry${entry.simulation ? " entry-simulation" : ""}`}
                  key={entry.id}
                >
                  <div className="entry-header">
                    <div>
                      <div className="entry-title">{entry.title}</div>
                      <div className="entry-org">{entry.org}</div>
                    </div>
                    <span className="entry-date">{entry.date}</span>
                  </div>
                  <p className="entry-sub">{entry.subtitle}</p>
                  <ul>
                    {entry.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
    <ScrollTopButton />
    </>
  );
}
