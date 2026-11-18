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

/**
 * Certifications and programmes, stacked beside the columns and centred on one
 * axis; widths are set so the three carry the same visual weight (one-colour
 * SVGs in public/certs).
 */
const CERTS = [
  {
    name: "ISO/IEC 27001 certified",
    src: "/certs/iso-27001.svg",
    w: 400,
    h: 400,
    width: 72,
  },
  {
    name: "OWASP GenAI Security Project",
    src: "/certs/owasp-genai.svg",
    w: 1227,
    h: 399,
    width: 140,
  },
  {
    name: "NVIDIA Inception Program member",
    src: "/certs/nvidia-inception.svg",
    w: 621,
    h: 208,
    width: 128,
  },
];

const href = (label: string) =>
  PAGES[label] ??
  "/#" +
    label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

/**
 * Footer, after exa.ai: a closing headline in the serif, a rule across the
 * screen, link columns (serif headings over sans links) with the certification
 * badges stacked on the right, then the copyright
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

      <div className="footer-body">
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

        <ul className="footer-certs" aria-label="Certifications and programs">
          {CERTS.map((c) => (
            <li key={c.src}>
              <span
                role="img"
                aria-label={c.name}
                className="footer-cert"
                style={
                  {
                    "--logo": `url(${c.src})`,
                    width: `${c.width}px`,
                    aspectRatio: `${c.w} / ${c.h}`,
                  } as React.CSSProperties
                }
              />
            </li>
          ))}
        </ul>
      </div>

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
