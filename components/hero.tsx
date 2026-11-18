import { MarkerCircle } from "@/components/marker-circle";
import { BACKERS } from "@/lib/backers";

/**
 * Headline: white for the name and the key phrases, muted for the words that
 * connect them. On wider screens it breaks into its three parts: who we are,
 * what we build, and what for. "safe" and "under control." switch to the serif italic and are
 * circled in marker; the circles draw in after the header logo's intro
 * (0.7s wait + 0.63s motion). Below it, the backers line: each name led by its
 * mark in a square badge, all centred on one row. Then the "Latest" news
 * link (after pantheon.inc), which leads straight into "trusted by".
 */
export function Hero() {
  const last = BACKERS.length - 1;
  return (
    <section className="hero" aria-labelledby="hero-title">
      <h1 id="hero-title" className="hero-title">
        AIM Intelligence{" "}
        <span className="hero-muted">is an applied research lab</span>
        <br className="hero-break" />{" "}
        <span className="hero-muted">dedicated to building</span> security
        infrastructure <span className="hero-muted">to keep</span>
        <br className="hero-break" /> Artificial Superintelligence{" "}
        <MarkerCircle seed={7} delay={2050} duration={680}>
          <em className="hero-accent">safe</em>
        </MarkerCircle>{" "}
        and{" "}
        <MarkerCircle seed={23} delay={2700} duration={820}>
          <em className="hero-accent">under control.</em>
        </MarkerCircle>
      </h1>

      <p className="backers">
        <span className="backers-label">Backed by</span>
        {BACKERS.map((b, i) => (
          <span key={b.name} className="backer-group">
            {i === last && <span className="backers-label">and</span>}
            <span className="backer">
              <span className="backer-mark" aria-hidden="true">
                <svg
                  viewBox={b.viewBox}
                  style={{
                    width: `${b.scale * 100}%`,
                    height: `${b.scale * 100}%`,
                  }}
                >
                  <path d={b.d} fill="currentColor" />
                  {"parts" in b &&
                    b.parts.map((part) => (
                      <path
                        key={part.transform}
                        d={part.d}
                        transform={part.transform}
                        fill="currentColor"
                      />
                    ))}
                </svg>
              </span>
              <span className="backer-name">
                {b.name}
                <span className="backers-punct">{i === last ? "." : ","}</span>
              </span>
            </span>
          </span>
        ))}
      </p>

      <p className="hero-latest">
        <a
          href="https://blogs.nvidia.com/blog/korea-secure-agentic-ai/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="latest-tag">Latest</span>
          <span className="latest-text">
            NVIDIA: Hyundai Motor Group and AIM Intelligence explore NVIDIA
            NemoClaw and OpenShell for secure enterprise agents
          </span>
          <span className="latest-arrow" aria-hidden="true">
            →
          </span>
        </a>
      </p>
    </section>
  );
}
