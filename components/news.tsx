/**
 * News: newest first. Each row is a link out to the article: date, then the
 * source as a lead-in and the headline, then an arrow (after attentionx.org).
 * Dates are the articles' own publish dates.
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
    date: "2026-11-03",
    source: "VentureSquare",
    title:
      "AIM Intelligence takes 2nd place overall at global deep tech competition Slingshot 2026",
    href: "https://www.venturesquare.net/en/1125097/",
  },
  {
    date: "2026-09-03",
    source: "VentureSquare",
    title:
      "A security fence for action-oriented AI assistants: AIM Intelligence joins ‘AI for Everyone’",
    href: "https://www.venturesquare.net/en/1110625/",
  },
  {
    date: "2026-04-10",
    source: "The SaaS News",
    title: "AIM Intelligence secures KRW 10B in Series A",
    href: "https://www.thesaasnews.com/news/aim-intelligence-secures-krw-10b-in-series-a/",
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
    <section id="news" className="news" aria-labelledby="news-title">
      <h2 id="news-title" className="news-eyebrow">
        News
      </h2>
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
