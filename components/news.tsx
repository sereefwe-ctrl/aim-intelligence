/**
 * The News page (/news): a title, then the articles, newest first. Each row is a link out to the article: date, then the
 * source as a lead-in and the headline, then an arrow (after attentionx.org).
 * Dates are the articles' own publish dates (for arXiv papers, the first
 * version).
 */
const NEWS = [
  {
    date: "2026-11-09",
    source: "NVIDIA",
    title:
      "Hyundai Motor Group and AIM Intelligence explore NVIDIA NemoClaw and OpenShell for secure enterprise agents",
    href: "https://blogs.nvidia.com/blog/korea-secure-agentic-ai/",
  },
  {
    date: "2026-08-05",
    source: "arXiv",
    title:
      "NOLLI: A Difficulty-Calibrated Puzzle Benchmark for Diagnosing the English-Korean Performance Gap",
    href: "https://arxiv.org/abs/2608.04397",
  },
  {
    date: "2026-04-10",
    source: "The SaaS News",
    title: "AIM Intelligence secures KRW 10B in Series A",
    href: "https://www.thesaasnews.com/news/aim-intelligence-secures-krw-10b-in-series-a/",
  },
  {
    date: "2025-10-28",
    source: "arXiv",
    title:
      "Global PIQA: Evaluating Commonsense Reasoning Across 100+ Languages and Cultures",
    href: "https://arxiv.org/abs/2510.24081",
  },
];

const fmt = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

export function News() {
  return (
    <section className="news" aria-labelledby="news-title">
      <h1 id="news-title" className="news-heading">
        News
      </h1>
      <ul className="news-list">
        {NEWS.map((n) => (
          <li key={n.href}>
            <a
              className="news-item"
              href={n.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <time className="news-date" dateTime={n.date}>
                {fmt(n.date)}
              </time>
              <span className="news-title">
                <strong>{n.source}:</strong> {n.title}
              </span>
              <span className="news-arrow" aria-hidden="true">
                →
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
