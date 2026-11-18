import { AIM_LOGO } from "@/lib/aim-logo";

/** Footer columns. Destinations are placeholders until those pages exist. */
const COLUMNS = [
  {
    title: "Research",
    links: ["Publications", "Red teaming", "Guardrails", "Evaluations"],
  },
  {
    title: "Products",
    links: ["Products", "Solutions"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "News", "Contact"],
  },
  {
    title: "Connect",
    links: ["LinkedIn", "X / Twitter", "GitHub"],
  },
];

const slug = (s: string) =>
  "#" +
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/**
 * Footer: a one-line sign-off, link columns (sans headings over tracked mono
 * links, after juicebox.ai), the copyright line, and the full AIM INTELLIGENCE
 * logo running edge to edge across the screen, flush with the bottom of the
 * page (after attentionx.org).
 */
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p className="footer-origin">
        From Seoul <span className="emoji">🇰🇷</span> and San Francisco{" "}
        <span className="emoji">🇺🇸</span> to the world{" "}
        <span className="emoji">🌍</span>
      </p>

      <nav className="footer-columns" aria-label="Footer">
        {COLUMNS.map((col) => (
          <div key={col.title} className="footer-col">
            <h2 className="footer-heading">{col.title}</h2>
            <ul>
              {col.links.map((label) => (
                <li key={label}>
                  <a href={slug(label)}>{label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="footer-col footer-cta">
          <h2 className="footer-heading">Work with AIM</h2>
          <ul>
            <li>
              <a href="#contact">Book a demo</a>
            </li>
            <li>
              <a href="#contact">Contact sales</a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="footer-legal">
        <p>© 2026 AIM Intelligence. All rights reserved.</p>
      </div>

      <div className="footer-mark" aria-hidden="true">
        <svg viewBox={AIM_LOGO.viewBox}>
          <path d={AIM_LOGO.cross} />
          {AIM_LOGO.word.map((l) => (
            <path key={l.d} d={l.d} />
          ))}
          <path d={AIM_LOGO.aim} />
        </svg>
      </div>
    </footer>
  );
}
