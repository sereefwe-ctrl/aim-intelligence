import Link from "next/link";
import { AIM_LOGO } from "@/lib/aim-logo";

/**
 * Footer columns. Apart from News, destinations are placeholders until those
 * pages exist.
 */
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

const PAGES: Record<string, string> = { News: "/news" };

const href = (label: string) =>
  PAGES[label] ??
  "/#" +
    label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

/**
 * Footer, after exa.ai: a closing headline in the serif, a rule across the
 * screen, link columns (serif headings over sans links), then the copyright
 * and sign-off line. Last, the full AIM INTELLIGENCE logo running edge to
 * edge, flush with the bottom of the page (after attentionx.org).
 */
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p className="footer-headline">
        The question is no longer “What can we do with AI?”
        <br /> It is “Who keeps it under control?”
      </p>

      <hr className="footer-rule" />

      <nav className="footer-columns" aria-label="Footer">
        {COLUMNS.map((col) => (
          <div key={col.title} className="footer-col">
            <h2 className="footer-heading">{col.title}</h2>
            <ul>
              {col.links.map((label) => (
                <li key={label}>
                  <Link href={href(label)}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="footer-col footer-cta">
          <h2 className="footer-heading">Work with AIM</h2>
          <ul>
            <li>
              <Link href="/#contact">Book a demo</Link>
            </li>
            <li>
              <Link href="/#contact">Contact sales</Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="footer-legal">
        <p>© 2026 AIM Intelligence. All rights reserved.</p>
        <p>
          From Seoul <span className="emoji">🇰🇷</span> and San Francisco{" "}
          <span className="emoji">🇺🇸</span> to the world{" "}
          <span className="emoji">🌍</span>
        </p>
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
