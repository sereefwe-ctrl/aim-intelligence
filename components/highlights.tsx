/**
 * Three columns between "trusted by" and the footer (after pantheon.inc): each
 * under a hairline, a small label, a title, a line of description and a link.
 * Destinations are placeholders until those pages exist.
 */
const ITEMS = [
  {
    label: "Data",
    title: "NOLLI and Global PIQA",
    text: "Our English–Korean puzzle benchmark and commonsense reasoning across 100+ languages.",
    cta: "Explore our data",
    href: "/#data",
  },
  {
    label: "Research",
    title: "Published Research",
    text: "Our work on red teaming, guardrails for AI agents, multilingual evaluation, and more.",
    cta: "Read our research",
    href: "/#publications",
  },
  {
    label: "Careers",
    title: "We’re Hiring",
    text: "Exceptional researchers and engineers who want to keep advanced AI safe and under control.",
    cta: "Learn more",
    href: "/#careers",
  },
];

export function Highlights() {
  return (
    <section className="highlights" aria-label="Data, research and careers">
      {ITEMS.map((item) => (
        <article key={item.label} className="highlight">
          <p className="highlight-label">{item.label}</p>
          <h2 className="highlight-title">{item.title}</h2>
          <p className="highlight-text">{item.text}</p>
          <a className="highlight-link" href={item.href}>
            {item.cta}
            <span aria-hidden="true">→</span>
          </a>
        </article>
      ))}
    </section>
  );
}
